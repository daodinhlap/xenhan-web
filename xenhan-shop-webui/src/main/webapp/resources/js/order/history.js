var form = new Form();
var noti = new Notify();
var _index;
var orders = [];
var ordersSelected = [];

var URL_HISTORY = BASE_URL + "/order/history";
var URL_EXPORT = BASE_URL + "/order/export";
var URL_HISTORY_TOTAL = BASE_URL + "/order/total";
var URL_HISTORY_PRINT = BASE_URL + "/order/print";
var URL_CANCEL_ORDER = BASE_URL + "/order/cancel";
var URL_GET_ADVERTISING_HOT = BASE_URL + "/noti/prioritize";

//================================================================
//ON READY
$(document).ready(function($) {
    setupDatetime();
    getHistory();
    autoReload();
    onClickFilter();
    handlerCheckAll();
    getAdvertisingHot();
});

function activeCarouselAds() {
    $('.owl-carousel').owlCarousel({
        autoplay:true,
        autoplayTimeout:5000,
        responsive:{
            0:{ items:1 }
        }
    })
}

function setupDatetime() {
    configDatePicker(['fromDate', 'toDate']);
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    $('#fromDate').val(ddMMyyyy(firstDay.getTime()));
    $('#toDate').val(ddMMyyyy(today.getTime()));
}

function autoReload() {
    setInterval(function () {
        getHistory(_index);
    }, 1000 * 60);
}

function onClickFilter() {
    $('#btn-filter').click(function() {
        $('#filter-area').toggle();
    })
}

function handlerCheckAll() {
    $('#check-all').change(function () {
        if($(this).is(':checked')){
            checkAll();
        } else {
            unCheckAll();
        }
    });
}

function getAdvertisingHot() {
    $.ajax({
        type : 'GET',
        url : URL_GET_ADVERTISING_HOT,
    }).done(function(data) {
        showAd(data);
        setBadge(data);
    }).fail(function(data) {
        console.log(data);
    });
}

function setBadge(data) {
    if(!data) return;
    var quantity = data.numberBadge;
    if(quantity <= 0) return;
    $("#badge-menu").text(quantity);
    $("#badge-menu").addClass("badge");
}
function buildAdItem(ad) {
    var adItem = $("<div class='item' style='cursor: pointer' onclick='shopDetailAd("+ ad.id +")'>");
    adItem.append($("<h4>").text(ad.title));
    adItem.append($("<p id='ad-content-detail-"+ad.id+"'>")
            .css({"white-space":"pre-line", "display":"none"})
            .html(ad.contentNoti));
    if(ad.image && ad.image != "undefined" && ad.image.length != 0){
        adItem.append($("<img id='ad-img-"+ad.id+"'>").attr("src", ad.image));
        $('#list-ad').append(adItem);
        return;
    }
    if(ad.shortContentNoti){
        adItem.append($("<p id='ad-content-"+ad.id+"'>").text(ad.shortContentNoti));
    }
    $('#list-ad').append(adItem);
}
function showAd(data) {
    if(!data.ads || data.ads.length == 0) return;
    var ads = data.ads;
    ads = ads.filter(function (ad) {
        return !hasSeen(ad);
    });
    if(ads.length == 0) return ;

    save2Local(ads);
    ads.forEach(function (ad) {
        buildAdItem(ad);
    });
    activeCarouselAds();
    $("#advertising").modal("show");
}

function shopDetailAd(id) {
    $("#ad-content-"+id).toggle();
    $("#ad-img-"+id).toggle();
    $("#ad-content-detail-"+id).toggle();
}

function hasSeen(data) {
    if (typeof(Storage) !== "undefined") {
        var adId = data.id;
        var day = new Date().getDay();
        var adStorage = localStorage.getItem("ad-id");

        if(!adStorage || adStorage == null || adStorage == undefined) return false;
        ads = JSON.parse(adStorage);

        for(i=0; i < ads.length; i++){
            if(ads[i] && ads[i].id == adId && Number(ads[i].day) == day){
                return true;
            }
        }
        return false;
    }
}

function save2Local(ads) {

    var ads_Storage = getAdStorage();
    ads.forEach(function(ad){
        var adId = ad.id;
        var day = new Date().getDay();
        removeOldAdStorage(adId, ads_Storage);

        var newAd = {id: adId, day: day};
        ads_Storage.push(newAd);
    })

    localStorage.setItem("ad-id", JSON.stringify(ads_Storage));
}

function removeOldAdStorage(id, ads_storage) {
    if(ads_storage.length == 0) return ads_storage;
    var oldAds = ads_storage.filter(function (ad) { return ad.id == id; })
    oldAds.forEach(function (old) {
        var index = ads_storage.indexOf(old);
        ads_storage.splice(index, 1);
    })
    return ads_storage;
}

function getAdStorage() {
    var ads_Storage = localStorage.getItem("ad-id");
    ads_Storage = JSON.parse(ads_Storage);
    if(!Array.isArray(ads_Storage)) return [];
    return ads_Storage;
}

function getHistory(index) {
    if(index && isNaN(index)) return;

    order = [];
    buildTable();

    _index = index ? index : 1;
    var request = form.getRequest();
    request.index = _index;
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
        var itemsSorted = data.pageItems.sort(function (a, b) {return b.createdDate - a.createdDate});
        orders = itemsSorted;
        buildTable(data)

    }).fail(function(data) {
        console.log(data);
        noti.fail("Thông báo!","Có lỗi xảy ra. Xin vui lòng thử lại sau", function() {});
    }).always(function () {
    });
}

function exportHistory(){
    var request = "";
    request += "?fromDate="+yyyy_mm_dd(form.fromDate(), "begin");
    request += "&toDate="+yyyy_mm_dd(form.toDate(), "end");
    request += "&keyword="+form.keyword();
    request += "&status="+form.status();
    request += "&typeOfView="+form.typeOfView();
    window.location.href = URL_EXPORT + request;
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

    if(!orderPage || orderPage.pageItems.length == 0){
        table.empty();
        $('#alert-no-orders').show();
        buildPagination();
        form.setCounting("");
        return;
    }
    $('#alert-no-orders').hide();

    var page = new Page(orderPage);
    var index = page.pageNumber;
    var orders = page.pageItems;

    buildCounting(orderPage);

    table.hide();
    orders.forEach(function(order, i){
        var trigger = "data-toggle='modal' data-target='#modal-"+ order.id +"'";
        var pic_order_type = typeOfOrder(order.type);
        var title_des_pic = desTypeOfOrder(order.type);
        table.append(
            $("<tr>").append($("<td>"+(20*(index-1) + (i+1))+"</td>"))
                .append($("<td align='left'>").append($("<input id='check-'"+order.id+" type='checkbox' onclick='check($(this),"+ order.id +")'>")))
                .append($("<td "+trigger+" align='left'>"+order.id
                    + " <img "+title_des_pic+" width='25px' src='/resources/images/icon-"+pic_order_type+".png'/></td>"))
                .append($("<td "+trigger+"><div class='order-status "+corlorStatus(order.status)+"'>"+orderStatus(order.status)+"</div></td>"))
                .append($("<td "+trigger+" align='left'>"+ddMM(order.createdDate)+"</td>"))
                .append($("<td "+trigger+" align='left'>"+ddMM(order.closedDate)+"</td>"))
                .append($("<td "+trigger+" align='left'>"+(order.dropoff.contact.name)+"</td>"))
                .append($("<td class='un-clickable' align='left'>"+(order.dropoff.contact.phone)+"</td>"))
                .append($("<td "+trigger+" align='left'>"+order.dropoff.address+"</td>"))
                .append($("<td class='un-clickable' align='right'>"+currencyFormat(order.goodAmount)+"</td>"))
                .append($("<td "+trigger+" align='right'>"+
                        ((order.discount*(-1) <= 0)? '': "<i class='fa fa-gift' style='color: #eb7a25;'></i>&nbsp;")+
                        currencyFormat(getShipAmount(order))+
                        "</td>"))
                .append($("<td align='left'>"+buildOrderAction(order)+"</td>"))
        );
        bottom_table.append( buildOrderDetail(order) )
    });
    table.fadeIn();
    buildPagination(page);
    $('[data-toggle="tooltip"]').tooltip();
}

function typeOfOrder(type) {
    switch (type) {
        case 1: return "pickup";
        case 3: return "derivative";
        case 2:
        default: return "dropoff";
    }
}
function desTypeOfOrder(type) {
    var des = "data-toggle='tooltip' title='%s'";
    switch (type) {
        case 1: return des.replace(/%s/g, 'Lấy hàng hộ Shop');
        case 3: return des.replace(/%s/g, 'Đơn phái sinh');
        case 2:
        default: return des.replace(/%s/g, 'Giao hàng hộ Shop');
    }
}

function buildOrderDetail(order){
    var result =
        "<div id='modal-"+order.id+"' class='modal fade' role='dialog'>" +
            "<div class='modal-dialog modal-lg'>"+
                "<div class='modal-content'>"+
                    "<div class='modal-header'>\n" +
                        "<button type='button' class='close' data-dismiss='modal'>&times;</button>" +
                            "<h4 class='modal-title'>Chi tiết đơn hàng: "+order.id+"</h4>" +
                    "</div>"+

                    "<div class='modal-body'>"+

                            // status
                            "<div class='col-md-12'  title='Trạng thái đơn hàng'>" +
                                  "<p style='text-align: center;' class='"+corlorStatus(order.status)+"'>"+orderStatus(order.status)+"</p>"+
                                       (order.status >= 400 && order.status < 600 ?
                                  "<p style='text-align: left;'><span>Lý do:&nbsp;</span><span style='font-weight: bold;'>"+order.failMessage+"</span></p>" : "")+
                            "</div>"+
                            // Đơn hàng:"+
                            "<div class='col-md-3 content-right'>"+
                                "<p style='text-decoration: underline;'  title='Ngày tạo đơn'><i>Đơn hàng:</i></p>"+
                                "<p  title='Ngày tạo đơn'>" +
                                    "<img src='/resources/images/icon_ngaytao_donhang.png' class='img-icon'>"+ddMM(order.createdDate)+"</p>"+
                                "<p  title='Ngày kết thúc'>" +
                                    "<img src='/resources/images/icon_ngayketthuc_donhang.png' class='img-icon'>"+ddMM(order.closedDate)+"</p>"+
                                "<p><img src='/resources/images/icon_loai_donhang.png' class='img-icon'>"+(order.cod? 'COD':'Ư.T')+"</p>"+
                                "<p  title='Mã coupon khuyến mại'>" +
                                    "<i class='fa fa-gift' style='color: #eb7a25;'></i>&nbsp;&nbsp;"+(order.coupon? order.coupon:'')+" "+currencyFormat(order.discount)+"</p>"+
                                "<p  title='Phí ship đã trừ mã giảm giá'>" +
                                     "<img src='/resources/images/icon_green_ship_amount.png' class='img-icon'>"+(currencyFormat(getShipAmount(order)))+"</p>"+
                                "<p  title='Tiền hàng'>" +
                                       "<img src='/resources/images/icon_green_amount.png' class='img-icon'>"+(currencyFormat(order.goodAmount))+"</p>"+
                            "</div>"+

                            // lay hàng:"+
                            "<div class='col-md-3 content-right'>" +
                                "<p style='text-decoration: underline;'><i>Lấy hàng:</i></p>"+
                                "<p  title='Địa chỉ lấy hàng'>" +
                                    "<img src='/resources/images/icon_location.png' class='img-icon'>"+
                                    order.shop.address+ ", "+order.shop.town.district.name + ", " + order.shop.town.name+"</p>"+

                                "<p title='Tên chủ hàng'>" +
                                "<img src='/resources/images/icon_taikhoan.png' class='img-icon'>"+order.shop.fullName+"</p>"+

                                "<p   title='SĐT chủ hàng'>" +
                                "<img src='/resources/images/icon_phone.png' class='img-icon'>"+order.shop.phone+"</p>"+
                            "</div>"+

                            // Giao hàng:+
                            "<div class='col-md-3 content-right'>" +
                                "<p style='text-decoration: underline;'  title='Ngày tạo đơn'><i>Giao hàng:</i></p>"+
                                "<p  title='Địa chỉ giao hàng'>" +
                                     "<img src='/resources/images/icon_location.png' class='img-icon'>"+
                                        order.dropoff.address+ ", "+order.dropoff.town.district.name + ", " + order.dropoff.town.name+"</p>"+
                                "<p   title='Tên khách hàng'>" +
                                    "<img src='/resources/images/icon_taikhoan.png' class='img-icon'>"+order.dropoff.contact.name+"</p>"+
                                "<p   title='SĐT khách hàng'>" +
                                    "<img src='/resources/images/icon_phone.png' class='img-icon'>"+order.dropoff.contact.phone+"</p>"+
                                "<p   title='Ghi chú'>" +
                                    "<i class='fa fa-commenting' style='color: #eb7a25;'></i>&nbsp;&nbsp;"+order.orderMessage+"</p>"+
                            "</div>"+
                            // shipper
                            (order.shipper ?
                                    // "<div class='col-md-1'><i>Thông tin tài xế:</i></div>" +
                                    "<div class='col-md-3 content-right'>" +
                                    "<p style='text-decoration: underline;'  title='Ngày tạo đơn'><i>Tài xế:</i></p>" +
                                    "<p   title='Tên tài xế'>" +
                                    "<img src='/resources/images/icon_logo.png' class='img-icon'>" + ( order.shipper.fullName) + "</p>" +
                                    "<p   title='SĐT tài xế'>" +
                                    "<img src='/resources/images/icon_phone.png' class='img-icon'>" + ( order.shipper.phone) + "</p>" +
                                    "</div>"
                                    : ""
                            ) +

                    "</div>"+

                    "<div class='modal-footer'>"+
                    "</div>"+
                "</div>"+
            "</div>"+
        "</div>";

    return result;
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

    this.messageCancel = function() {return $('#message-cancel').val()};
    this.setMessageCancel = function(value) {return $('#message-cancel').val(value)};
    this.setRestCharMessage = function(value) {return $('#rest-char').text(value)};

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
            typeOfView: this.typeOfView()
        }
    }
}

function print(type){
    if(ordersSelected.length == 0){
        noti.dialog("Chọn ít nhất 1 đơn để in", 2);
        return;
    }

    var url = URL_HISTORY_PRINT;
    url += "?type=" + type; // 1:a4, 2:bill
    $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : url,
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

function checkAll(){
    $('[id^=check-]').prop('checked', true);
    ordersSelected = orders;
}
function unCheckAll(){
    $('[id^=check-]').prop('checked', false);
    ordersSelected = [];
}

function check(check, orderId) {
    if (check.is(':checked')) {
        selectOrder(orderId);
    } else {
        unSelectOrder(orderId)
    }
}
function selectOrder(orderId) {
    var selected = orders.find(function(o) {return o.id == orderId});
    ordersSelected.push(selected);
}
function unSelectOrder(orderId) {
    var selected = orders.find(function(o) {return o.id == orderId});
    var index = orders.indexOf(selected);
    ordersSelected.splice(index, 1);
}

function buildPagination(page){
    var el = $('#pagination');
    el.empty();
    if(!page) { return;}

    var pageAvailable = calculatorPage(page.pagesAvailable, page.pageNumber);

    for(i = 0; i < pageAvailable.length; i++){
        el.append(
            $("<li  class='"+(page.pageNumber == pageAvailable[i] ? 'active':'')+"'>")
                .append($("<a href='#'>")
                .text(pageAvailable[i])
                .attr("onclick","getHistory("+ pageAvailable[i] +")"))
        )
    }
}

function calculatorPage(pagesAvailable, pageNumber){
    var temp = [];
    if(pagesAvailable <= 7){
        for(i = 1; i <= pagesAvailable; i++){ temp.push(i); }
        return temp;
    }

    temp.push(1);
    if(pageNumber > 4) temp.push('...');
    for(i = pageNumber - 2 ; i <= pageNumber + 2; i++){
        temp.push(i);
    }
    if(pageNumber < pagesAvailable - 3) temp.push('...');
    temp.push(pagesAvailable);

    var result = [];
    $.each(temp, function(i, el){
        if(isNaN(el)) {
            result.push(el);
        } else if($.inArray(el, result) === -1 && el >= 1 && el <= pagesAvailable){
            result.push(el);
        }
    });
    return result;
}


function buildOrderAction(order){
    var action = "";
    if(order.status < 400 && order.status != 200){
        action += "<li><a href='/order/tao-don?type=1&order-id="+order.id+"'>Sửa đơn</a></li>\n";
    }
    if(order.status < 200){
        action += "<li><a href='#' onclick='cancelOrder("+ order.id +")'>Hủy đơn</a></li>\n";
    }
    if(order.status > 200 && order.status < 400 && order.cod){
        action += "<li><a href='#' onclick='cancelOrder("+ order.id +")'>Hủy đơn</a></li>\n";
    }
    if(order.status > 200 && order.status < 400 && !order.cod){
        action += "<li><a href='/lien-he'><span style='color:red'>Liên hệ hủy đơn</span></a></li>\n";
    }

    // if(order.status < 200){
    //     action += "<li><a href='/order/tao-don?type=1&order-id="+order.id+"'>Sửa đơn</a></li>\n";
    //     action += "<li><a href='#' onclick='cancelOrder("+ order.id +")'>Hủy đơn</a></li>\n";
    // }
    // if(order.status > 200 && order.status < 400){
    //         action += "<li><a href='/lien-he'><span style='color:red'>Liên hệ Hủy hoặc Sửa đơn</span></a></li>\n";
    // }
    action += "<li><a href='/order/tao-don?type=2&order-id="+order.id+"'>Đăng lại đơn</a></li>\n";

    var result ;
    result = "  <div class=\"dropup\">\n" +
                "    <button style='padding: 0px' class=\"btn btn-link dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">" +
                        "<i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></button>\n" +
                "    <ul class='dropdown-menu dropdown-menu-right'>\n" +
                        action+
                "    </ul>\n" +
                "  </div>";
    return result;
}

function cancelOrder(orderId){
    if(!orderId){ alert('Có lỗi xảy ra. Xin thử lại'); return;}

    noti.confirmWithBtn("<strong>Bạn muốn hủy đơn hàng?</strong><br>"+
                        "<textarea class='form-control' rows='2' id='message-cancel'" +
                              "placeholder='Lý do hủy đơn?'></textarea>"+
                                "<p id='rest-char'></p>",
                        "Đồng ý", "Không đồng ý",
        function(result) {
            if (result) {
                var url = URL_CANCEL_ORDER + "?order-id=" + orderId+ "&message=" + form.messageCancel();
                $.ajax({
                    type : 'GET',
                    url : url,
                }).done(function(data) {
                    console.log(data);
                    getHistory();
                }).fail(function(data) {
                    console.log(data);
                    alert('Có lỗi xảy ra. Xin thử lại');
                })
            };
        });
    onTyping();
}

function onTyping(){
    $('#message-cancel').keyup(function () {
        var content = "";

        if(form.messageCancel().length > 50){
            $('#message-cancel').css({'background-color':'#ddd'});
            form.setMessageCancel(form.messageCancel().substr(0, 50));
            return;
        }
        $('#message-cancel').css({ 'background-color' : ''});

        content += 50 - form.messageCancel().length;
        content += "/50";
        form.setRestCharMessage(content);
    })
}
function getShipAmount(order) {
    if(order.status >= 400 && order.status < 500) return order.refund;
    if(order.status >= 500) return 0;
    return order.shipAmount;


}
