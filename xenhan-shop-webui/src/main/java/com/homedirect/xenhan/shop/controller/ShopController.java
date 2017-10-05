package com.homedirect.xenhan.shop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * author: hieunv - hieu.nguyen2@homedirect.com.vn
 * on:    10/4/17
 */
@RestController
@RequestMapping("/shop")
public class ShopController extends AbstractController {

  /* CREATE Order */
  @GetMapping(value = "/tao-don")
  public ModelAndView home(HttpServletRequest httpRequest) {
    ModelAndView mv = new ModelAndView("order.create");
    mv.addObject("title","Xe Nhàn-Tạo đơn hàng");
    return mv;
  }


    /* CREATE Shop */
    @GetMapping(value = "/tao-shop")
    public ModelAndView createShop(HttpServletRequest httpRequest) {
        ModelAndView mv = new ModelAndView("shop.create");
        mv.addObject("title","Xe Nhàn-Đăng ký Shop");
        return mv;
    }
}
