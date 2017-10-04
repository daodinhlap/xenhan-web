var form = new FormRegister();
var noti = new Notify();
var onlyRegisterAccount = false;
var countDownOTP = 0;
// URL
var url_login = BASE_URL + "/login";
var url_register = BASE_URL + "/tao-tai-khoan-nguoi-dung";
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
	
	alert(JSON.stringify(form.requestRegister()));

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
		url : '/login',
		data : 'username='+ phone + '&password=' + pass,
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

function validate(name, phone, password, confirmPass, gRecaptchaResponse) {
	if (!phone && !password && !name && !confirmPass) {
		error.push({message: Error_message.EMPTY_INPUT, id: "alert"});
		return error;
	}
	if (name.length < 6 || name.length > 50) {
		error.push({message:"Họ tên hợp lệ có độ dài từ 6 đến 50 ký tự", id: "name"});
	}
	if (!phone) {
		error.push({message:"Xin vui lòng nhập số điện thoại", id: "phone"});
	}
	if (!validatePhone(phone) && phone) {
		error.push({message:"Số điện thoại không đúng định dạng", id: "phone"});
	}
	if (password.length < 6 || password.length > 30) {
		error.push({message:"Mật khẩu hợp lệ có độ dài từ 6 - 30 ký tự", id: "password"});
	}
	if (confirmPass.length < 6 || confirmPass.length > 30) {
		error.push({message:"Mật khẩu hợp lệ có độ dài từ 6 - 30 ký tự", id: "confirmPassword"});
	}
	if (strcmp(password, confirmPass) != 0 && confirmPass.length >= 6) {
		error.push({message:"Mật khẩu không đúng. Nhập lại mật khẩu", id: "confirmPassword"});
	}
	//if(!gRecaptchaResponse){
	//	error.push({message:"Xin vui lòng xác thực!", id: "g-recaptcha-response"});
	//}
	return error;
}

function FormRegister() {
	this.name = function() {return $('#name').val()};
	this.phone = function() { return $('#phone').val().trim() };
	this.gender = function() { return $('#gender').val() };
	this.password = function() {return $('#password').val()};
	this.confirmPass = function() {return $('#confirmPassword').val()};
	this.gRecaptchaResponse = function() {return $('#g-recaptcha-response').val()};
	this.otp = function() {return $('#otp').val()};
	
	this.setPhone = function(value){$('#phone').val(value)};
	this.setPass = function(value){$('#password').val(value)};
	
	this.requestRegister = function() {
		return {
			username : this.phone(),
			phone : this.phone(),
			gender : this.gender(),
			name : this.name(),
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
		return validate(this.name(), this.phone(), this.password(), this.confirmPass(), this.gRecaptchaResponse());
	}
}
// ON LOAD
$(document).ready(function() {
	$('#phone').keypress(function(event) {
		if (event.keyCode == 13 || event.which == 13) {
			$('#password').focus();
		}
	});
	$('#password').keypress(function(event) {
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