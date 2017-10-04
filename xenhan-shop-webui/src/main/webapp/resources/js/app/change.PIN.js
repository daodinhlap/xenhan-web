var countDown;
var requestId;
var noti = new Notify();
var form = new FormPassword();
var step = new Step();
var mode = AuthenMethod.OTP;
// URL
var url_setupPIN = BASE_URL + "/tai-khoan/setup-pin";
var url_account = BASE_URL + "/tai-khoan/truy-van-tai-khoan";
var url_authenMethod = BASE_URL + "/tai-khoan/auth-method?method=";
//==============================================================

//ON LOADED
$(document).ready(function() {
	$('#authen-method').change((e) => {
		setAuthenMethod(e);
		$('#area-edit').toggle(200,"swing");
	});
});
// SETUP PIN
function setAuthenMethod(e){
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url_authenMethod + form.authenMethod(),
	}).done(function(data) {
		if(data.code != ErrorCode.SUCCESS){
			noti.fail("Thông báo", "Có lỗi khi thay đổi phương thức xác thực giao dịch. Xin vui lòng thử lại", function(){});
			return;
		}
	}).fail(function(data) {
		console.log("Error: " + data);
		handlerFailRequest(data);
	});
}

function setupPIN() {
	var hasError = form.validatePIN();
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
		url : url_setupPIN,
		data : JSON.stringify(form.requestPIN()),
	}).done(function(data) {
		if(data.code == ErrorCode.NOT_MATCH_OLD_PIN){
			error.push({message: Error_message.NOT_MATCH_OLD_PIN, id: "alert"});
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
		handlerFailRequest(data);
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
		showMessage({id:"alert", mes: Error_message.CHANGE_PIN_SUCCESS});
		
	}).fail(function(data) {
		handlerFailRequest(data);
	}).always(function(data){
		if(data.code != ErrorCode.NOT_MATCH){
			form.resetPIN();
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
	var oldPIN_ = 'oldPIN';
	var newPIN_ = 'newPIN';
	var confirmNewPIN_ = 'confirmNewPIN';
	var otp_ = 'otp';
	
	this.oldPIN = function(){return $('#'+ oldPIN_).val()};
	this.newPIN = function(){return $('#'+newPIN_).val()};
	this.confirmNewPIN = function(){return $('#'+confirmNewPIN_).val()};
	this.authenMethod = function(){return $('#authen-method').is(':checked') ? AuthenMethod.PINCODE : AuthenMethod.OTP  };
	this.otp = function(){return $('#'+otp_).val()};
	this.setOtp = function(value){return $('#'+otp_).val(value)};

	this.requestPIN = function(){
		return {
			oldPinCode: this.oldPIN(),
			pinCode: this.newPIN()
		}
	}
	
	this.resetPIN = function(){
		$('#' + oldPIN_).val("");
		$('#' + newPIN_).val("");
		$('#' + confirmNewPIN_).val("");
		$('#' + otpPIN_).val("");
	}
	
	
	this.validatePIN = function(){
		if($('#' + oldPIN_).length == 0 && !this.newPIN() && !this.confirmNewPIN()){
			error.push({message:Error_message.EMPTY_INPUT, id: "alert"});
			return error;
		}
		if($('#' + oldPIN_).length != 0 && !this.oldPIN() && !this.newPIN() && !this.confirmNewPIN()) {
			error.push({message:Error_message.EMPTY_INPUT, id: "alert"});
			return error;
		}
		if($('#' + oldPIN_).length != 0 && (!validateDigit(this.oldPIN()) || !this.oldPIN()  || this.oldPIN().length != 6 )) {
			error.push({message: Error_message.INVALID_FORMAT_PIN, id: oldPIN_});
		}
		if(!validateDigit(this.newPIN()) || !this.newPIN()  || this.newPIN().length != 6) {
			error.push({message: Error_message.INVALID_FORMAT_PIN, id: newPIN_});
		}
		if (strcmp(this.newPIN(), this.confirmNewPIN()) != 0) {
			error.push({message: Error_message.CONFIRM_PIN_NOT_MATCH, id: confirmNewPIN_});
		}
		return error;
	}
}

function Step (){
	this.step1 = function(){
		noti.cleanError();
		showMessage("clean");
		clearCountDown();
		
		$('#buttonFinish').hide();
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
		
		$('[id^=step2]').removeClass("current");
		$('[id^=step3]').addClass("current");
		$('#buttonFinish').show();
		$('#screen2').hide();
	}
}
