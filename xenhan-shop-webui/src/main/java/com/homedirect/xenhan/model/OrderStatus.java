package com.homedirect.xenhan.model;

public class OrderStatus {
  public static final int NEW = 0;
  public static final String NEW_DES = "Tạo đơn giao hàng";
  public static final String NEW_DES_PICKUP = "Tạo đơn lấy hàng";
  public static final int EDIT = 1;
  public static final String EDIT_DES = "Sửa đơn giao hàng";
  public static final String EDIT_DES_PICKUP = "Sửa đơn lấy hàng";
  public static final int RE_CREATE = 2;
  public static final String RE_CREATE_DES = "Đăng lại đơn giao hàng";
  public static final String RE_CREATE_DES_PICKUP = "Đăng lại đơn lấy hàng";

  public static String toAction(int type) {
    switch (type) {
      case EDIT:
        return EDIT_DES;
      case RE_CREATE:
        return RE_CREATE_DES;
      default:
        return NEW_DES;
    }
  }

  public static String toActionPickup(int type) {
    switch (type) {
      case EDIT:
        return EDIT_DES_PICKUP;
      case RE_CREATE:
        return RE_CREATE_DES_PICKUP;
      default:
        return NEW_DES_PICKUP;
    }
  }
}
