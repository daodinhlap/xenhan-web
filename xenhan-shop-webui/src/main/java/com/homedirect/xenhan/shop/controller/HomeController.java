/***************************************************************************
 * Copyright 2016 by HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.shop.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.homedirect.common.util.StringUtils;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.common.request.XnUserInforRequest;
import com.homedirect.xenhan.web.connection.ApiExchangeService;


/**
 *  Author : Duy Kien Ngo
 *          Email:kien.ngoduy@homedirect.com.vn
 * Feb 9, 2017
 */

@RestController
@RequestMapping("/")
public class HomeController extends AbstractController {

  private final static Logger logger = LoggerFactory.getLogger(HomeController.class);

  @Autowired
  public HomeController() {
  }

  /* HOME */
  @GetMapping(value = "/")
  public ModelAndView home(HttpServletRequest httpRequest, HttpSession session) {
    String token = (String)httpRequest.getSession().getAttribute(ApiExchangeService.TOKEN_ATTRIBUTE_NAME);
    if(StringUtils.isEmpty(token)) return new ModelAndView("redirect:/dang-nhap");
    
    String shopName = (String)session.getAttribute(AttributeConfig.SHOPNAME);
    if(StringUtils.isEmpty(shopName))  return new ModelAndView("redirect:/shop/tao-shop");
    
//    ModelAndView mv = new ModelAndView("home");
//    mv.addObject("title", "Xe Nhàn - Shop");
//    return mv;
    return new ModelAndView("redirect:/shop/lich-su");
  }

  @GetMapping(value = "/dang-ky")
  public ModelAndView registry() {
    ModelAndView mv = new ModelAndView("public.register");
    mv.addObject("title","Xe Nhàn - Đăng ký");
    return mv;
  }

  @GetMapping(value = "/thanh-cong")
  public ModelAndView success(@RequestParam(value = "phone") String phone) {
    ModelAndView mv = new ModelAndView("public.success");
    mv.addObject("title","Xe Nhàn - Đăng ký thành công");
    mv.addObject("phone",phone);
    return mv;
  }

  @PostMapping(value = "/tao-tai-khoan-nguoi-dung")
  public byte[] createUser(@RequestBody XnUserInforRequest request, HttpServletRequest httpRequest) {
    logger.info(request.toString());
    String url = apiExchangeService.createURL("user", "create-user");
    ResponseEntity<RepositoryResponse<Object>> entity = apiExchangeService.post(httpRequest, url, request);
    if(apiExchangeService.isSuccessResponse(entity.getBody()))  return "done".getBytes();
    try {
      return entity.getBody().getMessage().getBytes("utf8");
    } catch (Exception e) {
      return entity.getBody().getMessage().getBytes();
    }
  }
  
  /* LOGIN */
  @GetMapping(value = "/dang-nhap")
  public ModelAndView loginView() {
    ModelAndView mv = new ModelAndView("public.login");
    mv.addObject("title","Xe Nhàn - Đăng Nhập");
    return mv;
  }
  
  @GetMapping(value="khong-tim-thay-trang")
  public ModelAndView notFoundPage(HttpServletRequest request, HttpServletResponse response) {
    ModelAndView mv = new ModelAndView("public.error");
    mv.addObject("title","Xe Nhàn - Trang Không Tìm Thấy");
    return mv;
  }
  
  @GetMapping(value="/dang-xuat")
  public ModelAndView logout(HttpServletRequest request, HttpServletResponse response) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth != null) {    
      new SecurityContextLogoutHandler().logout(request, response, auth);
    }
    return new ModelAndView("redirect:/");
  }
}
