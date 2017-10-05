var ErrorCode = {
		UNKNOWN: "00",
		SUCCESS:"1",
		NOT_MATCH:"07",
		NOT_MATCH_OLD_PIN:"04",
		EXISTED_PAYD_ACCOUNT:"17",
		EXISTED_ACCOUNT_NOT_IN_PAYD:"18",
		INVALID_CAPTCHA:"19",
		FORBIDDEN : "403"
}

var Error_message = {
		EMPTY_INPUT : "Xin vui lòng nhập đầy đủ thông tin",
		EMPTY_AMOUNT : "Xin vui lòng nhập số tiền",
		EMPTY_OTP: "Vui lòng nhập mã xác thực",
		EMPTY_ADDRESS: "Vui lòng nhập địa chỉ",
		NOT_MATCH_OTP: "Mã xác thực không đúng! Xin vui lòng nhập lại",
		NOT_MATCH_OLD_PASSWORD: "Mật khẩu cũ không đúng",
		NOT_MATCH_OLD_PIN: "PIN cũ không đúng",
		EMPTY_PHONE_CONFIRM: "Vui lòng nhập số điện thoại",
		EMPTY_PHONE: "Vui lòng nhập số điện thoại nhận",
		EMPTY_ACCOUNT_GAME: "Vui lòng nhập tài khoản game nhận",
		PHONE_INVALID_FORMAT: "Số điện thoại không đúng định dạng. Xin vui lòng nhập lại",
		QUANTITY_INVALID: "Số lượng không hợp lệ! Xin vui lòng nhập lại",
		DENOMINATION_INVALID: "Xin vui lòng chọn mệnh giá",
		BALANCE_INVALID: "Số dư không đủ để thực hiện giao dịch",
		UNKNOW_ERROR : "Có lỗi xảy ra ! Xin vui lòng thử lại hoặc liên hệ hỗ trợ",
		CONNECT_FAIL: "Kết nối máy chủ thất bại! Xin thử lại",
		MAX_SEND_OTP: "Bạn đã xác nhận OTP sai quá số lần cho phép, vui lòng thực hiện lại giao dịch",
		FORBIDDEN: "Hệ thống đang thực hiện đối soát cuối ngày. Xin quý khách vui lòng quay lại sau ít phút",
		CHANGE_PASSWORD_SUCCESS: "Thay đổi mật khẩu đăng nhập thành công",
		CHANGE_PIN_SUCCESS: "Cài đặt mật khẩu giao dịch thành công",
		INVALID_FORMAT_PIN: "Mã PIN hợp lệ gồm 6 kí tự số",
		CONFIRM_PIN_NOT_MATCH: "Nhập lại PIN không đúng"
}