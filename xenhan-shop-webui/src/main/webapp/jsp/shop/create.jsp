<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<div id="info-receiver" class="container card">
    <div class="center">
        <h2>Thông tin đăng ký Shop</h2>
    </div>

    <div class="form-group">
        <label>Tên shop</label>
        <input placeholder="Tên Shop" type="text" class="form-control" id="fullName">
    </div>

    <div class="form-group">
        <label>Địa chỉ <span style="color: red">*</span></label>
        <input placeholder="Số nhà.../ngách ..."  type="text" class="form-control" id="address">
    </div>

    <div class="form-group">
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
        <label>Số điện thoại <span style="color: red">*</span></label>
        <input  type="text" class="form-control" id="phone">
    </div>

    <div class="form-group">
        <label>Email</label>
        <input  type="text" class="form-control" id="email">
    </div>

    <div class="form-group">
        <label>Website</label>
        <input  type="text" class="form-control" id="website">
    </div>

    <%--BUTTON--%>
    <div class="form-group center">
        <button class="btn btn-danger">Hủy</button>
        <button class="btn btn-success" onclick="registerShop()"> Đăng ký</button>
    </div>
</div>