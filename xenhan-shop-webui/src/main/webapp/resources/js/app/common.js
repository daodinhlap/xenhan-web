var error = [];
var discount;
var hotline = "!<br><br>Hotline hỗ trợ: <a href='tel:02871099710'>028 71099710</a>";
var pathImage = "/resources/images/";
var ext = ".png";
var icon_check = "<img width='30px' src='/resources/images/icon-check.png'>&nbsp;";
var icon_error = "<img width='42px' src='/resources/images/icon-error.png'>";

var provinces = new Array({value: 1, text: 'Hà Nội'},  {value: 2, text: 'Hồ Chí Minh'});
var districts = {
	    1: [{value:3, text: 'Ba Đình'},
	        {value:10, text: 'Bắc Từ Liêm'},
	        {value: 6, text: 'Cầu Giấy'},
	        {value: 4, text: 'Đống Đa'},
	        {value: 2, text: 'Hai Bà Trưng'},
	        {value: 1, text: 'Hoàn Kiếm'},
	        {value: 9, text: 'Hoàng Mai'},
	        {value: 29, text: 'Hà Đông'},
	        {value: 12, text: 'Gia Lâm'},
	        {value: 8, text: 'Long Biên'},
	        {value: 11, text: 'Nam Từ Liêm'},
	        {value: 7, text: 'Tây Hồ'},
	        {value: 5, text: 'Thanh Xuân'},
	        {value: 15, text: 'Thanh Trì'},

	        {value: 25, text: 'Ba Vì'},
	        {value: 13, text: 'Đông Anh'},
	        {value: 28, text: 'Mê Linh'},
	        {value: 20, text: 'Mỹ Đức'},
	        {value: 23, text: 'Hoài Đức'},
	        {value: 21, text: 'Chương Mỹ'},
	        {value: 18, text: 'Phú Xuyên'},
	        {value: 26, text: 'Phúc Thọ'},
	        {value: 16, text: 'Quốc Oai'},
	        {value: 14, text: 'Sóc Sơn'},
	        {value: 30, text: 'Sơn Tây'},
	        {value: 24, text: 'Thanh Oai'},
	        {value: 17, text: 'Thường Tín'},
	        {value: 27, text: 'Thạch Thất'},
	        {value: 22, text: 'Đan Phượng'},
	        {value: 19, text: 'Ứng Hòa'}],

	    2: [{value: 31, text: 'Quận 1'},
	        {value: 32, text: 'Quận 2'},
	        {value: 33, text: 'Quận 3'},
	        {value: 34, text: 'Quận 4'},
	        {value: 35, text: 'Quận 5'},
	        {value: 36, text: 'Quận 6'},
	        {value: 37, text: 'Quận 7'},
	        {value: 38, text: 'Quận 8'},
	        {value: 39, text: 'Quận 9'},
	        {value: 40, text: 'Quận 10'},
	        {value: 41, text: 'Quận 11'},
	        {value: 42, text: 'Quận 12'},

	        {value: 51, text: 'Bình Chánh'},
	        {value: 44, text: 'Bình Thạnh'},
	        {value: 48, text: 'Bình Tân'},
	        {value: 53, text: 'Cần Giờ'},
	        {value: 49, text: 'Củ Chi'},
	        {value: 43, text: 'Gò Vấp'},
	        {value: 50, text: 'Hóc Môn'},
	        {value: 52, text: 'Nhà Bè'},
	        {value: 47, text: 'Phú Nhuận'},
	        {value: 54, text: 'Thủ Đức'},
	        {value: 45, text: 'Tân Bình'},
	        {value: 46, text: 'Tân Phú'}]
	};


var images = {
		account:"icon-taikhoan"
}


$( document ).ready(function() {
	loadFacebookMessenger();

	// enable bootstrap tooltip
    $('[data-toggle="tooltip"]').tooltip();
});

function setHighlight(li,className,image){
	li.filter(className).addClass("menu-active")
		.find("a").css( "color", "white" )
		.find("img").attr("src", pathImage + image + "-active.png");
}

// function imagesLink(issuerCode) {
// 	switch (issuerCode) {
// 	case "VTT":
// 		return pathImage + images.viettel + ext; break;
// 	}
// }

function validatePhone(phone) {
	var re = /^[0-9]{8,15}$/;
	return re.test(phone);
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
	if(isNaN(number)) return 0;
    if(!number) return 0;
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
				$('#' + el_id).after("<div class='box-info' id='error" + i + "' style='border: 1px solid red; padding:5px; font-size:" + font + "'>"
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
	
    this.confirmWithBtn = function(message, btn_yes, btn_no, callback){
        var noti = bootbox.confirm({
            message: message,
            callback: callback,
            buttons: {
                confirm: {
                    label: btn_yes,
                    className: 'mainbtnpaydee'
                },
                cancel: {
                    label: btn_no,
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

function ddMMyyyy(long){
    if(long <= 0) return "";

    date = new Date(long);
    var dd = date.getDate();
    var mm = date.getMonth()+1;

    var yyyy = date.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    return dd+'/'+mm+'/'+yyyy;
}

function ddMM(long){
    if(long <= 0) return "";

    date = new Date(long);
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var h = date.getHours();
    var m = date.getMinutes();

    var yyyy = date.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    return dd+'/'+mm+ ' ' + h+':'+m;
}

function yyyy_mm_dd(dateStr, type){
    var el = dateStr.split("/");
    if(type == "begin"){
        return el[2]+"-"+el[1]+"-"+el[0] + " 00:00:00";
    }
    if(type == "end"){
        return el[2]+"-"+el[1]+"-"+el[0] + " 23:59:59";
    }
    return "";
}
function orderStatus(status){
    if (status < 100) return 'Tìm Ship';
    if (status >= 100 && status < 200)
        return 'Chờ lấy hàng';
    if (status == 200)
        return 'Đã giao';
    if (status > 200 && status < 400) {
        // return 'Đang giao';
        if (status == 201)
            return 'Đang về kho';
        if (status % 2 == 0)
            return 'Lưu kho';
        if (status % 2 != 0)
            return 'Đang giao';
    }

    if (status == 400)
        return 'Đã trả lại';
    if (status > 400 && status < 500) {
        if (status == 401)
            return 'Đang về kho';
        if (status % 2 == 0)
            return 'Lưu kho';
        if (status % 2 != 0)
            return 'Đang trả lại';
    }
    // return 'Trả lại';
    if (status == 500)
        return 'Đã hủy';
    if (status > 500 && status < 600) {
        if (status == 501)
            return 'Đang về kho';
        if (status % 2 == 0)
            return 'Lưu kho';
        if (status % 2 != 0)
            return 'Đang trả lại';
    }
    return '';
}

function corlorStatus(status) {
    if (status < 100) return 'status-find-ship';
    if (status >= 100 && status < 200) return 'status-waiting';
    if (status == 200) return 'status-dropoff';
    if (status > 200 && status < 400) return 'status-delivering';
    if (status >= 400 && status < 500) return 'status-return';
    if (status >= 500 && status < 600) return 'status-cancel';
    return '';
}

function loadFacebookMessenger() {
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=170527870194428";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $(document).ready(function () {
        var t = {delay: 125, overlay: $(".fb-overlay"), widget: $(".fb-widget"), button: $(".fb-button")};
        setTimeout(function () {
            $("div.fb-livechat").fadeIn()
        }, 8 * t.delay), $(".ctrlq").on("click", function (e) {
            e.preventDefault(), t.overlay.is(":visible") ? (t.overlay.fadeOut(t.delay), t.widget.stop().animate({
                bottom: 0,
                opacity: 0
            }, 2 * t.delay, function () {
                $(this).hide("slow"), t.button.show()
            })) : t.button.fadeOut("medium", function () {
                t.widget.stop().show().animate({bottom: "30px", opacity: 1}, 2 * t.delay), t.overlay.fadeIn(t.delay)
            })
        })
    });
}
