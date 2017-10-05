var noti = new Notify();
var form = new Form();
var URL_CREATE_ORDER = BASE_URL + "/shop/create-order";
// ============================================

// ON LOAD
$(document).ready(function($) {
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
    $('#amount').change(() => {
        buildText();
    });

});

function create() {
    //TODO: validate

    var order = makeModel();
    $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : URL_CREATE_ORDER,
        data : JSON.stringify(order),
    }).done(function(data) {
        console.log(data);
        if(data.code != ErrorCode.SUCCESS){
            noti.error([{id:"alert", message: data.message}]);
            return;
        }
        noti.confirm("Tạo đơn hàng thành công. Bạn muốn tạo thêm đơn?", function(result) {
            if (!result) {
                goHome();
            };
        });
    }).fail(function(data) {
        console.log("ERROR: " + JSON.stringify(data));
    }).always(function(){
    });


}
function next() {
    getFee(form.provinceId(), form.districtId());
    move();
}

function checkCoupon(){
    noti.cleanError();
    var url = BASE_URL + "/check-coupon?coupon=" + form.coupon();
    $.ajax({
        type : 'GET',
        url : url
    }).done(function(data) {
        console.log(data);
        if(!data.data){
            form.setCoupon(0);
            noti.error([{id:"coupon", message: data.message}]);
            return;
        }
        var couponResponse = new CouponResponse();
        couponResponse = data.data;
        form.setCoupon(couponResponse.amount);

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
        actionText = total >= 0 ? "Xe Nhàn nợ Shop" : "Shop nợ Xe nhàn";
    }
    if(form.cod() == 'false'){
        goodAmountText = "Tiền hàng";
        actionText = total >= 0 ? "Xe Nhàn trả Shop" : "Shop trả Xe nhàn";
    }
    $('#amount-text').text(goodAmountText);
    $('#action').text(actionText);
    $('#totalAmount').text(Math.abs(total));
}

function move(){
    $('#info-receiver').toggle();
    $('#info-order').toggle();
}

// MODEL
function Form(){
    this.userName = function(){ return $('#userName').val()};
	this.phone = function(){ return $('#phone').val()};
	this.address = function(){ return $('#address').val()};
    this.provinceId = function(){ return $('#province').val()};
    this.districtId = function(){ return $('#district').val()};

    this.province = function(){ return $('#province option:selected').text()};
    this.district = function(){ return $('#district option:selected').text()};
	this.note = function(){ return $('#note').val()};

	this.cod = function(){ return $('#cod').val()};
    this.amount = function(){ return $('#amount').val()};
    this.coupon = function(){ return $('#coupon').val()};
    this.couponAmount = function(){ return $('#couponAmount').text()};
    this.setCoupon = function(value){ return $('#couponAmount').text(value)};
    this.shipAmount = function(){ return $('#shipAmount').text()};
}

function makeModel(){
    var order = new Order();
    order.cod = form.cod();

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

