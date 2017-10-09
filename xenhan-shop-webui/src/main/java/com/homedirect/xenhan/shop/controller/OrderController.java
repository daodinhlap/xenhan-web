package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.user.model.response.JobHistoryEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/order")
public class OrderController extends AbstractController{

    @GetMapping(value = "/cancel")
    public RepositoryResponse<?> history (@RequestParam(name="order-id", required = true) long orderId,
                           @RequestParam(name="message", required = false) String message,
                           HttpServletRequest httpRequest) {

        String url = apiExchangeService.createUrlWithToken(httpRequest,"order", "cancel-order");
        url += "&order-id="+ orderId + "&message=" + message;
        return apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<JobHistoryEntity>>(){});
    }

}
