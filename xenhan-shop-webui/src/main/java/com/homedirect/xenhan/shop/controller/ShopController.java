package com.homedirect.xenhan.shop.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.OrderStatus;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.user.model.OrderEntity;
import com.homedirect.xenhan.util.JsonUtil;

/**
 * author: hieunv - hieu.nguyen2@homedirect.com.vn
 * on:    10/4/17
 */
@RequestMapping("/shop")
public class ShopController extends AbstractController {

  protected final static Logger logger = LoggerFactory.getLogger(ShopController.class);

  /* CREATE Shop */
  @GetMapping(value = "/tao-shop")
  public ModelAndView createShop() {
    ModelAndView mv = new ModelAndView("shop.create");
    mv.addObject("title","Xe Nhàn - Đăng ký Shop");
    return mv;
  }

  @PostMapping(value = "/luu-shop")
  public byte[] saveShop(@RequestBody Shop request, HttpServletRequest httpRequest, HttpSession session) {
    logger.info(request.toString());
    String url = apiExchangeService.createUrlWithToken(httpRequest, "shop", "create-shop");
    logger.info("url " + url);
    ResponseEntity<RepositoryResponse<Object>> entity = apiExchangeService.post(httpRequest, url, request);
    if(apiExchangeService.isSuccessResponse(entity.getBody())) {
      session.setAttribute(AttributeConfig.SHOPNAME, request.getShopName());
      return "done".getBytes();
    }

    try {
      return entity.getBody().getMessage().getBytes("utf8");
    } catch (Exception e) {
      return entity.getBody().getMessage().getBytes();
    }
  }

  @GetMapping(value = "/thong-tin-shop")
  public ModelAndView showShop(HttpServletRequest httpRequest, HttpSession session) {
    ModelAndView mv = new ModelAndView("shop.detail");
    mv.addObject("title","Xe Nhàn - Thông Tin Shop");
    try {
      Shop shop = getShopInfo(httpRequest);
      mv.addObject("shop", shop);
    } catch (Exception e) {
      logger.error(e.getMessage(), e);
      mv.addObject("error", e.getMessage());
    }
    return mv;
  }

}