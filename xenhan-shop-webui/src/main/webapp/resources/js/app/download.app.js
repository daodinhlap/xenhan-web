$(document).ready(function () {
    var link = getLink();
    if(!link) {
        $("#alert").text("Không thể chuyển đến kho ứng dụng");
        return;
    };
    window.location.href = link;

});

function getLink() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "https://itunes.apple.com/us/app/xe-nh%C3%A0n-%E1%BB%A9ng-d%E1%BB%A5ng-cho-shop/id1319783243?ls=1&mt=8";
    }
    // if (/android/i.test(userAgent)) {
    //     return "https://play.google.com/store/apps/details?id=com.homedirect.xenhanv2shop";
    // }
    return "https://play.google.com/store/apps/details?id=com.homedirect.xenhanv2shop"
}