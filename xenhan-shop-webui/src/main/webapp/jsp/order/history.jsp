<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>
<%@ page import="java.util.*" %>

<div class="col-md-8 col-md-offset-2 mobile-padding">
    <div class="container card" style="padding: 15px;">
    	<div class="center" style="margin-bottom: 20px">
            <h2 class="page-header">DANH SÁCH ĐƠN HÀNG</h2>
		</div>
        <!-- FROM -->
        <div class="col-md-3 col-xs-6 date-input">
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
        <div class="col-md-3 col-xs-6 date-input">
            <div class="form-group">
                <div class="input-group date">
                    <span style="padding: 4px" class="input-group-addon">Đến</span>
                    <input placeholder="Ngày giờ kết thúc" type="text" readonly="readonly"
                        style="background-color: #fff;" class="form-control pull-right"
                       id="toDate" name="toDate">
                </div>
            </div>
        </div>

        <!-- type view -->
        <div class="col-md-2 col-xs-6 date-input">
            <div class="form-group date">
                <select id="typeOfView" class="form-control">
                    <option value="0">Ngày tạo</option>
                    <option value="1">Ngày kết thúc</option>
                </select>
            </div>
        </div>

        <%--KEY WORD --%>
        <div class="col-md-2 col-xs-6 date-input">
            <div class="form-group">
                <input class="form-control" type="text"
                    placeholder="Số vận đơn, địa chỉ giao hàng, mã giảm giá, sđt nhận hàng, ghi chú"
                    title="Số vận đơn, địa chỉ giao hàng, mã giảm giá, sđt nhận hàng, ghi chú"
                   id="keyword">
            </div>
        </div>

        <!-- STATUS -->
        <div class="col-md-2 col-xs-6 date-input">
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

        <div class="col-md-12 col-xs-12">
            <div class="button-container center">
                <button class="btn btn-primary" onclick="getHistory()">
                    <span>Tìm kiếm</span>
                </button>
                <%--<button class="btn btn-primary" onclick="reset()">--%>
                    <%--<span>Đặt lại</span>--%>
                <%--</button>--%>
                <button class="btn btn-primary" >
                    <span>Xuất Excel</span>
                </button>
            </div>
        </div>

        <div>
            <div class="table-responsive">
                <table class="table table-hover click">
                    <thead>
                        <tr>
                            <th colspan="4" id="counting"></th>
                            <th style="text-align: right" colspan="3"><span id="totalGoodAmount"></span>&nbsp;đ</th>
                            <th style="text-align: right"><span id="totalShipAmount"></span>&nbsp;đ</th>
                            <th style="width: 10px;"></th>
                        </tr>
                        <tr>
                            <th style="width: 10px;" style="color: #92c78a;">#</th>
                            <th>
                                <a href="#" onclick="print()" data-toggle="tooltip" title="Click để In phiếu">
                                    <i style="color: #92c78a;" class="fa fa-print"></i></a>
                            </th>
                            <th style="text-align: left">
                                <i style="color: #92c78a;" class="fa fa-barcode" data-toggle="tooltip" title="Mã vận đơn"></i>
                            </th>
                            <th style="text-align: left">
                                <i style="color: #92c78a;" class="fa fa-calendar-check-o" data-toggle="tooltip" title="Ngày tạo đơn"></i>
                            </th>
                            <th style="text-align: left">
                                <i style="color: #92c78a;" class="fa fa-calendar-times-o" data-toggle="tooltip" title="Ngày kết thúc"></i>
                            </th>
                            <th style="text-align: left">
                                <img class="img-icon" src="/resources/images/icon_location_1.png" data-toggle="tooltip" title="Địa chỉ giao hàng">
                            </th>
                            <th style="text-align: right">
                                <img class="img-icon" src="/resources/images/icon_green_amount.png" data-toggle="tooltip" title="Tiền hàng">
                            </th>
                            <th style="text-align: right">
                                <img class="img-icon" src="/resources/images/icon_green_ship_amount.png" data-toggle="tooltip" title="Phí ship">
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="table-history">
                    </tbody>
                </table>
            </div>

            <div style="text-align: right">
                <ul class="pagination" id="pagination">
                </ul>
            </div>

        </div>
    </div>
</div>



