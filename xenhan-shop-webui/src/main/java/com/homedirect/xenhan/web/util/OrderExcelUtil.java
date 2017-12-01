/***************************************************************************
 * Copyright 2016 by HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.web.util;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Locale;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.homedirect.xenhan.user.model.Dropoff;
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
import com.homedirect.xenhan.user.model.Town;
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

  public void validateProvince(OrderEntity order,  OrderValidateEntity validated) {
    if(order.getShop().getTown().getDistrict() == null){
      validated.setField("pickupDistrict");
      validated.setMessage("Quận/Huyện lấy hàng trống");
      validated.setError(true);
      return;
    }
    if(notDetectedDropoff(order)){
      validated.setField("province");
      validated.setMessage("Không thể nhận diện TP/Quận huyện giao hàng");
      validated.setError(true);
      return;
    }
    if(order.getDropoff().getTown().getDistrict() == null){
      validated.setField("district");
      validated.setMessage("Quận/Huyện giao hàng trống");
      validated.setError(true);
      return;
    }

    if(order.getShop().getTown().getId() == order.getDropoff().getTown().getId()) return;

    validated.setField("province");
    validated.setMessage("Xe Nhàn chưa hỗ trợ giao hàng liên tỉnh");
    validated.setError(true);
  }

  public Response validateCoupon(HttpServletRequest request,
                                 OrderEntity order, OrderValidateEntity validated) {
    if(StringUtils.isEmpty(order.getCoupon())) return null;

    String url = apiExchangeService.createUrlWithToken(request, "coupon", "check-coupon-info?code=" + order.getCoupon());
    logger.info("url ---> "+ url);
    TypeReference<RepositoryResponse<Response>> reference = new TypeReference<RepositoryResponse<Response>>() {};
    RepositoryResponse<Response> resp =  apiExchangeService.get(request, url, reference);

    if(resp.getData() == null) {
      validated.setField("coupon");
      validated.setMessage(resp.getMessage());
      validated.setError(true);
      return null;
    }

    logger.info("check coupon ----- > "+ resp.getData());
    return resp.getData();
  }

  public void calculateFree(HttpServletRequest request,
                            OrderEntity order, OrderValidateEntity validated, Response coupon) {
    String url = createCalculateFeeURL(request, order);
    TypeReference<RepositoryResponse<Double>> reference = new TypeReference<RepositoryResponse<Double>>() {};
    Optional<Double> optional =  apiExchangeService.getForObject(request, url, reference);

    double fee = optional.isPresent() ? optional.get().doubleValue() : 0d;
    order.setShipAmount(fee);
    DecimalFormat format = (DecimalFormat) NumberFormat.getNumberInstance(new Locale("vi", "vn"));
    validated.setFee(format.format(fee));
    if(coupon == null) return;

    double couponValue =  0;
    try {
      couponValue = Double.parseDouble(coupon.getAmount().trim());
    } catch (Exception e) {
    }
    if(couponValue > 0) fee -= couponValue;
    fee = Math.max(0, fee);
    order.setShipAmount(fee);
    validated.setCouponValue(format.format(couponValue));
    validated.setFee(format.format(fee));
  }

  private boolean notDetectedDropoff(OrderEntity order) {
    return order.getDropoff().getTown() == null ? true : false;
  }

  private String createCalculateFeeURL(HttpServletRequest request, OrderEntity order) {
    Town town = order.getDropoff().getTown();
    String provinceName = town != null ? town.getName() : order.getShop().getTown().getName();
    String districtName = town != null && town.getDistrict() != null ? town.getDistrict().getName() : order.getShop().getTown().getDistrict().getName();

    StringBuilder builder = new StringBuilder("calculate-fee?province-name=");
    builder.append(provinceName);
    builder.append("&district-name=").append(districtName);
    builder.append("&package-id=").append(order.getPackageId());
    String url = apiExchangeService.createUrlWithToken(request, "order", builder.toString());
    try {
      return URLDecoder.decode(url, "utf8");
    } catch (Exception e) {
      return url;
    }
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
    case "pickupAddress":
      if(!StringUtils.isEmpty(value)) entity.getShop().setAddress(value);
      break;
    case "address":
      entity.getDropoff().setAddress(value);
      break;
    case "pickupProvince":
      if(!StringUtils.isEmpty(value)){
        entity.getShop().getTown().setId(Long.parseLong(value));
        entity.getShop().getTown().setName(label);
        entity.getShop().getTown().setDistrict(null);
      }
      break;
    case "province":
      if(!StringUtils.isEmpty(value)) {
        if(entity.getDropoff().getTown() != null){
          entity.getDropoff().getTown().setDistrict(null);
          entity.getDropoff().getTown().setId(Long.parseLong(value));
        } else {
          Town townDropoff = new Town();
          townDropoff.setDistrict(null);
          townDropoff.setId(Long.parseLong(value));
          entity.getDropoff().setTown(townDropoff);
        }
      }
      if(!StringUtils.isEmpty(label)) entity.getDropoff().getTown().setName(label);
      break;
    case "district":
      District district = entity.getDropoff().getTown().getDistrict();
      if(district == null) {
        district = new District();
        entity.getDropoff().getTown().setDistrict(district);
      }
      if(!StringUtils.isEmpty(value)) district.setId(Long.parseLong(value));
      if(!StringUtils.isEmpty(label)) district.setName(label);
      break;
    case "pickupDistrict":
      District pickupDistrict = entity.getShop().getTown().getDistrict();
      if(pickupDistrict == null) pickupDistrict = new District();

      if(!StringUtils.isEmpty(value)) pickupDistrict.setId(Long.parseLong(value));
      if(!StringUtils.isEmpty(label)) pickupDistrict.setName(label);
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
