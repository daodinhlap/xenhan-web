var ads = [];
var URL_GET = BASE_URL + "/noti/get";
var URL_CLOSE = BASE_URL + "/noti/close";
var URL_VIEW = BASE_URL + "/noti/view";
//================================================================
$(document).ready(function($) {
    get();
    activeCarouselAds();
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

function get() {
    ads = [];
    buildTable();
    $.ajax({
        type : 'GET', url : URL_GET
    }).done(function(data) {
        data.sort(function (a,b) { return sort(a,b)});
        ads = data;
        buildTable(data)
    }).fail(function(data) {
        console.log(data);
    });
}

function sort(a, b) {
    var status_a = a.promotionStatus;
    var status_b = b.promotionStatus;
    var time_a = a.startTime;
    var time_b = b.startTime;

    if(status_a < status_b) return -1;
    if(status_a > status_b) return 1;
    if(time_a < time_b) return 1;
    if(time_a > time_b) return -1;
    return 0;
}

function buildTable(ads) {
    var table = $('#table-ad');
    table.empty();
    if(!ads || ads.length == 0) return;

    table.hide();
    ads.forEach(function(ad, i){
        var style = (ad.promotionStatus == 2 || expired(ad)) ? "style='opacity: 0.5; font-weight: lighter;'" : "";
        table.append(
            $("<tr id='"+ad.id+"' onclick='showAd("+ad.id+")'>")
                .append($("<td align='left' "+ style +">").text(ddMMyyyy(ad.startTime)))
                .append($("<td align='left' "+ style +">").html(
                    "<p style='margin: 0px; font-weight: bold'>" + ad.title + "</p>" +
                    "<p style='font-size: smaller;margin: 0px'>" + previewContent(ad.shortContentNoti) + "</p>"
                ))
        );
    });
    table.fadeIn();
    $("#btn-close-all").show();
    $('[data-toggle="tooltip"]').tooltip();
}

function expired(ad) {
    return ad.endTime != 0 && ad.endTime < new Date().getTime();
}

function previewContent(content) {
    if(content.length < 80) return content + " ...";
    return content.substr(0, 80) + " ...";
}

function showAd(id) {
    var ad = ads.filter(function (ad) { return ad.id == id; })[0];
    if(!ad.contentNoti) return;

    $("#ad-title").text(ad.title);
    $("#ad-content").html(ad.contentNoti);
    $("#btn-close").attr("onclick", "closeAd("+id+")");
    $("#detail-ad").modal("show");
    if(ad.promotionStatus == 1 || ad.promotionStatus == 0) {
        viewAd(id);
    }
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
    var ad = findAd(id);
    close(ad).done(function(data) { removeAdLocal(id) });
}

function closeAll() {
    if(ads.length == 0) return;
    close(ads).done(function () {
        setBadge(ads.length * -1);
        ads = [];
        buildTable();
        $("#btn-close-all").hide();
    });
}

function close(ads) {
    return $.ajax({
        type : 'POST',
        url : URL_CLOSE,
        contentType : 'application/json',
        data : JSON.stringify(ads)
    })
}

function removeAdLocal(id) {
    var ad = findAd(id);
    var index = ads.indexOf(ad);
    ads.splice(index, 1);
    buildTable(ads);
}

function findAd(id) {
    return ads.filter(function (ad) {
        return ad.id == id;
    });
}