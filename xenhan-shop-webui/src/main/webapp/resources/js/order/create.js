var noti = new Notify();
var form = new Form();
var originalShipAmount = 0;

var URL_CREATE_ORDER_VIEW = BASE_URL + "/order/tao-don?type=0";
var URL_CREATE_ORDER = BASE_URL + "/order/create-order";
var URL_EDIT_ORDER = BASE_URL + "/order/edit";
// ============================================

// ON LOAD
$(document).ready(function() {
    // on change coupon
    $('#coupon').change(function() {
        console.log('check coupon: ' + form.coupon());
        checkCoupon(form.coupon());
    });

    // on change cod
    $('#cod').change(function() {
        buildText();
    });
    // on change amount
    buildText();
    $('#amount').keyup(function() {
        onChangeAmount();
    });
    $('#amount').change(function() {
        onChangeAmount();
    });

    // button create on click
    $("#btn-create").click(function () {
        $(this).attr("disabled","disabled");
    });

    // check condition edit order
    var orderStatus = $('#order-status').val();
    var isCOD = form.cod();

    if(form.type() == '1' && orderStatus > 200 && orderStatus < 300){
        $('#cod').attr("disabled", 'disabled');
    }
    if(form.type() == '1'){
        $('#coupon').attr("disabled", 'disabled');
    }
    if(form.type() == '1' && orderStatus >= 200){
        $('#pickupAddress').attr("disabled", 'disabled');
        $('#province').attr("disabled", 'disabled');
        $('[id^=pickupDistrict]').attr("disabled", 'disabled');
    }
    if(form.type() == '1' && isCOD == "false" && ( orderStatus >= 200 && orderStatus < 300)){
        $('#address').attr("disabled", 'disabled');
        $('#province').attr("disabled", 'disabled');
        $('[id^=district]').attr("disabled", 'disabled');
        $('#amount').attr("disabled", 'disabled');
    }

    //onChangeProvince
    $('#pickupDistrict-' + form.provinceId()).show();
    $('#district-' + form.provinceId()).show();
    $('#province').change(function () {
        $("[id^=district]").hide();
        $("[id^=pickupDistrict]").hide();
        $('#pickupDistrict-' + form.provinceId()).show();
        $('#district-' + form.provinceId()).show();
    });
});
function onChangeAmount() {
    buildText();
    form.setAmount(currencyFormat(form.amount()));
}

function create() {
    var orderRequest = makeModel();
    var url = URL_CREATE_ORDER;
    if(form.type() == 1){
        url = URL_EDIT_ORDER;
    }
    $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : url,
        data : JSON.stringify(orderRequest),
    }).done(function(data) {
        console.log(data);
        if(data.code != ErrorCode.SUCCESS){
            // noti.error([{id:"alert", message: data.message}]);
            noti.fail("Tạo đơn không thành công", data.message, function(){});
            return;
        }

        if(form.type() == '1'){
            noti.dialog('Sửa đơn hàng thành công', 2);
            setTimeout(function(){goHome()}, 2000);
            return;
        }

        noti.confirmWithBtn(form.typeDes() + " số <strong> "+ data.data.id+"</strong>" + " thành công. Bạn muốn tạo thêm đơn?","Có", "Không",
            function(result) {
                if (!result) {
                    goHome();
                } else {
                  window.location.href = URL_CREATE_ORDER_VIEW;
                };
        });
    }).fail(function(data) {
        console.log("ERROR: " + JSON.stringify(data));
    }).always(function(){
        $("#btn-create").removeAttr("disabled");
    });


}
function next() {
    if(form.validate().length != 0){
        noti.error(error);
        return;
    }
    noti.cleanError();

    clearTab2();
    getFee(form.provinceId(), form.districtId(), form.id());
    move();
}


function getFee(provinceId, districtId, orderId){
    // disableCouponWhenDiscountTime(districtId, provinceId);

    if(form.type() == '2') orderId = "";
    var url = BASE_URL + "/get-fee";
    url += "?provinceId=" + provinceId;
    url += "&districtId=" + districtId;
    url += "&time=" + (form.orderCreatedDate() && form.type() == '1' ? form.orderCreatedDate() : 0);
    url += "&order-id=" + orderId;
    $.ajax({
        type : 'GET',
        url : url
    }).done(function(data) {
        console.log(data);

        originalShipAmount = data;
        form.setShipAmount(currencyFormat(data));
        disableCouponWhenDiscountTime();
        buildText();
    }).fail(function(data) {
        console.log("ERROR: " + JSON.stringify(data));
    }).always(function(){
    });
}

function  clearTab2() {
    if(form.type() != '1'){
        form.setAmount(0);
        form.setCouponCode("");
        form.setCoupon("");
    }
}

function checkCoupon(){
    noti.cleanError();
    if(!form.coupon()){
        form.setCoupon(0);
        form.setShipAmount(currencyFormat(originalShipAmount));
        buildText();
        return;
    }

    var url = BASE_URL + "/check-coupon?coupon=" + form.coupon();
    $.ajax({
        type : 'GET',
        url : url
    }).done(function(data) {
        console.log(data);
        if(!data.data){
            form.setCoupon(0);
            form.setShipAmount(currencyFormat(originalShipAmount));
            buildText();
            noti.error([{id:"coupon", message: data.message}]);
            return;
        }
        var couponResponse = new CouponResponse();
        couponResponse = data.data;
        form.setCoupon(currencyFormat(couponResponse.amount));

        buildText();

    }).fail(function(data) {
        console.log("ERROR: " + JSON.stringify(data));
    }).always(function(){
    });

}

function buildText(){
    var goodAmountText= '';
    var actionText = '';

    var amount = form.amount() ? form.amount(): 0;
    var coupon = form.couponAmount() ? form.couponAmount(): 0;
    var total = amount - (originalShipAmount - coupon);

    if(form.cod() == 'true'){
        goodAmountText = "Tiền thu hộ";
        actionText = total > 0 ? "Xe Nhàn nợ Shop" : "Shop nợ Xe nhàn";
    }
    if(form.cod() == 'false'){
        goodAmountText = "Tiền hàng";
        actionText = total > 0 ? "Xe Nhàn trả Shop" : "Shop trả Xe nhàn";
    }
    form.setShipAmount(currencyFormat(originalShipAmount - coupon));
    $('#amount-text').text(goodAmountText);
    $('#action').text(actionText);
    $('#totalAmount').text(currencyFormat(Math.abs(total)));
}

function move(){
    $('#info-receiver').toggle();
    $('#info-order').toggle();
}

// MODEL
function Form(){
    this.id = function(){ return $('#order-id').val()};
    this.userName = function(){ return $('#userName').val()};
	this.phone = function(){ return $('#phone').val()};

	this.address = function(){ return $('#address').val()};
    this.provinceId = function(){ return $('#province').val()};
    this.districtId = function(){ return $('#district-' + this.provinceId()).val()};
    this.province = function(){ return $('#province option:selected').text()};
    this.district = function(){ return $('#district-' + this.provinceId() + ' option:selected').text()};

    this.pickupAddress = function(){ return $('#pickupAddress').val()};
    this.pickupDistrictId = function(){ return $('#pickupDistrict-' + this.provinceId()).val()};
    this.pickupDistrict = function(){ return $('#pickupDistrict-' + this.provinceId() + '  option:selected').text()};

	this.note = function(){ return $('#note').val()};
    this.type = function(){ return $('#type').val()};
    this.orderCreatedDate = function(){ return $('#created-time').val()};
    this.shopName = function(){ return $('#shop-name').val()};

	this.cod = function(){ return $('#cod').val()};
    this.amount = function(){ return numberFormat($('#amount').val())};
    this.coupon = function(){ return $('#coupon').val()};
    this.couponAmount = function(){ return numberFormat($('#couponAmount').text())};
    this.shipAmount = function(){ return numberFormat($('#shipAmount').text())};


    this.setAmount = function(value){ return $('#amount').val(value)};
    this.setCoupon = function(value){ return $('#couponAmount').text(value)};
    this.setCouponCode = function(value){ return $('#coupon').val(value)};
    this.setShipAmount = function(value){ return $('#shipAmount').text(value)};

    this.typeDes = function(){ return $('#type-des').val()};

    this.validate = function (){
        if(!this.phone()){
            error.push({message: Error_message.EMPTY_PHONE, id: "phone"});
        }
        if(this.phone() && !validatePhone(this.phone())){
            error.push({message: Error_message.PHONE_INVALID_FORMAT, id: "phone"});
        }
        if(!this.address()){
            error.push({message: Error_message.EMPTY_ADDRESS, id: "address"});
        }
        if(!this.pickupAddress()){
            error.push({message: Error_message.EMPTY_ADDRESS, id: "pickupAddress"});
        }
        return error;
    }
}

function makeModel(){
    var order = new OrderRequest();
    order.orderId = form.id();
    order.cod = form.cod();
    order.orderMessage = form.note();

    var dropoff = new Dropoff();
    dropoff.address = form.address();
    dropoff.province = form.province();
    dropoff.district = form.district();
    dropoff.contact = new Contact(form.userName(), form.phone());

    order.dropoff = dropoff;
    order.goodAmount = form.amount();
    order.shipAmount = form.shipAmount();
    order.coupon = form.coupon();

    order.pickupAddress = form.pickupAddress();
    order.pickupProvince = form.province();
    order.pickupDistrict = form.pickupDistrict();

    return order;
}

function disableCouponWhenDiscountTime(districtId, provinceId){
    if(form.type() != '1') $('#coupon').removeAttr('disabled');
    // // thanh tri,gia lam,Hóc Môn, Bình Chánh, Nhà Bè.
    // var ignoreShop = ["XENHAN-SHOP-HN_shop-Van-Anh-1504693352291","XENHAN-SHOP-HN_shop-VanAnh3010-1509351903975"];
    // var applyProvince = [2];
    // var ignoreDistricts = [15,12,50,51,52];
    //
    // var start_day = 1510678800000; // 15/11
    // var end_day = 1511197199000; // 20/11
    // // var start = "1511110800000"; //20/11
    // // var end = "1511715599000"; // 26/11
    // var start_time = 16;
    // var end_time = 18;
    //
    // // checking...
    // if(ignoreShop.includes(form.shopName())) return;
    // if(provinceId && !applyProvince.includes(Number(provinceId))) return;
    // if(districtId && ignoreDistricts.includes(Number(districtId))) return;
    //
    // var now = new Date();
    // var hours = now.getHours();
    // if(now.getTime() < start_day || now.getTime() > end_day) return;
    // if(start_time < end_time && (hours < start_time || hours > (end_time - 1))) return;
    // if(start_time > end_time && (hours < start_time && hours > (end_time - 1))) return;

    // $('#coupon').attr('disabled', 'disabled');

    if(form.shipAmount() == '15000'){
        $('#coupon').attr('disabled', 'disabled');
    }
}

