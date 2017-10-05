<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<div id="info-receiver" class="container card">
    <div class="center">
        <h2>NGƯỜI NHẬN HÀNG</h2>
    </div>

    <div class="form-group">
        <label>Họ tên</label>
        <input placeholder="Họ tên người nhận hàng" type="text" class="form-control" id="userName">
    </div>
    <div class="form-group">
        <label>Số điện thoại <span style="color: red">*</span></label>
        <input placeholder="SĐT người nhận" type="text" class="form-control" id="phone">
    </div>
    <div class="form-group">
        <label>Địa chỉ <span style="color: red">*</span></label>
        <input placeholder="Số nhà.../ngách ..."  type="text" class="form-control" id="address">
    </div>

    <div class="form-group" style="display: none">
        <label>Tỉnh/TP <span style="color: red">*</span></label>
        <select class="form-control" id="province">
            <option value="1">Hà Nội</option>
            <option value="2">Hồ Chí Minh</option>
        </select>
    </div>

    <div class="form-group">
        <label>Quận/Huyện <span style="color: red">*</span></label>
        <select class="form-control" id="district">
            <option value="1">Cầu Giấy</option>
        </select>
    </div>

    <div class="form-group">
        <label>Ghi chú</label>
        <textarea class="form-control" rows="3" id="note" placeholder="Mô tả đơn hàng/Lời nhắn"></textarea>
    </div>

    <div class="form-group center">
        <button class="btn btn-primary"><i class="fa fa-refresh"></i>&nbsp;Đặt lại</button>
        <button class="btn btn-primary" onclick="next()">
            Tiếp tục&nbsp;<i class="fa fa-arrow-right"></i></button>
    </div>
</div>

<div id="info-order" class="container card" style="display:none;">
    <div class="center">
        <h2>Tiền hàng</h2>
    </div>

    <div class="form-group">
        <label>Loại đơn<span style="color: red">*</span></label>
        <select class="form-control" id="cod">
            <option value="true">COD</option>
            <option value="false">Ứng tiền</option>
        </select>
    </div>

    <div class="form-group">
        <label id="amount-text">Tiền hàng<span style="color: red">*</span></label>
        <input type="text" class="form-control" id="amount">
    </div>
    <div class="form-group">
        <label>Mã giảm giá</label>
        <input type="text" class="form-control" id="coupon">
    </div>

    <div class="form-group">
        <label><i>Tiền giảm giá</i></label>
        <label id="couponAmount" style="float: right"></label>
    </div>

    <div class="form-group">
        <label>Phí ship</label>
        <label id="shipAmount" style="float: right"></label>
    </div>

    <div class="form-group">
        <label id="action">Shop nợ Xe nhàn</label>
        <label id="totalAmount" style="float: right"></label>
    </div>

    <div class="form-group center">
        <button class="btn btn-primary" onclick="move()">
            <i class="fa fa-arrow-left"></i>&nbsp;Quay lại</button>
        <button class="btn btn-success" onclick="create()">Tạo đơn</button>
        <button class="btn btn-primary">Đặt lại&nbsp;<i class="fa fa-refresh"></i></button>
    </div>
</div>