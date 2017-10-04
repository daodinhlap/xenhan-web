var form = new Form();
var noti = new Notify();
// URL
var url_confirmOtp = BASE_URL + "/confirm-otp";

function confirmOTP() {
	var hasError = form.validate();
	if(hasError ==  undefined || hasError.length != 0){
		noti.error(error);
		return;
	}
	
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_confirmOtp,
		data : JSON.stringify(form.request())
	}).done(function(data) {
		console.log(JSON.stringify(data));
		if (!data){
			error.push({message: Error_message.CONNECT_FAIL, id: "alert"});
			noti.error(error);
			setTimeout(() => { reload(); }, 3000);
			return;
		}
		if (data.code == ErrorCode.NOT_MATCH){
			error.push({message: Error_message.NOT_MATCH_OTP, id: "otp"});
			noti.error(error);
			form.setOtp("");
			return;
		}
		if (data.code != ErrorCode.SUCCESS) {
			error.push({message: data.message, id: "alert"});
			noti.error(error);
			return;
		}
		// OK
		var message = " SĐT: <strong>" + form.phone() + "</strong> và mật khẩu này (là tài khoản HomeDirect)" +
				" được dùng chung cho tất cả các dịch vụ mà HomeDirect cung cấp";
		noti.ok("Đăng ký Ví thành công", message, function() { goHome() });
		
	}).fail(function(data) {
		error.push({message: "Xác nhận đăng ký thất bại! Xin vui lòng thử lại", id: "alert"});
		noti.error(error);
		setTimeout(() => { reload(); }, 3000);
	}).always(function() {
	});
}


function validate(phone, otp) {
	if (!phone && !otp) {
		error.push({message: Error_message.EMPTY_INPUT, id: "alert"});
		return error;
	}
	if (!phone) {
		error.push({message: Error_message.EMPTY_PHONE_CONFIRM, id: "phone"});
	}
	if (!otp) {
		error.push({message: Error_message.EMPTY_OTP, id: "otp"});
	}
	return error;
}

function Form() {
	this.phone = function() {return $('#phone').val().trim()};
	this.otp = function() {return $('#otp').val()};
	
	this.setOtp = function(otp){$('#otp').val(otp)};
	this.setPhone = function(value){$('#phone').val(value)};
	
	this.request= function() {
		return {
			phone : this.phone(),
			otp : this.otp()
		}
	}
	this.validate = function() {
		return validate(this.phone(), this.otp());
	}
}
$(document).ready(function() {
	var ENTER_CODE = 13;
	$('#phone').keypress(function(event) {
		if (event.keyCode == ENTER_CODE || event.which == ENTER_CODE) {
			$('#otp').focus();
		}
	});
	$('#pass').keypress(function(event) {
		if (event.keyCode == ENTER_CODE || event.which == ENTER_CODE) {
			confirmOTP();
		}
	});
	form.setPhone("");
	form.setOtp("");
});