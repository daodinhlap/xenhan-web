var horizontalHtmlEnder = '</div></body></html>';
var verticalHtmlEnder = '</body></html>';
var MAX_BARCODE_LENGTH = 10;


function printHorizontal(orders) {
    let content = this.buildHorizontalHtmlHeader();
    for (let i = 0; i < orders.length; i++) {
        let gen = this.generateOrderContentHorizontal(orders[i]);
        content += gen;
    }
    content += `<script type="text/javascript">JsBarcode(".barcode").init();</script>`;
    content += this.horizontalHtmlEnder;
    this.openPrintPage(content);
}

function printVertical(orders) {
    var content = this.buildVerticalHtmlHeader();
    for (let i = 0; i < orders.length; i++) {
        let gen = this.generateOrderContentVertical(orders[i]);
        content += gen;
    }
    content += `<script type="text/javascript">JsBarcode(".barcode").init();</script>`;
    content += this.verticalHtmlEnder;
    this.openPrintPage(content);
}

function generateOrderContentHorizontal(order) {
    var content = `<div class="bill-content column ui grid">
                            <div class="row">
                                <div class="bill-header-label-content">
                                    <img class="order-bill-logo ui tiny image" src="`;
    content += this.contextPath;
    content += `/assets/images/app_logo_black.png">
                    <span class="order-bill-slogan">SẴN SÀNG PHỤC VỤ</span>
                </div>
                <div class="bill-header-data-content">
                    <div style="display: table-cell; vertical-align: middle;">
                        Hà Nội - Hotline: 0906236018
                        <br>
                        Tp.HCM - Hotline: 0909183955
                        <br>
                        Website: www.xenhan.vn
                    </div>
                </div>
            </div>
            <div class="row" style="border: 1px solid;padding: 0px !important;">
                <div style="width: 100%; border-bottom: 1px solid">
                    <div class="label-content" style="padding: 20px; font-size: 20px; font-weight: bold; width: 30%">
                        <span>`;
    content += order.id;
    content += `</span>
                    </div>
                    <div class="data-content" style="width: 70%">`;

    content += `<svg class="barcode"
                      jsbarcode-format="CODE128"
                      jsbarcode-value="`;

    let barcode = order.id.toString();
    let barcodeLength = barcode.length;
    if (barcode.length < this.MAX_BARCODE_LENGTH) {
        for (let i = 0; i < this.MAX_BARCODE_LENGTH - barcodeLength; i++) {
            barcode = '0' + barcode;
        }
    }
    let district = '';
    if (order.shop.town && order.shop.town.district) {
        district = order.shop.town.district.name + '-';
    }
    content += barcode;
    content += `"
                      jsbarcode-textmargin="0"
                      jsbarcode-height="30"
                      jsbarcode-fontSize="12"
                      jsbarcode-margin="12"
                      jsbarcode-displayValue="false"
                      jsbarcode-width="2">    
                    </svg>`;
    content += `</div>
                </div>
                <div style="width: 100%; border-bottom: 1px solid" class="ui two column grid">
                    <div class="remove-left-right column">
                        <span style="font-weight: bold">THÔNG TIN SHOP</span>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%">Tên Shop</div>
                        <div class="remove-left-right column" style="width: 60%">`;
    content += !order.shop.fullName ? '' : order.shop.fullName;
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%">SĐT Shop</div>
                        <div class="remove-left-right column" style="width: 60%">`;
    content += !order.shop.phone ? '' : order.shop.phone;
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%">Địa chỉ Shop</div>
                        <div class="remove-left-right column" style="width: 60%">`;
    content += !order.shop.address ? '' : order.shop.address;
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%"></div>
                        <div class="remove-left-right column" style="width: 60%">`;
    content += !order.shop.town ? '' : district + order.shop.town.name;
    content += `</div>
                    </div>
                </div>
                <div style="width: 100%; border-bottom: 1px solid" class="ui two column grid">
                    <div class="remove-left-right column"  style="width: 100%">
                        <span style="font-weight: bold">THÔNG TIN KHÁCH HÀNG</span>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%">Tên khách hàng</div>
                        <div class="remove-left-right column" style="width: 60%; font-weight: bold">`;
    content += !order.dropoff || !order.dropoff.contact ? '' : order.dropoff.contact.name;
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%">SĐT nhận hàng</div>
                        <div class="remove-left-right column" style="width: 60%; font-weight: bold">`;
    content += !order.dropoff || !order.dropoff.contact ? '' : order.dropoff.contact.phone;
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%">Địa chỉ giao hàng</div>
                        <div class="remove-left-right column" style="width: 60%; font-weight: bold">`;
    content += !order.dropoff || order.dropoff.address ? '' : order.dropoff.address;
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%"></div>
                        <div class="remove-left-right column" style="width: 60%; font-weight: bold">`;
    content += !order.dropoff || order.dropoff.town ? '' : order.dropoff.town.district.name + '-' + order.dropoff.town.name;
    content += `</div>
                    </div>
                </div>
                <div style="width: 100%; border-bottom: 1px solid; height: 80px; padding-top: 5px; padding-left: 1rem;">
                    <span style="ôfont-weight: bold">MÔ TẢ ĐƠN HÀNG</span><br>`;
    content += !order.orderMessage ? '' : order.orderMessage;
    content += `</div>
                <div style="width: 100%;">
                    <table class="ui very basic collapsing celled table" style="width: 100%">
                        <tr>
                            <td style="width: 40%">
                                Ngày tạo đơn
                            </td>
                            <td style="width: 60%; padding-left: 0.5rem !important;">`;
    content += order.createdDate;
    content += `</td>
                        </tr>
                        <tr>
                            <td style="width: 40%">
                                Loại đơn
                            </td>
                            <td style="width: 55%; font-weight: bold; padding-left: 0.5rem !important">`;
    content += order.cod ? 'COD' : 'Tạm Ứng';
    content += `</td>
                        </tr>
                        <tr>
                            <td style="width: 45%">
                                Tiền hàng
                            </td>
                            <td style="width: 55%; text-align: right">`;
    content += !order.goodAmount ? '' : order.goodAmount.toLocaleString('vi-VN');
    content += ` đ </td>
                        </tr>
                        <tr>
                            <td style="width: 45%">
                                Phí ship
                            </td>
                            <td style="width: 55%; text-align: right">`;
    content += !order.shipAmount ? '' : order.shipAmount;
    content += ` đ </td>
                        </tr>
                        <tr>
                            <td style="width: 45%; font-weight: bold">
                                THU CỦA KHÁCH
                            </td>
                            <td style="width: 55%; font-weight: bold; text-align: right; font-size: 14px">`;
    content += !order.goodAmount ? '' : order.goodAmount;
    content += ` đ </td>
                        </tr>
                                                
                        <tr style="text-align: center">
                            <td style="height: 80px; vertical-align: top;">Người giao hàng</td>
                            <td style="height: 80px; vertical-align: top;">Người nhận</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>`;

    return content;
}

function buildHorizontalHtmlHeader() {
    var htmlHeader = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Xe Nhàn - HOMEDIRECT</title><style>@page { size: landscape; }</style><link rel="stylesheet" href="`;
    htmlHeader += this.contextPath;
    htmlHeader += `/assets/css/semantic.css"><link rel="stylesheet" href="`;
    htmlHeader += this.contextPath;
    htmlHeader += `/assets/css/order-bill.css"><script type="text/javascript" src="`;
    htmlHeader += this.contextPath;
    htmlHeader += `/assets/js/JsBarcode.min.js"></script>`;
    htmlHeader += `</head><body class="horizontal-body"><div class="ui three column grid">`;//onload="window.print();window.close()"
    return htmlHeader;
}

function generateOrderContentVertical(order) {
    var content = `<div class="vertical-order" style=" margin-bottom: 10px;"><div class="ui grid">
                            <div class="row">
                                <div class="bill-header-label-content">
                                    <img class="order-bill-logo ui tiny image" src="`;
    content += this.contextPath;
    content += `/assets/images/app_logo_black.png">
                    <span class="order-bill-slogan">SẴN SÀNG PHỤC VỤ</span>
                </div>
                <div class="bill-header-data-content">
                    <div style="display: table-cell; vertical-align: middle;">
                        Hà Nội - Hotline: 0906236018
                        <br>
                        Tp.HCM - Hotline: 0909183955
                        <br>
                        Website: www.xenhan.vn
                    </div>
                </div>
            </div>
            <div class="row" style="border: 1px solid;padding: 0px !important;">
                <div style="width: 100%; border-bottom: 1px solid">
                    <div class="label-content" style="padding: 20px; font-size: 20px; font-weight: bold; width: 30%">
                        <span>`;
    content += order.id;
    content += `</span>
                    </div>
                    <div class="data-content" style="width: 70%">`;

    content += `<svg class="barcode"
                      jsbarcode-format="CODE128"
                      jsbarcode-value="`;

    var barcode = order.id.toString();
    var barcodeLength = barcode.length;
    if (barcode.length < this.MAX_BARCODE_LENGTH) {
        for (let i = 0; i < this.MAX_BARCODE_LENGTH - barcodeLength; i++) {
            barcode = '0' + barcode;
        }
    }
    var district = '';
    if (!isNullOrUndefined(order.shop.town) && !isNullOrUndefined(order.shop.town.district)) {
        district = order.shop.town.district.name + '-';
    }
    content += barcode;
    content += `"
                     jsbarcode-height="25"
                     jsbarcode-margin="0"
                     jsbarcode-displayValue="false"
                     jsbarcode-width="2" style="margin: 10px">    
                    </svg>`;
    content += `</div>
            </div>
            <div style="width: 100%; border-bottom: 1px solid" class="ui two column grid">
                <div class="remove-left-right column">
                    <span style="font-weight: bold">THÔNG TIN SHOP</span>
                </div>
                <div class="row">
                    <div class="remove-left-right column" style="width: 40%">Tên Shop</div>
                    <div class="remove-left-right column" style="width: 60%">`;
    content += isNullOrUndefined(order.shop.fullName) ? '' : order.shop.fullName;
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%">SĐT Shop</div>
                        <div class="remove-left-right column" style="width: 60%">`;
    content += isNullOrUndefined(order.shop.phone) ? '' : StringUtil.phoneFormat(order.shop.phone);
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%">Địa chỉ Shop</div>
                        <div class="remove-left-right column" style="width: 60%">`;
    content += isNullOrUndefined(order.shop.address) ? '' : order.shop.address;
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%"></div>
                        <div class="remove-left-right column" style="width: 60%">`;
    content += isNullOrUndefined(order.shop.town) ? '' : district + order.shop.town.name;
    content += `</div>
                    </div>
                </div>
                <div style="width: 100%; border-bottom: 1px solid" class="ui two column grid">
                    <div class="remove-left-right column"  style="width: 100%">
                        <span style="font-weight: bold">THÔNG TIN KHÁCH HÀNG</span>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%">Tên khách hàng</div>
                        <div class="remove-left-right column" style="width: 60%; font-weight: bold">`;
    content += isNullOrUndefined(order.dropoff) || isNullOrUndefined(order.dropoff.contact) ? '' : order.dropoff.contact.name;
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%">SĐT nhận hàng</div>
                        <div class="remove-left-right column" style="width: 60%; font-weight: bold">`;
    content += isNullOrUndefined(order.dropoff) || isNullOrUndefined(order.dropoff.contact) ? '' : StringUtil.phoneFormat(order.dropoff.contact.phone);
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%">Địa chỉ giao hàng</div>
                        <div class="remove-left-right column" style="width: 60%; font-weight: bold">`;
    content += isNullOrUndefined(order.dropoff) || isNullOrUndefined(order.dropoff.address) ? '' : order.dropoff.address;
    content += `</div>
                    </div>
                    <div class="row">
                        <div class="remove-left-right column" style="width: 40%"></div>
                        <div class="remove-left-right column" style="width: 60%; font-weight: bold">`;
    content += isNullOrUndefined(order.dropoff) || isNullOrUndefined(order.dropoff.town) ? '' : order.dropoff.town.district.name + '-' + order.dropoff.town.name;
    content += `</div>
                    </div>
                </div>
                <div style="width: 100%; border-bottom: 1px solid; height: 80px; padding-top: 5px; padding-left: 1rem;">
                    <span style="font-weight: bold">MÔ TẢ ĐƠN HÀNG</span><br>`;
    content += isNullOrUndefined(order.orderMessage) ? '' : order.orderMessage;
    content += `</div>
                <div style="width: 100%;">
                    <table class="ui very basic collapsing celled table" style="width: 100%">
                        <tr>
                            <td style="width: 40%">
                                Ngày tạo đơn
                            </td>
                            <td style="width: 60%; padding-left: 0.5rem !important;">`;
    content += DateUtil.convertToDDMMYYYYHHMM(order.createdDate);
    content += `</td>
                        </tr>
                        <tr>
                            <td style="width: 40%">
                                Loại đơn
                            </td>
                            <td style="width: 55%; font-weight: bold; padding-left: 0.5rem !important">`;
    content += order.cod ? 'COD' : 'Tạm Ứng';
    content += `</td>
                        </tr>
                        <tr>
                            <td style="width: 45%">
                                Tiền hàng
                            </td>
                            <td style="width: 55%; text-align: right">`;
    content += isNullOrUndefined(order.goodAmount) ? '' : order.goodAmount.toLocaleString('vi-VN');
    content += ` đ </td>
                        </tr>
                        <tr>
                            <td style="width: 45%">
                                Phí ship
                            </td>
                            <td style="width: 55%; text-align: right">`;
    content += isNullOrUndefined(order.shipAmount) ? '' : order.shipAmount.toLocaleString('vi-VN');
    content += ` đ </td>
                        </tr>
                        <tr>
                            <td style="width: 45%; font-weight: bold">
                                THU CỦA KHÁCH
                            </td>
                            <td style="width: 55%; font-weight: bold; text-align: right; font-size: 14px">`;
    content += isNullOrUndefined(order.goodAmount) ? '' : order.goodAmount.toLocaleString('vi-VN');
    content += ` đ </td>
                        </tr>
                                                
                        <tr style="text-align: center">
                            <td style="height: 80px; vertical-align: top;">Người giao hàng</td>
                            <td style="height: 80px; vertical-align: top;">Người nhận</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        </div>`;

    return content;
}

function buildVerticalHtmlHeader() {
    var htmlHeader = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Xe Nhàn - HOMEDIRECT</title><link rel="stylesheet" href="`;
    htmlHeader += this.contextPath;
    htmlHeader += `/assets/css/semantic.css"><link rel="stylesheet" href="`;
    htmlHeader += this.contextPath;
    htmlHeader += `/assets/css/order-bill.css"><script type="text/javascript" src="`;
    htmlHeader += this.contextPath;
    htmlHeader += `/assets/js/JsBarcode.min.js"></script>`;
    htmlHeader += `</head><body class="vertical-body">`;//onload="window.print();window.close()"
    return htmlHeader;
}

function openPrintPage(content) {
    var popupWin = window.open('', '', '');
    popupWin.document.write(content);
    popupWin.document.close();
}