<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<sec:authorize access="hasRole('ROLE_USER')">
	<div class="col-sm-3 col-md-2 sidebar">
		<div class="user-login">
		
			<c:set var = "fullName"><%= session.getAttribute("FULLNAME") %></c:set>
			<c:set var = "phone"><%= session.getAttribute("USERNAME") %></c:set>
		
			<a href="/tai-khoan/truy-van-tai-khoan" style="color: #555;">
				<div class="col-xs-3 col-sm-3 col-md-4 padding-0 ">
					<img class="avatar" src="/resources/images/icon-user.png">
				</div>
				<div class="col-xs-8 col-sm-8 col-md-7 " style=" padding: 15px 0px 15px 0px; color:white">
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

			<li><a href="/"><img width="30px" src="/resources/images/icon-dichvu-menu.png"><span>Dịch vụ</span></a></li>
			<li><a href="/tai-khoan/sao-ke?accountNo=">
				<img src="/resources/images/icon-lichsu-menu.png"><span>Lịch sử giao dịch</span></a>
			</li>
			<li><a href="/ngan-hang/thiet-lap-ngan-hang"><img src="/resources/images/icon-nganhang-menu.png"><span>Thiết lập ngân hàng</span></a></li>
			<li><a href="/tai-khoan/doi-mat-khau"><img src="/resources/images/icon-matkhau-menu.png"><span>Mật khẩu đăng nhập</span></a></li>
			<li><a href="/tai-khoan/doi-PIN"><img src="/resources/images/icon-PIN.png"><span>Mật khẩu giao dịch</span></a></li>
			<li><a href="tel:02871099710"><img src="/resources/images/icon-hotline-menu.png"><span>Hotline  028 710 99710</span></a></li>
			<!-- <li><a href="#"><img src="/resources/images/icon-hotro-menu.png"><span>Trợ giúp</span></a></li> -->
			<li><a href="/dang-xuat"><img src="/resources/images/icon-thoat-menu.png"><span>Thoát</span></a></li>
			
			
			
		</ul>
	</div>
</sec:authorize>
