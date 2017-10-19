/***************************************************************************
 * Copyright 2017 by NDK - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.PeriodRecord;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.model.data.request.ShopProfileData;
import com.homedirect.xenhan.util.JsonUtil;
import com.homedirect.xenhan.web.connection.ApiExchangeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public class AbstractController {
  private final static Logger logger = LoggerFactory.getLogger(AbstractController.class);

  public final static String TOKEN_ATTRIBUTE_NAME = "token-id";
  public static final int DEFAULT_PACKAGE_ID = 2;
  public static PeriodRecord DEFAULT_PERIOD = null;

  @Autowired
  protected ApiExchangeService apiExchangeService;

  public AbstractController() {
  }

  protected Shop getShopInfo(HttpServletRequest httpRequest){
    Shop shop = (Shop) httpRequest.getSession().getAttribute(AttributeConfig.SHOP);
    if(shop != null) return shop;
    String shopName =(String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME);
    String url = apiExchangeService.createUrlWithToken(httpRequest, "shop", "get-shop?shop-name=" + shopName);
    RepositoryResponse<ShopProfileData> shopResponse = apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<ShopProfileData>>(){});
    logger.info("\n====> GET ShopProfileData INFO:{}", JsonUtil.toJson(shopResponse.getData()));

    shop = shopResponse.getData().getShop();
    httpRequest.getSession().setAttribute(AttributeConfig.SHOP, shopResponse.getData().getShop());
    httpRequest.getSession().setAttribute(AttributeConfig.SHOP_PAYMENT_INFO, shopResponse.getData().getShopPaymentInfo());
    return shop;
  }


  protected PeriodRecord getPeriod (HttpServletRequest httpRequest){
    if(DEFAULT_PERIOD != null) return DEFAULT_PERIOD;

    String url = apiExchangeService.createUrlWithToken(httpRequest,"common", "periods");
    RepositoryResponse<List<PeriodRecord>> periods = apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<List<PeriodRecord>>>(){});
    logger.info("\n ==> GET PERIODS: {}", JsonUtil.toJson(periods));
    DEFAULT_PERIOD = periods.getData().get(0);
    return DEFAULT_PERIOD;
  }

}
