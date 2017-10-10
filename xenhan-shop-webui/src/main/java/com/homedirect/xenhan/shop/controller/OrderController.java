package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.user.model.request.OrderRequest;
import com.homedirect.xenhan.user.model.response.JobHistoryEntity;
import com.homedirect.xenhan.util.JsonUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/order")
public class OrderController extends AbstractController{

    @PostMapping(value = "/create-order")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest, HttpServletRequest httpRequest) {
        logger.info("\n CREATE ORDER: {}\n", JsonUtil.toJson(orderRequest));

        orderRequest.setPackageId(DEFAULT_PACKAGE_ID);
        String url = apiExchangeService.createUrlWithToken(httpRequest, "order", "create-order");
        return apiExchangeService.post(httpRequest, url ,orderRequest);
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
