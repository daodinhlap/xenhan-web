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
// Register Payd user
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
			showPopupConfirm(); // OK
		}).fail(function(data) {
			console.log(data);
			var responseText = data.responseText;
			if (responseText == ErrorCode.EXISTED_PAYD_ACCOUNT) {
				noti.fail("Thông báo!", "Bạn đã có ví. Vui lòng đăng nhập bằng tài khoản HomeDirect để sử dụng",function() {goHome()});
				return;
			}
			if (responseText == ErrorCode.INVALID_CAPTCHA) {
				error.push({message: "Mã bảo mật không hợp lệ", id: "alert"});
				noti.error(error);
				setTimeout(() => { reload() }, 3000);
				return;
			}
			if (responseText == ErrorCode.EXISTED_ACCOUNT_NOT_IN_PAYD) {
				noti.confirm("Bạn đã có tài khoản HomeDirect, bạn có muốn kích hoạt Ví với tài khoản HomeDirect đã có không?",
						function(result) {
							if (result) {registerXenhanAccount()}; return;
							goHome();
						});
				return;
			}
			noti.fail("Thông báo!","Đăng ký ví không thành công. Vui lòng thử lại sau",function() {reload()});
		});
}
// register xenhan Account
function registerXenhanAccount() {
	onlyRegisterAccount = true;
	var request = {
		userName : form.phone()
	};
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_register,
		data : JSON.stringify(request),
		dataType : 'text'
	}).done(function(data) {
		if (!data) {// I/O fail
			error.push({message: Error_message.CONNECT_FAIL, id: "alert"});
			noti.error(error);
			setTimeout(() => { reload() }, 3000);
			return;
		}
		showPopupConfirm(); // OK
	}).fail(function(data) {
		console.log(data);
		noti.fail("Thông báo", "Đăng ký ví không thành công. Vui lòng thử lại sau", function() {reload()});
	});
}
function showPopupConfirm(){
	$("#phoneRegister").text(form.phone());
	
	$('#confirm-otp').show();
	$('#form-register').hide();
	
	countDownTimeResend();// start countdown time resend OTP
}
function countDownTimeResend(){
	var countDownDate = new Date().getTime() + 45000;//+45s
	var x = setInterval(function() {
	  var now = new Date().getTime();
	  var distance = countDownDate - now;
	  $('#countDownOTP').text(Math.floor(distance/1000));
	  countDownOTP = distance;
	  if (distance < 0) {
	    clearInterval(x);
	    $('#countDownOTP').text("0");
	    countDownOTP = 0
	  }
	}, 1000);
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
function resendOtp() {
	if(countDownOTP > 0){
		noti.dialog("<i class='fa fa-ban fa-2x' aria-hidden='true' style='color: #ff0000'></i> " +
				"Hãy đợi sau <span id='countDownOTP'></span> giây để gửi lại mã xác nhận!", 3);
		return;
	}
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url_resendOtp + "?phone=" + form.phone(),
	}).done(function(data) {
		console.log(JSON.stringify(data));
		if (data.code != "01") {
			noti.fail("Thông báo", "Có lỗi xảy ra, xin vui lòng thử lại sau", function(){});
			return;
		}
		noti.dialog("<i class='fa fa-check fa-2x' aria-hidden='true' style='color: #1b926c'></i>" +
				"Mã xác nhận OTP đã được gửi lại cho bạn !",3);
		countDownTimeResend(); // countdown time
	}).fail(function(data) {
		console.log("Error: " + JSON.stringify(data));
		noti.fail("Thông báo", "Có lỗi xảy ra, xin vui lòng thử lại sau", function(){});
	}).always(function() {
	});
}

function confirmOTP() {
	var otp = form.otp();
	if (!otp) {
		error.push({message: Error_message.EMPTY_OTP, id: "otp"});
		noti.error(error);
		return;
	}
	var request = {
		otp : otp,
		phone : form.phone()
	}
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_confirmOtp,
		data : JSON.stringify(request)
	}).done(function(data) {
		console.log(JSON.stringify(data));
		if (!data){
			error.push({message: Error_message.CONNECT_FAIL, id: "alert"});
			noti.error(error);
			setTimeout(() => {
				reload();
			}, 3000);
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
		// ok
		var message = " SĐT: <strong>" + form.phone() + "</strong> và mật khẩu này (là tài khoản HomeDirect)" +
				" được dùng chung cho tất cả các dịch vụ mà HomeDirect cung cấp";
		if(onlyRegisterAccount){
			message = "Sử dụng tài khoản HomeDirect đã có để đăng nhập";
		}
		noti.ok("Đăng ký Ví thành công", message, function() { goHome() });
	}).fail(function(data) {
		error.push({message: "Xác nhận đăng ký thất bại! Xin vui lòng thử lại", id: "alert"});
		noti.error(error);
		setTimeout(() => {
			reload();
		}, 3000);
	}).always(function() {
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