package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.common.util.StringUtils;
import com.homedirect.repo.model.User;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.model.common.response.UserDetailEntity;
import com.homedirect.xenhan.model.web.request.PageShopDebitRequest;
import com.homedirect.xenhan.model.web.request.PageShopPaymentRequest;
import com.homedirect.xenhan.util.JsonUtil;
import com.homedirect.xenhan.web.util.UpdateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    private @Autowired UpdateUtil updateUtil;
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

  /* VIEW ACCOUNT */
  @GetMapping(value = "/thong-tin-tai-khoan")
  public ModelAndView account(HttpServletRequest httpRequest) {
    ModelAndView mv = new ModelAndView("shop.account");
    mv.addObject("title", "Xe Nhàn - Thông Tin Tài Khoản");
    try {
      mv.addObject("shop", getShopInfo(httpRequest));
      mv.addObject("shopPayment", httpRequest.getSession().getAttribute(AttributeConfig.SHOP_PAYMENT_INFO));
    } catch (Exception e) {
      logger.error(e.getMessage(), e);
      mv.addObject("error", e.getMessage());
    }

    try {
      String url = apiExchangeService.createUrlWithToken(httpRequest, "user", "get-user-profile");
      RepositoryResponse<UserDetailEntity> entity = apiExchangeService.get(httpRequest, url,
          new TypeReference<RepositoryResponse<UserDetailEntity>>() {});
      mv.addObject("user", entity.getData());
    } catch (Exception e) {
      e.printStackTrace();
      logger.error(e.getMessage(), e);
      mv.addObject("error", e.getMessage());
    }
    return mv;
  }

  /* UPDATE USER*/
  @PostMapping(value = "/sua-thong-tin-nguoi-dung")
  public byte[] editProfile(@RequestParam(value = "name", required = false) String name,
                            @RequestParam(value = "value", required = false) String value,
                            HttpServletRequest httpRequest, HttpServletResponse httpResponse) throws UnsupportedEncodingException {

    if(StringUtils.isEmpty(name) || StringUtils.isEmpty(value)) return "Không có dữ liệu".getBytes("utf8");
    logger.info(" name: {} - value:{}",name,value);

    name = name.trim();
    value = value.trim();
    return updateUtil.updateUser(name, value, httpRequest, httpResponse);
  }

  /*UPDATE SHOP*/
  @PostMapping(value = "/sua-thong-tin-shop")
  public byte[] editShop(@RequestParam(value = "name", required = false) String name,
                         @RequestParam(value = "value", required = false) String value,
                         HttpServletRequest httpRequest, HttpServletResponse httpResponse) throws UnsupportedEncodingException {
    if (StringUtils.isEmpty(name) || StringUtils.isEmpty(value)) return "Không có dữ liệu".getBytes("utf8");
    logger.info(" name: {} - vale:{}",name,value);

    name = name.trim();
    value = value.trim();
    Shop shop = getShopInfo(httpRequest);
    return updateUtil.updateShop(shop, name, value, httpRequest, httpResponse);
  }

  /*CHANGE PASSWORD*/
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

  /*DEBIT*/
  @GetMapping(value = "/cong-no")
  public ModelAndView debit() {
    ModelAndView mv = new ModelAndView("shop.debit");
    mv.addObject("title","Xe Nhàn - Công nợ");
    return mv;
  }

  @PostMapping(value = "/debit")
  public Object listShopDebit(@RequestBody PageShopDebitRequest request, HttpServletRequest httpRequest) {

    request.setSize(20);
    request.setTypeOfView((short) 0);
    request.setShopName((String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME));
    request.setPeriodRecord(getPeriod(httpRequest));

    logger.info("\n==> GET DEBIT:{}", JsonUtil.toJson(request));
    String url = apiExchangeService.createUrlWithToken(httpRequest,"shop", "debit");
    return apiExchangeService.post(httpRequest, url, request).getBody();
  }


  @PostMapping(value = "/shop-payment")
  public Object shopPayments(@RequestBody PageShopPaymentRequest request, HttpServletRequest httpRequest) {

    request.setSize(20);
    logger.info("\n==> GET SHOP PAYMENT:{}", JsonUtil.toJson(request));
    String url = apiExchangeService.createUrlWithToken(httpRequest,"shop", "list-shop-payment");
    return apiExchangeService.post(httpRequest, url, request).getBody();
  }

}