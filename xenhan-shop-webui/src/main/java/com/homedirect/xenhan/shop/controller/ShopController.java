package com.homedirect.xenhan.shop.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.homedirect.xenhan.model.Order;
import com.homedirect.xenhan.util.JsonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.Shop;

/**
 * author: hieunv - hieu.nguyen2@homedirect.com.vn
 * on:    10/4/17
 */
@RestController
@RequestMapping("/shop")
public class ShopController extends AbstractController {
  
  protected final static Logger logger = LoggerFactory.getLogger(ShopController.class);

  /* CREATE Order */
  @GetMapping(value = "/tao-don")
  public ModelAndView home(HttpServletRequest httpRequest) {
    ModelAndView mv = new ModelAndView("order.create");
    mv.addObject("title","Xe Nhàn - Tạo đơn hàng");
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
      String url = apiExchangeService.createUrlWithToken(httpRequest, "shop", "get-shop");
      url += "&shop-name=" + session.getAttribute(AttributeConfig.SHOPNAME);
      logger.info("url " + url);
      TypeReference<RepositoryResponse<Shop>> reference = new TypeReference<RepositoryResponse<Shop>>() {};
      try {
        RepositoryResponse<Shop> entity = apiExchangeService.get(httpRequest, url, reference);
        mv.addObject("shop", entity.getData());
      } catch (Exception e) {
        logger.error(e.getMessage(), e);
        mv.addObject("error", e.getMessage());
      }
      return mv;
  }
}
