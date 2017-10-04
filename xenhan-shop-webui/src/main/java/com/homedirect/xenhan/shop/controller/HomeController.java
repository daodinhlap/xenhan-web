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
//    String token = (String)httpRequest.getSession().getAttribute(PaydAuthenticationFilter.TOKEN_ATTRIBUTE_NAME);
//    logger.info("----  > token = "+ token);
//    if(StringUtils.isEmpty(token)) return new ModelAndView("redirect:/dang-nhap");
    ModelAndView mv = new ModelAndView("common/home");
    mv.addObject("title","Xe Nhàn - Shop");
    return mv;
  }


}
