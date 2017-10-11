package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.common.model.Page;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.Order;
import com.homedirect.xenhan.model.OrderStatus;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.user.model.OrderEntity;
import com.homedirect.xenhan.user.model.request.OrderRequest;
import com.homedirect.xenhan.user.model.request.PageOrderRequest;
import com.homedirect.xenhan.user.model.response.JobHistoryEntity;
import com.homedirect.xenhan.util.JsonUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/order")
public class OrderController extends AbstractController {
  
  private final static Logger logger = LoggerFactory.getLogger(OrderController.class);
  
  @GetMapping(value = "/lich-su")
  public ModelAndView historyView() {
    ModelAndView mv = new ModelAndView("order.history");
    mv.addObject("title", "Xe Nhàn - Lịch sử đơn hàng");
    return mv;
  }

  @PostMapping(value = "/history")
  public Object history(@RequestBody PageOrderRequest request,
                         HttpServletRequest httpRequest) {
    logger.info("\n GET HISTORY: {}", JsonUtil.toJson(request));
    request.setSize(20);
    request.setPackageId(DEFAULT_PACKAGE_ID);
    request.setShopName((String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME));

    String url = apiExchangeService.createUrlWithToken(httpRequest,"shop",  "list-orders");
    TypeReference<RepositoryResponse<Page<OrderEntity>>> reference = new TypeReference<RepositoryResponse<Page<OrderEntity>>>() {};
    ResponseEntity<RepositoryResponse<Page<OrderEntity>>> ordersResponse =  apiExchangeService.post(httpRequest, url, request, reference);
    return ordersResponse.getBody().getData();
  }

  @PostMapping(value = "/total")
  public Object total (@RequestBody PageOrderRequest request,
                       HttpServletRequest httpRequest) {
    request.setSize(20);
    request.setPackageId(DEFAULT_PACKAGE_ID);
    request.setShopName((String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME));

    String url = apiExchangeService.createUrlWithToken(httpRequest, "shop", "get-total-order");

    ResponseEntity<RepositoryResponse<Object>> ordersResponse =  apiExchangeService.post(httpRequest, url, request);
    return ordersResponse.getBody().getData();
  }

  @PostMapping(value = "/print")
  public ModelAndView print(@RequestBody List<Order> orders) {
    if(CollectionUtils.isEmpty(orders)) return null;
    ModelAndView mv = new ModelAndView("order.print");
    mv.addObject("title","Xe Nhàn - In");
    mv.addObject("orders",orders);
    return mv;
  }

  /* CREATE Order */
  @GetMapping(value = "/tao-don")
  public ModelAndView create(@RequestParam(value = "type", required = true) Integer type,
                             @RequestParam(value = "order-id", required = false) Long orderId,
                             HttpServletRequest httpRequest) {
    Shop shop = getShopInfo(httpRequest);

    ModelAndView mv = new ModelAndView("order.create");
    mv.addObject("title","Xe Nhàn - " + OrderStatus.toAction(type));
    mv.addObject("province", shop.getTown().getName());
    mv.addObject("type", type);
    mv.addObject("action", OrderStatus.toAction(type));

    if(orderId != null){
      OrderEntity order = getOrder(httpRequest, orderId);
      logger.info("\n ORDER => : {}", JsonUtil.toJson(order));
      mv.addObject("order", order);
    }
    return mv;
  }

  private OrderEntity getOrder(HttpServletRequest httpRequest, Long orderId){
    String url = apiExchangeService.createUrlWithToken(httpRequest, "order", "get-order?order-id="+orderId);
    RepositoryResponse<OrderEntity> orderResponse = apiExchangeService.get(httpRequest, url,
        new TypeReference<RepositoryResponse<OrderEntity>>(){});

    logger.info("\n GET ORDER INFO: {}", JsonUtil.toJson(orderResponse.getData()));
    return orderResponse.getData();
  }


  @PostMapping(value = "/create-order")
  public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest, HttpServletRequest httpRequest) {
    logger.info("\n CREATE ORDER: {}\n", JsonUtil.toJson(orderRequest));

    orderRequest.setPackageId(DEFAULT_PACKAGE_ID);
    String url = apiExchangeService.createUrlWithToken(httpRequest, "order", "create-order");
    return apiExchangeService.post(httpRequest, url, orderRequest);
  }

  @GetMapping(value = "/cancel")
  public RepositoryResponse<?> calcel (@RequestParam(name="order-id", required = true) long orderId,
                                       @RequestParam(name="message", required = false) String message,
                                       HttpServletRequest httpRequest) {

    String url = apiExchangeService.createUrlWithToken(httpRequest,"order", "cancel-order");
    url += "&order-id="+ orderId + "&message=" + message;
    return apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<JobHistoryEntity>>(){});
  }

  @PostMapping(value = "/edit")
  public ResponseEntity<?> edit(@RequestBody OrderRequest orderRequest, HttpServletRequest httpRequest) {
    logger.info("\n EDIT ORDER: {}\n", JsonUtil.toJson(orderRequest));

    orderRequest.setPackageId(DEFAULT_PACKAGE_ID);
    String url = apiExchangeService.createUrlWithToken(httpRequest, "order", "update-order");
    return apiExchangeService.post(httpRequest, url ,orderRequest);
  }

}
