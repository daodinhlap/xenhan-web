<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<p id="alert"></p>

<div class="form-group">
	<label>Mật khẩu cũ<span style="color: red">*</span></label> <input
		type="password" class="form-control" id="old-password">
</div>

<div class="form-group">
	<label>Mật khẩu mới<span style="color: red">*</span></label> <input
		type="password" class="form-control" id="new-password">
</div>

<div class="form-group">
	<label>Nhập lại mật khẩu mới<span style="color: red">*</span></label> <input
		type="password" class="form-control" id="confirm-password">
</div>


<div class="form-group center">
	<button class="btn btn-primary" onclick="changePassword()">
		Đổi mật khẩu</button>
</div>
