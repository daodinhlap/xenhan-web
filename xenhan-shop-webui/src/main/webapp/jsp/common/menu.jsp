<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<sec:authorize access="hasRole('ROLE_USER')">
	<div class="col-sm-3 col-md-2 sidebar">
		<div class="user-login">
		
			<c:set var = "fullName"><%= session.getAttribute("FULLNAME") %></c:set>
			<c:set var = "shopName"><%= session.getAttribute("SHOPNAME") %></c:set>
			<c:set var = "phone"><%= session.getAttribute("USERNAME") %></c:set>
		
			<a href="#" style="color: #555;">
				<%--<div class="col-xs-3 col-sm-3 col-md-4 padding-0 ">--%>
					<%--<img class="avatar" src="/resources/images/">--%>
				<%--</div>--%>
				<div class="col-md-12 center" style=" padding: 15px 0px 15px 0px; color:white">
						<c:if test="${not empty fullName}">
							${fullName }<br>
						</c:if> 
						<c:if test="${not empty phone }">
							<span id="myPhone">${phone }</span>
						</c:if>
				</div>
				<div class="col-xs-1 col-sm-1 col-md-1 padding-0" >
					<i class="fa fa-chevron-right arrow-right" aria-hidden="true"></i>
				</div>
			</a>
		</div>
		<ul class="nav nav-sidebar" style=" font-size: 14px;">
			<c:if test="${not empty shopName && !shopName.equals('null') }">
				<li><a href="/">
					<img src="/resources/images/icon-home.png"><span>Trang chủ</span></a>
				</li>
				<li><a href="/order/tao-don?type=0">
					<img src="/resources/images/icon-order.png"><span>Tạo đơn hàng</span></a>
				</li>
				<li><a href="/order-excel/tao-don-tu-excel">
					<img src="/resources/images/icon-order-excel.png"><span>Tạo đơn từ Excel</span></a>
				</li>
				<li><a href="/order/lich-su">
					<img src="/resources/images/icon-history.png"><span>Lịch sử đơn hàng</span></a>
				</li>
				<li><a href="/shop/thong-tin-tai-khoan">
					<img src="/resources/images/icon-profile.png">
					<span>Thông tin tài khoản</span></a></li>
			</c:if>
			<li><a href="/lien-he"><img src="/resources/images/icon-support.png"><span>Liên hệ</span></a></li>
			<li><a href="/dang-xuat"><img src="/resources/images/icon-exit.png"><span>Đăng xuất</span></a></li>
		</ul>
	</div>
</sec:authorize>
