package com.homedirect.xenhan.shop.controller;
/* author: minhhieu */

import com.homedirect.xenhan.model.OrderStatus;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.user.model.OrderEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/order")
public class OrderPickupController extends AbstractController {

  /* CREATE PICKUP Order */
  @GetMapping(value = "/tao-don-lay-hang")
  public ModelAndView create(@RequestParam(value = "type") Integer type,
                             @RequestParam(value = "order-id", required = false) Long orderId,
                             @RequestParam(value = "coupon", required = false) String coupon,
                             HttpServletRequest httpRequest) {
    Shop shop = getShopInfo(httpRequest);
    String action = OrderStatus.toActionPickup(type);

    ModelAndView mv = new ModelAndView("order.create.pickup");
    mv.addObject("title","Xe Nhàn - " + action);
    mv.addObject("shop", shop);
    mv.addObject("type", type);
    mv.addObject("coupon", StringUtils.isEmpty(coupon) ? "" : coupon.trim());
    mv.addObject("action", action);

    if(orderId != null){
      OrderEntity order = getOrder(httpRequest, orderId);
      mv.addObject("order", order);
    }
    return mv;
  }
}
