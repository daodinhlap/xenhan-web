package com.homedirect.xenhan.transform;

import com.homedirect.common.model.Page;
import com.homedirect.xenhan.model.web.response.OrderResponse;
import com.homedirect.xenhan.user.model.OrderEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
public class OrderTransform {
//    public Page<OrderResponse> to (Page<OrderEntity> page){
//        Page<OrderResponse> result = new Page();
//        result.setPageNumber(page.getPageNumber());
//        result.setPagesAvailable(page.getPagesAvailable());
//        result.setTotalItems(page.getTotalItems());
//        result.setTime(page.getTime());
//        page.getPageItems().stream().map(orderEntity -> {
//
//            return orderEntity;
//        }).collect(Collectors.toList());
//
//        return result;
//    }
}
