<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page pageEncoding="UTF-8"%>

<script src='https://www.google.com/recaptcha/api.js?hl=vi'></script>

<div class="container" style="margin-top: -30px;">
	<div class="card"></div>
	<div class="card" style=" padding: 20px 0px 20px 0px;">
	
		<p id="alert"></p>
		<div id="form-register">
			<img class="ui centered small image" style="width: 130px;" src="/resources/images/app_logo_orange.png">
			<h1 class="title">Đăng ký</h1>
			<!-- FULL NAME -->
			<div class="input-container">
				<input type="text" id="fullName" required="required" value="" autocomplete="on"/> <label
					for="fullName">Họ tên</label>
				<div class="bar"></div>
			</div>
			
			<div class="input-container">
			<div class="radio radio-inline">
              	<label for="gender" class="radio-inline">Nam </label><input name="gender" type="radio" value="1" tabindex="0"/>
              	</div>
              	<div class="radio radio-inline">
              	<label for="gender" class="radio-inline">Nữ </label><input name="gender" type="radio" value="0" tabindex="0"/>
              	</div>
				<div class="bar"></div>
			</div>
			<!-- PHONE -->
			<div class="input-container">
				<input type="tel" id="phone" required="required" value="" style="height: 40px; margin-top: 15px;" autocomplete="on"/> <label
					for="phone">Số điện thoại</label>
				<div class="bar"></div>
			</div>
			<!-- PASSWORD -->
			<div class="input-container">
				<input type="password" id="pass" required="required" value="" style="height: 40px; margin-top: 15px;"/> <label
					for="pass">Nhập mật khẩu</label>
				<div class="bar"></div>
			</div>
			<div class="input-container">
				<input type="password" id="confirmPass" required="required" value="" style="height: 40px; margin-top: 15px;"/> <label
					for="confirmPass">Nhập lại mật khẩu</label>
				<div class="bar"></div>
			</div>
			<div class="input-container">
				<div style="float:left; margin-bottom: 5px">
					<p>Hotline: <a href='tel:02871099710'>028 710 99710</a></p>
				</div>
			</div>
			<!-- RE CAPTCHA  -->
			<div class="input-container" style="margin-bottom: 15px">
				<div class="g-recaptcha" data-sitekey="${googleCaptchaSiteKey}" 
				data-theme="light" style="transform:scale(0.77);-webkit-transform:scale(0.77);transform-origin:0 0;-webkit-transform-origin:0 0;"></div>
			</div>
	
			<div class="button-container">
				<button onclick="registerPayd()">
					<span>Đăng ký</span>
				</button>
			</div>
			<div class="footer">
	 			<i class="fa fa-arrow-circle-left"></i>&nbsp;<a href="/">Đăng nhập</a>
	 			<c:if test="${not empty error }">
		 			<c:set var="error" scope="session" value=""/>
	 			</c:if>
			</div>
			
		</div>
		
		
		<div id="confirm-otp" style="display: none" >
			
			<h1 class="title">XÁC NHẬN ĐĂNG KÝ</h1>
			
			<div class="input-container">
				<p>Mã xác nhận (OTP) đã được gửi tới số điện thoại: <strong id="phoneRegister"></strong><br></p>
			</div>
			
			<div class="input-container">
				<input type="tel" required="required" id="otp" /> 
				<label for="otp">Nhập mã OTP</label>
				<div class="bar"></div>
				
			</div>
			<div style="float:right; margin-right: 15px">
				<a href="#" onclick="resendOtp()">Gửi lại mã OTP</a>
			</div>
			<div style="float:left; margin-left: 15px">
				<p>Hotline: <a href='tel:02871099710'>028 71099710</a></p>
			</div>
			
			<div class="button-container">
				<button onclick="confirmOTP()"> <span>Xác Nhận</span> </button>
			</div>
			
			<div style="text-align: center; margin-top: 20px" >
				<a style ="color: #777;" href="#" onclick="cancleRegister()">Hủy đăng ký</a>
			</div>
	
		</div>	
		
	</div>
</div>
