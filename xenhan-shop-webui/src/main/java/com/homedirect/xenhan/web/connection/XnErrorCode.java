package com.homedirect.xenhan.web.connection;
/**
 *  Author : Do Van Khoi
 *  Email: khoi.do@homedirect.com.vn
 *  Jan 12, 2017
 */
public class XnErrorCode {

  // Common Error -1 => 99
  public static final int UNSUPPORT_OPERATIONS = -2;
  public static final String UNSUPPORT_OPERATIONS_MESSAGE = "Chức năng chưa hỗ trợ";
  
  public static final int UNKNOWN_ERROR = -1;
  public static final String UNKNOWN_ERROR_MESSAGE = "Lỗi chưa xác định";
  
  public static final int SUCCESS = 1;
  public static final String SUCCESS_MESSAGE = "OK";
  public static final int FAILURE = 0;
  
  public static final int CANNOT_GENERATE_ID = 19;
  public static final int INVALID_REQUEST = 20;
  
  public static final int DUPLICATED_ENTITY = 10;
  
  public static final int CANNOT_INSERT = 21;
  public static final int CANNOT_UPDATE = 22;
  public static final int CANNOT_DELETE = 23;
  public static final int NOT_FOUND_ENTITY = 24;
  
  public static final int INVALID_PHONE_FORMAT = 25;
  public static final int INVALID_EMAIL_FORMAT = 26;
  public static final int PHONE_NOT_EXIST = 27;
  
  public static final int INVALID_SHIPPER = 28;
  public static final int UR_UNSUCCESSFULL = 29;
  
  public static final int UR_NOT_FOUND_ENTITY = 31;
  public static final int UR_NOT_FOUND_PRIMARY_ENTITY = 32;
  public static final int UR_NOT_FOUND_PARENT_ENTITY = 33;
  public static final int UR_DUPLICATED_ENTITY = 34;
  
  
  public static final int COULD_NOT_FIND_PROVINCE = 35;
  public static final int COULD_NOT_FIND_DISTRICT = 36;
  public static final int COULD_NOT_FIND_AREA = 37;
  
  public static final int UR_GROUP_EXIST = 38;
  public static final int UR_USER_NAME_NOT_EXIST = 39;
  public static final int CAN_NOT_UPDATE_MEMBERSHIP = 40;
  public static final int CAN_NOT_SEND_SMS = 41;
  
  public static final int CANNOT_SAVE_FILE = 42;
  
  public static final int INVALID_ADDRESS = 43;
  public static final String INVALID_ADDRESS_MESSAGE = "Tên tỉnh/thành phố hoặc quận/huyện chưa chính xác";
  
  public static final int NOT_SUPPORT_ADDRESS = 44;
  public static final String NOT_SUPPORT_ADDRESS_MESSAGE = "Tên tỉnh/thành phố hoặc quận/huyện chưa được hỗ trợ";
  
  // Fee Error 100 => 149
  public static final int FEE_DUPLICATE_STATUS = 101;
  public static final int FEE_NULL = 102;
  public static final int FEE_CHANGE_STATUS_FAIL = 103;
  
  public static final int CANNOT_GET_POLICY = 104;
  public static final String CANNOT_GET_POLICY_MESSAGE = "Không tìm thấy chính sách phí";

  public static final int CANNOT_GET_FARE = 105;
  public static final String CANNOT_GET_FARE_MESSAGE = "Không thể tính phí";
  
  // Area Error 150 => 199
  public static final int AREA_NAME_IS_EXISTED = 150;
  public static final int DISTRICT_NAME_IS_EXISTED = 151;
  public static final int CANNOT_UPDATE_AREA_NAME = 152;
  public static final int INVALID_STATUS = 153;
  public static final int INVALID_PAGE_SIZE = 154;
  public static final int INVALID_PAGE_NUMBER = 155;
  
  
  // User Error 200 => 249
  public static final int INCORRECT_CONFIRM_OF_PASSWORD = 201;
  public static final int CANNOT_GET_USER = 202;
  public static final int USERNAME_IS_NOT_EXITS = 203;
  
  // Team Error 250 => 299
  public static final int EXISTED_TEAM = 250; 
  public static final int CANNOT_GET_LEADER = 251;
  public static final int CANNOT_GET_TEAM_MEMBER = 252;
  
  // Coupon Error  300 => 319
  public static final int COUPON_IS_LOCK = 300;
  public static final String COUPON_IS_LOCK_MESSAGE = "Mã khuyến mại đang tạm khóa";
  
  public static final int COUPON_IS_PENDING = 301;
  public static final String COUPON_IS_PENDING_MESSAGE = "Mã khuyến mại đang tạm dừng";
  
  public static final int COUPON_IS_UESED = 302;
  public static final String COUPON_IS_UESED_MESSAGE = "Mã khuyến mại đã được sử dụng";
  
  public static final int CANNOT_CHECK_COUPON = 303;
  public static final String CANNOT_CHECK_COUPON_MESSAGE = "Không kiểm tra được mã khuyến mại";
  
  public static final int CANNOT_USE_COUPON = 304;
  public static final String CANNOT_USE_COUPON_MESSAGE = "Không sử dụng được mã khuyến mại";
  
  //Shop Error  350 => 369
  public static final int CANNOT_GET_SHOP_INFO = 350;
  public static final String CANNOT_GET_SHOP_INFO_MESSAGE = "Lỗi lấy thông tin của shop";
  
  public static final String INVALID_ORDER_SHOP_MESSAGE = "Đơn hàng không phải của shop";
  
  public static final int EXISTS_PERIOD_SHOP = 351;
  public static final String EXISTS_PERIOD_SHOP_MESSAGE = "Chu kỳ thanh toán cho shop đã tồn tại";
  
  // Authen error
  public static final int PERMISSTION_DENIED = 403;
  
  // Job error
  
  
  public XnErrorCode() {
    super();
  }
  
  public static int getErrorCodeFromUR(String code) {
    switch (code) {
    case "01":
      return SUCCESS;
    case "02":
      return NOT_FOUND_ENTITY;
    case "10":
      return DUPLICATED_ENTITY;
    default:
      return UNKNOWN_ERROR;
    }
  }  
}