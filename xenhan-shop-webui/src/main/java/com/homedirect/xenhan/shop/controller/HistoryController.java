package com.homedirect.xenhan.shop.controller;

import com.homedirect.common.model.Page;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.user.model.OrderEntity;
import com.homedirect.xenhan.user.model.request.PageOrderRequest;
import com.homedirect.xenhan.util.JsonUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    public ModelAndView createShop(HttpServletRequest httpRequest) {
        // fix
        PageOrderRequest request = new PageOrderRequest();
        request.setFromDate("2017-10-01 00:00:00");
        request.setToDate("2017-10-05 23:59:59");
        request.setIndex(1);
        request.setKeyword("");
        request.setPackageId(DEFAULT_PACKAGE_ID);
        request.setShopName((String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME));
        request.setStatus(0);
        request.setTypeOfView(0);
        /*fix*/

        String url = apiExchangeService.createUrlWithToken(httpRequest,"shop", "list-orders");

        ResponseEntity<RepositoryResponse<Page<OrderEntity>>> ordersResponse =  apiExchangeService.post(httpRequest, url, request);
        logger.info("\nGet order history: {}", JsonUtil.toJson( ordersResponse.getBody().getData()));

        ModelAndView mv = new ModelAndView("shop.history");
        mv.addObject("title","Xe Nhàn - Lịch sử đơn hàng");
        mv.addObject("orders",ordersResponse.getBody().getData().getPageItems());
        return mv;
    }
}
