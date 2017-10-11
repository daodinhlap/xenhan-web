/***************************************************************************
 * Copyright 2016 by HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.web.util;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.common.util.StringUtils;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.OrderValidateEntity;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.user.model.District;
import com.homedirect.xenhan.user.model.OrderEntity;
import com.homedirect.xenhan.voucher.Response;
import com.homedirect.xenhan.web.connection.ApiExchangeService;

/**
 *  Author : Nhu Dinh Thuan
 *          Email:thuan.nhu@homedirect.com.vn
 * Oct 11, 2017
 */
@Component
public class OrderExcelUtil {

  private final static Logger logger = LoggerFactory.getLogger(OrderExcelUtil.class);

  @Autowired
  private ApiExchangeService apiExchangeService;

  public void validateProvince(Shop shop,
                               OrderEntity order,  OrderValidateEntity validated) {
    if(shop.getTown().getId() == order.getDropoff().getTown().getId()) return;
    validated.setField("province");
    validated.setMessage("Tỉnh thành phố không trùng với shop");
    validated.setError(true);
  }

  public void validateCoupon(HttpServletRequest request,
                             OrderEntity order, OrderValidateEntity validated) {
    if(StringUtils.isEmpty(order.getCoupon())) return;
    String url = apiExchangeService.createUrlWithToken(request, "coupon", "check-coupon-info?code=" + order.getCoupon());
    logger.info("url ---> "+ url);
    TypeReference<RepositoryResponse<Response>> reference = new TypeReference<RepositoryResponse<Response>>() {};
    RepositoryResponse<Object> resp =  apiExchangeService.get(request, url, reference);
    if(resp.getData() == null) {
      validated.setField("coupon");
      validated.setMessage(resp.getMessage());
      validated.setError(true);
      return;
    }
    logger.info("check coupon ----- > "+ resp.getData());
  }

  public double toDouble(String value) {
    if(StringUtils.isEmpty(value)) return 0d;
    StringBuilder builder = new StringBuilder();
    for(int i = 0 ; i < value.length(); i++) {
      char c = value.charAt(i);
      if(Character.isDigit(c)) builder.append(c);
    }
    return Double.parseDouble(builder.toString());
  }

  public File createTempFile(MultipartFile partFile) throws IllegalStateException, IOException {
    File newFile = new File("temp" + File.separatorChar + partFile.getOriginalFilename());
    if(newFile.exists()) newFile.delete();
    newFile.getParentFile().mkdirs();
    newFile.createNewFile();
    partFile.transferTo(newFile);
    return newFile;
  }

  public void setUpdateData(OrderEntity entity, String name, String value, String label) {
    switch (name) {
    case "type":
      entity.setCOD(StringUtils.isEmpty(value) || Integer.parseInt(value) == 1);
      break;
    case "package":
      if(StringUtils.isEmpty(value)) value = "3";
      try {
        entity.setPackageId(Long.parseLong(value));
      } catch (Exception e) {
        entity.setPackageId(3);
      }
      break;
    case "good-amount":
      entity.setGoodAmount(toDouble(value));
      break;
    case "coupon":
      entity.setCoupon(value);
      break;
    case "address":
      entity.getDropoff().setAddress(value);
      break;
    case "province":
      if(!StringUtils.isEmpty(value)) {
        entity.getDropoff().getTown().setDistrict(null);
        entity.getDropoff().getTown().setId(Long.parseLong(value));
      }
      if(!StringUtils.isEmpty(label)) entity.getDropoff().getTown().setName(label);
      break;
    case "district":
      District district = entity.getDropoff().getTown().getDistrict();
      if(district == null) {
        district = new District();
        entity.getDropoff().getTown().setDistrict(district);
      }
      if(!StringUtils.isEmpty(value)) entity.getDropoff().getTown().getDistrict().setId(Long.parseLong(value));
      if(!StringUtils.isEmpty(label)) entity.getDropoff().getTown().getDistrict().setName(label);
      break;
    case "name":
      entity.getDropoff().getContact().setName(value);
      break;
    case "phone":
      entity.getDropoff().getContact().setPhone(value);
      break;
    case "message":
      entity.setOrderMessage(value);;
      break;

    default:
      break;
    }
  }
}
