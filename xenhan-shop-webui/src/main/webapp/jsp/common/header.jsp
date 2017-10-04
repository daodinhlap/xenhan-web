<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed btn-header"
				data-toggle="collapse" data-target="#navbar-header" aria-expanded="true"
				aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="/">
				<img class="logo-center" src="/resources/images/mtop-logo.png">
			</a>
		</div>
		<div id="navbar-header" class="navbar-collapse collapse">
			
			<c:set var = "fullName"><%= session.getAttribute("FULLNAME") %></c:set>
			<c:set var = "phone"><%= session.getAttribute("USERNAME") %></c:set>
			
			<ul class="nav navbar-nav navbar-right profile" style="margin-bottom:2px">
				<li style=" height: 80px; margin-top: -10px;">
					<a href="/tai-khoan/truy-van-tai-khoan">
							<div class="col-xs-3 col-sm-3 col-md-4 padding-0 ">
								<img class="avatar" src="/resources/images/icon-user.png">
							</div>
							<div class="col-xs-8 col-sm-8 col-md-7 " style=" padding: 15px 0px 15px 0px;">
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
				</li>
				<li><a class="li-header" href="/">
					<img width="30px" src="/resources/images/icon-dichvu-menu.png"><span>Dịch vụ</span></a></li>
				<li><a class="li-header" href="/tai-khoan/sao-ke?accountNo=">
					<img width="30px" src="/resources/images/icon-lichsu-menu.png"><span>Lịch sử giao dịch</span></a></li>
				<li><a class="li-header" href="/ngan-hang/thiet-lap-ngan-hang">
					<img width="30px" src="/resources/images/icon-nganhang-menu.png"><span>Thiết lập ngân hàng</span></a></li>
				<li><a class="li-header" href="/tai-khoan/doi-mat-khau">
					<img width="30px" src="/resources/images/icon-matkhau-menu.png"><span>Mật khẩu đăng nhập</span></a></li>
				<li><a class="li-header" href="/tai-khoan/doi-PIN">
					<img width="30px" src="/resources/images/icon-PIN.png"><span>Mật khẩu giao dịch</span></a></li>
				<li><a class="li-header" href="tel:02871099710">
					<img width="30px" src="/resources/images/icon-hotline-menu.png"><span>Hotline  028 710 99710</span></a></li>
				<!-- <li><a href="#"><img src="/resources/images/icon-hotro.png"><span>Trợ giúp</span></a></li> -->
				<li><a class="li-header" href="/dang-xuat">
					<img width="30px" src="/resources/images/icon-thoat-menu.png"><span>Thoát</span></a></li>
			</ul>
		</div>
	</div>
</nav>
