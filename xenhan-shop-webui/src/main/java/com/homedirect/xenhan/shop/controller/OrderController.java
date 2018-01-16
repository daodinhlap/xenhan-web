package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.common.model.Page;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.coupon.CouponGetRequest;
import com.homedirect.xenhan.model.*;
import com.homedirect.xenhan.user.model.OrderEntity;
import com.homedirect.xenhan.user.model.request.OrderRequest;
import com.homedirect.xenhan.user.model.request.PageOrderRequest;
import com.homedirect.xenhan.user.model.response.JobHistoryEntity;
import com.homedirect.xenhan.util.JsonUtil;
import com.homedirect.xenhan.web.util.OrderExcelExport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController extends AbstractController {

private @Autowired OrderExcelExport orderExcelExport;
  
  private final static Logger logger = LoggerFactory.getLogger(OrderController.class);
  
  @GetMapping(value = "/lich-su")
  public ModelAndView historyView(HttpServletRequest httpRequest) {
    ModelAndView mv = new ModelAndView("order.history");
    mv.addObject("title", "Xe Nhàn - Lịch sử đơn hàng");
    mv.addObject("badge_coupon", getCoupon(httpRequest, new CouponGetRequest()).size());
    return mv;
  }

  @PostMapping(value = "/history")
  public Object history(@RequestBody PageOrderRequest request,
                         HttpServletRequest httpRequest) {
    logger.info("\n GET HISTORY: {}", JsonUtil.toJson(request));
    request.setSize(20);
    request.setPackageId(DEFAULT_PACKAGE_ID);
    request.setShopName((String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME));
    return getOrderHistory(httpRequest, request);
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
  public ModelAndView print(@RequestParam(value = "type") int type,
                            @RequestBody List<Order> orders,
                            HttpServletRequest httpRequest) {
    if(CollectionUtils.isEmpty(orders)) return null;

    updateOriginShop(orders, httpRequest);
    ModelAndView mv = new ModelAndView("order.print");
    mv.addObject("title","Xe Nhàn - In");
    mv.addObject("orders",orders);
    mv.addObject("type", type);
    return mv;
  }

  /* CREATE Order */
  @GetMapping(value = "/tao-don")
  public ModelAndView create(@RequestParam(value = "type") Integer type,
                             @RequestParam(value = "order-id", required = false) Long orderId,
                             @RequestParam(value = "coupon", required = false) String coupon,
                             HttpServletRequest httpRequest) {
    Shop shop = getShopInfo(httpRequest);

    ModelAndView mv = new ModelAndView("order.create");
    mv.addObject("title","Xe Nhàn - " + OrderStatus.toAction(type));
    mv.addObject("shop", shop);
    mv.addObject("type", type);
    mv.addObject("coupon", StringUtils.isEmpty(coupon) ? "" : coupon.trim());
    mv.addObject("action", OrderStatus.toAction(type));

    if(orderId != null){
      OrderEntity order = getOrder(httpRequest, orderId);
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
    logger.info("\n===> CREATE ORDER : {}\n", JsonUtil.toJson(orderRequest));

    orderRequest.setPackageId(DEFAULT_PACKAGE_ID);
    String url = apiExchangeService.createUrlWithToken(httpRequest, "order", "create-order");
    return apiExchangeService.post(httpRequest, url, orderRequest);
  }

  @GetMapping(value = "/cancel")
  public RepositoryResponse<?> calcel (@RequestParam(name="order-id", required = true) long orderId,
                                       @RequestParam(name="message", required = false) String message,
                                       HttpServletRequest httpRequest) {

    if(StringUtils.isEmpty(message)) message = "";
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

  @GetMapping(value = "/export")
  public void export(@RequestParam(value = "fromDate") String fromDate,
                     @RequestParam(value = "toDate") String toDate,
                     @RequestParam(value = "keyword") String keyword,
                     @RequestParam(value = "status") String status,
                     @RequestParam(value = "typeOfView") int typeOfView,
                      HttpServletRequest httpRequest,
                      HttpServletResponse httpResponse) throws Exception {
    PageOrderRequest request = new PageOrderRequest();
    request.setFromDate(fromDate);
    request.setToDate(toDate);
    request.setKeyword(keyword);
    request.setStatus(StringUtils.isEmpty(status)? 0: Integer.valueOf(status));
    request.setTypeOfView(typeOfView);
    request.setSize(100);
    request.setIndex(1);
    request.setPackageId(DEFAULT_PACKAGE_ID);
    request.setShopName((String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME));

    String fileName = "lich-su-don-hang";
    fileName += "_tu_" + request.getFromDate();
    fileName += "_den_" + request.getToDate();
    String headerKey = "Content-Disposition";
    String headerValue = "attachment; filename=\"" + fileName + ".xls" +"\"";
    httpResponse.setContentType("application/vnd.ms-excel");
    httpResponse.setHeader(headerKey, headerValue);

    List<OrderEntity> orders = getOrder2Export(httpRequest, request);
    orderExcelExport.export(httpRequest, httpResponse, orders);
    httpResponse.getOutputStream().flush();
  }

  private List<OrderEntity> getOrder2Export(HttpServletRequest httpRequest, PageOrderRequest request){
    int pageNumber = 1;
    int totalPage = 1;
    List<OrderEntity> orders = new LinkedList<>();
    do {
      request.setIndex(pageNumber);
      Page<OrderEntity> page = getOrderHistory(httpRequest, request);
      orders.addAll(page.getPageItems());

      totalPage = page.getPagesAvailable();
    }while (++pageNumber <= totalPage );
    return orders;
  }
  private void updateOriginShop(List<Order> orders, HttpServletRequest httpRequest){
    Shop shop = getShopInfo(httpRequest);
    orders.forEach(order -> order.setShop(shop));
  }

  private Page<OrderEntity> getOrderHistory(HttpServletRequest httpRequest, PageOrderRequest request){
    String url = apiExchangeService.createUrlWithToken(httpRequest,"shop",  "list-orders");
    TypeReference<RepositoryResponse<Page<OrderEntity>>> reference = new TypeReference<RepositoryResponse<Page<OrderEntity>>>() {};
    ResponseEntity<RepositoryResponse<Page<OrderEntity>>> ordersResponse =  apiExchangeService.post(httpRequest, url, request, reference);
    return ordersResponse.getBody().getData();
  }

  @GetMapping(value = "/history")
  public RepositoryResponse<?> getHistory (@RequestParam(name="order-id", required = true) long orderId,
                                          @RequestParam(name="action", required = true) String action,
                                       HttpServletRequest httpRequest) {

    String url = apiExchangeService.createUrlWithToken(httpRequest,"order", "get-order-history");
    url += "&order-id="+ orderId + "&action=" + action;
    return apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<OrderHistory>>(){});
  }

}
