/***************************************************************************
 * Copyright 2017 by NDK - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.coupon.CouponGetRequest;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.PeriodRecord;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.model.data.ShopProfileData;
import com.homedirect.xenhan.model.web.response.CardResponse;
import com.homedirect.xenhan.user.model.OrderEntity;
import com.homedirect.xenhan.util.JsonUtil;
import com.homedirect.xenhan.web.connection.ApiExchangeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class AbstractController {
  protected final Logger logger = LoggerFactory.getLogger(getClass());

  public static final int DEFAULT_PACKAGE_ID = 2;
  public static PeriodRecord DEFAULT_PERIOD = null;

  protected @Autowired ApiExchangeService apiExchangeService;
  private ObjectMapper MAPPER = new ObjectMapper();

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

  protected List<CardResponse> getCoupon(HttpServletRequest httpRequest, CouponGetRequest request) throws IOException {
    request.setCampaignPrefix(CouponGetRequest.XN_CAMPAIGN_PREFIX);
    if(request.getUserEmail() == null){
      Shop shop = getShopInfo(httpRequest);
      request.setUserEmail(shop.getEmail());
    }

    String url = apiExchangeService.createUrlWithToken(httpRequest,"coupon", "list");
    RepositoryResponse<Object> response = apiExchangeService.post(httpRequest, url, request).getBody();
    if(apiExchangeService.isUnSuccessResponse(response)) return Collections.EMPTY_LIST;

    List<CardResponse> responses = MAPPER.readValue(JsonUtil.toJson(response.getData()), new TypeReference<List<CardResponse>>(){});
    List<CardResponse> cardResponses = responses.stream()
            .filter(coupon -> coupon.getExpirationDate().after(Calendar.getInstance().getTime()))
            .collect(Collectors.toList());

    if(CollectionUtils.isEmpty(cardResponses)) {
      request.setUserEmail("");
      cardResponses = getCoupon(httpRequest, request);
    }
    return cardResponses;
  }


  protected OrderEntity getOrder(HttpServletRequest httpRequest, Long orderId){
    String url = apiExchangeService.createUrlWithToken(httpRequest, "order", "get-order?order-id="+orderId);
    RepositoryResponse<OrderEntity> orderResponse = apiExchangeService.get(httpRequest, url,
            new TypeReference<RepositoryResponse<OrderEntity>>(){});

    logger.info("\n GET ORDER INFO: {}", JsonUtil.toJson(orderResponse.getData()));
    return orderResponse.getData();
  }

}
