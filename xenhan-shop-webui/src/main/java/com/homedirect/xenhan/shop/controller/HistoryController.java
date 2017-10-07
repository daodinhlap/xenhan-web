package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.common.model.Page;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.Order;
import com.homedirect.xenhan.user.model.OrderEntity;
import com.homedirect.xenhan.user.model.request.PageOrderRequest;
import com.homedirect.xenhan.util.JsonUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * author: hieunv - hieu.nguyen2@homedirect.com.vn
 * on:    10/5/17
 */
@RestController
@RequestMapping("/shop")
public class HistoryController extends AbstractController{

    @GetMapping(value = "/lich-su")
    public ModelAndView historyView() {
        ModelAndView mv = new ModelAndView("shop.history");
        mv.addObject("title","Xe Nhàn - Lịch sử đơn hàng");
        return mv;
    }

    @PostMapping(value = "/history")
    public Object history (@RequestBody PageOrderRequest request,
                                   HttpServletRequest httpRequest) {
        logger.info("\n GET HISTORY: {}", JsonUtil.toJson(request));
        request.setSize(20);
        request.setPackageId(DEFAULT_PACKAGE_ID);
        request.setShopName((String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME));

        String url = apiExchangeService.createUrlWithToken(httpRequest,"shop", "list-orders");
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

        String url = apiExchangeService.createUrlWithToken(httpRequest,"shop", "get-total-order");

        ResponseEntity<RepositoryResponse<Object>> ordersResponse =  apiExchangeService.post(httpRequest, url, request);
        return ordersResponse.getBody().getData();
    }

    @PostMapping(value = "/print")
    public ModelAndView print(@RequestBody List<Order> orders) {
        if(CollectionUtils.isEmpty(orders)) return null;

        ModelAndView mv = new ModelAndView("shop.print");
        mv.addObject("title","Xe Nhàn - In");
        mv.addObject("orders",orders);
        return mv;
    }


}
