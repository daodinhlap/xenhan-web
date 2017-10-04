var form = new FormRegister();
var noti = new Notify();
var onlyRegisterAccount = false;
var countDownOTP = 0;
// URL
var url_login = BASE_URL + "/login";
var url_register = BASE_URL + "/dang-ky";
var url_resendOtp = BASE_URL + "/gui-lai-otp";
var url_confirmOtp = BASE_URL + "/confirm-otp";
//===================================================================================
// Register xenhan user
function registerXenhan() {
	var hasError = form.validate();
	if(hasError ==  undefined || hasError.length != 0){
		noti.error(error);
		return;
	}

	$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : url_register,
			data : JSON.stringify(form.requestRegister()),
			dataType : 'text'
		}).done(function(data) {
			if (!data) {// I/O fail
				error.push({message: Error_message.CONNECT_FAIL, id: "alert"});
				noti.error(error);
				setTimeout(() => { reload() }, 3000);
				return;
			}
		}).fail(function(data) {
			console.log(data);
			noti.fail("Thông báo!","Đăng ký không thành công. Vui lòng thử lại sau",function() {reload()});
		});
}


// Login Xenhan
function loginXenhan() {
	var phone = form.phone();
	var pass = form.password();
	if (isEmpty(phone) || isEmpty(pass)) {
		error.push({message: Error_message.EMPTY_INPUT, id: "alert"});
		noti.error(error);
		return;
	}
	if (!validatePhone(phone.trim().replace(/ /g,""))) {
		error.push({message: "Vui lòng nhập lại số điện thoại của bạn", id: "alert"});
		noti.error(error);
		return;
	}
	$.ajax({
		type : 'POST',
		url : url_login,
		data : form.requestLogin(),
	}).done(function(data) {
		window.location.href = '/';
	}).fail(function(data) {
		window.location.href = '/';
	});
}

function cancleRegister(){
	noti.confirm("<strong>Bạn muốn hủy việc đăng ký ?</strong>",
		function(result) {
			if (result) { goHome(); };
		});
}

function validate(fullName, phone, password, confirmPass, gRecaptchaResponse) {
	if (!phone && !password && !fullName && !confirmPass) {
		error.push({message: Error_message.EMPTY_INPUT, id: "alert"});
		return error;
	}
	if (fullName.length < 6 || fullName.length > 50) {
		error.push({message:"Họ tên hợp lệ có độ dài từ 6 đến 50 ký tự", id: "fullName"});
	}
	if (!phone) {
		error.push({message:"Xin vui lòng nhập số điện thoại", id: "phone"});
	}
	if (!validatePhone(phone) && phone) {
		error.push({message:"Số điện thoại không đúng định dạng", id: "phone"});
	}
	if (password.length < 6 || password.length > 30) {
		error.push({message:"Mật khẩu hợp lệ có độ dài từ 6 - 30 ký tự", id: "pass"});
	}
	if (confirmPass.length < 6 || confirmPass.length > 30) {
		error.push({message:"Mật khẩu hợp lệ có độ dài từ 6 - 30 ký tự", id: "confirmPass"});
	}
	if (strcmp(password, confirmPass) != 0 && confirmPass.length >= 6) {
		error.push({message:"Mật khẩu không đúng. Nhập lại mật khẩu", id: "confirmPass"});
	}
	if(!gRecaptchaResponse){
		error.push({message:"Xin vui lòng xác thực!", id: "g-recaptcha-response"});
	}
	return error;
}

function FormRegister() {
	this.fullName = function() {return $('#fullName').val()};
	this.phone = function() {return $('#phone').val().trim()};
	this.password = function() {return $('#pass').val()};
	this.confirmPass = function() {return $('#confirmPass').val()};
	this.gRecaptchaResponse = function() {return $('#g-recaptcha-response').val()};
	this.otp = function() {return $('#otp').val()};
	
	this.setOtp = function(otp){$('#otp').val(otp)};
	this.setPhone = function(value){$('#phone').val(value)};
	this.setPass = function(value){$('#pass').val(value)};
	
	this.requestRegister = function() {
		return {
			userName : this.phone(),
			fullName : this.fullName(),
			password : this.password(),
			gRecaptchaResponse : this.gRecaptchaResponse()
		}
	}
	this.requestLogin = function() {
		return {
			username : this.phone(),
			password : md5(this.password())
		}
	}
	this.validate = function() {
		return validate(this.fullName(), this.phone(), this.password(), this.confirmPass(), this.gRecaptchaResponse());
	}
}
// ON LOAD
$(document).ready(function() {
	$('#phone').keypress(function(event) {
		if (event.keyCode == 13 || event.which == 13) {
			$('#pass').focus();
		}
	});
	$('#pass').keypress(function(event) {
		if (event.keyCode == 13 || event.which == 13) {
			loginXenhan();
		}
	});
	form.setPhone("");
	form.setPass("");
	
	//forgot pass
	$("#forgotPassword").click(function(){
		noti.fail("Thông báo","Xin vui lòng liên hệ tổng đài 028 71099710 để được hỗ trợ", function(){});
	});
});