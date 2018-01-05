var ads = [];
var URL_GET = BASE_URL + "/noti/get";
var URL_CLOSE = BASE_URL + "/noti/close";
var URL_VIEW = BASE_URL + "/noti/view";
//================================================================
$(document).ready(function($) {
    get();
});

function get() {
    ads = [];
    buildTable();
    $.ajax({
        type : 'GET', url : URL_GET
    }).done(function(data) {
        data.sort(function (a, b) {
            return a.promotionStatus - b.promotionStatus
        });
        ads = data;
        buildTable(data)
    }).fail(function(data) {
        console.log(data);
    });
}

function buildTable(ads) {
    var table = $('#table-ad');
    table.empty();
    if(!ads || ads.length == 0) return;

    table.hide();
    ads.forEach(function(ad, i){
        var style = ad.promotionStatus == 2 ? "style='opacity: 0.5'" : "";
        table.append(
            $("<tr id='"+ad.id+"' onclick='showAd("+ad.id+")'>")
                .append($("<td align='left' "+ style +">").text(ddMMyyyy(ad.startTime)))
                .append($("<td align='left' "+ style +">").text(ad.title))
        );
    });
    table.fadeIn();
    $("#btn-close-all").show();
    $('[data-toggle="tooltip"]').tooltip();
}

function showAd(id) {
    var ad = ads.filter(function (ad) { return ad.id == id; })[0];
    if(!ad.contentNoti) return;

    $("#ad-title").text(ad.title);
    $("#ad-content").text(ad.contentNoti);
    $("#btn-close").attr("onclick", "closeAd("+id+")");
    $("#detail-ad").modal("show");
    viewAd(id);
}

function viewAd(id) {
    if(!id) return;
    $.ajax({
        type : 'GET',
        url : URL_VIEW + "?ad-id=" + id,
    }).done(function(data) {
        updateAdLocal(data)
    }).fail(function(data) {
    });
}

function updateAdLocal(data) {
    if(!data || ErrorCode.SUCCESS != data.code) return;
    promotion = data.data[0];
    var ad = ads.filter(function (ad) { return ad.id == promotion.adId; })[0];
    var index = ads.indexOf(ad);
    ads.splice(index, 1);
    ad.promotionStatus = 2;
    ads.push(ad);

    buildTable(ads);
    setBadge(-1);
}

function setBadge(quantity) {
    var number = Number($("#badge-menu").text());
    number += quantity;
    $("#badge-menu").text(number <= 0 ? "" : number);
}


function closeAd(id){
    if(!id) return;
    close(id).done(function(data) { removeAdLocal(id); });
}

function closeAll(){
    if(ads.length == 0) return;
    var ids = ads.map(function (ad) { return ad.id; });
    close(ids).done(function () {
        setBadge(ads.length * -1);
        ads = [];
        buildTable();
        $("#btn-close-all").hide();
    });
}

function close(ids) {
    return $.ajax({
        type : 'GET',
        url : URL_CLOSE + "?ad-id=" + ids,
    })
}

function removeAdLocal(id) {
    var ad = ads.filter(function (ad) {
        return ad.id == id;
    })
    var index = ads.indexOf(ad);
    ads.splice(index, 1);
    buildTable(ads);
}