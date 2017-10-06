var form = new Form();
var noti = new Notify();
var URL_HISTORY = BASE_URL + "/shop/history";

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
    var request = form.getRequest();
    request.index = index? index: 1;
    $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : URL_HISTORY,
        data : JSON.stringify(request)
    }).done(function(data) {
        if (!data) {
            error.push({message: data, id: "alert"});
            return;
        }
        buildTable(data)

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
            showClear:true,
            ignoreReadonly:true,
            useCurrent: false,
            maxDate: new Date(),
            format: 'DD/MM/YYYY'
        });
    }
}
function buildTable(orderPage) {
    var page = new Page(orderPage);
    var orders = page.pageItems;

    var table = $('#table-history');
    orders.forEach((order, i) =>{
        table.append(
            $("<tr>").append($("<td align=\"right\">"+(i+1)+"</td>"))
                    .append($("<td align=\"right\">"+order.id+"</td>"))
                    .append($("<td align=\"right\">"+ddMMyyyy(order.createdDate)+"</td>"))
                    .append($("<td align=\"right\">"+ddMMyyyy(order.closedDate)+"</td>"))
                    .append($("<td align=\"right\">"+order.dropoff.address+"</td>"))
                    .append($("<td align=\"right\">"+currencyFormat(order.goodAmount)+"</td>"))
                    .append($("<td align=\"right\">"+currencyFormat(order.shipAmount)+"</td>"))
        );
    })
}

function Form() {
    this.fromDate = function() {return $('#fromDate').val()};
    this.toDate = function() {return $('#toDate').val()};
    this.keyword = function() {return $('#keyword').val()};
    this.status = function() {return $('#status').val()};
    this.typeOfView = function() {return $('#typeOfView').val()};
    this.index = function() {return $('#index').val()};

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

    // fromDate
    // toDate
    // index
    // keyword
    // packageId
    // shopName
    // size
    // status
    // typeOfView
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