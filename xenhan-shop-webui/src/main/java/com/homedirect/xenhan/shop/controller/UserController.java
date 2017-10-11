package com.homedirect.xenhan.shop.controller;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.common.util.StringUtils;
import com.homedirect.repo.model.User;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.session.model.SimpleUser;
import com.homedirect.session.model.UserSession;
import com.homedirect.xenhan.model.common.request.XnUserProfileRequest;
import com.homedirect.xenhan.model.common.request.XnUserRequest;
import com.homedirect.xenhan.model.common.response.UserDetailEntity;

/**
 * author: hieunv - hieu.nguyen2@homedirect.com.vn
 * on:    10/4/17
 */
@RestController
@RequestMapping("/user")
public class UserController extends AbstractController {

  protected final static Logger logger = LoggerFactory.getLogger(UserController.class);

  @GetMapping(value = "/thong-tin-nguoi-dung")
  public ModelAndView showUser(HttpServletRequest httpRequest) {
    ModelAndView mv = new ModelAndView("user.detail");
    mv.addObject("title", "Xe Nhàn - Thông Tin Người Dùng");
    String url = apiExchangeService.createUrlWithToken(httpRequest, "user", "get-user-profile");

    try {
      RepositoryResponse<UserDetailEntity> entity = apiExchangeService.get(httpRequest, url,
          new TypeReference<RepositoryResponse<UserDetailEntity>>() {});
      logger.info("\n User  Info: {}", entity);
      mv.addObject("user", entity.getData());
    } catch (Exception e) {
      e.printStackTrace();
      logger.error(e.getMessage(), e);
      mv.addObject("error", e.getMessage());
    }
    return mv;
  }

  @PostMapping(value = "/sua-thong-tin-nguoi-dung")
  public byte[] editProfile(@RequestParam(value = "pk", required = true) Integer pk,
                            @RequestParam(value = "name", required = false) String name,
                            @RequestParam(value = "value", required = false) String value,
//                            @RequestParam(value = "label", required = false) String label,
                            HttpServletRequest httpRequest, HttpServletResponse httpResponse) throws UnsupportedEncodingException {
    if(StringUtils.isEmpty(name) || StringUtils.isEmpty(value)) return "Không có dữ liệu".getBytes("utf8");
    
    name = name.trim();
    value = value.trim();
    
    UsernamePasswordAuthenticationToken  authen = (UsernamePasswordAuthenticationToken)httpRequest.getUserPrincipal();
    
    UserSession userSession = (UserSession) authen.getPrincipal();
    logger.info("----> "+ pk + " name: " + name + " value:" + value + " : "+ userSession.getUser());
    
    
    XnUserRequest user = toUserRequest(userSession.getUser());
    switch (name) {
    case "phone":
      user.setPhone(value);
      return updateUser(httpRequest, httpResponse, user).getBytes("utf8");
    case "email":
      user.setEmail(value);
      return updateUser(httpRequest, httpResponse, user).getBytes("utf8");
    default:
      break;
    }

    XnUserProfileRequest profile =  loadProfile(httpRequest);
    switch (name) {
    case "name":
      profile.setName(value);
      break;
    default:
      break;
    }
   
    return updateProfile(httpRequest, httpResponse, profile).getBytes("utf8");
  }
  
  private String updateUser(HttpServletRequest httpRequest, HttpServletResponse httpResponse, XnUserRequest user) {
    String url = apiExchangeService.createUrlWithToken(httpRequest, "user", "update-user");
    ResponseEntity<RepositoryResponse<Object>> resp = apiExchangeService.post(httpRequest, url, user);
    logger.info("--- response " + resp.getStatusCodeValue() + " : "+ resp.getBody().getMessage());
    if(apiExchangeService.isUnSuccessResponse(resp.getBody())) {
      httpResponse.setStatus(HttpStatus.SERVICE_UNAVAILABLE.ordinal());
      return resp.getBody().getMessage();
    }
    return "done";
  }
  
  private XnUserRequest toUserRequest(SimpleUser user) {
    XnUserRequest request = new XnUserRequest();
    request.setEmail(user.getEmail());
    request.setPhone(user.getPhone());
    request.setUsername(user.getUserName());
    return request;
  }
  
  private String updateProfile(HttpServletRequest httpRequest, HttpServletResponse httpResponse, XnUserProfileRequest profile ) {
    String url = apiExchangeService.createUrlWithToken(httpRequest, "user", "update-profile");
    ResponseEntity<RepositoryResponse<Object>> resp = apiExchangeService.post(httpRequest, url, profile);
    logger.info("--- response " + resp.getStatusCodeValue() + " : "+ resp.getBody().getMessage());
    if(apiExchangeService.isUnSuccessResponse(resp.getBody())) {
      httpResponse.setStatus(HttpStatus.SERVICE_UNAVAILABLE.ordinal());
      return resp.getBody().getMessage();
    }
    return "done";
  }

  private XnUserProfileRequest loadProfile(HttpServletRequest httpRequest) {
    String url = apiExchangeService.createUrlWithToken(httpRequest, "user", "get-user-profile");

    RepositoryResponse<UserDetailEntity> entity = apiExchangeService.get(httpRequest, url,
        new TypeReference<RepositoryResponse<UserDetailEntity>>() {});
    UserDetailEntity detail = entity.getData();
    
    XnUserProfileRequest request = new XnUserProfileRequest();
    request.setUserId(detail.getUser().getId());
    request.setUsername(detail.getUser().getUserName());
    
    request.setAddress(detail.getUserProfile().getAddress());
    request.setDateOfBirth(detail.getUserProfile().getBirthday());
//    request.setDistrictId(detail.getUserProfile().get);
    request.setFacebookId(detail.getUserProfile().getFacebookId());
    request.setGender(detail.getUserProfile().getGender());
    request.setGoogleId(detail.getUserProfile().getGoogleId());
    request.setIdDate(detail.getUserProfile().getDateOfIdentity());
    request.setIdNbr(detail.getUserProfile().getIdentityCard());
    request.setName(detail.getUserProfile().getFullName());
    
    return request;
  }

  @GetMapping(value = "/doi-mat-khau")
  public ModelAndView changePassword() {
    ModelAndView mv = new ModelAndView("public.change.password");
    mv.addObject("title","Xe Nhàn - Đổi mật khẩu");
    return mv;
  }
  @GetMapping(value = "/change-password")
  public RepositoryResponse<?> changePassword(@RequestParam(value = "old-password") String oldPassword,
                                              @RequestParam(value = "new-password") String newPassword,
                                              HttpServletRequest httpRequest){

    String url = apiExchangeService.createUrlWithToken(httpRequest,"common", "change-password");
    url += "&old-password="+ oldPassword + "&new-password=" + newPassword;
    return apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<User>>(){});
  }


}
