var ads = [];
var URL_GET = BASE_URL + "/noti/get";
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
    if(!ads) return;

    table.hide();
    ads.forEach(function(ad, i){
        var style = ad.promotionStatus == 2 ? "style='opacity: 0.5'" : "";
        table.append(
            $("<tr id='"+ad.id+"'>")
                .append($("<td align='left' "+ style +">").text(ddMMyyyy(ad.startTime)))
                .append($("<td align='left' "+ style +">").text(ad.title))
        );
    });
    table.fadeIn();
    $('[data-toggle="tooltip"]').tooltip();
}

function showAd(data) {
    var ad = data.ad;
    if(ad.contentNoti){
        $("#ad-title").text(ad.title);
        $("#ad-content").text(ad.contentNoti);
        $("#advertising").modal("show");
    }
}


function deleteAd(id){
    if(!id) return;
    $.ajax({
        type : 'GET',
        url : URL_DELETE + "?ad-id=" + id,
    }).done(function(data) {
        removeAdLocal(id);
    }).fail(function(data) {
    });
}

function removeAdLocal(id) {
    var ad = ads.filter(function (ad) {
        return ad.id == id;
    })
    var index = ads.indexOf(ad);
    ads.splice(index, 1);
    buildTable(ads);
}