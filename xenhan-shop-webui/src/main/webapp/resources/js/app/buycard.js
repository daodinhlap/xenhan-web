var countDown;
var requestId;
var submitOtp = 0;
var noti = new Notify();
var form = new FormBuycard();
// URL
var url_buycard = BASE_URL + "/giao-dich/mua-ma-the?transType=";
var url_otp = BASE_URL + "/giao-dich/xac-nhan-otp?otp=";
var url_getResult = BASE_URL + "/giao-dich/ket-qua-mua-ma-the?requestId=";
// ================================================================================
function submitInputBuyCard() {
	var hasError = form.validate();
	if(hasError ==  undefined || hasError.length != 0){
		noti.error(error);
		return;
	}
	noti.cleanError();
	
	
	// move to step 2
	$('#screen1').hide();
	$('#screen2').show();
	$('#btn-confirm').show();
	
	$('#step1').removeClass("current");
	$('#step2').addClass("current");

	$('#quantityConfirm').text(form.quantity());
	$('#denominationConfirm').text(currencyFormat(form.denomination()));
	$('#accountNoConfirm').text(form.accountNo());
	$('#discountConfirm').text(form.discount());
	$('#issuerConfirm img').attr("src", imagesLink(form.issuer()));
	$('#priceConfirm').text(form.price());
}

function submitConfirmBuyCard() {
	var request = form.buycardRequest();
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_buycard + form.transType(),
		data : JSON.stringify(request),
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
	if (isEmpty(otp)) {
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
			requestId = data.data.requestId; // set request ID
			showMessage(true);
			showStep4();
			getBuyCardResult();
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

function getBuyCardResult() {
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url_getResult + requestId
	}).done(function(data) {
		$("#tableBuyCardResult-body").empty();
		$.each(data, function(idx, value) {
			
			id_card = "copy_card_" + idx;
			id_serial = "copy_serial_"  + idx;
			
			$('table#tableBuyCardResult')
				.append($('<tr>')
						.append($("<td rowspan='2' class='td-list-card'><button class='btn-list-card'>"+(idx+1)+"</button></td>"+
									"<td>Mã nạp tiền</td>" +
									"<td  align='right'><a id='"+id_card+"'>"+value.cardCode+"</a></td>")))
				.append($('<tr>')
						.append($("<td>Số serial</td>" +
									"<td  align='right'><a id='"+id_serial+"'>"+value.cardSerial+"</a></td>")));
		});
		$('#tableResult').show();
		requestId = "";
	}).fail(function(data) {
		error.push({message: Error_message.UNKNOW_ERROR, id: "alert"});
		noti.error(error);
	}).always(function(){
		handlerCopyCard();
	});
}


function showStep3 (){
	noti.cleanError();
	$('#screen1').hide();
	$('#screen2').hide();
	$('#screen3').show();
	
	$('#step2').removeClass("current");
	$('#step3').addClass("current");
	countDown = countDownOTP();
}

function showStep4() {
	noti.cleanError();
	
	$('#screen1').hide();
	$('#screen3').hide();
	$('#screen2').show();
	$('#btn-confirm').hide();
	$('#buycard-result').show();
	
	$('#step3').removeClass("current");
	$('#step4').addClass("current");
	clearCountDown();
}

function backInputBuyCard(){
	$('#alert').hide();
	$('#screen1').show();
	$('#screen2').hide();
	$('#buycard-result').hide();
	
	$('#step1').addClass("current");
	$('#step2').removeClass("current");
	$('#step3').removeClass("current");
	$('#step4').removeClass("current");
	form.setOtp("");
	clearCountDown();
	noti.cleanError();
	getBalance();
}

function cancelBuyCard(){
	submitOtp = 0;
	backInputBuyCard();
	$('#quantity').val(1);
	$('#screen3').hide();
	$('#screen4').hide();
	$('#tableResult').hide();
}

function inCrease (){
	var quantity = $('#quantity').val();
	$('#quantity').val(parseInt(quantity) + 1);
	calculateMoney();
}
function deCrease (){
	var quantity = parseInt($('#quantity').val());
	if(quantity == 1) return;
	$('#quantity').val(quantity - 1);
	calculateMoney();
}
	
function exportTable(){
	$("#tableBuyCardResult").tableExport({
				headings : true,
				footers : true,
				formats : [ "xlsx"],
				fileName : "DANH-SACH-THE",
				position : "top",
				ignoreRows : null,
				ignoreCols : null
			},  true);
	setTimeout(() => {
		$("#tableBuyCardResult").find("caption").find("button")[0].click();
	}, 200);
}

//ON LOADED
$(document).ready(function() {
	getBalance();
	getDenomination();
	handlerChangeDenomination();
	// handler Change account Source
	$('select#sourceAccountNo').change(function(){
		getBalance();
	});
	// change issuer
	$('input[type=radio][name=issuer]').change(function() {
		console.log(this.value);
		getDenomination();
		handlerChangeDenomination();
	});
	// Change target quantity
	$("#quantity").keyup(function() {
		var quantity = $(this).val();
		if(isNaN(quantity)){
			$('#price').text("");
			$("#quantity").val("");
			return;
		}
		if(!quantity) {
			$('#price').text("");
			return;
		}
		calculateMoney();
	});
})

// model
function FormBuycard() {
	this.accountNo = function(){return $('select#sourceAccountNo option:selected').val()};
	this.balance = function(){return $('#balance').text()};
	this.issuer = function(){return $('input[name=issuer]:checked').val()};
	this.denomination = function(){return $('input[name=denomination]:checked').val()};
	this.quantity = function(){return $('#quantity').val()};
	this.discount = function(){return $('#discount').text()};
	this.price = function(){return $('#price').text()};
	
	this.otp = function(){return $('#otp').val()};
	this.setOtp = function(value){return $('#otp').val(value)};
	this.transType = function(){return $('#transType').val()};
	
	this.validate = function(){
		return validate(this.denomination(), this.quantity(), this.accountNo(), this.balance(), this.price());
	}
	
	this.buycardRequest = function(){
		return {issuer : this.issuer(),
				quantity : this.quantity(),
				accountNo : this.accountNo(),
				price : this.denomination()}
	} 
}
function validate(denomination, quantity, accountNo, balance, price){
	if(isEmpty(denomination)){
		error.push({message:Error_message.DENOMINATION_INVALID, id: "alert"});
	}	
	
	if(isEmpty(quantity) || isEmpty(accountNo)){
		error.push({message: "Xin vui lòng nhập số lượng thẻ", id: "quantity"});
	}
	if(isNaN(quantity)){
		error.push({message:Error_message.QUANTITY_INVALID, id: "quantity"});
	}
	if(parseInt(numberFormat(balance)) < parseInt(numberFormat(price))) {
		error.push({message:Error_message.BALANCE_INVALID, id: "alert"});
	}
	return error;
}
