package com.homedirect.xenhan.shop.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.UserProfile;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.Order;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.user.model.OrderEntity;
import com.homedirect.xenhan.util.JsonUtil;

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
  public ModelAndView create(HttpServletRequest httpRequest) {
    Shop shop = getShopInfo(httpRequest);
    ModelAndView mv = new ModelAndView("order.create");
    mv.addObject("title","Xe Nhàn - Tạo đơn hàng");
    mv.addObject("province", shop.getTown().getName());
    return mv;
  }

  @PostMapping(value = "/create-order")
  public ResponseEntity<?> createOrder(@RequestBody Order order, HttpServletRequest httpRequest) {
    logger.info("\n CREATE ORDER: {}\n", JsonUtil.toJson(order));

    order.setPackageId(DEFAULT_PACKAGE_ID);
    String url = apiExchangeService.createUrlWithToken(httpRequest, "order", "create-order");
    return apiExchangeService.post(httpRequest, url ,order);
  }

  @RequestMapping(value = "/nhap-don-tu-excel", method = RequestMethod.POST)
  public byte[] createByExcel(@RequestParam(value = "qqfile", required = true) MultipartFile partFile,
                              HttpServletRequest httpRequest, HttpSession session) {
    File file = null;
    try {
      file = createTempFile(partFile);
      
      LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
      map.add("file", new FileSystemResource(file));
      map.add("shop-name", session.getAttribute(AttributeConfig.SHOPNAME));
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.MULTIPART_FORM_DATA);

      HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<LinkedMultiValueMap<String, Object>>(map, headers);
      ParameterizedTypeReference<RepositoryResponse<List<OrderEntity>>> reference = new ParameterizedTypeReference<RepositoryResponse<List<OrderEntity>>>() {};
      String url = apiExchangeService.createUrlWithToken(httpRequest, "order", "read-order-excel");
      
      ResponseEntity<RepositoryResponse<List<OrderEntity>>> resp = 
          apiExchangeService.getTemplate().exchange(url, HttpMethod.POST, requestEntity, reference);
      return "done".getBytes();
    } catch (Exception e) {
      logger.error(e.getMessage(), e);
      return e.getMessage().getBytes();
    } finally {
      try {
       if(file != null) Files.deleteIfExists(file.toPath());
      } catch (Exception e) {
        logger.error(e.getMessage(), e);
      }
    }
  }

  private File createTempFile(MultipartFile partFile) throws IllegalStateException, IOException {
    File newFile = new File("temp" + File.separatorChar + partFile.getOriginalFilename());
    if(newFile.exists()) newFile.delete();
    newFile.getParentFile().mkdirs();
    newFile.createNewFile();
    partFile.transferTo(newFile);
    return newFile;
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
    try {
        Shop shop = getShopInfo(httpRequest);
        mv.addObject("shop", shop);
    } catch (Exception e) {
      logger.error(e.getMessage(), e);
      mv.addObject("error", e.getMessage());
    }
    return mv;
  }

  private Shop getShopInfo(HttpServletRequest httpRequest){
      Shop shop =(Shop) httpRequest.getSession().getAttribute(AttributeConfig.SHOP);
      if(shop == null){
          String shopName =(String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME);
          String url = apiExchangeService.createUrlWithToken(httpRequest, "shop", "get-shop?shop-name=" + shopName);
          RepositoryResponse<Shop> shopResponse = apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<Shop>>(){});

          shop = shopResponse.getData();
          httpRequest.getSession().setAttribute(AttributeConfig.SHOP, shopResponse.getData());
          logger.info("\n GET SHOP INFO: {}", JsonUtil.toJson(shopResponse.getData()));
      }
      return shop;
  }
}
