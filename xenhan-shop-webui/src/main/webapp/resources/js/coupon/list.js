var coupons = [];
var URL_GET = BASE_URL + "/shop/get-coupons";
var URL_CREATE_ORDER = BASE_URL + "/order/tao-don?type=0&coupon=";
//================================================================
$(document).ready(function($) {
    get();
    onSelect();
});

function onSelect() {
    $("#status").change(function () {
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
        data = data.filter(function(coupon){ return coupon.expirationDate > new Date().getTime()});
        buildTable(data);
    }).fail(function(data) {
    });
}

function makeRequest(status){
    if(!status) status = 3;
    return { status: status }
}

function buildTable(coupons) {
    var table = $('#table-coupons');
    table.empty();
    if(!coupons || coupons.length == 0) return;

    table.hide();
    coupons.forEach(function(coupon, i){
        var color = coupon.status == 3 ? "#92c78a" : "red";
        var trigger = "";
        if(coupon.status == 3){
            trigger = "data-toggle='tooltip' title='Click để sử dụng mã' onclick=use('"+coupon.pinCode+"')";
        }
        table.append(
            $("<tr "+trigger+">")
                .append($("<td align='left'>").text(i+1))
                .append($("<td align='left' style='font-weight: bold; color:"+color+"'>").text(coupon.pinCode))
                .append($("<td align='left'>").text(currencyFormat(coupon.denomination)))
                .append($("<td align='left'>").text(ddMMyyyy(coupon.expirationDate)))
        );
    });
    $("#total").text(coupons.length);
    table.fadeIn();
    $('[data-toggle="tooltip"]').tooltip();
}

function use(coupon) {
    if(!coupon) return;
    window.location.href = URL_CREATE_ORDER + coupon;
}