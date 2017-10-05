package com.homedirect.xenhan.shop.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.common.response.UserDetailResponse;

/**
 * author: hieunv - hieu.nguyen2@homedirect.com.vn
 * on:    10/4/17
 */
@RestController
@RequestMapping("/user")
public class UserController extends AbstractController {
  
  protected final static Logger logger = LoggerFactory.getLogger(UserController.class);
  
  @GetMapping(value = "/thong-tin-nguoi-dung")
  public ModelAndView showUser(HttpServletRequest httpRequest, HttpSession session) {
      ModelAndView mv = new ModelAndView("user.detail");
      mv.addObject("title", "Xe Nhàn - Thông Tin Người Dùng");
      String url = apiExchangeService.createUrlWithToken(httpRequest, "user", "get-user");
      url += "&user-name=" + session.getAttribute(AttributeConfig.USERNAME);
      logger.info("url " + url);
      TypeReference<RepositoryResponse<UserDetailResponse>> reference = new TypeReference<RepositoryResponse<UserDetailResponse>>() {};
      try {
        RepositoryResponse<UserDetailResponse> entity = apiExchangeService.get(httpRequest, url, reference);
        logger.info("++++++++++++++++++++++++++ user " + entity);
        mv.addObject("user", entity.getData());
      } catch (Exception e) {
        e.printStackTrace();
        logger.error(e.getMessage(), e);
        mv.addObject("error", e.getMessage());
      }
      return mv;
  }
}
