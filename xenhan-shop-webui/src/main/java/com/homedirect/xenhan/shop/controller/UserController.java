package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.User;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.common.response.UserDetailEntity;
import com.homedirect.xenhan.user.model.response.JobHistoryEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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

  @GetMapping(value = "/cap-nhat-thong-tin")
    public ModelAndView editProfile(){
        ModelAndView mv = new ModelAndView("user.update");
        mv.addObject("title","Xe Nhàn - Cập nhật thông tin người dùng");
        return mv;
    }

  @GetMapping(value = "/doi-mat-khau")
  public ModelAndView changePassword(){
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
