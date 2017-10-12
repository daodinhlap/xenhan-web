package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.common.util.StringUtils;
import com.homedirect.repo.batch.model.UserRecord;
import com.homedirect.repo.model.User;
import com.homedirect.repo.model.UserProfile;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.model.common.response.UserDetailEntity;
import com.homedirect.xenhan.util.DateUtil;
import com.homedirect.xenhan.util.JsonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;

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

  @PostMapping(value = "/sua-thong-tin-nguoi-dung")
  public byte[] editProfile(@RequestParam(value = "name", required = false) String name,
                            @RequestParam(value = "value", required = false) String value,
                            //                            @RequestParam(value = "label", required = false) String label,
                            HttpServletRequest httpRequest, HttpServletResponse httpResponse) throws UnsupportedEncodingException {
    if(StringUtils.isEmpty(name) || StringUtils.isEmpty(value)) return "Không có dữ liệu".getBytes("utf8");
    logger.info(" name: {} - value:{}",name,value);
    name = name.trim();
    value = value.trim();

    UserRecord userRecord = getUserRecord(httpRequest);
    User user = userRecord.getUser();
    UserProfile userProfile = userRecord.getUserProfile();
    switch (name) {
    case "name":
      userProfile.setFullName(value);
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    case "phone":
      user.setPhone(value);
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    case "email":
      user.setEmail(value);
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    case "gender":
      userProfile.setGender(Integer.valueOf(value));
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    case "address":
      userProfile.setAddress(value);
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    case "province":
      userProfile.setProvince(value);
      userProfile.setDistrict(null);
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    case "district":
      userProfile.setDistrict(value);
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    case "placeOfBirth":
      userProfile.setPlaceOfBirth(value);
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    case "birthDay":
      userProfile.setBirthday(DateUtil.ddMMyyyy2Date(value));
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    case "identityCard":
      userProfile.setIdentityCard(value);
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    case "dateOfIdentity":
      userProfile.setDateOfIdentity(DateUtil.ddMMyyyy2Date(value));
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    case "facebook":
      userProfile.setFacebookId(value);
      return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    default:
      return "error".getBytes();
    }
  }

  @PostMapping(value = "/sua-thong-tin-shop")
  public byte[] editShop(@RequestParam(value = "name", required = false) String name,
                         @RequestParam(value = "value", required = false) String value,
                         HttpServletRequest httpRequest, HttpServletResponse httpResponse) throws UnsupportedEncodingException {
    if (StringUtils.isEmpty(name) || StringUtils.isEmpty(value)) return "Không có dữ liệu".getBytes("utf8");
    logger.info(" name: {} - value:{}",name,value);
    name = name.trim();
    value = value.trim();

    Shop shop = getShopInfo(httpRequest);
    switch (name) {
    case "shopName":
      shop.setFullName(value);
      return updateShop(httpRequest, httpResponse, shop).getBytes("utf8");
    case "shopAddress":
      shop.setAddress(value);
      return updateShop(httpRequest, httpResponse, shop).getBytes("utf8");
    case "shopProvince":
      shop.getTown().setId(Long.valueOf(value));
      return updateShop(httpRequest, httpResponse, shop).getBytes("utf8");
    case "shopDistrict":
      shop.getTown().getDistrict().setId(Long.valueOf(value));
      return updateShop(httpRequest, httpResponse, shop).getBytes("utf8");
    case "shopPhone":
      shop.setPhone(value);
      return updateShop(httpRequest, httpResponse, shop).getBytes("utf8");
    case "shopEmail":
      shop.setEmail(value);
      return updateShop(httpRequest, httpResponse, shop).getBytes("utf8");
    case "shopWebsite":
      shop.setWebsite(value);
      return updateShop(httpRequest, httpResponse, shop).getBytes("utf8");
    default:
      return "error".getBytes();
    }
  }

  private String updateUser(HttpServletRequest httpRequest, HttpServletResponse httpResponse, UserRecord userRecord) {
    String url = apiExchangeService.createUrlWithToken(httpRequest, "user", "update-user-record");
    ResponseEntity<RepositoryResponse<Object>> resp = apiExchangeService.post(httpRequest, url, userRecord);

    logger.info("--- response " + resp.getStatusCodeValue() + " : "+ resp.getBody().getMessage());
    if(apiExchangeService.isUnSuccessResponse(resp.getBody())) {
      httpResponse.setStatus(HttpStatus.SERVICE_UNAVAILABLE.ordinal());
      return resp.getBody().getMessage();
    }
    return "done";
  }

  private String updateShop(HttpServletRequest httpRequest, HttpServletResponse httpResponse, Shop shop) {
    String url = apiExchangeService.createUrlWithToken(httpRequest, "shop", "update-shop-profile");
    ResponseEntity<RepositoryResponse<Object>> resp = apiExchangeService.post(httpRequest, url, shop);

    logger.info("--- response " + resp.getStatusCodeValue() + " : "+ resp.getBody().getMessage());
    if(apiExchangeService.isUnSuccessResponse(resp.getBody())) {
      httpResponse.setStatus(HttpStatus.SERVICE_UNAVAILABLE.ordinal());
      return resp.getBody().getMessage();
    }
    return "done";
  }

  private UserRecord getUserRecord(HttpServletRequest httpRequest) {
    String url = apiExchangeService.createUrlWithToken(httpRequest, "user", "get-user-record");
    RepositoryResponse<UserRecord> entity = apiExchangeService.get(httpRequest, url,
        new TypeReference<RepositoryResponse<UserRecord>>() {});
    logger.info("\n GET USER RECORD: {}", JsonUtil.toJson(entity.getData()));
    return entity.getData();
  }

  @GetMapping(value = "/doi-mat-khau")
  public ModelAndView changePassword() {
    ModelAndView mv = new ModelAndView("public.change.password");
    mv.addObject("title","Xe Nhàn - Đổi mật khẩu");
    return mv;
  }
  @GetMapping(value = "/change-password")
  public RepositoryResponse<?> changePassword(@RequestParam(value = "old-password") String oldPassword,
                                              @RequestParam(value = "new-password") String newPassword,
                                              HttpServletRequest httpRequest) {
    String url = apiExchangeService.createUrlWithToken(httpRequest,"common", "change-password");
    url += "&old-password="+ oldPassword + "&new-password=" + newPassword;
    return apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<User>>(){});
  }

}