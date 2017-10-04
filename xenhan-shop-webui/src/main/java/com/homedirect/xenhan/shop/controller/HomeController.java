/***************************************************************************
 * Copyright 2016 by HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.shop.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


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
  public HomeController(Environment  env) {
  }

  /* HOME */
  @GetMapping(value = "/")
  public ModelAndView home(HttpServletRequest httpRequest) {
    ModelAndView mv = new ModelAndView("home");
    mv.addObject("title","Xe Nhàn - Shop");
    return mv;
  }

  @GetMapping(value = "/dang-ky")
  public ModelAndView registry() {
    ModelAndView mv = new ModelAndView("public.register");
    mv.addObject("title","Xe Nhàn - Đăng ký");
    return mv;
  }

  /* LOGIN */
  @GetMapping(value = "/dang-nhap")
  public ModelAndView loginView() {
    ModelAndView mv = new ModelAndView("public.login");
    mv.addObject("title","Xe Nhàn - Đăng Nhập");
    return mv;
  }
}
