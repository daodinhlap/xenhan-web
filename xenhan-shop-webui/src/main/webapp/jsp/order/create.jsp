<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<div id="info-receiver" class="container card">
    <div class="center">
        <h2>NGƯỜI NHẬN HÀNG</h2>
    </div>

    <form>
        <div class="form-group">
            <label>Họ tên</label>
            <input placeholder="Họ tên người nhận hàng" type="text" class="form-control" id="fullName">
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
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
        </div>

        <div class="form-group">
            <label>Quận/Huyện <span style="color: red">*</span></label>
            <select class="form-control" id="district">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
        </div>

        <div class="form-group">
            <label>Ghi chú</label>
            <textarea class="form-control" rows="3" id="note" placeholder="Mô tả đơn hàng/Lời nhắn"></textarea>
        </div>

        <div class="form-group center">
            <button class="btn btn-primary"><i class="fa fa-refresh"></i>&nbsp;Đặt lại</button>
            <button class="btn btn-primary">Tiếp tục&nbsp;<i class="fa fa-arrow-right"></i></button>
        </div>
    </form>
</div>