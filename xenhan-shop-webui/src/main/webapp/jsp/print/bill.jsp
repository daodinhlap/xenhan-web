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

    <c:forEach var="item" items="${listCss}">
        <link rel="stylesheet" href="${pageContext.request.contextPath}${item}" />
    </c:forEach>
</head>
<body>
    <div class="container card">
        <c:forEach items="${orders}" var="order" varStatus="loopItem">
            <div class="col-xs-4 col-sm-4 col-md-4" style="font-size: 13px;">
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
                    <div  style="border: 1px solid;">
                        <div class="label-content">${order.id}</div>
                        <div style="width: 70%"></div>
                    </div>

                    <div  style="border: 1px solid; padding: 10px">
                        <p><strong>THÔNG TIN SHOP</strong></p>
                        <%--shop name--%>
                        <div>
                            <div class="content-left"> Tên Shop </div>
                            <div class="content-right"> ${order.shop.fullName}</div>
                        </div>
                        <%--phone--%>
                        <div>
                            <div class="content-left"> SĐT Shop </div>
                            <div class="content-right"> ${order.shop.phone} </div>
                        </div>
                        <%--address--%>
                        <div>
                            <div class="content-left"> Địa chỉ Shop </div>
                            <div class="content-right"> ${order.shop.address}, ${order.shop.town.name} </div>
                        </div>
                    </div>

                    <div  style="border: 1px solid; padding: 10px">
                        <p><strong>THÔNG TIN KHÁCH HÀNG</strong></p>
                            <%--contact--%>
                        <div>
                            <div class="content-left"> Tên khách hàng </div>
                            <div class="content-right"> ${order.dropoff.contact.name}</div>
                        </div>
                            <%--phone--%>
                        <div>
                            <div class="content-left"> SĐT nhận hàng </div>
                            <div class="content-right"> ${order.dropoff.contact.phone} </div>
                        </div>
                            <%--dropoff--%>
                        <div>
                            <div class="content-left"> Địa chỉ giao hàng </div>
                            <div class="content-right"> ${order.dropoff.address},
                                ${order.dropoff.town.district.name}, ${order.dropoff.town.name}</div>
                        </div>
                    </div>

                    <div  style="border: 1px solid; padding: 10px">
                        <p><strong>MÔ TẢ ĐƠN HÀNG</strong></p>
                        <div>${order.orderMessage}</div>
                    </div>

                    <div  style="border: 1px solid">
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
                                <tr>
                                    <td>Phí ship</td>
                                    <td style="text-align: right"><fmt:formatNumber maxFractionDigits = "3" value = "${order.shipAmount}" /></td>

                                </tr>
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