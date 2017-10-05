var error = [];
var discount;
var hotline = "!<br><br>Hotline hỗ trợ: <a href='tel:02871099710'>028 71099710</a>";
var pathImage = "/resources/images/";
var ext = ".png";
var icon_check = "<img width='30px' src='/resources/images/icon-check.png'>&nbsp;";
var icon_error = "<img width='42px' src='/resources/images/icon-error.png'>";

var images = {
		account:"icon-taikhoan",
		clearing:"icon-butru",
		recharge:"icon-naptien",
		transfer:"icon-chuyentien",
		history:"icon-lichsu",
		telcoCard:"icon-muathe",
		topupTelco:"icon-napthe",
		gameCard:"icon-muathegame",
		topupGame:"icon-napgame",
		deposit:"icon-naptienbank",
		withRaw:"icon-ruttien",
		
		viettel:"viettel",
		vinaphone:"vinaphone",
		mobifone:"mobifone",
		vnm:"vnm",
		gmobile:"g-mobile",
		vcoin:"vcoin",
		gate:"gate",
		zingxu:"zing-xu",
		bit:"bit",
		garena:"garena",
		oncash:"oncash",
		megacard:"megacard",
		vmsdata:"vmsdata",
		vcard:"vcard"
	
}

var AuthenMethod = {
		OTP:0,
		PINCODE:1
}

$( document ).ready(function() {
    // set highligh menu
    var path = location.pathname;
    var menu = $( "ul.nav-sidebar > li" );
    
    if(path.indexOf("/tai-khoan/truy-van-tai-khoan") != -1){
    	setHighlight(menu,".taikhoan",images.account);
    }
    if(path.indexOf("/tai-khoan/sao-ke") != -1){
    	setHighlight(menu,".lichsu",images.history);
    }
    if(path.indexOf("/giao-dich/chuyen-tien") != -1){
    	setHighlight(menu,".chuyentien",images.transfer);
    }
    if(path.indexOf("/giao-dich/nap-tien-bang-the-cao") != -1){
    	setHighlight(menu,".naptien",images.recharge);
    }
    if(path.indexOf("/giao-dich/mua-ma-the-dien-thoai") != -1){
    	setHighlight(menu,".muathedt",images.telcoCard);
    }
    if(path.indexOf("/giao-dich/mua-ma-the-game") != -1){
    	setHighlight(menu,".muathegame",images.gameCard);
    }
    if(path.indexOf("/giao-dich/rut-tien") != -1){
    	setHighlight(menu,".ruttien",images.withRaw);
    }
    if(path.indexOf("/giao-dich/nap-dien-thoai") != -1){
    	setHighlight(menu,".napdienthoai",images.topupTelco);
    }
    if(path.indexOf("/giao-dich/nap-tai-khoan-game") != -1){
    	setHighlight(menu,".naptkgame",images.topupGame);
    }

	// handler tooltip
	$('[data-toggle="tooltip"]').tooltip(); 
});

function setHighlight(li,className,image){
	li.filter(className).addClass("menu-active")
		.find("a").css( "color", "white" )
		.find("img").attr("src", pathImage + image + "-active.png");
}

function imagesLink(issuerCode) {
	switch (issuerCode) {
	case "VTT":
		return pathImage + images.viettel + ext; break;
	case "VNP":
		return pathImage + images.vinaphone + ext; break;
	case "VMS":
		return pathImage + images.mobifone + ext; break;
	case "VNM":
		return pathImage + images.vnm + ext; break;
	case "GMB":
		return pathImage + images.gmobile + ext; break;
	case "VCOIN":
		return pathImage + images.vcoin + ext; break;;
	case "GATE":
	case "GATE_TOPUP":
		return pathImage + images.gate + ext; break;
	case "ZING":
		return pathImage + images.zingxu + ext; break;
	case "BIT":
		return pathImage + images.bit + ext; break;
	case "GARENA":
		return pathImage + images.garena + ext; break;
	case "ONCASH":
		return pathImage + images.oncash + ext; break;
	case "MEGACARD":
		return pathImage + images.megacard + ext; break;
	case "VMSDATA":
		return pathImage + images.vmsdata + ext; break;
	case "VCARD":
		return pathImage + images.vcard + ext; break;
	}
}

function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else
		var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function eraseCookie(name) {
	setCookie(name, "", -1);
}

function validatePhone(phone) {
	var re = /^[0-9]{8,15}$/;
	return re.test(phone);
}
function validateDigit(digit) {
	var re = /^\d+$/;
	return re.test(digit);
}
function isEmpty(str) {
	return (!str || 0 === str.length);
}
function isBlank(str) {
	return (!str || /^\s*$/.test(str));
}
function strcmp(a, b) {
	return (a < b ? -1 : (a > b ? 1 : 0));
}

function getBalance() {
	var accountNo = $('select#sourceAccountNo option:selected').val();
	console.log(" Get balance of acc No:" + accountNo);
	var url = BASE_URL + "/giao-dich/so-du?accountNo=" + accountNo;
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url,
		dataType : 'json',
		success : function(data) {
			var balance = currencyFormat(data.data);
			$("#balance").text(balance);
		},
		error : function(data) {
			console.log("Error: " + JSON.stringify(data));
		}
	});
}

function getDenomination(issuer) {
	var issuer = $('input[type=radio][name=issuer]:checked').val();
	console.log("Get deno of Issuer Code  : " + issuer);
	// call service get deno
	var url = BASE_URL + "/giao-dich/menh-gia-the?issuerCode="+ issuer;
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url,
		dataType : 'json',
		async: false
		}).done(function(data) {
			// bind deno to view
			bindDenomination(data);
		}).fail(function(data) {
			console.log("error: " + JSON.stringify(data));
		}).always(function() {
			// get Rate -> calculator price
			var productid = $('input[type=radio][name=denomination]:checked').data("productid");
			getRate(productid);
		});
}

function bindDenomination(data){
	$("#denomination label").remove();
	$.each(data, function(idx, value) {
		$('#denomination').append(
				$("<label class='viettel btn icon-menhgia menhgia'>")
				.append($("<input>").attr("type","radio")
									.attr("data-productid",value.id)
									.attr("value",value.denomination)
									.attr("name","denomination"))
				.append($("<div class='denomination btn btn-default' style='font-size:12px;'>").text(currencyFormat(value.denomination)))
		);
	});
	
	$("#denomination label").first().find("input").attr("checked","checked");
	console.log("Bind denomination done !!!");
}

function handlerChangeDenomination(){
	// Change denomination
	$('#denomination > label > input[type=radio][name=denomination]').change(function(){
		var productId = $(this).data('productid');
		getRate(productId);
	});
}

function getTransactionType(){
	return $('#transType').val();
}

function getFee(provinceId, districtId){
	var url = BASE_URL + "/get-fee?provinceId="+provinceId+"&districtId="+districtId;
	$.ajax({
		type : 'GET',
		url : url
	}).done(function(data) {
		console.log(data);
		$("#shipAmount").text(data);
	}).fail(function(data) {
		console.log("ERROR: " + JSON.stringify(data));
	}).always(function(){
    });
}

function toViewDiscount(value){
	if(!value) $('#discount').text("0,00");
	
	discount = value;
	var fee_label = "Phí:";
	var discount_label = "Chiết khấu:";
	$('#discount').text(doubleFormatView(Math.abs(discount)));
	if(discount < 0){
		$("label[for='discount']").text(fee_label);
		$("label[for='discountConfirm']").text(fee_label);
	} else {
		$("label[for='discount']").text(discount_label);
		$("label[for='discountConfirm']").text(discount_label);
	}
	
}

function calculateMoney(){
	$('#price').text('');
	var price = $('input[type=radio][name=denomination]:checked').val();
//	var discount = $('#discount').text();
	var quantity = $('#quantity').val();
	if(!quantity) quantity = 1;
	var money = currencyFormat( (100 - discount) * (price * quantity)/100 );
	$('#price').text(money);
}

function goHome() {
	window.location.href = "/";
}
function reload() {
	window.location.reload();
}
function back() {
	window.history.back();
}

function currencyFormat(number) {
	if(isNaN(number)) return;
	var decimalplaces = 2;
	var decimalcharacter = ",";
	var thousandseparater = ".";
	number = parseFloat(number);
	var sign = number < 0 ? "-" : "";
	var formatted = new String(number.toFixed(decimalplaces));
	if (decimalcharacter.length && decimalcharacter != ",") {
		formatted = formatted.replace(/\./, decimalcharacter);
	}
	var integer = "";
	var strnumber = new String(formatted);
	var dotpos = decimalcharacter.length ? strnumber.indexOf(decimalcharacter) : -1;
	if (dotpos > -1) {
		if (dotpos) {
			integer = strnumber.substr(0, dotpos);
		}
	} else {
		integer = strnumber;
	}
	if (integer) {
		integer = String(Math.abs(integer));
	}
	temparray = new Array();
	while (integer.length > 3) {
		temparray.unshift(integer.substr(-3));
		integer = integer.substr(0, integer.length - 3);
	}
	temparray.unshift(integer);
	integer = temparray.join(thousandseparater);
	return sign + integer;
}


function showMessage(input) {
	if (input == "clean") {
		$('#alert').hide();
		$('#alert-PIN').hide();
		return;
	}
	if (input == true) {
		$('#alert').show();
		return;
	}
	$("#" + input.id + " > h4 > span").text(input.mes);
	$('#' + input.id).show();
}

function toDate(milliseconds){
	return new Date(milliseconds).toString("dd-MM-yyyy");
}
function ISOformat(dateStr){
	if(!dateStr) return "";
	var arrayDate = dateStr.split("/");
	return arrayDate[2] + "-" + arrayDate[1] + "-" + arrayDate[0];
}

function doubleFormatView(number){
	return parseFloat(number.toString()).toFixed(2).replace(/\./g, ",");
//	return number.toString().replace(/\./g, ",");
}
function doubleFormat(number){
	return number.toString().replace(/,/g, ".");
}
function numberFormat(number){
	return number.toString().replace(/\./g, "").replace(/,/g, "");
}

function Notify(){
	this.ok = function(title, message, callback){
		var noti = bootbox.alert({
			title: "<strong><img width='30px' src='/resources/images/icon-check.png'> "+title+"</strong>",
			message: message,
			callback: callback,
			backdrop:true,
			buttons: {
				ok: {
					label: 'Xác nhận',
					className: 'mainbtnpaydee'
				}
			}
		});
		return noti;
	}
	this.fail = function(title, message, callback){
		var noti = bootbox.alert({
			title: "<strong><img  width='30px' src='/resources/images/icon-error.png'> "+title+"</strong>",
			message: message,
			callback: callback,
			backdrop:true,
			buttons: {
				ok: {
					label: 'Xác nhận',
					className: 'mainbtnpaydee hide'
				}
			}
		});
		return noti;
	}
	this.error = function(array_error_obj){
		$("[id^=error]").remove();
		error = [];
		if(array_error_obj.length == 0) return;
		for(i = 0; i < array_error_obj.length; i ++){
			var font = "12px";
			var el_id = array_error_obj[i].id;
			var el_message = array_error_obj[i].message;
			if(el_message == undefined) {el_message = "Không kết nối được Server. Xin thử lại"}
			if(el_id == "alert") {
				font = "15px";
				$('#' + el_id).after("<div class='box-info' id='error" + i + "' style=' padding:5px; font-size:" + font + "'>"
						+ "<div class='col-xs-2 col-sm-2 col-md-2 padding-0 icon-error' style='text-align:center'>" +icon_error +"</div>"
						+ "<div class='col-xs-10 col-sm-10 col-md-10 padding-0'>"
						+ "<p style='float:none'><span style='color:#c9031c'>Thông báo</span><br>"+ el_message +"</p></div>" 
						+ "</div>")
				continue;
			}
			$('#' + el_id).after("<p id='error" + i + "' style='color: red;font-size:" + font + "'>" + el_message + "</p>")
		}
	}
	this.cleanError = function (){
		$("[id^=error]").remove();
	}
	this.confirm = function(message, callback){
		var noti = bootbox.confirm({
			message: message,
			callback: callback,
			buttons: {
				confirm: {
					label: 'Xác nhận',
					className: 'mainbtnpaydee'
				},
				cancel: {
					label: 'Hủy bỏ',
					className: 'subbtnpaydee'
				}
			}
		});
		return noti;
	};
	this.dialog = function(message,time){
		var noti = bootbox.dialog({message: message, closeButton:false});
		setTimeout(function(){
			noti.modal("hide");
		},time * 1000);
		return noti;
	}
}

function getLinkConfirm(requestId, code){
	if(isNaN(requestId)) requestId= "";
	var url = BASE_URL + "/giao-dich/xac-nhan?code=" + md5(code) + "&requestId=" + requestId;
	return url;
}

function setAuthenMethod(){
	var url_setAuthen = BASE_URL + "/thong-tin-ca-nhan/auth-method";
	$.ajax({
		type : 'GET',
		contenttype : 'application/json',
		url : url_setAuthen,
	}).done(function(data) {
		console.log("success setting authen-method... ");
	}).fail(function(data) {
		console.log("error setting authen-method... ");
	});
}

function handlerFailRequest(data){
	var message = Error_message.UNKNOW_ERROR;
	if(data.status == ErrorCode.FORBIDDEN){
		message = Error_message.FORBIDDEN;
		noti.fail("Thông báo", message, function(){goHome()});
		return;
	}
	error.push({message: message, id: "alert"});
	noti.error(error);
}