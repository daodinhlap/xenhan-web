<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>
<div class="col-sm-4 col-sm-offset-3 col-md-6 col-md-offset-3  mobile-padding">

<div id="account-view">
	<!-- Shop -->
	<h2 class="page-header">THÔNG TIN SHOP</h2>
	<div style="margin: 5px 0px 10px 0px" class="box-info">
		<c:choose>
			<c:when test="${empty shop}">
				<div class="form-group">
					<div class="error">
						<label>Lỗi xảy ra:</label>
						<div class="controls" style="float: right">
							<p>${error}</p>
						</div>
					</div>
				</div>
			</c:when>
			<c:otherwise>
				<div class="form-group">
					<div class="buy-card-mobile">
						<label>Tên Shop:</label>
						<div class="controls" style="float: right">
							<p>${shop.fullName}</p>
						</div>
					</div>
				</div>
				<!-- ADDRESS -->
				<div class="form-group">
					<div class="buy-card-mobile">
						<label class="width-50">Địa chỉ:</label>
						<div style="float: right; text-align: right;" class="width-50">${shop.address}</div>
					</div>
				</div>
				<div class="form-group">
					<div class="buy-card-mobile">
						<label>Tỉnh/Thành phố:</label>
						<div class="controls" style="float: right">
							<p>${shop.town.name}</p>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="buy-card-mobile">
						<label>Quận/Huyện:</label>
						<div class="controls" style="float: right">
							<p>${shop.town.district.name}</p>
						</div>
					</div>
				</div>
				<!-- BIRTHDAY -->
				<div class="form-group">
					<div class="buy-card-mobile">
						<label>Số điện thoại:</label>
						<div class="controls" style="float: right">
							<p>${shop.phone}</p>
						</div>
					</div>
				</div>
				<!-- EMAIL -->
				<div class="form-group">
					<div class="buy-card-mobile">
						<label class="label-inline-88">Email:</label>
						<div class="controls" style="float: right">
							<p>${shop.email}</p>
						</div>
					</div>
				</div>
				<!-- Website -->
				<div class="form-group">
					<div class="buy-card-mobile">
						<label class="label-inline-88">Website:</label>
						<div class="controls" style="float: right">
							<p>${shop.website}</p>
						</div>
					</div>
				</div>
				
			</c:otherwise>
		</c:choose>
	</div>
</div>

</div>




