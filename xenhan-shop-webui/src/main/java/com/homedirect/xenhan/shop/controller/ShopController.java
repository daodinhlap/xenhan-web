package com.homedirect.xenhan.shop.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.model.common.response.UserDetailEntity;

/**
 * author: hieunv - hieu.nguyen2@homedirect.com.vn
 * on:    10/4/17
 */
@RestController
@RequestMapping("/shop")
public class ShopController extends AbstractController {

  private final static Logger logger = LoggerFactory.getLogger(ShopController.class);

  /* CREATE Shop */
  @GetMapping(value = "/tao-shop")
  public ModelAndView createShop() {
    ModelAndView mv = new ModelAndView("shop.create");
    mv.addObject("title", "Xe Nhàn - Đăng ký Shop");
    return mv;
  }

  @PostMapping(value = "/luu-shop")
  public byte[] saveShop(@RequestBody Shop request, HttpServletRequest httpRequest, HttpSession session) {
    logger.info(request.toString());
    String url = apiExchangeService.createUrlWithToken(httpRequest, "shop", "create-shop");
//    logger.info("url " + url);
    ResponseEntity<RepositoryResponse<Object>> entity = apiExchangeService.post(httpRequest, url, 
                                                request, new TypeReference<RepositoryResponse<Shop>>(){});
    if(apiExchangeService.isSuccessResponse(entity.getBody())) {
      session.setAttribute(AttributeConfig.SHOPNAME, request.getShopName());
      session.setAttribute(AttributeConfig.SHOP, entity.getBody().getData());
      return "done".getBytes();
    }

    try {
      return entity.getBody().getMessage().getBytes("utf8");
    } catch (Exception e) {
      return entity.getBody().getMessage().getBytes();
    }
  }
  
  /* CREATE Shop */
  @GetMapping(value = "/thong-tin-tai-khoan")
  public ModelAndView account(HttpServletRequest httpRequest) {
    ModelAndView mv = new ModelAndView("shop.account");
    try {
      mv.addObject("shop", getShopInfo(httpRequest));
    } catch (Exception e) {
      logger.error(e.getMessage(), e);
      mv.addObject("error", e.getMessage());
    }
    
    String url = apiExchangeService.createUrlWithToken(httpRequest, "user", "get-user-profile");
    try {
      RepositoryResponse<UserDetailEntity> entity = apiExchangeService.get(httpRequest, url,
          new TypeReference<RepositoryResponse<UserDetailEntity>>() {});
      logger.info("\n User  Info: {}", entity);
      mv.addObject("user", entity.getData());
    } catch (Exception e) {
      e.printStackTrace();
      logger.error(e.getMessage(), e);
      mv.addObject("error", e.getMessage());
    }
    mv.addObject("title", "Xe Nhàn - Thông Tin Tài Khoản");
    return mv;
  }

  @GetMapping(value = "/thong-tin-shop")
  public ModelAndView showShop(HttpServletRequest httpRequest) {
    logger.info(" ------->asdasdasd" );
    ModelAndView mv = new ModelAndView("shop.detail");
    mv.addObject("title", "Xe Nhàn - Thông Tin Shop");
    try {
      mv.addObject("shop", getShopInfo(httpRequest));
    } catch (Exception e) {
      logger.error(e.getMessage(), e);
      mv.addObject("error", e.getMessage());
    }
    return mv;
  }

}