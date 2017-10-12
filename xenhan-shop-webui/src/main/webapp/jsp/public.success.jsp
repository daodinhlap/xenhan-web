<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page pageEncoding="UTF-8"%>
<div class="col-md-6 col-md-offset-3  mobile-padding">

	<div class="container">
		<div class="card" style="padding: 20px 0px;">
			<p id="alert"></p>
			<div class="ui centered small image" style="text-align: center">
				<a target="_blank" href="https://xenhan.vn/">
					<img style="width: 150px;" src="/resources/images/app_logo_orange.png"></a>
			</div>

			<h1 class="title center">CHÚC MỪNG BẠN ĐĂNG KÝ THÀNH CÔNG</h1>

			<div class="container center">
				<h2 style="font-weight: normal;">
					SĐT: ${phone} và Mật khẩu bạn vừa tạo được dùng chung cho tất cả các dịch vụ của<br>
					<strong>Công ty HomeDirect</strong>
				</h2><br>

				<%--BUTTON--%>
				<div class="button-container"  style="clear: both">
					<a href="/dang-nhap"><button class="btn btn-success btn-xenhan" >
						<span>Đăng nhập</span>
					</button></a>
				</div>
				<%--BUTTON--%>
			</div>

		</div>
	</div>

</div>
