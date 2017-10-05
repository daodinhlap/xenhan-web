package com.homedirect.xenhan.shop.controller;

import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.Order;
import com.homedirect.xenhan.util.JsonUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UriComponentsBuilder;

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

  @PostMapping(value = "/create-order")
  public ResponseEntity<?> createOrder(@RequestBody Order order, HttpServletRequest httpRequest) {
    logger.info("\n CREATE ORDER: {}\n", JsonUtil.toJson(order));
    
    order.setPackageId(DEFAULT_PACKAGE_ID);
    String url = apiExchangeService.createUrlWithToken(httpRequest, "order", "create-order");
    return apiExchangeService.post(httpRequest, url ,order);
  }

  /* CREATE Shop */
  @GetMapping(value = "/tao-shop")
  public ModelAndView createShop(HttpServletRequest httpRequest) {
    ModelAndView mv = new ModelAndView("shop.create");
    mv.addObject("title","Xe Nhàn-Đăng ký Shop");
    return mv;
  }
}
