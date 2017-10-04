var countDown;
var requestId;
var submitOtp = 0;
var noti = new Notify();
var form = new FormTopup();
// URL
var url_topup = BASE_URL + "/giao-dich/topup?transType=";
var url_confirmOTP = BASE_URL + "/giao-dich/xac-nhan-otp?otp=";
//===================================================================================
function submitInput(){
	var hasError = form.validate();
	if(hasError ==  undefined || hasError.length != 0){
		noti.error(error);
		return;
	}
	noti.cleanError();
	
	
	showStep2();
	$('#accSourceConfirm').text(form.sourceAccountNo());
	$('#issuerConfirm img').attr("src", imagesLink(form.issuer()));
	$('#denominationConfirm').text(currencyFormat(form.denomination()));
	$('#phoneTargetConfirm').text(form.phoneTarget());
	$('#discountConfirm').text(form.discount());
	$('#priceConfirm').text(form.price());	
}

function submitConfirm(){
	var request = form.topupRequest();
	$.ajax({
		  type: 'POST',
		  contentType : 'application/json',
		  url: url_topup + form.transType(),
		  data: JSON.stringify(request)
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
		if(data.code != ErrorCode.SUCCESS){
			showStep4();
			error.push({message: data.message, id: "alert"});
			noti.error(error);
			return;
		}
		if (data.data.status == "1") { // OK
			showMessage(true);
			showStep4();
			return;
		}
		if (data.data.status == "0") { // SUSPECTED
			$('#alert-suspected').show(); // alert-suspected
			showStep4();
			return;
		}
		showStep4();
		error.push({message: data.data.description, id: "alert"});
		noti.error(error);
	}).fail(function(data) {
		console.log("Error: " + JSON.stringify(data));
	}).always(function(data){
		checkTimesSendOTP(data);
	});
}


function backInputTransfer() {
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
	noti.cleanError();
	
	getBalance();
}

function backInputTransferClean(){
	backInputTransfer();
	//clean input
	$('input:radio[name=issuer]')[0].checked = true;
	$('input:radio[name=denomination]')[0].checked = true;
	$('#phoneTarget').val('');
	calculateMoney();
}

function showStep2(){
	$('#screen1').hide();
	$('#screen2').show();
	
	$('#step1').removeClass("current");
	$('#step2').addClass("current");
	$('#buttonConfirm').show();
}
function showStep3() {
	noti.cleanError();
	form.setOtp("");
	$('#showOTP').show();
	$('#screen2').hide();
	
	$('#step2').removeClass("current");
	$('#step3').addClass("current");
	$('#buttonConfirm').hide();
	
	countDown = countDownOTP();
}
function showStep4() {
	noti.cleanError();
	
	$('#showOTP').hide();
	$('#screen2').show();
	
	$('#step3').removeClass("current");
	$('#step4').addClass("current");
	$('#buttonFinish').show();
	clearCountDown();
}

// ON LOADED
$(document).ready(function() {
	getBalance();
	getDenomination();
	handlerChangeDenomination();
	
	$('select#sourceAccountNo').change(function(){
		getBalance();
	});
	$('input[type=radio][name=issuer]').change(function() {
		console.log(this.value);
		getDenomination();
		handlerChangeDenomination();
	});
})

function FormTopup (){
	this.sourceAccountNo = function(){return $('select#sourceAccountNo option:selected').val()};
	this.balance = function(){return $('#balance').text()};
	this.issuer = function(){return $('input[name=issuer]:checked').val()};
	this.denomination = function(){return $('input[name=denomination]:checked').val()};
	this.phoneTarget = function(){return $('#phoneTarget').val().trim().replace(" ","")};
	this.discount = function(){return $('#discount').text()};
	this.price = function(){return $('#price').text()};
	
	this.typeReceive = function(){return $('#type-receive').text()};
	this.transType = function(){return $('#transType').val()};
	this.otp = function(){return $('#otp').val()};
	this.setOtp = function(value){return $('#otp').val(value)};
	
	this.validate = function (){
		return validate (this.sourceAccountNo(), this.issuer(), this.denomination(), this.phoneTarget(), this.balance(), this.price());
	}
	this.topupRequest = function(){
		return {
			issuer : this.issuer().replace("_TOPUP",""), //REMOVE suffix OF ISSUER GATE
			phoneNumber: this.phoneTarget(),
			price: this.denomination(),
			accountNo : this.sourceAccountNo()
		}
	}
}

function validate (sourceAccountNo, issuer, denomination, phoneTarget, balance, price) {
	if(!denomination){
		error.push({message:Error_message.DENOMINATION_INVALID, id: "alert"});
	}
	if(!sourceAccountNo || !issuer){
		error.push({message:Error_message.EMPTY_INPUT, id: "alert"});
	}
	if(parseInt(numberFormat(balance)) < parseInt(numberFormat(price))){
		error.push({message:Error_message.BALANCE_INVALID, id: "alert"});
	}
	if(form.typeReceive().includes("game")){
		if(!phoneTarget){
			error.push({message:Error_message.EMPTY_ACCOUNT_GAME, id: "phoneTarget"});
		}
		return error;
	}
	if(!phoneTarget){
		error.push({message:Error_message.EMPTY_PHONE, id: "phoneTarget"});
	}
	if(!validatePhone(phoneTarget) && phoneTarget){
		$('#phoneTarget').val('');
		error.push({message:Error_message.PHONE_INVALID_FORMAT, id: "phoneTarget"});
	}
	return error;
}
