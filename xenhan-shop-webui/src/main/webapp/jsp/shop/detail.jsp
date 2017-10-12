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
			<div class="form-group" style="margin-top: -20px">
				<div class="col-xs-4 col-md-4">
					Tên shop<span style="color: red">*</span>:
				</div>
				<div class="col-xs-8 col-md-8">
					<%--<p>${shop.fullName}</p>--%>
					<a href="#" id="shopName" data-type="text"
						data-url="/shop/sua-thong-tin-shop" data-name="shopName"
						data-pk="${shop.shopName}" data-original-title="Tên Shop"
						data-value="${shop.fullName}" class="editable editable-empty">${shop.fullName}</a>
				</div>
			</div>
			<!-- ADDRESS -->
			<div class="form-group">
				<div class="col-xs-4 col-md-4">
					Địa chỉ<span style="color: red">*</span>:
				</div>
				<div class="col-xs-8 col-md-8">
					<%--${shop.address}--%>
					<a href="#" id="shopAddress" data-type="text"
						data-url="/shop/sua-thong-tin-shop" data-name="shopAddress"
						data-pk="${shop.shopName}" data-original-title="Địa chỉ"
						data-value="${shop.address}" class="editable editable-empty">${shop.address}</a>
				</div>
			</div>

			<div class="form-group">
				<div class="col-xs-4 col-md-4">
					Tỉnh/Thành phố<span style="color: red">*</span>:
				</div>
				<div class="col-xs-8 col-md-8">
					<%--<p>${shop.town.name}</p>--%>
					<a href="#" id="shopProvince"
						data-source="[{value: 1, text: 'Hà Nội'},{value: 2, text: 'Hồ Chí Minh'}]"
						data-type="select" data-url="/shop/sua-thong-tin-shop"
						data-name="shopProvince" data-pk="${shop.shopName}"
						data-original-title="Tỉnh/TP" data-value="${shop.town.id}"
						class="editable editable-empty">${shop.town.name}</a>
				</div>
			</div>
			<div class="form-group">
				<div class="col-xs-4 col-md-4">
					Quận/Huyện<span style="color: red">*</span>:
				</div>
				<div class="col-xs-8 col-md-8">
					<%--<p>${shop.town.district.name}</p>--%>
					<a href="#" id="shopDistrict" data-type="select"
						data-url="/shop/sua-thong-tin-shop" data-name="shopDistrict"
						data-pk="${shop.shopName}" data-original-title="Quận/Huyện"
						data-value="${shop.town.district.id}"
						class="editable editable-empty">${shop.town.district.name}</a>
				</div>
			</div>

			<div class="form-group">
				<div class="col-xs-4 col-md-4">
					Số điện thoại<span style="color: red">*</span>:
				</div>
				<div class="col-xs-8 col-md-8">
					<%--<p>${shop.phone}</p>--%>
					<a href="#" id="shopPhone" data-type="text"
						data-url="/shop/sua-thong-tin-shop" data-name="shopPhone"
						data-pk="${shop.shopName}" data-original-title="Số điện thoại"
						data-value="${shop.phone}" class="editable editable-empty">${shop.phone}</a>
				</div>
			</div>
			<!-- EMAIL -->
			<div class="form-group">
				<div class="col-xs-4 col-md-4">Email:</div>
				<div class="col-xs-8 col-md-8">
					<%--<p>${shop.email}</p>--%>
					<a href="#" id="shopEmail" data-type="text"
						data-url="/shop/sua-thong-tin-shop" data-name="shopEmail"
						data-pk="${shop.shopName}" data-original-title="Số điện thoại"
						data-value="${shop.email}" class="editable editable-empty">${shop.email}</a>
				</div>
			</div>
			<!-- Website -->
			<div class="form-group">
				<div class="col-xs-4 col-md-4">Website:</div>
				<div class="col-xs-8 col-md-8">
					<%--<p>${shop.website}</p>--%>
					<a href="#" id="shopWebsite" data-type="text"
						data-url="/shop/sua-thong-tin-shop" data-name="shopWebsite"
						data-pk="${shop.shopName}" data-original-title="Số điện thoại"
						data-value="${shop.website}" class="editable editable-empty">${shop.website}</a>
				</div>
			</div>

		</c:otherwise>
	</c:choose>
</div>




