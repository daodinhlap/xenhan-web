package com.homedirect.xenhan.shop.controller;
/* author: minhhieu */

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.coupon.CouponGetRequest;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.model.web.response.CardResponse;
import com.homedirect.xenhan.util.JsonUtil;

import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("shop")
public class CouponController extends AbstractController {

	@GetMapping(value = "/khuyen-mai")
	public ModelAndView coupons(){
		ModelAndView mv = new ModelAndView("coupon.list");
		mv.addObject("title", "Xe Nhàn - Mã khuyến mại");
		return mv;
	}

	@PostMapping(value = "/get-coupons")
	public List getCoupons(@RequestBody CouponGetRequest request, HttpServletRequest httpRequest) throws IOException {
		return getCoupon(httpRequest, request);
	}

	@PostMapping("/check-time")
	public String checkDiscountTime(HttpServletRequest httpRequest) {
		String url = apiExchangeService.createUrlWithToken(httpRequest,"coupon", "check-discount-time");
		RepositoryResponse<?> response = apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<?>>() {});

		logger.info("response: {}" , JsonUtil.toJson(response));
		return JsonUtil.toJson(response);
	}
}
