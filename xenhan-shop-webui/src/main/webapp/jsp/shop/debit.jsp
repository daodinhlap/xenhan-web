<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>

<div class="col-md-8 col-md-offset-2 mobile-padding">
    <div class="container card" style="padding: 15px;">

        <div class="center" style="margin-bottom: 20px">
            <h2 class="page-header"> <span>LỊCH SỬ THANH TOÁN</span></h2>
        </div>

        <div id="filter-area">
            <!-- FROM -->
            <div class="col-md-3 col-xs-6 date-input">
                <div class="form-group">
                    <div class="input-group date">
                        <span style="padding: 4px" class="input-group-addon">Từ</span>
                        <input placeholder="Ngày bắt đầu" type="text" readonly="readonly"
                               style="background-color:  #fff;" class="form-control pull-right"
                               id="fromDate" name="fromDate">
                    </div>
                </div>
            </div>
            <!-- TO -->
            <div class="col-md-3 col-xs-6 date-input">
                <div class="form-group">
                    <div class="input-group date">
                        <span style="padding: 4px" class="input-group-addon">Đến</span>
                        <input placeholder="Ngày kết thúc" type="text" readonly="readonly"
                               style="background-color: #fff;" class="form-control pull-right"
                               id="toDate" name="toDate">
                    </div>
                </div>
            </div>

            <!-- STATUS -->
            <div class="col-md-3 col-xs-6 date-input">
                <div class="form-group date">
                    <select id="status" class="form-control">
                        <option value="">Trạng thái</option>
                        <option value="-1">Tất cả</option>
                        <option value="0">Chờ thanh toán</option>
                        <option value="4">Đã thanh toán</option>
                    </select>
                </div>
            </div>

            <div class="col-md-3 col-xs-6">
                <div class="button-container center">
                    <button style="width: 100% " class="btn btn-primary" onclick="getDebit()">
                        <span>Tìm kiếm</span>
                    </button>
                    <%--<button class="btn btn-primary" onclick="reset()">--%>
                    <%--<span>Đặt lại</span>--%>
                    <%--</button>--%>
<%--                    <button class="btn btn-primary" onclick="exportHistory()">
                        <span>Xuất Excel</span>
                    </button>--%>
                </div>
            </div>
        </div>
    </div>
</div>



