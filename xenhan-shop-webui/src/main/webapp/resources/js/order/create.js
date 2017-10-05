var noti = new Notify();
var form = new Form();
var url_bankFee = BASE_URL + "/";
// ============================================

// ON LOAD
$(document).ready(function($) {

});

function create() {
    //TODO: validate

    var order = makeModel();
    console.log(order);

}
function next() {
    getFee(form.provinceId(), form.districtId());
    move();
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

