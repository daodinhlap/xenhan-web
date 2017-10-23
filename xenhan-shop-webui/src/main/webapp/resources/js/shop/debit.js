var form = new Form();
var noti = new Notify();
var debits = [];
var debitSelected = {};

var URL_DEBIT = BASE_URL + "/shop/debit";
var URL_SHOP_PAYMENT = BASE_URL + "/shop/shop-payment";
//================================================================
//ON LOADED
$(document).ready(function($) {
    //Date picker
    configDatePicker(['fromDate', 'toDate']);
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    $('#fromDate').val(ddMMyyyy(firstDay.getTime()));
    $('#toDate').val(ddMMyyyy(today.getTime()));

    //get Debit
    getDebit();
});

function getDebit(index) {
    debits = [];
    buildTable();

    var request = form.getRequest();
    request.index = index? index: 1;
    request.fromDate = yyyy_mm_dd(request.fromDate, "begin");
    request.toDate = yyyy_mm_dd(request.toDate, "end");

    $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : URL_DEBIT,
        data : JSON.stringify(request)
    }).done(function(data) {
        console.log(data);
        if (ErrorCode.SUCCESS != data.code) {
            noti.error([{message: data, id: "alert"}]);
            return;
        }
        debits = data.data.page.pageItems;
        buildTable(data.data.page);
        buildTotal(data.data.simpleTotal);

    }).fail(function(data) {
        console.log(data);
        noti.fail("Thông báo!","Có lỗi xảy ra. Xin vui lòng thử lại sau", function() { reload() });
    }).always(function () {
    });

}

function getShopPayment(debitId, index) {
    if(debitId){
        debitSelected = debits.find(function(debit){ return debit.id == debitId; });
    }

    var request = {
        orderId: form.orderId(),
        shopDebit: debitSelected,
        index: index? index: 1
    }

    $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : URL_SHOP_PAYMENT,
        data : JSON.stringify(request)
    }).done(function(data) {
        console.log(data);
        if (ErrorCode.SUCCESS != data.code) {
            noti.error([{message: data, id: "alert"}]);
            return;
        }
        buildTablePayment(data.data.page);
        buildTotalPayment(data.data.totalShopPayment);
        buildInfoPayment(debitSelected);

    }).fail(function(data) {
        console.log(data);
        noti.fail("Thông báo!","Có lỗi xảy ra. Xin vui lòng thử lại sau", function() { reload() });
    }).always(function () {
    });

}

function configDatePicker(ids){
    for(i=0; i<ids.length; i++){
        $('#'+ids[i]).datetimepicker({
            locale:'vi',
            ignoreReadonly:true,
            useCurrent: false,
            maxDate: new Date(),
            format: 'DD/MM/YYYY'
        });
    }
}

function buildTable(debitsPage) {
    var table = $('#table-debit');

    if(!debitsPage || debitsPage.pageItems.length == 0){
        table.empty();
        $('#alert-no-debits').show();
        buildPagination();
        form.setCounting("", "counting");
        return;
    }
    $('#alert-no-debits').hide();

    buildCounting(debitsPage, "counting");

    var page = new Page(debitsPage);
    var index = page.pageNumber;
    var debits = page.pageItems;
    debits.forEach(function(debit, i){
        table.append(
            $("<tr onclick='getShopPayment("+debit.id+")'>").append($("<td>"+(20*(index-1) + (i+1))+"</td>"))
                .append($("<td align=\"center\">"+ddMMyyyy(debit.startDate)+"</td>"))
                .append($("<td align=\"center\">"+ddMMyyyy(debit.endDate)+"</td>"))
                .append($("<td align=\"right\">"+currencyFormat(debit.debit)+"</td>"))
                .append($("<td align=\"center\">"+ddMMyyyy(debit.planPaymentDate)+"</td>"))
                .append($("<td align=\"center\">"+ddMMyyyy(debit.realPaymentDate)+"</td>"))
                .append($("<td align=\"left\" class='order-"+corlor(debit.status)+"'><strong>"+statusOf(debit.status)+"</strong></td>"))
        );
    });
    buildPagination(page, "pagination");
}

function buildTablePayment(paymentsPage) {
    var table = $('#table-payment');
    table.empty();

    if(!paymentsPage || paymentsPage.pageItems.length == 0){
        $('#alert-no-payments').show();
        buildPagination();
        form.setCounting("", "counting-payments");
        return;
    }
    $('#alert-no-payments').hide();

    buildCounting(paymentsPage, "counting-payments");

    var page = new Page(paymentsPage);
    var index = page.pageNumber;
    var payments = page.pageItems;
    payments.forEach(function(payment, i){
        table.append(
            $("<tr>").append($("<td>"+(20*(index-1) + (i+1))+"</td>"))
                .append($("<td align=\"center\">"+ddMM(payment.order.createdDate)+"</td>"))
                .append($("<td align=\"center\">"+ddMM(payment.closeDate)+"</td>"))
                .append($("<td align=\"center\">"+payment.order.id+"</td>"))
                .append($("<td align=\"left\" class='order-"+corlorStatus(payment.order.status)+"'>"+orderStatus(payment.order.status)+"</td>"))
                .append($("<td align=\"left\">"+payment.order.dropoff.contact.name+"<br>"+payment.order.dropoff.contact.phone +"</td>"))
                .append($("<td align=\"left\">"+payment.order.dropoff.address +"<br>"+
                    payment.order.dropoff.town.district.name+" - " + payment.order.dropoff.town.name +"</td>"))
                .append($("<td align=\"right\">"+currencyFormat(payment.order.goodAmount) +"</td>"))
                .append($("<td align=\"right\">"+
                    (payment.order.status == 500 || payment.order.status == 400 ? '' : currencyFormat(payment.order.shipAmount)) +
                    "</td>"))
                .append($("<td align=\"right\">"+
                    (payment.order.status == 500 || payment.order.status == 200 ? '' : currencyFormat(payment.order.refund)) +
                    "</td>"))
                .append($("<td align=\"right\">"+currencyFormat(payment.debit)+"</td>"))
        );
    });
    buildPagination(page, "pagination-payments");
    showShopPayment();
}

function buildPagination(page, id){
    var el = $('#'+id);
    el.empty();
    if(!page) { return;}

    if(id == 'pagination-payments'){
        for(i = 0; i < page.pagesAvailable; i++){
            el.append(
                $("<li  class='"+(page.pageNumber == (i+1) ? 'active':'')+"'>")
                    .append($("<a href='#'>")
                        .text(""+(i+1))
                        .attr("onclick", "getShopPayment('',"+ (i+1) +")"))
            )
        }
        return;
    }
    for(i = 0; i < page.pagesAvailable; i++){
        el.append(
            $("<li  class='"+(page.pageNumber == (i+1) ? 'active':'')+"'>")
                .append($("<a href='#'>")
                    .text(""+(i+1))
                    .attr("onclick", "getDebit("+ (i+1) +")"))
        )
    }
}


function buildCounting(page, id){
    var size = 20;
    form.setCounting("", id);
    var counting = "";
    counting += ((page.pageNumber-1) * size) + 1;
    counting += " - ";
    counting += ((page.pageNumber-1) * size) + page.pageItems.length;
    counting += " / " + page.totalItems;

    form.setCounting(counting, id);
}


function buildTotal(simpleTotal){
    form.setTotalDebit("");
    if(!simpleTotal) return;
    form.setTotalDebit(currencyFormat(simpleTotal.total));
}
function buildTotalPayment(totalShopPayment){
    form.setTotalGoodAmount('');
    form.setTotalShipAmount('');
    form.setTotalReturnAmount('');
    form.setTotalDebitAmount('');
    if(!totalShopPayment) return;
    form.setTotalGoodAmount(currencyFormat(totalShopPayment.totalGoodAmount));
    form.setTotalShipAmount(currencyFormat(totalShopPayment.totalShipAmount));
    form.setTotalReturnAmount(currencyFormat(totalShopPayment.totalReturnAmount));
    form.setTotalDebitAmount(currencyFormat(totalShopPayment.totalDebit));
}
function buildInfoPayment(shopDebit){
    form.setFromDatePayment('');
    form.setToDatePayment('');
    form.setStatusDatePayment('');
    if(!shopDebit) return;
    form.setFromDatePayment(ddMMyyyy(shopDebit.startDate));
    form.setToDatePayment(ddMMyyyy(shopDebit.endDate));
    form.setStatusDatePayment(statusOf(shopDebit.status));
}

function corlor(status) {
    switch (status) {
        case 1: return "status-waiting";
        case 2: return "status-find-ship";
        default: return "";
    }
}


function statusOf(status) {
    switch (status) {
        case 0:
            return "Đang phát sinh";
        case 1:
            return "Chờ thanh toán";
        case 2:
            return "Đã thanh toán";
        case 3:
            return "Chưa thanh toán";
        case 4:
            return "Đã kết thúc";
        default:
            return "";
    }
}

function showShopPayment(){
    $('#list-debit').hide();
    $('#list-payments').show();
}
function showShopDebit(){
    $('#list-debit').show();
    $('#list-payments').hide();
}

function Form() {
    this.fromDate = function() {return $('#fromDate').val()};
    this.toDate = function() {return $('#toDate').val()};
    this.status = function() {return $('#status').val()};

    this.orderId = function() {return $('#order-id').val()};

    this.setCounting = function(value, id) {return $('#'+ id).text(value)};
    this.setTotalDebit = function(value) {return $('#totalDebit').text(value)};

    this.setTotalGoodAmount = function(value) {return $('#totalGoodAmount').text(value)};
    this.setTotalShipAmount = function(value) {return $('#totalShipAmount').text(value)};
    this.setTotalReturnAmount = function(value) {return $('#totalReturnAmount').text(value)};
    this.setTotalDebitAmount = function(value) {return $('#totalDebitAmount').text(value)};

    this.setFromDatePayment = function(value) {return $('#fromDate-payment').text(value)};
    this.setToDatePayment = function(value) {return $('#toDate-payment').text(value)};
    this.setStatusDatePayment = function(value) {return $('#status-payment').text(value)};

    this.getRequest = function() {
        return {
            fromDate : this.fromDate(),
            toDate : this.toDate(),
            status : this.status(),
            index: 1
        }
    }
}