var countDown;
var requestId;
var submitOtp = 0;
var myPhone = $('#myPhone').text();
var noti = new Notify();
var form = new FormTransfer();
// URL
var url_transfer = BASE_URL + "/giao-dich/chuyen-tien";
var url_confirmOTP = BASE_URL + "/giao-dich/xac-nhan-otp?otp=";
var url_findName = BASE_URL + "/thong-tin-ca-nhan/tra-cuu-ten?phone=";
//==================================================================
function submitInput(){
	var hasError = form.validate();
	if(hasError ==  undefined || hasError.length != 0){
		noti.error(error);
		return;
	}
	
	showStep2();
	$('#accSourceConfirm').text(form.sourceAccountNo());
	$('#phoneTargetConfirm').text(form.phoneTarget());
	$('#amountConfirm').text(form.amount());
	$('#messageConfirm').text(form.message());
	$('#nameTargetConfirm').text(form.nameTarget());
}

function submitConfirm() {
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_transfer,
		data : JSON.stringify(form.transferRequest()),
	}).done(function(data) {
		console.log(JSON.stringify(data));
		if(data.code != ErrorCode.SUCCESS){
			error.push({message: data.message, id: "alert"});
			noti.error(error);
			return;
		}
		showStep3();
		requestId = data.data;
	}).fail(function(data) {
		handlerFailRequest(data);
	});
}

function submitOTP() {
	submitOtp += 1;
	var otp = form.otp();
	if (!otp) {
		error.push({message: Error_message.EMPTY_OTP, id: "otp"});
		noti.error(error);
		return;
	}
	
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : getLinkConfirm(requestId, otp),
	}).done(function(data) {
		if (!data){
			showStep4();
			error.push({message: Error_message.CONNECT_FAIL, id: "alert"});
			noti.error(error);
			return;
		}
		if (data.code == ErrorCode.NOT_MATCH){
			error.push({message: Error_message.NOT_MATCH_OTP, id: "alert"});
			noti.error(error);
			return;
		}
		if (data.code != ErrorCode.SUCCESS){
			showStep4();
			error.push({message: data.message, id: "alert"});
			noti.error(error);
			return;
		}
		showMessage(true);
		showStep4();
	}).fail(function(data) {
		console.log("Error: " + JSON.stringify(data));
	}).always(function(data){
		checkTimesSendOTP(data);
	});
}


function getNameReceive(phoneTarget) {
	showMessage("clean");
	if (myPhone.trim() == phoneTarget) {
		$('#phoneTarget').val("");
		error.push({message: "Bạn không thể chuyển tiền cho chính mình", id: "alert"});
		noti.error(error);
		return;
	}
	
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url_findName + phoneTarget,
	}).done(function(data) {
		if (data) {
			$("#label-nametarget").show();
			$("#nameTarget").text(data.fullName);
			console.log(JSON.stringify(data.fullName));
			noti.cleanError();
			return;
		}
		error.push({message: "Không tìm thấy số điện thoại người nhận", id: "alert"});
		noti.error(error);
		$("#nameTarget").text('');
		$("#label-nametarget").hide();
	}).fail(function(data) {
		console.log("Error: " + JSON.stringify(data));
	});
}

function backInputTransfer(){
	noti.cleanError();
	$('#alert').hide();
	$('#screen1').show();
	$('#screen2').hide();
	$('#showOTP').hide();
	$('#buttonConfirm').hide();
	$('#buttonFinish').hide();
	
	$('#step1').addClass("current");
	$('#step2').removeClass("current");
	$('#step3').removeClass("current");
	$('#step4').removeClass("current");
	clearCountDown();
	getBalance();
}
function backInputTransferClean(){
	backInputTransfer();
	//clean input
	$('#phoneTarget').val('');
	$('#amount').val('');
	$('#message').val('');
	$("#label-nametarget").hide();
	$('#nameTarget').text('');
}

function showStep2(){
	noti.cleanError();
	$('#screen1').hide();
	$('#screen2').show();
	
	$('#step1').removeClass("current");
	$('#step2').addClass("current");
	
	$('#buttonConfirm').show();
}
function showStep3() {
	noti.cleanError();
	submitOtp = 0;
	$('#otp').val('');
	$('#showOTP').show();
	
	$('#screen2').hide();
	$('#buttonConfirm').hide();
	
	$('#step2').removeClass("current");
	$('#step3').addClass("current");
	
	countDown = countDownOTP();
}
function showStep4(){
	noti.cleanError();
	$('#showOTP').hide();
	$('#screen2').show();
	
	$('#step3').removeClass("current");
	$('#step4').addClass("current");
	
	$('#buttonFinish').show();
	clearCountDown();
}
function format() {
	var amount = $("#amount").val();
	if(!amount) return;
	amount = amount.replace(/,/g, "");
	$("#amount").val(currencyFormat(amount));
}

$(document).ready(function() {
	getBalance();
	$('select#sourceAccountNo').change(function(){
		getBalance();
	});
	$("#phoneTarget").blur(function() {
		var phoneTarget = form.phoneTarget();
		if(!phoneTarget){
			$("#nameTarget").text('');
			$("#label-nametarget").hide();
			return;
		}
		getNameReceive(phoneTarget);
	});
	// change amount
	$("#amount").blur(function() {
		var amount = $(this).val();
		if(!amount) return;
		$(this).val(currencyFormat(numberFormat(amount)));
	});
	$("#amount").keyup(function() {
		var amount = $(this).val();
		if(!amount) return;
		$(this).val(currencyFormat(numberFormat(amount)));
	});
})

// MODEL
function FormTransfer (){
	this.sourceAccountNo = function(){return $('#sourceAccountNo').val()};
	this.balance = function(){return $('#balance').text()};
	this.phoneTarget = function(){return $('#phoneTarget').val().trim().replace(/ /g,"")};
	this.amount = function(){return $('#amount').val()};
	this.message = function(){return $('#message').val()};
	this.nameTarget = function(){return $('#nameTarget').text()};
	
	this.otp = function(){return $('#otp').val()};
	this.setOtp = function(value){return $('#otp').val(value)};
	
	this.validate = function(){
		return validate(this.sourceAccountNo(), this.balance(), this.amount(), this.message(), this.phoneTarget(), this.nameTarget());
	}
	this.transferRequest = function(){
		return {
			sourceAccNo: this.sourceAccountNo(),
			targetPhoneNo: this.phoneTarget(),
			value: numberFormat(this.amount()),
			information: this.message()
		}
	}
}

function validate (sourceAccountNo,balance, amount, message, phoneTarget,nameTarget ){
	if(!amount && !phoneTarget){
		error.push({message: Error_message.EMPTY_INPUT, id: "alert"});
		return error;
	}
	if(!validatePhone(phoneTarget)){
		error.push({message:"Xin vui lòng nhập lại số điện thoại", id: "phoneTarget"});
	}
	if(!nameTarget){
		error.push({message:"Xin vui lòng nhập lại số điện thoại", id: "nameTarget"});
	}
	if(!amount){
		error.push({message: "Xin vui lòng nhập số tiền giao dịch", id: "amount"});
		return error;
	}
	if(parseInt(numberFormat(balance)) < parseInt(numberFormat(amount))){
		error.push({message: Error_message.BALANCE_INVALID, id: "alert"});
		return error;
	}
	if(parseInt(numberFormat(amount)) > 50000000 ){
		error.push({message:"Số tiền giao dịch vượt quá giới hạn 50.000.000/giao dịch", id: "amount"});
	}
	if( parseInt(numberFormat(amount)) < 1){
		error.push({message:"Số tiền giao dịch quá nhỏ", id: "amount"});
	}
	if(message.length > 150){
		error.push({message:"Lời nhắn lớn hơn 150 ký tự ! Xin vui lòng nhập lại", id: "message"});
	}
//	if(!$.isNumeric(numberFormat(amount))){
//		error.push({message:"Xin vui lòng nhập lại số tiền", id: "amount"});
//	}
	return error;
}