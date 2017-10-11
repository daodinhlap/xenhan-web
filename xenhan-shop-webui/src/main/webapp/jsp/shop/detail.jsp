<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>

<div class="box-info">
	<c:choose>
		<c:when test="${empty shop}">
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
				<div class="col-xs-4 col-md-4">
					<label>Tên Shop: </label>
				</div>
				<div class="col-xs-8 col-md-8">
					<p>${shop.fullName}</p>
				</div>
			</div>
			<!-- ADDRESS -->
			<div class="form-group">
				<div class="col-xs-4 col-md-4">
					<label>Địa chỉ:</label>
				</div>
				<div class="col-xs-8 col-md-8">${shop.address}</div>
			</div>

			<div class="form-group">
				<div class="col-xs-4 col-md-4">
					<label>Tỉnh/Thành phố:</label>
				</div>
				<div class="col-xs-8 col-md-8">
					<p>${shop.town.name}</p>
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-4 col-md-4">
					<label>Quận/Huyện:</label>
				</div>
				<div class="col-xs-8 col-md-8">
					<p>${shop.town.district.name}</p>
				</div>
			</div>
			<!-- BIRTHDAY -->
			<div class="form-group">
				<div class="col-xs-4 col-md-4">
					<label>Số điện thoại:</label>
				</div>
				<div class="col-xs-8 col-md-8">
					<p>${shop.phone}</p>
				</div>
			</div>
			<!-- EMAIL -->
			<div class="form-group">
				<div class="col-xs-4 col-md-4">
					<label class="label-inline-88">Email:</label>
				</div>
				<div class="col-xs-8 col-md-8">
					<p>${shop.email}</p>
				</div>
			</div>
			<!-- Website -->
			<div class="form-group">
				<div class="col-xs-4 col-md-4">
					<label class="label-inline-88">Website:</label>
				</div>
				<div class="col-xs-8 col-md-8">
					<p>${shop.website}</p>
				</div>
			</div>

		</c:otherwise>
	</c:choose>
</div>




