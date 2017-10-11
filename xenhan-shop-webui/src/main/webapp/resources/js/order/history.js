var form = new Form();
var noti = new Notify();
var orders = [];
var ordersSelected = [];

var URL_HISTORY = BASE_URL + "/order/history";
var URL_HISTORY_TOTAL = BASE_URL + "/order/total";
var URL_HISTORY_PRINT = BASE_URL + "/order/print";
var URL_CANCEL_ORDER = BASE_URL + "/order/cancel?order-id=";

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

function buildCounting(page){
    var size = 20;
    form.setCounting("");
    var counting = "";
    counting += ((page.pageNumber-1) * size) + 1;
    counting += " - ";
    counting += ((page.pageNumber-1) * size) + page.pageItems.length;
    counting += " / " + page.totalItems;
    counting += " đơn ";

    form.setCounting(counting);
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
    var bottom_table = $('.table.table-hover');


    if(!orderPage){
        table.empty();
        return;
    }
    var page = new Page(orderPage);
    var index = page.pageNumber;
    var orders = page.pageItems;

    buildCounting(orderPage);

    orders.forEach((order, i) =>{
        var trigger = "data-toggle='modal' data-target='#modal-"+ order.id +"'";
        table.append(
            $("<tr>").append($("<td>"+(20*(index-1) + (i+1))+"</td>"))
                .append($("<td align=\"left\">").append($("<input type='checkbox' onclick='check($(this),"+ order.id+")'>")))
                .append($("<td "+trigger+" align=\"left\" class='order-"+corlorStatus(order.status)+"'>"+order.id+"</td>"))
                .append($("<td "+trigger+" align=\"left\">"+ddMM(order.createdDate)+"</td>"))
                .append($("<td "+trigger+" align=\"left\">"+ddMM(order.closedDate)+"</td>"))
                .append($("<td "+trigger+" align=\"left\">"+order.dropoff.address+"</td>"))
                .append($("<td "+trigger+" align=\"right\">"+currencyFormat(order.goodAmount)+"</td>"))
                .append($("<td "+trigger+" align=\"right\">"+currencyFormat(order.shipAmount)+"</td>"))
                .append($("<td align=\"left\">"+buildOrderAction(order)+"</td>"))
        );
        bottom_table.append(
            "<div id='modal-"+order.id+"' class=\"modal fade\" role=\"dialog\">" +
                "<div class=\"modal-dialog modal-lg\">"+
                    "<div class=\"modal-content\">"+
                        "<div class=\"modal-header\">\n" +
                            "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>" +
                                "<h4 class=\"modal-title\">Chi tiết đơn hàng: "+order.id+"</h4>" +
                        "</div>"+

                        "<div class=\"modal-body\">"+
                            "<div class='row'>"+
                                "<div class='col-md-2'><i>Đơn hàng:</i></div>"+
                                "<div class='col-md-3 content-right'>"+
                                    "<p  title=\"Ngày tạo đơn\">" +
                                        "<img src=\"/resources/images/icon_ngaytao_donhang.png\" class='img-icon'>"+ddMM(order.createdDate)+"</p>"+
                                    "<p  title=\"Ngày kết thúc\">" +
                                        "<img src=\"/resources/images/icon_ngayketthuc_donhang.png\" class='img-icon'>"+ddMM(order.closedDate)+"</p>"+
                                    "<p><img src=\"/resources/images/icon_loai_donhang.png\" class='img-icon'>"+(order.cod? 'COD':'Ư.T')+"</p>"+
                                    "<p  title=\"Mã coupon khuyến mại\">" +
                                        "<i class=\"fa fa-gift\" style='color: #eb7a25;'></i>"+(order.coupon? order.coupon:'')+"</p>"+
                                "</div>"+

                                "<div class='col-md-2'><i>Giao hàng:</i></div>"+
                                "<div class='col-md-3 content-right'>" +
                                    "<p  title=\"Địa chỉ giao hàng\">" +
                                         "<img src=\"/resources/images/icon_location.png\" class='img-icon'>"+order.dropoff.town.district.name + ", " + order.dropoff.town.name+"</p>"+
                                    "<p   title=\"Tên khách hàng\">" +
                                        "<img src=\"/resources/images/icon_taikhoan.png\" class='img-icon'>"+order.dropoff.contact.name+"</p>"+
                                    "<p   title=\"SĐT khách hàng\">" +
                                        "<img src=\"/resources/images/icon_phone.png\" class='img-icon'>"+order.dropoff.contact.phone+"</p>"+
                                "</div>"+

                                "<div class='col-md-2'  title=\"Trạng thái đơn hàng\">" +
                                    "<p style='text-align: center;' class='"+corlorStatus(order.status)+"'>"+orderStatus(order.status)+"</p>"+
                                "</div>"+

                            "</div>"+

                            "<div class='row'>"+
                                "<div class='col-md-2'><i>Thông tin tài xế:</i></div>"+
                                "<div class='col-md-3 content-right'>"+
                                    "<p   title=\"Tên tài xế\">" +
                                         "<img src=\"/resources/images/icon_logo.png\" class='img-icon'>"+(order.shipper? order.shipper.fullName:'')+"</p>"+
                                    "<p   title=\"SĐT tài xế\">" +
                                        "<img src=\"/resources/images/icon_phone.png\" class='img-icon'>"+(order.shipper? order.shipper.phone:'')+"</p>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+

                        "<div class=\"modal-footer\">"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"
        )
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

    this.setCounting = function(value) {return $('#counting').text(value)};
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
    if(ordersSelected.length == 0){
        noti.dialog("Chọn ít nhất 1 đơn để in", 2);
        return;
    }
    $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : URL_HISTORY_PRINT,
        data : JSON.stringify(ordersSelected)
    }).done(function(content) {
        var popupWin = window.open('', '', '');
        popupWin.document.write(content);
        popupWin.document.close();
    }).fail(function(data) {
        console.log(data);
    }).always(function () {
    });
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

function buildPagination(page){
    var el = $('#pagination');
    el.empty();

    for(i = 0; i < page.pagesAvailable; i++){
        el.append(
            $("<li  class='"+(page.pageNumber == (i+1) ? 'active':'')+"'>")
                .append($("<a href='#'>")
                .text(""+(i+1))
                .attr("onclick","getHistory("+ (i+1) +")"))
        )

    }

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

function buildOrderAction(order){
    var action = "";
    if(order.status < 200){
        action += "<li><a href='/order/tao-don?type=1&order-id="+order.id+"'>Sửa đơn</a></li>\n";
        action += "<li><a href=\"#\" onclick='cancelOrder("+ order.id +")'>Hủy đơn</a></li>\n";
    }
    action += "<li><a href='/order/tao-don?type=2&order-id="+order.id+"'>Đăng lại đơn</a></li>\n";
    var result ;
    result = "  <div class=\"dropup\">\n" +
                "    <button style='padding: 0px' class=\"btn btn-link dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">" +
                        "<i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></button>\n" +
                "    <ul class=\"dropdown-menu\">\n" +
                        action+
                "    </ul>\n" +
                "  </div>";
    return result;
}

function cancelOrder(orderId){
    if(!orderId){ alert('Có lỗi xảy ra. Xin thử lại'); return;}

    noti.confirmWithBtn("<strong>Bạn muốn hủy đơn hàng?</strong>","Đồng ý", "Không đồng ý",
        function(result) {
            if (result) {
                $.ajax({
                    type : 'GET',
                    url : URL_CANCEL_ORDER + orderId,
                }).done(function(data) {
                    console.log(data);
                    getHistory();
                }).fail(function(data) {
                    console.log(data);
                    alert('Có lỗi xảy ra. Xin thử lại');
                })
            };
        });
}