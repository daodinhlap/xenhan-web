var form = new Form();
var noti = new Notify();
var orders = [];
var ordersSelected = [];

var URL_HISTORY = BASE_URL + "/shop/history";
var URL_HISTORY_TOTAL = BASE_URL + "/shop/total";

//================================================================
//ON LOADED
$(document).ready(function($) {
    //Date picker
    configDatePicker(['fromDate', 'toDate']);
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    $('#fromDate').val(ddMMyyyy(firstDay.getTime()));
    $('#toDate').val(ddMMyyyy(today.getTime()));

    // get history
    getHistory();
});

function getHistory(index){
    order = [];
    buildTable();

    var request = form.getRequest();
    request.index = index? index: 1;
    request.fromDate = yyyy_mm_dd(request.fromDate, "begin");
    request.toDate = yyyy_mm_dd(request.toDate, "end");

    getTotal(request);

    $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : URL_HISTORY,
        data : JSON.stringify(request)
    }).done(function(data) {
        if (!data) {
            noti.error([{message: data, id: "alert"}]);
            return;
        }
        orders = data.pageItems;
        buildTable(data)

    }).fail(function(data) {
        console.log(data);
        noti.fail("Thông báo!","Có lỗi xảy ra. Xin vui lòng thử lại sau", function() { reload() });
    }).always(function () {
    });
}

function getTotal(request) {
    buildTotal();
    $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : URL_HISTORY_TOTAL,
        data : JSON.stringify(request)
    }).done(function(data) {
        buildTotal(data);
    }).fail(function(data) {
        console.log(data);
    }).always(function () {
    });

}

function configDatePicker(ids){
    for(i=0; i<ids.length; i++){
        $('#'+ids[i]).datetimepicker({
            locale:'vi',
            showClear:true,
            ignoreReadonly:true,
            useCurrent: false,
            maxDate: new Date(),
            format: 'DD/MM/YYYY'
        });
    }
}
function buildTable(orderPage) {
    var table = $('#table-history');

    if(!orderPage){
        table.empty();
        return;
    }
    var page = new Page(orderPage);
    var index = page.pageNumber;
    var orders = page.pageItems;


    orders.forEach((order, i) =>{
        table.append(
            $("<tr>").append($("<td>"+(20*(index-1) + (i+1))+"</td>"))
                    .append($("<td align=\"left\">").append($("<input type='checkbox' onclick='check($(this),"+ order.id+")'>")))
                    .append($("<td align=\"left\">"+order.id+"</td>"))
                    .append($("<td align=\"left\">"+ddMMyyyy(order.createdDate)+"</td>"))
                    .append($("<td align=\"left\">"+ddMMyyyy(order.closedDate)+"</td>"))
                    .append($("<td align=\"left\">"+order.dropoff.address+"</td>"))
                    .append($("<td align=\"right\">"+currencyFormat(order.goodAmount)+"</td>"))
                    .append($("<td align=\"right\">"+currencyFormat(order.shipAmount)+"</td>"))
        );
    });

    buildPagination(page);
}

function buildTotal(total){
    form.setTotalGoodAmount("");
    form.setTotalShipAmount("");
    if(!total) return;

    var total = new Total(total);
    form.setTotalGoodAmount(currencyFormat(total.totalGoodAmount));
    form.setTotalShipAmount(currencyFormat(total.totalShipAmount));

}

function Form() {
    this.fromDate = function() {return $('#fromDate').val()};
    this.toDate = function() {return $('#toDate').val()};
    this.keyword = function() {return $('#keyword').val()};
    this.status = function() {return $('#status').val()};
    this.typeOfView = function() {return $('#typeOfView').val()};
    this.index = function() {return $('#index').val()};

    this.setTotalGoodAmount = function(value) {return $('#totalGoodAmount').text(value)};
    this.setTotalShipAmount = function(value) {return $('#totalShipAmount').text(value)};

    this.getRequest = function() {
        return {
            fromDate : this.fromDate(),
            toDate : this.toDate(),
            index : this.index(),
            keyword : this.keyword(),
            status: this.status(),
            typeOfView: this.typeOfView(),
        }
    }
}

function print(){
    console.log(ordersSelected.length);
    printHorizontal(ordersSelected);
}

function check(check, orderId) {
    if (check.is(':checked')) {
        selectOrder(orderId);
    } else {
        unSelectOrder(orderId)
    }
}
function selectOrder(orderId) {
    var selected = orders.find((o) => {return o.id == orderId});
    ordersSelected.push(selected);
}
function unSelectOrder(orderId) {
    var selected = orders.find((o) => {return o.id == orderId});
    var index = orders.indexOf(selected);
    ordersSelected.splice(index, 1);
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

function buildPagination(page){
    var el = $('#pagination');
    el.empty();

    for(i = 0; i < page.pagesAvailable; i++){
        el.append(
            $("<li>").append($("<a href='#'>").text(""+(i+1)).attr("onclick","getHistory("+ (i+1) +")"))
        )

    }

}
