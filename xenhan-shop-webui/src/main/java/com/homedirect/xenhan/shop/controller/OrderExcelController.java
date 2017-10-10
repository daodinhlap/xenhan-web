/***************************************************************************
 * Copyright 2016 by HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.shop.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.util.Iterator;
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
import org.springframework.util.CollectionUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.homedirect.common.util.StringUtils;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.user.model.District;
import com.homedirect.xenhan.user.model.OrderEntity;

/**
 *  Author : Nhu Dinh Thuan
 *          Email:thuan.nhu@homedirect.com.vn
 * Oct 10, 2017
 */
@RestController
@RequestMapping("/order-excel")
public class OrderExcelController extends AbstractController {

  private final static String IMPORT_DATA = "import_data";

  protected final static Logger logger = LoggerFactory.getLogger(OrderExcelController.class);

  @SuppressWarnings("unchecked")
  @GetMapping(value = "/tao-don-tu-excel")
  public ModelAndView createOrderFromExcel(@RequestParam(value = "error", required = false) String error,
                                           HttpServletRequest httpRequest, HttpSession session) {
    ModelAndView mv = new ModelAndView("order.create.excel");
    mv.addObject("title","Xe Nhàn - Tạo Đơn Từ Excel");
    mv.addObject("error", error);
    List<OrderEntity> orders = (List<OrderEntity>)session.getAttribute(IMPORT_DATA);
    if(!CollectionUtils.isEmpty(orders)) mv.addObject("orders", orders);
    //      session.setAttribute(IMPORT_DATA, resp.getBody().getData());
    return mv;
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
      session.setAttribute(IMPORT_DATA, resp.getBody().getData());
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

  @SuppressWarnings("unchecked")
  @GetMapping(value = "/luu-don-tu-excel")
  public ModelAndView saveFromExcel(@RequestParam(value = "index", required = true) Integer index,
                                    HttpServletRequest httpRequest,
                                    HttpSession session) {
    List<OrderEntity> orders = (List<OrderEntity>)session.getAttribute(IMPORT_DATA);
    if(CollectionUtils.isEmpty(orders) 
        || index == null || index.intValue() < 0 || index.intValue() >= orders.size()) return redirectWithNoData() ;

    OrderEntity entity = orders.get(index.intValue());
    entity.setPackageId(DEFAULT_PACKAGE_ID);
    String url = apiExchangeService.createUrlWithToken(httpRequest, "order", "create-order");
    ResponseEntity<RepositoryResponse<Object>> resp = apiExchangeService.post(httpRequest, url, entity);

    if(apiExchangeService.isSuccessResponse(resp.getBody())) {
      orders.remove(entity);
      return new ModelAndView("redirect:/order-excel/tao-don-tu-excel");
    }
    return redirectWithError(index + 1, resp.getBody().getMessage());
  }

  @SuppressWarnings("unchecked")
  @GetMapping(value = "/luu-het")
  public ModelAndView saveFromExcel(HttpServletRequest httpRequest,
                                    HttpSession session) {
    List<OrderEntity> orders = (List<OrderEntity>)session.getAttribute(IMPORT_DATA);
    if(CollectionUtils.isEmpty(orders)) return redirectWithNoData() ;

    String url = apiExchangeService.createUrlWithToken(httpRequest, "order", "create-order");
    Iterator<OrderEntity> iterator = orders.iterator();
    int index = 1;
    while(iterator.hasNext()) {
      OrderEntity entity = iterator.next();
      entity.setPackageId(DEFAULT_PACKAGE_ID);
      ResponseEntity<RepositoryResponse<Object>> resp = apiExchangeService.post(httpRequest, url, entity);
      if(apiExchangeService.isUnSuccessResponse(resp.getBody())) {
        return redirectWithError(index, resp.getBody().getMessage());
      }
      index++;
      iterator.remove();
    }
    session.removeAttribute(IMPORT_DATA);
    return new ModelAndView("redirect:/order-excel/tao-don-tu-excel");
  }

  @SuppressWarnings("unchecked")
  @GetMapping(value = "/xoa-don-tu-excel")
  public ModelAndView deleteFromExcel(@RequestParam(value = "index", required = true) Integer index,
                                      HttpSession session) {
    List<OrderEntity> orders = (List<OrderEntity>)session.getAttribute(IMPORT_DATA);

    if(CollectionUtils.isEmpty(orders) 
        || index == null || index.intValue() < 0 || index.intValue() >= orders.size()) return redirectWithNoData() ;
    
    orders.remove(index.intValue());
    return new ModelAndView("redirect:/order-excel/tao-don-tu-excel");
  }

  @SuppressWarnings("unchecked")
  @PostMapping(value = "/sua-don-tu-excel")
  public byte[] editFromExcel(@RequestParam(value = "pk", required = true) Integer pk,
                              @RequestParam(value = "name", required = false) String name,
                              @RequestParam(value = "value", required = false) String value,
                              @RequestParam(value = "label", required = false) String label,
                              HttpSession session) throws UnsupportedEncodingException {
    List<OrderEntity> orders = (List<OrderEntity>)session.getAttribute(IMPORT_DATA);

    if(CollectionUtils.isEmpty(orders) 
        || pk == null || pk < 0 || pk >= orders.size()) return "Không có dữ liệu".getBytes("utf8");

    if(StringUtils.isEmpty(name) || StringUtils.isEmpty(value)) return "Không có dữ liệu".getBytes("utf8");

    name = name.trim();
    value = value.trim();

    logger.info("----> "+ pk + " name: " + name + " value:" + value);

    OrderEntity entity = orders.get(pk);
    try {
      switch (name) {
      case "type":
        entity.setCOD(StringUtils.isEmpty(value) || Integer.parseInt(value) == 1);
        break;
      case "package":
        if(StringUtils.isEmpty(value)) value = "3";
        entity.setPackageId(Long.parseLong(value));
        break;
      case "good-amount":
        if(!StringUtils.isEmpty(value)) {
          entity.setGoodAmount(Double.parseDouble(value));
        } else {
          entity.setGoodAmount(0d);
        }
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

      orders.set(pk, entity);
    } catch (Exception e) {
      logger.error(e.getMessage());
      return e.getMessage().getBytes();
    }

    return "done".getBytes();
  }

  private File createTempFile(MultipartFile partFile) throws IllegalStateException, IOException {
    File newFile = new File("temp" + File.separatorChar + partFile.getOriginalFilename());
    if(newFile.exists()) newFile.delete();
    newFile.getParentFile().mkdirs();
    newFile.createNewFile();
    partFile.transferTo(newFile);
    return newFile;
  }
  
  private ModelAndView redirectWithNoData() {
    return redirectWithError("Không có dữ liệu");
  }

  private ModelAndView redirectWithError(String message) {
    try {
      message = URLEncoder.encode(message, "utf8");
    } catch (Exception e) {
      logger.info(e.toString());
    }
    return new ModelAndView("redirect:/order-excel/tao-don-tu-excel?error=" + message);
  }
  
  private ModelAndView redirectWithError(int index, String message) {
    return redirectWithError("Đơn "+ index + ": " + message);
  }
}
