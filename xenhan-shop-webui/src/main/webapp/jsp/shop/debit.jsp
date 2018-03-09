<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>

<div class="col-md-10 col-md-offset-2 mobile-padding">
    <div class="container card" style="padding: 15px;">

        <div id="list-debit">

            <div class="center" style="margin-bottom: 20px">
                <h2 class="page-header"> <span>LỊCH SỬ CÔNG NỢ</span></h2>
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
                <div class="col-md-3 col-xs-6 date-input" style="display: none;">
                    <div class="form-group date">
                        <select id="status" class="form-control">
                            <option value="-1">Trạng thái</option>
                            <option value="-1">Tất cả</option>
                            <option value="0">Chờ thanh toán</option>
                            <option value="4">Đã thanh toán</option>
                        </select>
                    </div>
                </div>

                <!-- KEYWORD -->
                <div class="col-md-2 col-xs-6 date-input">
                    <div class="form-group">
                        <div class="input-group date">
                            <input placeholder="Tìm theo mã đơn hàng" type="text" class="form-control pull-right" id="keyword" name="keyword">
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="button-container center">
                        <button style="width: 45%" class="btn btn-primary" onclick="getDebit()">
                            <i class="fa fa-search" aria-hidden="true"></i>&nbsp;
                            <span>Tìm kiếm</span>
                        </button>

                        </button>
                        <button style="width: 40%" class="btn btn-primary" onclick="exportDebit()">
                            <span>Xuất Excel</span>
                        </button>
                    </div>
                </div>
            </div>

        <%--<div id="list-debit">--%>
            <div class="table-responsive">
                <table class="table table-hover click">
                    <thead>
                    <tr>
                        <th colspan="2" id="counting"></th>
                        <th style="text-align: right" id="counting-text"></th>
                        <th style="text-align: right"><span id="totalDebit"></span>&nbsp;<span style="font-weight: lighter">đ</span></th>
                        <th colspan="3"></th>
                    </tr>
                    <tr style=" background-color: honeydew;">
                        <th>#</th>
                        <th style="text-align: center"> Từ </th>
                        <th style="text-align: center"> Đến </th>
                        <th style="text-align: right">  Công nợ </th>
                        <th style="text-align: center"> Dự kiến thanh toán </th>
                        <th style="text-align: center"> Thực tế thanh toán </th>
                        <th style="text-align: left"> Trạng thái công nợ </th>
                    </tr>
                    </thead>

                    <tbody id="table-debit">
                    </tbody>
                </table>

                <div class="alert alert-warning" style="display: none" id="alert-no-debits">
                    Không có lịch sử thanh toán với điều kiện tìm kiếm trên !
                </div>
            </div>

            <div style="text-align: right">
                <ul class="pagination" id="pagination">
                </ul>
            </div>
        </div>

        <%-- SHOP PAYMENTS--%>
        <div id="list-payments" style="display:none;">

            <div class="center" style="margin-bottom: 20px">
                <h2 class="page-header"> <span>CHI TIẾT CÔNG NỢ</span></h2>
            </div>

            <div class="col-md-2 col-xs-6 date-input">
                <div class="form-group">
                    Từ ngày:&nbsp;<strong id="fromDate-payment"></strong>
                </div>
            </div>
            <div class="col-md-2 col-xs-6 date-input">
                <div class="form-group">
                    Đến ngày:&nbsp;<strong id="toDate-payment"></strong>
                </div>
            </div>
            <div class="col-md-3 col-xs-6 date-input">
                <div class="form-group">
                    Trạng thái:&nbsp;<strong id="status-payment"></strong>
                </div>
            </div>
            <div class="col-md-2 col-xs-6 date-input">
                <div class="form-group">
                    <input id="order-id" placeholder="Tìm theo mã vận đơn" class="form-control" type="number">
                </div>
            </div>
            <div class="col-md-2 col-xs-6 date-input">
                <div class="form-group">
                    <button class="btn btn-primary" onclick="getShopPayment()">
                        <i class="fa fa-search" aria-hidden="true"></i>&nbsp;Tìm kiếm
                    </button>
                </div>
            </div>

            <div style=" clear: both;">
                <button class="btn btn-default" onclick="showShopDebit()">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>&nbsp;Quay lại
                </button>
            </div>

            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th colspan="7" id="counting-payments"></th>
                        <th style="text-align: right"><span id="totalGoodAmount"></span>&nbsp;<span style="font-weight: lighter">đ</span></th>
                        <th style="text-align: right"><span id="totalShipAmount"></span>&nbsp;<span style="font-weight: lighter">đ</span></th>
                        <th style="text-align: right"><span id="totalReturnAmount"></span>&nbsp;<span style="font-weight: lighter">đ</span></th>
                        <th style="text-align: right"><span id="totalDebitAmount"></span>&nbsp;<span style="font-weight: lighter">đ</span></th>
                    </tr>
                    <tr style=" background-color: cornsilk;">
                        <th style="text-align: center">#</th>
                        <th style="text-align: center"> Ngày tạo </th>
                        <th style="text-align: center"> Ngày kết thúc </th>
                        <th style="text-align: center"> MVĐ </th>
                        <th style="text-align: left"> Trạng thái</th>
                        <th style="text-align: left"> Khách hàng</th>
                        <th style="text-align: left"> Địa chỉ</th>
                        <th style="text-align: right"> Tiền hàng</th>
                        <th style="text-align: right"> Phí ship</th>
                        <th style="text-align: right"> Phí trả hàng</th>
                        <th style="text-align: right"> Công nợ</th>
                    </tr>
                    </thead>

                    <tbody id="table-payment">
                    </tbody>
                </table>

                <div class="alert alert-warning" style="display: none" id="alert-no-payments">
                    Không có lịch sử thanh toán chi tiết với điều kiện tìm kiếm trên !
                </div>

                <div style="text-align: right">
                    <ul class="pagination" id="pagination-payments">
                    </ul>
                </div>
            </div>
        </div>

    </div>
</div>



