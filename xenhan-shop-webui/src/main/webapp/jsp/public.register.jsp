<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page pageEncoding="UTF-8"%>

<script src='https://www.google.com/recaptcha/api.js?hl=vi'></script>

<div class="container" style=" margin-top: -30px;">
	<div class="card" style=" padding: 20px 0px 20px 0px;">

		<p id="alert"></p>
		<div style="text-align: center">
			<img class="ui centered small image" style="width: 150px;" src="/resources/images/app_logo_orange.png">
		</div>
		<h1 class="title">Đăng ký tài khoản</h1>

		<div id="form-register" class="container">
			<form>
				<div class="form-group">
					<label>Họ và tên <span style="color: red">*</span>:</label>
					<input type="text" class="form-control" id="fullName">
				</div>

				<div class="form-group">
					<label class="radio-inline">
						<input type="radio" name="gender" value="1">Nam
					</label>
					<label class="radio-inline">
						<input type="radio" name="gender" value="2">Nữ
					</label>
				</div>

				<div class="form-group">
					<label>Số điện thoại đăng nhập <span style="color: red">*</span>:</label>
					<input type="text" class="form-control" id="phone">
				</div>

				<div class="form-group">
					<label>Email <span style="color: red">*</span>:</label>
					<input type="text" class="form-control" id="email">
				</div>

				<div class="form-group">
					<label>Mật khẩu <span style="color: red">*</span>:</label>
					<input type="password" class="form-control" id="password">
				</div>

				<div class="form-group">
					<label>Nhập lại mật khẩu  <span style="color: red">*</span>:</label>
					<input type="password" class="form-control" id="confirmPassword">
				</div>
			</form>

			<div class="button-container" style=" clear: both;">
				<button type="button" class="btn btn-success btn-xenhan" onclick="registerXenhan()">
					<span>Đăng ký</span>
				</button>

				<div style="margin-top: 10px">
					<i class="fa fa-arrow-circle-left"></i>&nbsp;<a href="/dang-nhap">Đăng nhập</a>
				</div>
			</div>
		</div>
	</div>
</div>
