<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page pageEncoding="UTF-8"%>

<script src='https://www.google.com/recaptcha/api.js?hl=vi'></script>

<div class="container" style="margin-top: -30px;">
	<div class="card"></div>
	<div class="card" style=" padding: 20px 0px 20px 0px;">
	
		<p id="alert"></p>
		<div id="confirm-otp" >
			
			<h1 class="title">XÁC NHẬN ĐĂNG KÝ</h1>
			
			<div class="input-container">
				<input type="tel" required="required" id="phone" /> 
				<label for="phone">Số điện thoại</label>
				<div class="bar"></div>
			</div>
			
			<div class="input-container">
				<input type="tel" required="required" id="otp" /> 
				<label for="otp">Nhập mã OTP</label>
				<div class="bar"></div>
			</div>
			
<!-- 			<div style="float:left; margin-left: 15px">
				<p>Hotline: <a href='tel:02871099710'>028 710 99710</a></p>
			</div> -->
			
			<div class="button-container">
				<button onclick="confirmOTP()"> <span>Xác Nhận</span> </button>
			</div>
			
			<jsp:include page="./common/link.app.jsp" />
		</div>	
	</div>
</div>
