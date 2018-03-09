var noti = new Notify();
var form = new Form();
var originalShipAmount = 0;
var districtSuggest;
var hadSelectDistrict = false;
var invokerDetect;
var coupons = [];
var ORDER_TYPE = 1;

var URL_CREATE_ORDER_VIEW = BASE_URL + "/order/tao-don-lay-hang?type=0";
var URL_CREATE_ORDER = BASE_URL + "/order/create-order";
var URL_EDIT_ORDER = BASE_URL + "/order/edit";
var URL_DETECT = BASE_URL + "/detect?address=";
var URL_GET_COUPON = BASE_URL + "/shop/get-coupons";
// ============================================

// ON LOAD
$(document).ready(function() {
    handChangeCoupon();
    handChangeAmount();
    handEditOrder();
    handBtnCreateClick();
    handChangeProvince();
    handChangeAddress();
    handChangeCOD();
});

function handChangeCOD() {
    $('input[type=radio][name=type-order]').change(function() {
        $('[name^=amount-label]').toggle();
        form.setAmount(0);
        handChangeAmount();
    });
}

function handChangeAddress() {
    $('#address').keyup(function () {
        getSuggest();
        $("#error1").remove();
    });
    eventClickSuggest();

    // user selected district
    $('[id^=district-]').click(function () {
        hadSelectDistrict = true;
    })
}

function handChangeProvince() {
    $('#pickupDistrict-' + form.provinceId()).show();
    $('#district-' + form.provinceId()).show();
    $('#province').change(function () {
        $("[id^=district]").hide();
        $("[id^=pickupDistrict]").hide();
        $('#pickupDistrict-' + form.provinceId()).show();
        $('#district-' + form.provinceId()).show();
    });
}

function handBtnCreateClick() {
    $("#btn-create").click(function () {
        $(this).attr("disabled","disabled");
    });
}

function handEditOrder() {
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
}

function handChangeCoupon() {
    $('#coupon').change(function() {
        checkCoupon(form.coupon());
    });
    $('#coupon').click(function () {
        getCoupons();
    });
}

function handChangeAmount() {
    buildText();
    $('#amount').keyup(function() {
        onChangeAmount();
    });
    $('#amount').change(function() {
        onChangeAmount();
    });
    
}

function getSuggest(){
    var address = form.address();
    if(!address) {
        clearSuggest(); return;
    }
    clearTimeout(invokerDetect);
    invokerDetect = setTimeout(function () {
        address = cleanAddress(address);

        var detectResult = detect(address, form.province());
        detectResult.done(function (data) {
                        buildSuggest(data);
                    }).fail(function (data) {
                        console.log("--> detect error:"+JSON.stringify(data));
                    })
    }, 500);

}
function cleanAddress(address) {
    var removeKeys = ["số","ngõ","ngách","phường","làng","tổ","lô","kđt","phố","khu","đường","tòa","nhà","phòng"];
    address = address.toLowerCase();
    removeKeys.forEach(function (key) {
        address = address.replace(key,'');
    })
    address = address.replace(/[a-z][0-9]/g, '').replace(/[0-9][a-z]/g, '').replace(/[a-z]\./g, '')
                     .replace(/[0-9]/g, '').replace(/\//g, '').replace(/  /g, ' ');
    return address.trim();

}

function buildSuggest(response){
    if(response.code != 1) {
        clearSuggest(); return;
    }
    if(response.data.id == 0) {
        clearSuggest(); return;
    }
    if(response.data.id != form.provinceId()) {
        clearSuggest(); return;
    }

    districtSuggest = response.data.district.id;
    var district = response.data.district.name;
    var province = response.data.name;
    writeSuggest(form.address() + ", " + district + ", " + province);
    showSuggest();
}
function clearSuggest(){
    districtSuggest = 0;
    if(!hadSelectDistrict){
        form.setDistrictId(districtSuggest);
    }
    writeSuggest("");
    $('#suggest-area').hide();
}
function showSuggest(){
    $('#suggest-area').show();
}
function hideSuggest(){
    $('#suggest-area').hide();
}
function writeSuggest(address){
    $('#suggest-area').text(address);
}
function eventClickSuggest(){
    $('#suggest-area').click(function () {
        form.setDistrictId(districtSuggest);
        hideSuggest();
    })
}


function detect(address, province){
    return $.ajax({ type : 'GET', url : URL_DETECT + address + "&province=" + province })
}

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

        noti.confirmWithBtn(icon_check + form.typeDes() + " số <strong> "+ data.data.id+"</strong>" + " thành công. Bạn muốn tạo thêm đơn?","Có", "Không",
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

    getFee(form.provinceId(), form.pickupDistrictId(), form.id());
    move();
}


function getFee(provinceId, districtId, orderId){

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

function clearTab2() {
    if(form.type() != '1'){
        form.setAmount(0);
        form.setCouponCode("");
        form.setCoupon("");
    }
    var couponUseQuick = $("#coupon-use-quick").val();
    if(couponUseQuick && couponUseQuick != ''){
        form.setCouponCode(couponUseQuick);
        checkCoupon();
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
    var amount = form.amount() ? form.amount(): 0;
    var coupon = form.couponAmount() ? form.couponAmount(): 0;
    var finalAmount = Number(amount) + Number(originalShipAmount - coupon);

    form.setShipAmount(currencyFormat(originalShipAmount - coupon));
    form.setTotalAmount(currencyFormat(Math.abs(finalAmount)));
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
    this.setDistrictId = function(value){ return $('#district-' + this.provinceId()).val(value)};
    this.province = function(){ return $('#province option:selected').text()};
    this.district = function(){ return $('#district-' + this.provinceId() + ' option:selected').text()};

    this.shopPhone = function(){ return $('#shopPhone').val()};
    this.pickupAddress = function(){ return $('#pickupAddress').val()};
    this.pickupDistrictId = function(){ return $('#pickupDistrict-' + this.provinceId()).val()};
    this.pickupDistrict = function(){ return $('#pickupDistrict-' + this.provinceId() + '  option:selected').text()};

	this.note = function(){ return $('#note').val()};
    this.type = function(){ return $('#type').val()};
    this.orderCreatedDate = function(){ return $('#created-time').val()};
    this.shopName = function(){ return $('#shop-name').val()};

    this.cod = function() { return $('input[name=type-order]:checked').val() };
    this.amount = function(){ return numberFormat($('#amount').val())};
    this.coupon = function(){ return $('#coupon').val()};
    this.couponAmount = function(){ return numberFormat($('#couponAmount').text())};
    this.shipAmount = function(){ return numberFormat($('#shipAmount').text())};


    this.setAmount = function(value){ return $('#amount').val(value)};
    this.setCoupon = function(value){ return $('#couponAmount').text(value)};
    this.setCouponCode = function(value){ return $('#coupon').val(value)};
    this.setShipAmount = function(value){ return $('#shipAmount').text(value)};
    this.setTotalAmount = function(value){ return $('#totalAmount').text(value)};

    this.typeDes = function(){ return $('#type-des').val()};

    this.validate = function (){
        if(!this.phone()){
            error.push({message: Error_message.EMPTY_PHONE, id: "phone"});
        }
        if(this.phone() && !validatePhone(this.phone())){
            error.push({message: Error_message.PHONE_INVALID_FORMAT, id: "phone"});
        }
        if(!this.shopPhone()){
            error.push({message: Error_message.EMPTY_PHONE_CONFIRM, id: "shopPhone"});
        }
        if(this.shopPhone() && !validatePhone(this.shopPhone())){
            error.push({message: Error_message.PHONE_INVALID_FORMAT, id: "shopPhone"});
        }
        if(!this.address()){
            error.push({message: Error_message.EMPTY_ADDRESS, id: "address"});
        }
        if(!this.pickupAddress()){
            error.push({message: Error_message.EMPTY_ADDRESS, id: "pickupAddress"});
        }
        if(!this.districtId() || this.districtId() == 0){
            error.push({message: "Vui lòng chọn Quận/Huyện giao hàng", id: "district-" + this.provinceId()});
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
    dropoff.town = {
        id: form.provinceId(),
        name: form.province(),
        district:{
            id: form.districtId(),
            name: form.district()
        }
    }

    order.dropoff = dropoff;
    order.goodAmount = form.amount();
    order.shipAmount = form.shipAmount();
    order.coupon = form.coupon();

    order.pickupAddress = form.pickupAddress();
    order.pickupProvince = form.province();
    order.pickupDistrict = form.pickupDistrict();
    order.pickupPhone = form.shopPhone();
    order.type = ORDER_TYPE;

    return order;
}

function disableCouponWhenDiscountTime(){
    if(form.type() != '1'){
        $('#coupon').removeAttr('disabled');
    }
    if(form.shipAmount() == '15000'){
        $('#coupon').attr('disabled', 'disabled');
    }
}

function getCoupons() {
    if(coupons.length != 0){
        buildMenuCoupons(coupons);
        return;
    }
    var request = { status:3}
    $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : URL_GET_COUPON,
        data : JSON.stringify(request),
    }).done(function (data) {
        coupons = data;
        buildMenuCoupons(data);
    }).fail(function (data) {
        console.log("error -> ", data);
        buildMenuCoupons([]);
    })
}
function buildMenuCoupons(coupons) {
    var menu = $("#coupons");

    coupons = coupons.filter(function (coupon) {
        var expirationDate = coupon.expirationDate;
        return expirationDate > new Date().getTime();
    });
    if(coupons.length == 0){
        menu.hide();
        return;
    }

    menu.empty();
    coupons.forEach(function (coupon) {
        var expiration = moment(coupon.expirationDate).format("DD/MM/YYYY HH:mm")
        menu.append("<li role='presentation' style='text-align: center'>" +
            "<a role='menuitem' tabindex='-1' href='#' onclick='useCoupon(\""+coupon.pinCode+"\")'>"
                + coupon.pinCode
                +"<br><span style='color: #999; font-size:smaller;'>"+ expiration + "</span>"
            +"</a></li>")
        menu.append("<li role='presentation' class='divider' style='margin: 0px'></li>")
    })
}
function useCoupon(coupon) {
    form.setCouponCode(coupon);
    checkCoupon();
}