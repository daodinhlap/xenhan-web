package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.common.model.Page;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.user.model.OrderEntity;
import com.homedirect.xenhan.user.model.request.PageOrderRequest;
import com.homedirect.xenhan.util.JsonUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

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
        // fix
        request.setSize(20);
        request.setPackageId(DEFAULT_PACKAGE_ID);
        request.setShopName((String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME));
        /*fix*/

        String url = apiExchangeService.createUrlWithToken(httpRequest,"shop", "list-orders");

        TypeReference<RepositoryResponse<Page<OrderEntity>>> reference = new TypeReference<RepositoryResponse<Page<OrderEntity>>>() {};
        ResponseEntity<RepositoryResponse<Page<OrderEntity>>> ordersResponse =  apiExchangeService.post(httpRequest, url, request, reference);
        return ordersResponse.getBody().getData();
    }
}
