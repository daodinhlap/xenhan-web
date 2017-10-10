package com.homedirect.xenhan.shop.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.common.util.StringUtils;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.voucher.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;

/**
 * author: hieunv - hieu.nguyen2@homedirect.com.vn
 * on:    10/4/17
 */
@RestController
@RequestMapping("/")
public class DataController extends AbstractController {
  
    private final static Logger logger = LoggerFactory.getLogger(DataController.class);

    @GetMapping(value = "/get-fee")
    public Double getFee(@RequestParam(value = "provinceId", required = true) String provinceId,
                         @RequestParam(value = "districtId", required = true) String districtId,
                         @RequestParam(value = "packageId", required = false) Integer packageId,
                         HttpServletRequest httpRequest) {
        logger.info("\n GET FEE provinceId:{} - districtId:{}\n",provinceId, districtId);

        URI uri = apiExchangeService.createEncodeUrlWithToken(httpRequest, "common", "calculate-fee");
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUri(uri);
        uriBuilder.queryParam("shop-name",httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME));
        uriBuilder.queryParam("province-id",provinceId);
        uriBuilder.queryParam("district-id",districtId);
        uriBuilder.queryParam("package-id", packageId != null? packageId: DEFAULT_PACKAGE_ID);

        return apiExchangeService.getPure(httpRequest, uriBuilder.build().toString(), new TypeReference<Double>(){});
    }

    @GetMapping(value = "/check-coupon")
    public RepositoryResponse<?> getFee(@RequestParam(value = "coupon", required = true) String coupon,
                                        HttpServletRequest httpRequest) {
        logger.info("\n CHECK COUPON:{}\n",coupon);
        if(StringUtils.isEmpty(coupon)) return null;

        URI uri = apiExchangeService.createEncodeUrlWithToken(httpRequest, "coupon", "check-coupon-info");
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUri(uri);
        uriBuilder.queryParam("code", coupon);
        return apiExchangeService.get(httpRequest, uriBuilder.build().toString(),
                                        new TypeReference<RepositoryResponse<Response>>(){});
    }

}
