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
    $('#coupon').change(() => {
        console.log('check coupon: ' + form.coupon());
        checkCoupon(form.coupon());
    });

    // on change cod
    $('#cod').change(() => {
        buildText();
    });
    // on change amount
    buildText();
    $('#amount').keyup(() => {
        onChangeAmount();
    });
    $('#amount').change(() => {
        onChangeAmount();
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
            noti.error([{id:"alert", message: data.message}]);
            return;
        }
        noti.confirm(form.typeDes() + " thành công. Bạn muốn tạo thêm đơn?", function(result) {
            if (!result) {
                goHome();
            } else {
              window.location.href = URL_CREATE_ORDER_VIEW;
            };
        });
    }).fail(function(data) {
        console.log("ERROR: " + JSON.stringify(data));
    }).always(function(){
    });


}
function next() {
    if(form.validate().length != 0){
        noti.error(error);
        return;
    }
    noti.cleanError();

    getFee(form.provinceId(), form.districtId(), buildText());
    move();
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
    var shipAmount = form.shipAmount()? form.shipAmount(): 0;
    var coupon = form.couponAmount() ? form.couponAmount(): 0;
    var total = amount - (shipAmount - coupon);

    if(form.cod() == 'true'){
        goodAmountText = "Tiền thu hộ";
        actionText = total > 0 ? "Xe Nhàn nợ Shop" : "Shop nợ Xe nhàn";
    }
    if(form.cod() == 'false'){
        goodAmountText = "Tiền hàng";
        actionText = total > 0 ? "Xe Nhàn trả Shop" : "Shop trả Xe nhàn";
    }
    form.setShipAmount(currencyFormat(shipAmount - coupon));
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
    this.districtId = function(){ return $('#district').val()};

    this.province = function(){ return $('#province option:selected').text()};
    this.district = function(){ return $('#district option:selected').text()};
	this.note = function(){ return $('#note').val()};
    this.type = function(){ return $('#type').val()};

	this.cod = function(){ return $('#cod').val()};
    this.amount = function(){ return numberFormat($('#amount').val())};
    this.coupon = function(){ return $('#coupon').val()};
    this.couponAmount = function(){ return numberFormat($('#couponAmount').text())};
    this.shipAmount = function(){ return numberFormat($('#shipAmount').text())};

    this.setAmount = function(value){ return $('#amount').val(value)};
    this.setCoupon = function(value){ return $('#couponAmount').text(value)};
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

    return order;
}

