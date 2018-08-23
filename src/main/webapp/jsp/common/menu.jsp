<%@ page import="com.homedirect.session.model.SimpleUser" %>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>


	<div class="col-sm-3 col-md-2 sidebar">
		<div class="user-login">

			<c:set var = "fullName"><%= ((SimpleUser)session.getAttribute("SIMPLE-USER")).getUserProfile().getFullName() %></c:set>
			<c:set var = "shopName"><%= session.getAttribute("SHOPNAME") %></c:set>
			<c:set var = "phone"><%= ((SimpleUser)session.getAttribute("SIMPLE-USER")).getUserName() %></c:set>
			<c:set var = "badge"><%= session.getAttribute("NOTI_BADGE") %></c:set>


			<div class="col-md-12 center">
				<div style="margin-top: 10px;">
					<a href="/shop/thong-tin-tai-khoan" style=" color: white"> <c:if
							test="${not empty fullName}">
							${fullName }<br>
						</c:if> <c:if test="${not empty phone }">
							<span id="myPhone">${phone }</span>
						</c:if>
					</a>
				</div>
			</div>
			<div class="col-xs-1 col-sm-1 col-md-1 padding-0">
				<i class="fa fa-chevron-right arrow-right" aria-hidden="true"></i>
			</div>

		</div>
		<ul class="nav nav-sidebar" style="font-size: 14px;">

			<sec:authorize access="hasAnyRole('ROLE_USER','ROLE_ADMIN')">
				<c:if test="${not empty shopName && !shopName.equals('null') }">
					<%--<li><a href="/"><img src="/resources/images/icon-home.png"><span>Trang chủ</span></a></li>--%>
					<li>
						<a href="/noti/tin-khuyen-mai">
							<img src="/resources/images/noti.png"><span>Tin tức</span>
							<div class="${badge != 'null' && badge != 0 ? 'badge' : ''}"
								 id="badge-menu" style="background-color: #f3921f !important;">
									${badge != 'null' && badge != 0 ? badge : ''}
							</div>
						</a>
					</li>
					<li><a href="/shop/khuyen-mai"> <img
							src="/resources/images/icon-discount.png"><span>Mã khuyến mại</span>
						<div class="${badge_coupon != null && badge_coupon != 0 ? 'badge' : ''}"
							 id="badge-coupon-menu" style="background-color: #f3921f !important;">
								${badge_coupon != null && badge_coupon != 0 ? badge_coupon : ''}
						</div>
					</a>
					</li>

					<!-- <li><a href="#" data-toggle="modal" data-target="#order-type"> -->
					<li><a href="/order/tao-don-giao-hang?type=0">
						<img src="/resources/images/icon-order.png">
						<span>Tạo đơn hàng</span></a>
					</li>
					<li><a href="/order-excel/tao-don-tu-excel"> <img
							src="/resources/images/icon-order-excel.png"><span>Tạo đơn từ Excel</span></a></li>
					<li><a href="/order/lich-su"> <img
							src="/resources/images/icon-history.png"><span>Lịch sử đơn hàng</span></a></li>
			<sec:authorize access="hasRole('ROLE_ADMIN')">
					<li><a href="/shop/cong-no"> <img
							src="/resources/images/icon-debit.png"><span>Lịch sử công nợ</span></a></li>
			</sec:authorize>

					<li><a href="/shop/thong-tin-tai-khoan"> <img
							src="/resources/images/icon-profile.png"><span>Tài khoản</span></a></li>
				</c:if>
			</sec:authorize>

			<li><a href="/lien-he"><img
					src="/resources/images/icon-support.png"><span>Liên hệ</span></a></li>
			<li><a href="/dang-xuat"><img
					src="/resources/images/icon-exit.png"><span>Đăng xuất</span></a></li>
		</ul>
	</div>

