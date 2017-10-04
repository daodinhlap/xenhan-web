var noti = new Notify();
var form = new FormRecharge();

var url_recharge = BASE_URL + "/giao-dich/nap-tien-bang-the-cao";
// =====================================
	
function submitInputRecharged(){
	var hasError = form.validate();
	if(hasError ==  undefined || hasError.length != 0){
		noti.error(error);
		return;
	}
	noti.cleanError();
	
	// move div step 2
	$('#screen1').hide();
	$('#screen2').show();
	$('#step1').removeClass("current");
	$('#step2').addClass("current");

	$('#discountConfirm').text(form.discount());
	$('#cardSerialConfirm').text(form.cardSerial());
	$('#cardCodeConfirm').text(form.cardCode());
	$('#accountNoConfirm').text(form.accountNo());
	$('#issuerConfirm img').attr("src", imagesLink(form.issuer()));
}

function submitConfirmRecharged(){
	
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_recharge,
		data : JSON.stringify(form.request()),
	}).done(function(data) {
		if (data.code != "01") {
			error.push({message: data.message, id: "alert"});
			noti.error(error);
		} else {
			showMessage(true);
		}
		$('#screen1').hide();
		$('#screen2').hide();
		$('#screen3').show();
		$('#step2').removeClass("current");
		$('#step3').addClass("current");

		$('#issuerResult img').attr("src", imagesLink(form.issuer()));
		$('#discountResult').text(form.discount());
		$('#amountResult').text(data.data != undefined ? currencyFormat(data.data.price) : 0 );
		$('#moneyResult').text(data.data != undefined ? currencyFormat(data.data.amount) : 0);
	}).fail(function(data) {
		handlerFailRequest(data);
	});
}

function retryRecharged() {
	noti.cleanError();
	$('#alert').hide();
	$('#cardSerial').val("");
	$('#cardCode').val("");
	
	$('#screen1').show();
	$('#screen2').hide();
	$('#screen3').hide();
	
	$('#step1').addClass("current");
	$('#step2').removeClass("current");
	$('#step3').removeClass("current");
	
}

function backtoInputRecharged() {
	noti.cleanError();
	$('#alert').hide();
	$('#screen1').show();
	$('#screen2').hide();
	
	$('#step1').addClass("current");
	$('#step2').removeClass("current");
	$('#cardSerialConfirm').text("");
	$('#cardCodeConfirm').text("");
}

$(document).ready(function() {
//	getBalance();
	getDenomination();
	$('select#sourceAccountNo').change(function(){
		getBalance();
	});
	// change issuer
	$('input[type=radio][name=issuer]').change(function() {
		console.log(this.value);
		getDenomination();
	});
})

// MODEL
function FormRecharge(){
	
	this.accountNo = function(){return $('#sourceAccountNo').val() };
	this.issuer = function(){return $('input[name=issuer]:checked').val() };
	this.cardSerial = function(){return $('#cardSerial').val().trim() };
	this.cardCode = function(){return $('#cardCode').val().trim() };
	this.discount = function(){return $('#discount').text() };
	
	this.validate = function () {
		if(!this.cardSerial() && !this.cardCode() ){
			error.push({message: Error_message.EMPTY_INPUT, id: "alert"});
			return error;
		}
		if(!this.cardSerial() || !this.accountNo() ){
			error.push({message: "Xin vui lòng nhập mã Serial", id: "cardSerial"});
		}
		if(!this.cardCode()){
			error.push({message:"Xin vui lòng nhập mã thẻ nạp", id: "cardCode"});
		}
		return error;
	}
	
	this.request = function () {
		return {
			issuer:this.issuer(),
			cardSerial:this.cardSerial(),
			cardCode:this.cardCode(),
			accountNo:this.accountNo()
		}
	}
	
}
