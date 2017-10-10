<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>

<div class="col-md-6 col-md-offset-3  mobile-padding">

	<div class="container card" id="account-view">
		<div class="center">
            <h2><span>CẬP NHẬT THÔNG TIN NGƯỜI DÙNG</span>
            </h2>
		</div>
			<c:choose>
				<c:when test="${empty user}">
					<div class="form-group">
						<div class="error">
							<label>Lỗi xảy ra:</label>
							<div class="controls">
								<p>${error}</p>
							</div>
						</div>
					</div>
				</c:when>

				<c:otherwise>
					<div class="form-group">
                        <div class="col-xs-4 col-md-4">Họ Tên</div>
                        <div class="col-xs-8 col-md-8"><label>${user.userProfile.fullName}</label></div>
					</div>
					<!-- PHONE -->
					<div class="form-group">
                        <div class="col-xs-4 col-md-4">Số điện thoại</div>
                        <div class="col-xs-8 col-md-8"><label>${user.user.phone}</label></div>
					</div>
					<!-- EMAIL -->
					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Email</div>
                            <div class="col-xs-8 col-md-8"><label>${user.user.email}</label></div>
					</div>
					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Giới Tính</div>
                            <div class="col-xs-8 col-md-8"><label${user.userProfile.gender == 1 ? 'Nam' : 'Nữ'}></label></div>
					</div>
					<!-- ADDRESS -->
					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Địa chỉ</div>
                            <div class="col-xs-8 col-md-8"><label>${user.userProfile.address}</label></div>
					</div>
					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Tỉnh/Thành phố</div>
                            <div class="col-xs-8 col-md-8"><label>${user.userProfile.province}</label></div>
					</div>
					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Quận/Huyện</div>
                            <div class="col-xs-8 col-md-8"><label>${user.userProfile.district}</label></div>
					</div>

					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Nơi Sinh</div>
                            <div class="col-xs-8 col-md-8"><label>${user.userProfile.placeOfBirth}</label></div>
					</div>

					<div class="form-group">
                        <div class="col-xs-4 col-md-4">Ngày Sinh</div>
                        <div class="col-xs-8 col-md-8"><label>
                            <fmt:formatDate value="${user.userProfile.birthday}" pattern="dd-MM-yy"/></label></div>
					</div>

					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Số CMT</div>
                            <div class="col-xs-8 col-md-8"><label>${user.userProfile.identityCard}</label></div>
					</div>

					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Ngày Cấp</div>
                            <div class="col-xs-8 col-md-8"><label>
                                <fmt:formatDate value="${user.userProfile.dateOfIdentity}" pattern="dd-MM-yy"/></label></div>
					</div>

					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Facebook</div>
                            <div class="col-xs-8 col-md-8"><label>${user.userProfile.facebookId}</label></div>
					</div>

				</c:otherwise>
			</c:choose>
	</div>

</div>
