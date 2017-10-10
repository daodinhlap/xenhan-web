package com.homedirect.xenhan.model;

public class OrderStatus {
    public static final int NEW = 0;
    public static final String NEW_DES = "Tạo đơn hàng";
    public static final int EDIT = 1;
    public static final String EDIT_DES = "Sửa đơn hàng";
    public static final int RE_CREATE = 2;
    public static final String RE_CREATE_DES= "Đăng lại đơn hàng";

    public static String toAction(int type){
        switch (type){
            case EDIT: return EDIT_DES;
            case RE_CREATE: return RE_CREATE_DES;
            default: return NEW_DES;
        }
    }
}
