/***************************************************************************
 * Copyright 2016 - 2017 by HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.web.util;

import com.homedirect.xenhan.model.Job;
import com.homedirect.xenhan.model.Order;

import java.util.Arrays;
import java.util.List;

/**
 *  Author : Do Van Khoi
 *  Email: khoi.do@homedirect.com.vn
 *  Feb 9, 2017
 */
public class OrderConfig {

  // 0 - Tim ship
  public static final int STATUS_000 = 0;

  // 1xx - gom hàng
  public static final int PREFIX_PICKUP = 1;
  public static final int STATUS_100 = 100; // gom hàng (giao trực tiếp)
  public static final int STATUS_101 = 101; // gom hàng (về HUB)
  public static final int STATUS_102 = 102; // Dispatched all members
  public static final int STATUS_103 = 103; // Dispatched to leader

  // 2xx - Đang giao hàng
  public static final int PREFIX_DELIVER = 2;

  public static final int STATUS_200 = 200; // Đã giao hàng
  public static final int STATUS_201 = 201; // Về kho 
  public static final int STATUS_202 = 202; // Lưu kho
  public static final int STATUS_211 = 211; // Giao hàng (Lần 1)

  public static final int PREFIX_DROPOFF = 200;

  // undefine
  public static final int STATUS_300 = 300;

  // 4xx Trả lại hàng
  public static final int PREFIX_RETURN = 4;
  public static final int STATUS_400 = 400;
  public static final int STATUS_401 = 401;
  public static final int STATUS_402 = 402;
  public static final int STATUS_411 = 411;

  // 5xx - Huỷ
  //  public static final int PREFIX_HUYHANG = 5;
  public static final int PREFIX_CANCEL = 5;
  public static final int STATUS_500 = 500;
  public static final int STATUS_501 = 501;
  public static final int STATUS_502 = 502;

  // undefine
  public static final int STATUS_600 = 600;
  public static final int STATUS_1000 = 1000;

  public static String getOrderStatusDetailString(int status) {
    if (status < 100) return "Tìm Ship";
    if(status >= 100 && status < 200)
      return "Chờ lấy hàng";
    if(status > 200 && status < 400){
      if(status == 201)
        return "Giao hàng - Đang về kho";
      if(status % 2 == 0)
        return "Giao hàng - Lưu kho";
      if(status % 2 != 0)
        return "Giao hàng - Đang giao";
    }
    if(status == 200)
      return "Đã giao hàng";
    if(status == 400)
      return "Đã trả lại";
    if(status > 400 && status < 500){
      if(status == 401)
        return "Trả lại hàng - Đang về kho";
      if(status % 2 == 0)
        return "Trả lại hàng - Lưu kho";
      if(status % 2 != 0)
        return "Trả lại hàng - Đang trả lại";
    }
    if(status == 500)
      return "Đã hủy";
    if(status > 500 && status < 600){
      if(status == 501)
        return "Hủy - Đang về kho";
      if(status % 2 == 0)
        return "Hủy - Lưu kho";
      if(status % 2 != 0)
        return "Hủy - Đang trả lại";
    }
    return "";
  }


}

