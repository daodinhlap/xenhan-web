package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.batch.model.UserRecord;
import com.homedirect.repo.model.Membership;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.session.model.SimpleUser;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.common.request.XNMemberRequest;
import com.homedirect.xenhan.model.common.request.XnUserInforRequest;
import com.homedirect.xenhan.model.web.response.Member;
import com.homedirect.xenhan.web.auth.UserAuthentication;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class MemberController extends AbstractController {

    @GetMapping(value = "/danh-sach")
    public ModelAndView listView() {
        ModelAndView mv = new ModelAndView("admin.list");
        return mv;
    }

    @GetMapping(value = "/list")
    public Object list(HttpServletRequest httpRequest){
        String url = apiExchangeService.createUrlWithToken(httpRequest,"shop",  "list-member");
        String shopName = (String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME);
        url += "&shop-name=" + shopName;
        RepositoryResponse<List<Membership>> members = apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<List<Membership>>>(){});
        return toResponse(members.getData(), httpRequest);

    }

    private List<Member> toResponse(List<Membership> memberships, HttpServletRequest httpRequest) {
        SimpleUser simpleUser = (SimpleUser)httpRequest.getSession().getAttribute(AttributeConfig.SIMPLE_USER);
        return memberships.stream()
                .filter(membership -> !membership.getUserName().equals(simpleUser.getUserName()))
                .map(membership -> {
                    Member member = new Member();
                    member.setFullName(membership.getFullName());
                    member.setPhone(membership.getUserName());
                    member.setUserName(member.getPhone());
                    return member;
                }).collect(Collectors.toList());
    }

    @PostMapping("/add")
    public RepositoryResponse<?> add(@RequestBody XnUserInforRequest userInfo,
                                        HttpServletRequest httpRequest){
        if(userInfo == null) return null;

        try{
            String shopName = (String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME);
            XNMemberRequest request = new XNMemberRequest(userInfo, shopName);

            String url = apiExchangeService.createUrlWithToken(httpRequest,"user",  "create-member");
            return apiExchangeService.post(httpRequest, url, request, new TypeReference<RepositoryResponse<Object>>(){}).getBody();
        } catch (Exception e){
            return null;
        }
    }

    @PostMapping("/update")
    public RepositoryResponse<?> update(@RequestBody UserRecord userRecord,
                                     HttpServletRequest httpRequest){
        if(userRecord == null) return null;

        try{
            String url = apiExchangeService.createUrlWithToken(httpRequest,"admin",  "update");
            return apiExchangeService.post(httpRequest, url,userRecord, new TypeReference<RepositoryResponse<Object>>(){}).getBody();
        } catch (Exception e){
            return null;
        }
    }

    @GetMapping("/delete")
    public RepositoryResponse<?> delete(@RequestParam(value = "user-name") String userName,
                                        HttpServletRequest httpRequest){
        if(StringUtils.isEmpty(userName)) return null;

        try{
            String shopName = (String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME);
            String url = apiExchangeService.createUrlWithToken(httpRequest,"shop",  "remove-member");
            url += "&shop-name=" + shopName;
            url += "&user-name=" + userName.trim();
            return apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<Object>>(){});
        } catch (Exception e){
            return null;
        }
    }

}
