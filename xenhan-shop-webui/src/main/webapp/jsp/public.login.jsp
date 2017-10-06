<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page pageEncoding="UTF-8"%>
<div class="col-md-6 col-md-offset-3  mobile-padding">

<div class="container">
	<div class="card" style="padding: 20px 0px;">
		<p id="alert"></p>
		<div class="ui centered small image" style="text-align: center">
			<img style="width: 150px;" src="/resources/images/app_logo_orange.png">
		</div>

		<h4 class="title">Đăng Nhập</h4>
		<c:choose>
			<c:when test="${not empty error}">
				<div class="input-container" style="color: red">
					<c:out value="${error}" />
				</div>
			</c:when>
		</c:choose>

		<div class="container">
			<div class="form-group">
				<label>Số điện thoại  <span style="color: red">*</span></label>
				<input type="tel" class="form-control" id="phone" value="01677869226">
			</div>

			<div class="form-group">
				<label>Mật khẩu  <span style="color: red">*</span></label>
				<input type="password" class="form-control" id="password" value="123456">
			</div>

			<div>
				<a style=" float: right;margin-top: -10px;margin-bottom: 20px; cursor: pointer;"
				   rel="nofollow" rel="noreferrer" id="forgotPassword">Quên mật khẩu</a>
			</div>

			<%--BUTTON--%>
			<div class="button-container"  style="clear: both">
				<button onclick="loginXenhan()" class="btn btn-success btn-xenhan" >
					<span>Đăng nhập</span>
				</button>
			</div>
			<%--BUTTON--%>

			<div class="button-container" style="margin-top: 10px">
				<a rel="nofollow" rel="noreferrer" href="/dang-ky"> Đăng ký </a>
			</div>
		</div>

		<%--<div class="input-container">--%>
			<%--<input type="tel" id="phone" required="required" style="height: 40px; margin-top: 15px;"/>--%>
			<%--<label for="phone">Số điện thoại</label>--%>
			<%--<div class="bar"></div>--%>
		<%--</div>--%>

		<%--<div class="input-container">--%>
			<%--<input type="password" id="pass" required="required"style="height: 40px; margin-top: 15px;"/>--%>
				<%--<label for="pass">Mật khẩu</label>--%>
			<%--<div class="bar"></div>--%>
		<%--</div>--%>

	</div>
</div>

</div>