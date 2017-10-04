var countDown;
var requestId;
var noti = new Notify();
var form = new FormPassword();
var step = new Step();
var mode = AuthenMethod.OTP;
// URL
var url_changePass = BASE_URL + "/tai-khoan/doi-mat-khau";
var url_setupPIN = BASE_URL + "/tai-khoan/setup-pin";
var url_confirmOtp = BASE_URL + "/giao-dich/xac-nhan-otp?otp=";
var url_account = BASE_URL + "/tai-khoan/truy-van-tai-khoan";
//==============================================================

// ON LOADED
$(document).ready(function() {
});

function changePass() {
	var hasError = form.validate();
	if(hasError ==  undefined || hasError.length != 0){
		noti.error(error);
		return;
	}
	
	if(form.otp()){
		submitOTP(form.otp()); return;
	}
	
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_changePass,
		data : JSON.stringify(form.request()),
	}).done(function(data) {
		if(data.code == ErrorCode.NOT_MATCH){
			error.push({message: Error_message.NOT_MATCH_OLD_PASSWORD, id: "alert"});
			noti.error(error);
			return;
		}
		if(data.code != ErrorCode.SUCCESS){
			error.push({message: data.message, id: "alert"});
			noti.error(error);
			return;
		}
		step.step2();
		requestId = data.data;
	}).fail(function(data) {
		error.push({message: Error_message.UNKNOW_ERROR, id: "alert"});
		noti.error(error);
	}).always(function(){
	});
}

function submitOTP(otp) {
	var otp = form.otp();
	var otpID = "otp";
	var url = getLinkConfirm(requestId, otp);
	
	if (!otp) {
		error.push({message: Error_message.EMPTY_OTP, id: otpID});
		noti.error(error);
		return;
	}
	
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url
	}).done(function(data) {
		if(data.code == ErrorCode.NOT_MATCH){
			error.push({message: Error_message.NOT_MATCH_OTP, id: "alert"});
			noti.error(error);
			return;
		}
		if(data.code != ErrorCode.SUCCESS){
			step.step3();
			error.push({message: data.message, id: "alert"});
			noti.error(error);
			return;
		}
		step.step3();
		showMessage({id:"alert-password", mes: Error_message.CHANGE_PASSWORD_SUCCESS});
		
	}).fail(function(data) {
		handlerFailRequest(data);
	}).always(function(data){
		if(data.code != ErrorCode.NOT_MATCH){
			form.reset();
			return;
		}
		form.setOtp("");
	});
}
function backInput(){
	step.step1();
}
function goSwitchAuthen(){
	window.location.href = url_account;
}

// MODEL
function FormPassword(){
	var oldPass_ = 'oldPass';
	var newPass_ = 'newPass';
	var confirmNewPass_ = 'confirmNewPass';
	var otp_ = 'otp';
	
	this.oldPass = function(){return $('#'+ oldPass_).val()};
	this.newPass = function(){return $('#'+newPass_).val()};
	this.confirmNewPass = function(){return $('#'+confirmNewPass_).val()};
	
	this.otp = function(){return $('#'+otp_).val()};
	this.setOtp = function(value){return $('#'+otp_).val(value)};

	this.request = function(){
		return {
			oldPassword: this.oldPass(),
			newPassword: this.newPass()
		}
	}
	
	this.reset = function(){
		$('#oldPass').val("");
		$('#newPass').val("");
		$('#confirmNewPass').val("");
		$('#otp').val("");
	}
	
	this.validate = function(){
		if(!this.oldPass() && !this.newPass() && !this.confirmNewPass()) {
			error.push({message:Error_message.EMPTY_INPUT, id: "alert"});
			return error;
		}
		if(!this.newPass()  || this.newPass().length < 6) {
			error.push({message:"Độ dài mật khẩu nhỏ nhất là 6 kí tự", id: newPass_});
		}
		if(!this.oldPass()  || this.oldPass().length < 6 ) {
			error.push({message:"Độ dài mật khẩu nhỏ nhất là 6 kí tự", id: oldPass_});
		}
		if (strcmp(this.newPass(), this.confirmNewPass()) != 0) {
			error.push({message:" Nhập lại mật khẩu không đúng", id: confirmNewPass_});
		}
		return error;
	}
}

function Step (){
	this.step1 = function(){
		showMessage("clean");
		$('#buttonFinish').hide();
		noti.cleanError();
		clearCountDown();
		$('[id^=step1]').addClass("current");
		$('[id^=step2]').removeClass("current");
		$('[id^=step3]').removeClass("current");
		$('#screen1').show();
		$('#screen2').hide();
	}
	this.step2 = function(){
		noti.cleanError();
		countDown = countDownOTP();
		
		$('[id^=step1]').removeClass("current");
		$('[id^=step2]').addClass("current");
		
		$('#screen1').hide();
		$('#screen2').show();
	}
	this.step3 = function(){
		noti.cleanError();
		clearCountDown();
		
		$('#screen2').hide();
		$('#buttonFinish').show();
		$('[id^=step2]').removeClass("current");
		$('[id^=step3]').addClass("current");
	}
}
