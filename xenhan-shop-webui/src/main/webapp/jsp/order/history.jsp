<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>
<%@ page import="java.util.*" %>

<div class="col-md-10 col-md-offset-2 mobile-padding">
    <div class="container card" style="padding: 15px;">
    	<div class="center" style="margin-bottom: 20px">
            <h2 class="page-header">
                <span>DANH SÁCH ĐƠN HÀNG</span>
                <span><i id="btn-filter" class="fa fa-filter fa-lg" aria-hidden="true"
                         data-toggle="tooltip" data-placement="bottom" title="Tìm kiếm đơn hàng"
                         style=" color: #f3931f;cursor: pointer;"></i>
                </span>
            </h2>
		</div>

        <div id="filter-area">
            <!-- FROM -->
            <div class="col-md-2 col-xs-6 date-input">
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
            <div class="col-md-2 col-xs-6 date-input">
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

            <%--KEY WORD --%>
            <div class="col-md-4 col-xs-12 date-input">
                <div class="form-group">
                    <input class="form-control" type="text"
                           data-toggle="tooltip" title="Số vận đơn, địa chỉ giao hàng, mã giảm giá, SĐT người tạo, SĐT nhận hàng, ghi chú ... "
                           placeholder="Số vận đơn, địa chỉ giao hàng, mã giảm giá, SĐT người tạo, SĐT nhận hàng, ghi chú ..."
                           id="keyword">
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
                    <button class="btn btn-primary" onclick="exportHistory()">
                        <span>Xuất Excel</span>
                    </button>
                </div>
            </div>
        </div>

        <div>
            <div class="table-responsive">
                <table class="table table-hover click">
                    <thead>
                        <tr>
                            <th colspan="5" id="counting"></th>
                            <th style="text-align: right" colspan="5"><span id="totalGoodAmount"></span>&nbsp;đ</th>
                            <th style="text-align: right"><span id="totalShipAmount"></span>&nbsp;đ</th>
                            <th style="width: 10px;"></th>
                        </tr>
                        <tr>
                            <th style="width: 10px;" style="color: #92c78a;"><i style="color: #92c78a;" class="fa fa-hashtag"></th>
                            <th style="width: 50px">
                                <input type="checkbox" id="check-all">
                                <div class="dropdown" data-toggle="tooltip" title="Click để In phiếu" style="float: right;cursor: pointer">
                                    <a class="dropdown-toggle" data-toggle="dropdown"
                                            data-toggle="tooltip" title="Click để In phiếu">
                                        <i style="color: #92c78a;" class="fa fa-print"></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#" onclick="print(1)">A4</a></li>
                                        <li><a href="#" onclick="print(2)">In nhiệt</a></li>
                                    </ul>
                                </div>
                            </th>
                            <th style="text-align: left">
                                <i style="color: #92c78a;" class="fa fa-barcode" data-toggle="tooltip" title="Mã vận đơn"></i>
                            </th>
                            <th style="text-align: center; width: 150px">
                                <i style="color: #92c78a;" class="fa fa-commenting" data-toggle="tooltip" title="Trạng thái đơn hàng"></i>
                            </th>
                            <th style="text-align: left">
                                <i style="color: #92c78a;" class="fa fa-calendar-plus-o" data-toggle="tooltip" title="Ngày tạo đơn"></i>
                            </th>
                            <th style="text-align: left">
                                <i style="color: #92c78a;" class="fa fa-calendar-check-o" data-toggle="tooltip" title="Ngày kết thúc"></i>
                            </th>
                            <th style="text-align: left">
                                <i style="color: #92c78a;" class="fa fa-user" data-toggle="tooltip" title="Khách hàng"></i>
                            </th>
                            <th style="text-align: left">
                                <i style="color: #92c78a;" class="fa fa-phone" data-toggle="tooltip" title="SĐT Khách hàng"></i>
                            </th>
                            <th style="text-align: left">
                                <img class="img-icon" src="/resources/images/icon_location_1.png" data-toggle="tooltip" title="Địa chỉ giao hàng">
                            </th>
                            <th style="text-align: right">
                                <img class="img-icon" src="/resources/images/icon_green_amount.png" data-toggle="tooltip" title="Tiền hàng">
                            </th>
                            <th style="text-align: right">
                                <img class="img-icon" src="/resources/images/icon_green_ship_amount.png" data-toggle="tooltip" title="Phí ship/Phí trả lại">
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="table-history">
                    </tbody>
                </table>

                <div class="alert alert-warning" style="display: none" id="alert-no-orders">
                    Không có đơn hàng với điều kiện tìm kiếm trên !
                </div>
            </div>

            <div style="text-align: right">
                <ul class="pagination" id="pagination">
                </ul>
            </div>

            <div style="font-size: 12px">
                <p> <div class="note-color" style="background-color: #77ba20;"></div>Tìm ship</p>
                <p> <div class="note-color" style="background-color: #ffb80f;"></div>Chờ lấy hàng</p>
                <p> <div class="note-color" style="background-color: #16559f;"></div>Đang giao hàng</p>
                <p> <div class="note-color" style="background-color: #85019d;"></div>Đã giao hàng</p>
                <p> <div class="note-color" style="background-color: red;"></div>Trả lại hàng</p>
                <p> <div class="note-color" style="background-color: black;"></div>Hủy đơn</p>
            </div>

        </div>
    </div>
</div>

<!-- ad -->
<div id="advertising" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="ad-title"></h4>
            </div>
            <div class="modal-body" style="white-space: pre-line;">
                <p id="ad-content"></p>
            </div>
            <div class="modal-footer">
            </div>

        </div>
    </div>
</div>





