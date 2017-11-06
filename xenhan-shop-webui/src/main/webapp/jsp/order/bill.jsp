<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles-extras" prefix="tilesx"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html lang="vi">
<head>
    <title>${title}</title>
    <link rel="manifest" href="/resources/manifest.json">
    <meta name="description" content="#">
    <meta name="keywords" content="#">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link rel="icon" href="resources/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="/resources/images/icon_logo.png" type="image/x-icon">
    <tilesx:useAttribute id="listCss" name="stylesheets" classname="java.util.List" />

    <!-- ./stylesheet -->
    <c:forEach var="item" items="${listCss}">
        <link rel="stylesheet" href="${pageContext.request.contextPath}${item}" />
    </c:forEach>

    <!-- ./scripts -->
    <tilesx:useAttribute id="listJs" name="scripts" classname="java.util.List" />
    <c:forEach var="item" items="${listJs}">
        <script
                src="${pageContext.request.contextPath }${item}"></script>
    </c:forEach>
</head>
<body>
    <div class="container card">
        <c:forEach items="${orders}" var="order" varStatus="loopItem">
            <div class="${type == 1 ? "col-sm-4 col-md-4 a4" : "bill"}" style="font-size: 13px; padding: 30px 5px">
                <%--HEADER--%>
                <div>
                    <div class="bill-header-label-content">
                        <img class="order-bill-logo" src="/resources/images/app_logo_black.png">
                        <span class="order-bill-slogan">SẴN SÀNG PHỤC VỤ</span>
                    </div>
                    <div class="bill-header-data-content">
                        <div style="display: table-cell; vertical-align: middle;">
                            Hà Nội - Hotline: 0906236018<%--${hotline-HN}--%>
                            <br>
                            Tp.HCM - Hotline: 0909183955<%--${hotline-HN}--%>
                            <br>
                            Website: www.xenhan.vn
                        </div>
                    </div>
                </div>
                <%--table--%>
                <div style="border: 1px solid; clear: both;">
                    <div>
                        <div class="col-xs-4 col-sm-4 col-md-4 label-content">${order.id}</div>
                        <div class="col-xs-8 col-sm-8 col-md-8" style="padding: 0px">
                            <img ${type == 2 ? "style='width: 180px!important'" : ""} id="${order.id}"></img>
                        </div>
                    </div>
                    <script>$("#${order.id}").JsBarcode(${order.id},{displayValue: false,width:4,height:40});
                    </script>

                    <div class="bill-container bill-fix-height">
                        <p><strong>THÔNG TIN SHOP</strong></p>
                        <%--shop name--%>
                            <div class="col-xs-4 col-sm-4 col-md-4 no-padding"> Tên </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 content-right no-padding"> ${order.shop.fullName}</div>
                        <%--phone--%>
                            <div class="col-xs-4 col-sm-4 col-md-4 no-padding"> SĐT </div>
                            <div class="col-xs-8 col-sm-8 col-md-8 content-right no-padding"> ${order.shop.phone} </div>
                        <%--address--%>
                            <div class="col-md-12 content-right no-padding"> ${order.shop.address},
                                    ${order.shop.town.district.name}, ${order.shop.town.name}
                            </div>
                    </div>

                    <div class="bill-container bill-fix-height">
                        <p style="margin: 0px"><strong>THÔNG TIN KHÁCH HÀNG</strong></p>
                            <%--contact--%>
                            <div class="col-md-12 content-right no-padding">
                                    ${order.dropoff.contact.name? order.dropoff.contact.name:"..."} - ${order.dropoff.contact.phone}
                            </div>
                            <%--dropoff--%>
                            <div class="col-md-12 content-right no-padding"> ${order.dropoff.address},
                                ${order.dropoff.town.district.name}, ${order.dropoff.town.name}</div>
                    </div>

                    <div class="${type == 2 ? "bill-fix-height-msg" : ""}" style="border-top: 1px solid; padding: 5px 10px">
                        <p style="margin: 0px"><strong>MÔ TẢ ĐƠN HÀNG</strong></p>
                        <div class="col-md-12 content-right no-padding">${order.orderMessage}</div>
                    </div>

                    <div style="border-top: 1px solid">
                        <table class="table small table-bordered" style=" margin: 0px">
                            <tbody>
                                <jsp:useBean id="createdDate" class="java.util.Date" />
                                <jsp:setProperty name="createdDate" property="time" value="${order.createdDate}" />
                                <tr>
                                    <td>Ngày tạo đơn</td>
                                    <td><fmt:formatDate pattern="dd/MM/yyyy HH:MM" value="${createdDate}" /></td>
                                </tr>
                                <tr>
                                    <td>Loại đơn</td>
                                    <td><strong>${order.COD ? 'COD' : 'Tạm Ứng'}</strong></td>
                                </tr>
                                <tr>
                                    <td>Tiền hàng</td>
                                    <td style="text-align: right"><fmt:formatNumber maxFractionDigits = "3" value = "${order.goodAmount}" /></td>

                                </tr>
                                <%--<tr>--%>
                                    <%--<td>Phí ship</td>--%>
                                    <%--<td style="text-align: right"><fmt:formatNumber maxFractionDigits = "3" value = "${order.shipAmount}" /></td>--%>

                                <%--</tr>--%>
                                <tr>
                                    <td><strong>THU CỦA KHÁCH</strong></td>
                                    <td style="text-align: right"><strong><fmt:formatNumber maxFractionDigits = "3" value = "${order.goodAmount}" /></strong></td>

                                </tr>
                                <tr style="height: 80px">
                                    <td style="text-align: center">Người giao hàng</td>
                                    <td style="text-align: center">Người nhận hàng</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </c:forEach>

    </div>
</body>
</html>