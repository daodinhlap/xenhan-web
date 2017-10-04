var countDown;
var requestId;
var submitOtp = 0;
var noti = new Notify();
var form = new Form();
var step = new Step();

var url_withdraw = BASE_URL + "/giao-dich/withdraw-cash?accountNo=";
var url_Fee = BASE_URL + "/giao-dich/withdraw-cash-fee";

var province_id = "province";
var district_id = "district";
var selectedProvince = $('select#'+province_id).val();
var selectedDistrict = $('select#'+district_id).val();
// ============================================

// ON LOAD
$(document).ready(function($) {
	// change amount
	$("#amount").keyup(function() {
		var amount = $(this).val();
		if(!amount) return;
		$(this).val(currencyFormat(numberFormat(amount)));
	});
	
	//	getPlaces(province_id, district_id, selectedProvince);
	// init provind default
	var data_province = [];
	data_province.push({id: "Hà Nội", text: "Hà Nội"})
	data_province.push({id: "Hồ Chí Minh", text: "Hồ Chí Minh"});
	$("#province").select2({
		data: data_province,
		placeholder: "Chọn Tỉnh/Thành Phố",
		allowClear: true
	});
	getPlacesWithdrawByProvince($("#province").val(), district_id);
	
	// handler change province
	$('select#province').change(function() {
		var province = this.value;
		getPlacesWithdrawByProvince(province, district_id);
	});
	$('select#district').change(function() {
		var district = this.value;
		if(district) {getFee()}
	});
	
});

function backInput(){
	step.step1()
}
function submitInput(){
	var hasError = form.validate();
	if(hasError ==  undefined || hasError.length != 0){
		noti.error(error);
		return;
	}
	step.step2();
}

// SUBMIT
function submitConfirm (){
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_withdraw + form.sourceAccountNo(),
		data : JSON.stringify(form.request()),
	}).done(function(data) {
		if(data.code != ErrorCode.SUCCESS){
			error.push({message: data.message, id: "alert"});
			noti.error(error);
			return;
		}
		step.step3();
		requestId = data.data;
	}).fail(function(data) {
		handlerFailRequest(data);
	});
}
// OTP
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
		url : getLinkConfirm(requestId,otp),
	}).done(function(data) {
		if (!data){
			step.step4();
			error.push({message: Error_message.CONNECT_FAIL, id: "alert"});
			noti.error(error);
			return;
		}
		if (data.code == ErrorCode.NOT_MATCH){
			error.push({message: Error_message.NOT_MATCH_OTP, id: "alert"});
			noti.error(error);
			return;
		}
		if(data.code != ErrorCode.SUCCESS){
			step.step4();
			error.push({message: data.message, id: "alert"});
			noti.error(error);
			return;
		}
		$('#alert-withdraw').show();
		step.step4();
	}).fail(function(data) {
		console.log("Error: " + JSON.stringify(data));
	}).always(function(data){
		checkTimesSendOTP(data);
	});
}

// GET FEE
function getFee(){
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_Fee,
		data : JSON.stringify(form.requestFee()),
	}).done(function(data) {
		
		if(data.code != ErrorCode.SUCCESS){
			error.push({message: data.message, id: "alert"});
			noti.error(error);
			return;
		}
		
		showFee(data);
		
	}).fail(function(data) {
		handlerFailRequest(data);
	});
}


function bindViewFee(surcharge, fee){
	
	var surcharge_view = surcharge <= 0? "" : doubleFormatView(surcharge) + "%";
	var fee_view = fee <= 0? "" : currencyFormat(Math.round(fee));
	var plus = " + ";
	if(!surcharge_view || !fee_view) plus = "";
	return (surcharge_view + fee_view) === ""? 0 : surcharge_view + plus + fee_view;
}

function showFee(data) {
	noti.cleanError();
	if(data.code == ErrorCode.SUCCESS){
		$('#label-fee').show();
//		form.setFee(currencyFormat(data.data.fee));
		form.surcharge = data.data.surcharge;
		form.fee = data.data.fee;
		form.setFee(bindViewFee(form.surcharge, form.fee));
		return;
	}
	form.setFee("");
	$('#label-fee').hide();
}
// MODEL
function Form(){
	var amount_ = 'amount';
	var address_ = 'address';
	var province_ = 'province';
	var district_ = 'district';
	var fee_ = 'fee';
	this.sourceAccountNo = function(){ return $('#sourceAccount').find(':selected').data('accountno')};
	this.balance = function(){ return $('#sourceAccount').val()};
	this.amount = function(){ return $('#' + amount_).val()};
	this.province = function(){return $('select#' + province_).val()};
	this.district = function(){return $('select#' + district_).val()};
	this.address = function(){ return $('#' + address_).val()};
	this.fee = function(){ return $('#' + fee_).text()};
	
	this.otp = function(){return $('#otp').val()};
	this.setOtp = function(value){return $('#otp').val(value)};
	this.setFee = function(value){return $('#' + fee_).text(value)};
	
	this.validate = function (){
		if(!this.amount()){
			error.push({message: Error_message.EMPTY_AMOUNT, id: amount_});
		}
		if(!this.address()){
			error.push({message: Error_message.EMPTY_ADDRESS, id: address_});
		}
		if(numberFormat(this.amount()) > Math.round(this.balance())){
			error.push({message: Error_message.BALANCE_INVALID, id: "alert"});
		}
		return error;
	}
	
	this.request = function() {
	  return {
		  amount: numberFormat(this.amount()),
		  province: this.province(),
		  district: this.district(),
		  address: this.address()
	  }
	}
	this.requestFee = function() {
	  return {
		  provinceName:this.province(),
		  districtName:this.district()
	  }
	}
}

function Step (){
	this.active = function(id){
		$('[id^=step]').removeClass("current");
		$('#'+id).addClass("current");
	}
	this.step1 = function(){
		noti.cleanError();
		clearCountDown();
		$('#alert-withdraw').hide();
		$('#screen1').show();
		$('#screen2').hide();
		$('#screen3').hide();
		this.active('step1');
	} 
	this.step2 = function(){
		noti.cleanError();
		
		$('#addressConfirm').text(form.address());
		$('#provinceConfirm').text(form.province());
		$('#districtConfirm').text(form.district());
		$('#amountConfirm').text(form.amount());
		$('#feeConfirm').text(currencyFormat(Math.round(calculateFee(form.amount(),form.surcharge, form.fee))));
		
		$('#screen1').hide();
		$('#screen2').show();
		$('#screen3').hide();
		
		$('#btn-confirm').show();
		$('#btn-finish').hide();
		this.active('step2');
	}
	this.step3 = function (){
		noti.cleanError();

		$('#screen2').hide();
		$('#screen3').show();
		countDown = countDownOTP();
		
		this.active('step3');
	}
	this.step4 = function (){
		noti.cleanError();
		clearCountDown();
		$('#screen3').hide();
		$('#screen2').show();
		$('#btn-confirm').hide();
		$('#btn-finish').show();
		
		this.active('step4');
	}
}

//calculator fee
function calculateFee(amout, surcharge, fee){
	// amount * sur + fee
	return numberFormat(amout) * (surcharge/100) +  fee;
}