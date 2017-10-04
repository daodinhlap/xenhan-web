var countDown;
var requestId;
var submitOtp = 0;
var noti = new Notify();
var form = new FormCheque();
var step = new Step();

var url_bankFee = BASE_URL + "/ngan-hang/phi?bankId=";
var url_confirmOTP = BASE_URL + "/giao-dich/xac-nhan-otp?otp=";
var url_withdraw = BASE_URL + "/giao-dich/withdraw?accountNo=";
// ============================================

// ON LOAD
$(document).ready(function($) {
	if($('#error').text()) return;
	getBankFee();
	
	// change amount
	$("#amount").keyup(function() {
		var amount = $(this).val();
		if(!amount) return;
		$(this).val(currencyFormat(numberFormat(amount)));
	});
	
	// handler select bank
	$("div[id^=bank]").click(function(e){
		var currentId = $(this).attr("id");
		$("[id^=bank]").removeClass("border")
						.toggle();
		
		$('#'+currentId).addClass("border");
		$('#'+currentId).toggle(100, function(){ getBankFee()});
		
	});
});

// SUBMIT
function withDraw (){
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


// FEE
function getBankFee(){
	if(form.bankId() == undefined || form.bankId() == form.currentBankId) return;
	form.currentBankId = form.bankId();
	
	$.ajax({
		  type: 'GET',
		  contentType : 'application/json',
		  url: url_bankFee + form.bankId(),
	}).done(function(data) {
		
		if(data.code != ErrorCode.SUCCESS){
			error.push({message: data.message, id: "alert"});
			noti.error(error);
			return;
		}
		
		form.surcharge = data.data.surcharge;
		form.fee = data.data.fee;
		form.setFeeView(bindViewFee(form.surcharge, form.fee));
	  }).fail(function(data) {
		error.push({message: Error_message.UNKNOW_ERROR, id: "alert"});
		noti.error(error);
	  });
}

function bindViewFee(surcharge, fee){
	
	var surcharge_view = surcharge <= 0? "" : doubleFormatView(surcharge) + "%";
	var fee_view = fee <= 0? "" : currencyFormat(Math.round(fee));
	var plus = " + ";
	if(!surcharge_view || !fee_view) plus = "";
	return (surcharge_view + fee_view) === ""? 0 : surcharge_view + plus + fee_view;
}

// calculator fee
function calculateFee(amout, surcharge, fee){
	// amount * sur + fee
	return numberFormat(amout) * (surcharge/100) +  fee;
}

function backInput(){ step.step1()}
function submitInput(){
	var hasError = form.validate();
	if(hasError ==  undefined || hasError.length != 0){
		noti.error(error);
		return;
	}
	
	step.step2();
}


// MODEL
function FormCheque(){ 
	this.currentBankId = '';
	this.fee = '';
	this.surcharge = '';
	this.setFeeView = function(value){ return $('#fee').text(value)};
	this.getFeeView = function(value){ return $('#fee').text()};
	
	this.bank = function(){
		return $("[id^=bank]").filter(function(){
			if($(this).css('display') == 'block'){ return $(this); }
		})
	}
	
	this.sourceAccountNo = function(){ return $('#sourceAccount').find(':selected').data('accountno')};
	this.balance = function(){ return $('#sourceAccount').val()};
	
	this.amount = function(){ return $('#amount').val()};
	this.bankAccountId = function(){ return this.bank().data("id")};
	this.bankId = function(){ return this.bank().data("bankid")};
	this.bankName = function(){ return this.bank().data("bankname")};
	this.bankAccountName = function(){ return this.bank().data("bankaccountname")};
	this.bankAccount = function(){ return this.bank().data("bankaccount")};
	this.branchName = function(){ return this.bank().data("branchname")};
	
	this.otp = function(){return $('#otp').val()};
	this.setOtp = function(value){return $('#otp').val(value)};
	
	this.validate = function (){
		if(!this.amount()){
			error.push({message: Error_message.EMPTY_AMOUNT, id: "amount"});
		}
		if(numberFormat(this.amount()) > Math.round(this.balance())){
			error.push({message: Error_message.BALANCE_INVALID, id: "alert"});
		}
		return error;
	}
	
	this.request = function() {
	  return {
		  bankAccountId:form.bankAccountId(),
		  amount: numberFormat(form.amount())
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
		$('#bankName').attr("src", pathImage + form.bankName().toLowerCase()  + ext);
		$('#bankAccount').text(form.bankAccount());
		$('#branchName').text(form.branchName());
		$('#bankAccountName').text(form.bankAccountName());
		$('#amountConfirm').text(form.amount());
		$('#feeConfirm').text(currencyFormat(Math.round(calculateFee(form.amount(),form.surcharge, form.fee))));
		
		$('#screen1').hide();
		$('#screen2').show();
		$('#screen3').hide();
		
		$('#btn-confirm').show();
		$('#btn-finish').hide();
		noti.cleanError();
		this.active('step2');
	}
	this.step3 = function (){
		$('#screen2').hide();
		$('#screen3').show();
		countDown = countDownOTP();
		
		noti.cleanError();
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