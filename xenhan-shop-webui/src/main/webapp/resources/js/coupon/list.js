var coupons = [];
var couponSelected = "";
var URL_GET = BASE_URL + "/shop/get-coupons";
var URL_CREATE_PICKUP = BASE_URL + "/order/tao-don-lay-hang?type=0&coupon=";
var URL_CREATE_DROPOFF = BASE_URL + "/order/tao-don-giao-hang?type=0&coupon=";
var URL_CREATE_DROPOFF_2 = BASE_URL + "/order/tao-don-giao-hang?type=0";
var URL_GET_CHECK = BASE_URL + "/shop/check-time";
// ================================================================
$(document).ready(function($) {
	get();
	onSelect();
});

function onSelect() {
	$("#status").change(function() {
		get($(this).val());
	});

}

function get(status) {
	coupons = [];
	buildTable();

	$.ajax({
		type : 'POST',
		url : URL_GET,
		contentType : 'application/json',
		data : JSON.stringify(makeRequest(status))
	}).done(function(data) {
		data = data.filter(function(coupon) {
			return coupon.expirationDate > new Date().getTime()
		});
		buildTable(data);
	}).fail(function(data) {
	});
}

function makeRequest(status) {
	if (!status)
		status = 3;
	return {
		status : status
	}
}

function buildTable(coupons) {
	var table = $('#table-coupons');
	table.empty();
	if (!coupons || coupons.length == 0)
		return;

	table.hide();
	coupons
			.forEach(function(coupon, i) {
				var color = coupon.status == 3 ? "#92c78a" : "red";
				var trigger = "";

				if (coupon.status == 3) {

					trigger = "data-toggle='tooltip' title='Click để sử dụng mã' onclick=use('"
							+ coupon.pinCode + "')";
				}

				table.append($("<tr " + trigger + ">").append(
						$("<td align='left'>").text(i + 1)).append(
						$(
								"<td align='left' style='font-weight: bold; color:"
										+ color + "'>").text(coupon.pinCode))
						.append(
								$("<td align='left'>").text(
										currencyFormat(coupon.denomination)))
						.append(
								$("<td align='left'>").text(
										ddMMyyyy(coupon.expirationDate))));
			});
	$("#total").text(coupons.length);
	table.fadeIn();
	$('[data-toggle="tooltip"]').tooltip();
}

function use(coupon) {
	if (!coupon)
		return;
	var time = new Date()
	$
			.ajax({
				type : 'POST',
				url : URL_GET_CHECK,
				contentType : 'application/json',
				data : JSON.stringify(time)
			})
			.done(
					function(data) {
						var obj = JSON.parse(data);
						var check = 'on';

						var statuscheck = obj.data.statusTimeDisCount;
						if (obj.data.inValidateDiscountTime) {
							window.location.href = URL_CREATE_DROPOFF + coupon;
						} else {
							warningInvalidTimeCoupon("\n  Từ 01 - 10.06:Mã khuyến mại không được sử dụng trong khoảng thời gian từ "
									+ obj.data.startDiscountTime
									+ " - "
									+ obj.data.endDiscountTime
									+ " trong ngày  cho đơn giao Nội thành HCM <br> Xin cảm ơn !");
							  setTimeout(myFunction, 1500);
						/*	window.location.href = URL_CREATE_DROPOFF*/
							/*window.location.href = URL_CREATE_DROPOFF + coupon;*/

						}
					});
}
function createPickupOrder() {
	/*window.location.href = URL_CREATE_PICKUP + couponSelected;*/
	window.location.href = URL_CREATE_DROPOFF + couponSelected;
}

function warningInvalidTimeCoupon(mess) {
	$
			.notify(
					{
						// options
						icon : 'glyphicon glyphicon-warning-sign',
						title : 'Xe Nhàn :',
						message : mess
					},
					{
						// settings
						delay : 5000,
						timer : 1000,
						element : 'body',
						position : null,
						type : "warning",
						allow_dismiss : true,
						newest_on_top : true,
						placement : {
							from : "top",
							align : "center"
						},
						offset : 20,
						spacing : 10,
						z_index : 1031,
						animate : {
							enter : 'animated fadeInDown',
							exit : 'animated fadeOutUp'
						},
						icon_type : 'class',
						template : '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">'
								+ '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>'
								+ '<div><span data-notify="icon"></span> '
								+ '<span data-notify="title">{1}</span></div> '
								+ '<div><span data-notify="message">{2}</span></div>'
								+ '<div class="progress" data-notify="progressbar">'
								+ '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>'
								+ '</div>'
								+ '<a href="{3}" target="{4}" data-notify="url"></a>'
								+ '</div>'
					});
}
function createDropoffsOrder() {
	window.location.href = URL_CREATE_DROPOFF + couponSelected;
}

function myFunction() {
	
	window.location.href = URL_CREATE_DROPOFF_2;
}
