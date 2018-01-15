package com.homedirect.xenhan.shop.controller;
/* author: minhhieu */

import com.homedirect.xenhan.coupon.CouponGetRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("shop")
public class CouponController extends AbstractController {

  @GetMapping(value = "/khuyen-mai")
  public ModelAndView coupons(){
    return new ModelAndView("coupon.list");
  }

  @PostMapping(value = "/get-coupons")
  public Object getCoupons(@RequestBody CouponGetRequest request, HttpServletRequest httpRequest) {
    request.setCampaignPrefix(CouponGetRequest.XN_CAMPAIGN_PREFIX);
    return getCoupon(httpRequest, request);
  }
}
