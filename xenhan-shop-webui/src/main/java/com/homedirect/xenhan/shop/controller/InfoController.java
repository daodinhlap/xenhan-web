package com.homedirect.xenhan.shop.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * author: hieunv - hieu.nguyen2@homedirect.com.vn
 * on:    10/4/17
 */
@RestController
@RequestMapping("/")
public class InfoController extends AbstractController {
    private final static Logger logger = LoggerFactory.getLogger(InfoController.class);

    @GetMapping(value = "/get-fee")
    public Object getFee(@RequestParam(value = "provinceId", required = true) Integer provinceId,
                               @RequestParam(value = "districtId", required = true) Integer districtId,
                               @RequestParam(value = "packageId", required = false) Integer packageId) {

        return 10;
    }
}
