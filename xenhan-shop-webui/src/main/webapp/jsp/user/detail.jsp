<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>
<div class="col-md-6 col-md-offset-3  mobile-padding">

<div id="account-view">
		<h2 class="page-header">THÔNG TIN USER</h2>
		<div style="margin: 5px 0px 10px 0px" class="box-info">
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
						<label>Họ Tên:</label>
						<div class="controls">
							<p>${user.userProfile.fullName}</p>
						</div>
					</div>
					<!-- PHONE -->
					<div class="form-group">
							<label>Số điện thoại:</label>
							<div class="controls" >
								<p>${user.user.phone}</p>
							</div>
					</div>
					<!-- EMAIL -->
					<div class="form-group">
						<label class="label-inline-88">Email:</label>
						<div class="controls">
							<p>${user.user.email}</p>
						</div>
					</div>
					<div class="form-group">
						<label class="label-inline-88">Giới Tính:</label>
						<div class="controls">
							<p>${user.userProfile.gender == 1 ? 'Nam' : 'Nữ'}</p>
						</div>
					</div>
					<!-- ADDRESS -->
					<div class="form-group">
						<label class="width-50">Địa chỉ:</label>
						<div style="float: right; text-align: right;" class="width-50">${user.userProfile.address}</div>
					</div>
					<div class="form-group">
						<div class="buy-card-mobile">
							<label>Tỉnh/Thành phố:</label>
							<div class="controls" >
								<p>${user.userProfile.province}</p>
							</div>
						</div>
					</div>
					<div class="form-group">
							<label>Quận/Huyện:</label>
							<div class="controls" >
								<p>${user.userProfile.district}</p>
							</div>
					</div>
				
					<div class="form-group">
							<label class="label-inline-88">Nơi Sinh:</label>
							<div class="controls" >
								<p>${user.userProfile.placeOfBirth}</p>
							</div>
					</div>
					
					<div class="form-group">
							<label class="label-inline-88">Ngày Sinh:</label>
							<div class="controls" >
								<p><fmt:formatDate value="${user.userProfile.birthday}" pattern="dd-MM-yy"/></p>
							</div>
					</div>
					
					<div class="form-group">
							<label class="label-inline-88">Số CMT:</label>
							<div class="controls" >
								<p>${user.userProfile.identityCard}</p>
							</div>
					</div>
					
					<div class="form-group">
							<label class="label-inline-88">Ngày Cấp:</label>
							<div class="controls">
								<p><fmt:formatDate value="${user.userProfile.dateOfIdentity}" pattern="dd-MM-yy"/></p>
							</div>
					</div>
					
					<div class="form-group">
							<label class="label-inline-88">Facebook:</label>
							<div class="controls">
								<p>${user.userProfile.facebookId}</p>
							</div>
					</div>

				</c:otherwise>
			</c:choose>
		</div>
</div>

</div>
