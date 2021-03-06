<%@ page import="com.homedirect.session.model.SimpleUser" %>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed btn-header"
				data-toggle="collapse" data-target="#navbar-header"
				aria-expanded="true" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="/"> <img class="logo-center"
				src="/resources/images/app_logo_white.png">
			</a>
		</div>
		<div id="navbar-header" class="navbar-collapse collapse">

			<c:set var = "fullName"><%= ((SimpleUser)session.getAttribute("SIMPLE-USER")).getUserProfile().getFullName() %></c:set>
			<c:set var = "phone"><%= ((SimpleUser)session.getAttribute("SIMPLE-USER")).getUserName() %></c:set>
			<c:set var = "shopName"><%=session.getAttribute("SHOPNAME")%></c:set>

			<ul class="nav navbar-nav navbar-right profile"
				style="margin-bottom: 2px">
				<li style="height: 50px; margin-top: 5px;">
					<div style="color: white">
						<img class="avatar" src="/resources/images/app_logo_white.png" style="max-width: 50px">
						<c:choose>
						 <c:when test="${not empty fullName}"><a href="/shop/thong-tin-tai-khoan" style="color: white">${fullName }</a></c:when>
						 <c:when test="${not empty phone }"><a href="/shop/thong-tin-tai-khoan" style="color: white"><span id="myPhone">${phone }</span></a></c:when>
						 <c:otherwise>
						   <a href="/shop/thong-tin-tai-khoan" style="color: white">Không Tên </a>
						 </c:otherwise>
						</c:choose>
					</div>
				</li>

				<c:if test="${not empty shopName && !shopName.equals('null') }">
					<li><a href="/"> <img
							src="/resources/images/m-icon-home.png"><span>Trang chủ</span></a></li>
					<li><a href="#" data-toggle="modal" data-target="#order-type">
						<img src="/resources/images/m-icon-order.png">
						<span>Tạo đơn hàng</span></a>
					</li>
					<li><a href="/order-excel/tao-don-tu-excel"> <img
							src="/resources/images/m-icon-order-excel.png"><span>Tạo đơn từ Excel</span></a></li>
					<li><a href="/order/lich-su"> <img
							src="/resources/images/m-icon-history.png"><span>Lịch sử đơn hàng</span></a></li>

					<sec:authorize access="hasRole('ROLE_ADMIN')">
						<li><a href="/shop/cong-no"> <img
								src="/resources/images/m-icon-debit.png"><span>Lịch sử công nợ</span></a></li>
					</sec:authorize>
					<li><a href="/noti/tin-khuyen-mai"> <img
							src="/resources/images/icon-noti-m.png"> <span>Tin tức</span></a></li>
					<li><a href="/shop/khuyen-mai"> <img
							src="/resources/images/icon-discount-m.png"> <span>Mã khuyến mại</span></a></li>
					<li><a href="/shop/thong-tin-tai-khoan"> <img
							src="/resources/images/m-icon-profile.png"><span>Tài khoản</span></a></li>
				</c:if>
				<li><a href="/lien-he"><img
						src="/resources/images/m-icon-support.png"><span>Liên hệ</span></a></li>
				<li><a href="/dang-xuat"><img
						src="/resources/images/m-icon-exit.png"><span>Đăng xuất</span></a></li>
			</ul>
		</div>
	</div>
</nav>
