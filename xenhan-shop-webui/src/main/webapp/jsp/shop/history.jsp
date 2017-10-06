<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>
<%@ page import="java.util.*" %>

<div class="container card" style=" padding: 15px;">
    <!-- FROM -->
    <div class="col-md-4 col-xs-6 date-input">
        <div class="form-group">
            <div class="input-group date">
                <span style="padding: 4px" class="input-group-addon">Từ</span>
                <input placeholder="Ngày giờ bắt đầu" type="text" readonly="readonly"
                    style="background-color:  #fff;" class="form-control pull-right"
                    id="fromDate" name="fromDate">
            </div>
        </div>
    </div>
    <!-- TO -->
    <div class="col-md-4 col-xs-6 date-input">
        <div class="form-group">
            <div class="input-group date">
                <span style="padding: 4px" class="input-group-addon">Đến</span>
                <input placeholder="Ngày giờ kết thúc" type="text" readonly="readonly"
                    style="background-color: #fff;" class="form-control pull-right"
                   id="toDate" name="toDate">
            </div>
        </div>
    </div>

    <%--KEY WORD    --%>
    <div class="col-md-4 col-xs-6 date-input">
        <div class="form-group">
            <input class="form-control" type="text"
                placeholder="Số vận đơn, địa chỉ giao hàng, mã giảm giá, sđt nhận hàng, ghi chú"
                title="Số vận đơn, địa chỉ giao hàng, mã giảm giá, sđt nhận hàng, ghi chú"
               id="keyword">
        </div>
    </div>

    <!-- type view -->
    <div class="col-md-3 col-xs-6 date-input">
        <div class="form-group date">
            <select id="typeOfView" class="form-control">
                <option value="0">Ngày tạo</option>
                <option value="1">Ngày kết thúc</option>
            </select>
        </div>
    </div>

    <!-- STATUS -->
    <div class="col-md-3 col-xs-6 date-input">
        <div class="form-group date">
            <select id="status" class="form-control">
                <option value="">Trạng thái</option>
                <option value="0">Tất cả</option>
                <option value="1">Chờ lấy hàng</option>
                <option value="2">Đang giao hàng</option>
                <option value="200">Đã giao hàng</option>
                <option value="4">Đang trả lại</option>
                <option value="400">Đã trả lại</option>
                <option value="5">Đã hủy</option>
            </select>
        </div>
    </div>

    <div class="col-md-6 col-xs-12">
        <div class="button-container center">
            <button class="btn btn-primary" >
                <span>Tìm kiếm</span>
            </button>
            <button class="btn btn-primary" >
                <span>Đặt lại</span>
            </button>
            <button class="btn btn-primary" >
                <span>Xuất Excel</span>
            </button>
        </div>
    </div>

    <div>
        <table class="table table-striped" id="table-history">
            <thead>
                <tr>
                    <th>STT</th>
                    <th style="text-align: right">Mã đơn</th>
                    <th style="text-align: right">Ngày tạo</th>
                    <th style="text-align: right">Ngày kết thúc</th>
                    <th style="text-align: right">Địa chỉ giao hàng</th>
                    <th style="text-align: right">Tiền hàng</th>
                    <th style="text-align: right">Phí ship</th>
                </tr>
            </thead>
            <tbody>
            <%--<c:forEach items="${page.pageItems}" var="order" varStatus="loop">--%>
                <%--&lt;%&ndash;date&ndash;%&gt;--%>
                <%--<c:if test="${order.createdDate > 0}">--%>
                    <%--<jsp:useBean id="createdDate" class="java.util.Date" />--%>
                    <%--<jsp:setProperty name="createdDate" property="time" value="${order.createdDate}" />--%>
                <%--</c:if>--%>
                <%--<c:if test="${order.closedDate > 0}">--%>
                    <%--<jsp:useBean id="closedDate" class="java.util.Date" />--%>
                    <%--<jsp:setProperty name="closedDate" property="time" value="${order.closedDate}" />--%>
                <%--</c:if>--%>

                <%--<tr>--%>
                    <%--<td align="right">${loop.index + 1 }</td>--%>
                    <%--<td align="right">${order.id }</td>--%>
                    <%--<td align="right"><fmt:formatDate pattern="dd-MM HH:mm" value="${createdDate }" /></td>--%>
                    <%--<td align="right"><fmt:formatDate pattern="dd-MM HH:mm" value="${closedDate }" /></td>--%>
                    <%--<td align="right">${order.dropoff.address }</td>--%>
                    <%--<td align="right"><fmt:formatNumber type = "number" maxFractionDigits = "3" value = "${order.goodAmount}" /></td>--%>
                    <%--<td align="right"><fmt:formatNumber type = "number" maxFractionDigits = "3" value = "${order.shipAmount}" /></td>--%>
                <%--</tr>--%>
            <%--</c:forEach>--%>
            </tbody>
        </table>
    </div>
</div>



