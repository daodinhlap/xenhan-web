<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<div class="col-md-6 col-md-offset-3  mobile-padding">
    <div id="info-receiver" class="container card">
	<div class="center">
		<h2 style=" color: orange;">${fn:toUpperCase(action)}</h2>
	</div>
	<p id="alert"></p>

	<div class="form-group pickup-place">
		<div>
			<label style='text-decoration: underline; color: #f3931f;'>LẤY HÀNG:</label>
		</div>
		<div class="col-xs-12 col-md-4 form-field">
			<label>Tỉnh/TP lấy hàng<span style="color: red">*</span></label>

			<c:set var = "provinceId" value = "${not empty order ? order.shop.town.id : shop.town.id}"/>
			<select class="form-control" id="province">
				<option ${provinceId == '1' ? 'selected': ''} value="1">Hà Nội</option>
				<option ${provinceId == '2' ? 'selected': ''} value="2">Hồ Chí Minh</option>
			</select>
		</div>

		<div class="col-xs-12 col-md-4 form-field">
			<label>Quận/Huyện lấy hàng<span style="color: red">*</span></label>

			<c:set var = "pickupDistrictId" value = "${not empty order ? order.shop.town.district.id : shop.town.district.id}"/>
			<select class="form-control" name="pickupDistrict" id="pickupDistrict-1" style="display: none">
				<option ${pickupDistrictId == '1'? 'selected':''} value="1">Hoàn Kiếm</option>
				<option ${pickupDistrictId == '2'? 'selected':''} value="2">Hai Bà Trưng</option>
				<option ${pickupDistrictId == '3'? 'selected':''} value="3">Ba Đình</option>
				<option ${pickupDistrictId == '4'? 'selected':''} value="4">Đống Đa</option>
				<option ${pickupDistrictId == '5'? 'selected':''} value="5">Thanh Xuân</option>
				<option ${pickupDistrictId == '6'? 'selected':''} value="6">Cầu Giấy</option>
				<option ${pickupDistrictId == '7'? 'selected':''} value="7">Tây Hồ</option>
				<option ${pickupDistrictId == '8'? 'selected':''} value="8">Long Biên</option>
				<option ${pickupDistrictId == '9'? 'selected':''} value="9">Hoàng Mai</option>
				<option ${pickupDistrictId == '10'? 'selected':''} value="10">Bắc Từ Liêm</option>
				<option ${pickupDistrictId == '11'? 'selected':''} value="11">Nam Từ Liêm</option>
				<option ${pickupDistrictId == '12'? 'selected':''} value="12">Gia Lâm</option>
				<option ${pickupDistrictId == '15'? 'selected':''} value="15">Thanh Trì</option>
				<option ${pickupDistrictId == '29'? 'selected':''} value="29">Hà Đông</option>
			</select>
			<select class="form-control" name="pickupDistrict" id="pickupDistrict-2" style="display: none">
				<option ${pickupDistrictId == '31'? 'selected':''} value="31">Quận 1</option>
				<option ${pickupDistrictId == '32'? 'selected':''} value="32">Quận 2</option>
				<option ${pickupDistrictId == '33'? 'selected':''} value="33">Quận 3</option>
				<option ${pickupDistrictId == '34'? 'selected':''} value="34">Quận 4</option>
				<option ${pickupDistrictId == '35'? 'selected':''} value="35">Quận 5</option>
				<option ${pickupDistrictId == '36'? 'selected':''} value="36">Quận 6</option>
				<option ${pickupDistrictId == '37'? 'selected':''} value="37">Quận 7</option>
				<option ${pickupDistrictId == '38'? 'selected':''} value="38">Quận 8</option>
				<option ${pickupDistrictId == '39'? 'selected':''} value="39">Quận 9</option>
				<option ${pickupDistrictId == '40'? 'selected':''} value="40">Quận 10</option>
				<option ${pickupDistrictId == '41'? 'selected':''} value="41">Quận 11</option>
				<option ${pickupDistrictId == '42'? 'selected':''} value="42">Quận 12</option>
				<option ${pickupDistrictId == '47'? 'selected':''} value="47">Phú Nhuận</option>
				<option ${pickupDistrictId == '44'? 'selected':''} value="44">Bình Thạnh</option>
				<option ${pickupDistrictId == '45'? 'selected':''} value="45">Tân Bình</option>
				<option ${pickupDistrictId == '46'? 'selected':''} value="46">Tân Phú</option>
				<option ${pickupDistrictId == '54'? 'selected':''} value="54">Thủ Đức</option>
				<option ${pickupDistrictId == '51'? 'selected':''} value="51">Bình Chánh</option>
				<option ${pickupDistrictId == '48'? 'selected':''} value="48">Bình Tân</option>
				<option ${pickupDistrictId == '43'? 'selected':''} value="43">Gò Vấp</option>
				<option ${pickupDistrictId == '50'? 'selected':''} value="50">Hóc Môn</option>
				<option ${pickupDistrictId == '52'? 'selected':''} value="52">Nhà Bè</option>
			</select>
		</div>

		<div class="col-xs-12 col-md-4 form-field">
			<label>SĐT lấy hàng<span style="color: red">*</span></label>
			<c:set var = "shopPhone" value = "${order.shop.phone}"/>
			<%--<input placeholder="SĐT lấy hàng" value="${shopPhone}" class="form-control" id="shopPhone">--%>
			<input placeholder="SĐT lấy hàng" value="01645924806" class="form-control" id="shopPhone">
		</div>

		<div class="form-group col-xs-12 col-md-6">
			<label>Địa chỉ lấy hàng<span style="color: red">*</span></label>

			<c:set var = "pickupAddress" value = "${order.shop.address}"/>
			<%--<input placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực...." type="text" value="${pickupAddress}" class="form-control" id="pickupAddress">--%>
			<input placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực...." type="text" value="xxx" class="form-control" id="pickupAddress">
		</div>

	</div>

	<div>
		<label style='text-decoration: underline; color: #f3931f;'>NHẬN HÀNG:</label>
	</div>

	<div class="col-xs-12 col-md-12 form-field">
		<label>Địa chỉ <span style="color: red">*</span></label>
		<input placeholder="Số nhà, ngõ, đường, tòa nhà, khu vực ..."
			   data-toggle="tooltip" title="Số nhà, ngõ, đường, phường ... Ngăn cách bởi dấu phẩy ','"
			   class="form-control" id="address" value="${not empty order ? order.dropoff.address : shop.address}" >
		<div class="alert alert-success" id="suggest-area">
		</div>
	</div>

	<div class="col-xs-12 col-md-4 form-field">
		<label>Họ tên</label>
		<input placeholder="Họ tên người nhận hàng" value="${not empty order ? order.dropoff.contact.name : shop.fullName}"
			type="text" class="form-control" id="userName">
	</div>
	<div class="col-xs-12 col-md-4 form-field">
		<label>Số điện thoại <span style="color: red">*</span></label>
		<input placeholder="SĐT người nhận" type="text" class="form-control" id="phone" value="${not empty order ? order.dropoff.contact.phone : shop.phone}">
	</div>


	<div class="col-xs-12 col-md-4 form-field">
		<label>Quận/Huyện <span style="color: red">*</span></label>

		<c:set var = "districtId" value = "${not empty order ? order.dropoff.town.district.id : shop.town.district.id}"/>
		<select class="form-control" name="district" id="district-1" style="display: none">
			<option value="0">Chọn Quận/Huyện</option>
			<option ${districtId == '1'? 'selected':''} value="1">Hoàn Kiếm</option>
			<option ${districtId == '2'? 'selected':''} value="2">Hai Bà Trưng</option>
			<option ${districtId == '3'? 'selected':''} value="3">Ba Đình</option>
			<option ${districtId == '4'? 'selected':''} value="4">Đống Đa</option>
			<option ${districtId == '5'? 'selected':''} value="5">Thanh Xuân</option>
			<option ${districtId == '6'? 'selected':''} value="6">Cầu Giấy</option>
			<option ${districtId == '7'? 'selected':''} value="7">Tây Hồ</option>
			<option ${districtId == '8'? 'selected':''} value="8">Long Biên</option>
			<option ${districtId == '9'? 'selected':''} value="9">Hoàng Mai</option>
			<option ${districtId == '10'? 'selected':''} value="10">Bắc Từ Liêm</option>
			<option ${districtId == '11'? 'selected':''} value="11">Nam Từ Liêm</option>
			<option ${districtId == '12'? 'selected':''} value="12">Gia Lâm</option>
			<option ${districtId == '15'? 'selected':''} value="15">Thanh Trì</option>
			<option ${districtId == '29'? 'selected':''} value="29">Hà Đông</option>
		</select>
		<select class="form-control" name="district" id="district-2" style="display: none">
			<option value="0">Chọn Quận/Huyện</option>
			<option ${districtId == '31'? 'selected':''} value="31">Quận 1</option>
			<option ${districtId == '32'? 'selected':''} value="32">Quận 2</option>
			<option ${districtId == '33'? 'selected':''} value="33">Quận 3</option>
			<option ${districtId == '34'? 'selected':''} value="34">Quận 4</option>
			<option ${districtId == '35'? 'selected':''} value="35">Quận 5</option>
			<option ${districtId == '36'? 'selected':''} value="36">Quận 6</option>
			<option ${districtId == '37'? 'selected':''} value="37">Quận 7</option>
			<option ${districtId == '38'? 'selected':''} value="38">Quận 8</option>
			<option ${districtId == '39'? 'selected':''} value="39">Quận 9</option>
			<option ${districtId == '40'? 'selected':''} value="40">Quận 10</option>
			<option ${districtId == '41'? 'selected':''} value="41">Quận 11</option>
			<option ${districtId == '42'? 'selected':''} value="42">Quận 12</option>
			<option ${districtId == '47'? 'selected':''} value="47">Phú Nhuận</option>
			<option ${districtId == '44'? 'selected':''} value="44">Bình Thạnh</option>
			<option ${districtId == '45'? 'selected':''} value="45">Tân Bình</option>
			<option ${districtId == '46'? 'selected':''} value="46">Tân Phú</option>
			<option ${districtId == '54'? 'selected':''} value="54">Thủ Đức</option>
			<option ${districtId == '51'? 'selected':''} value="51">Bình Chánh</option>
			<option ${districtId == '48'? 'selected':''} value="48">Bình Tân</option>
			<option ${districtId == '43'? 'selected':''} value="43">Gò Vấp</option>
			<option ${districtId == '50'? 'selected':''} value="50">Hóc Môn</option>
			<option ${districtId == '52'? 'selected':''} value="52">Nhà Bè</option>
		</select>
	</div>

	<div class="col-xs-12 col-md-12 form-field">
		<label>Ghi chú</label>
		<textarea class="form-control" rows="3" id="note"
			placeholder="Mô tả đơn hàng/Lời nhắn">${order.orderMessage}</textarea>
	</div>

	<div class="form-group center">
		<button class="btn" onclick="goHome()">
			Hủy
		</button>
		<button class="btn btn-primary" onclick="next()">
			Tiếp tục&nbsp;<i class="fa fa-arrow-right"></i>
		</button>
	</div>

	<%--noti--%>
	<div class="alert alert-success" style="clear: both; white-space: pre; padding: 0px;">
		Đừng bỏ lỡ cơ hội hưởng giá ship đặc biệt không giới hạn từ Xe Nhàn nhé.
		1. Thời gian tạo đơn: 19h - 7h mỗi ngày từ 02/01 - 10/02/2018
		2. Giá khuyến mại: 15.000đ/ đơn
		3. Không áp dụng kèm code khuyến mại
		4. Không áp dụng khi sửa đơn sau khung giờ vàng
		5. Khu vực giao hàng áp dụng:
		- Nội thành Hà Nội
		- Nội thành và Ngoại thành Hồ Chí Minh
	</div>
</div>

<%-- --===============================================----%>
<div id="info-order" class="container card" style="display: none;">
	<div class="center">
		<h2>Tiền hàng</h2>
	</div>

	<div class="col-xs-6 col-md-6 form-field" style="padding: 0px;">
		<label>Có ứng tiền cho Shop không?<span style="color: red">*</span></label>
	</div>
	<div class="col-xs-6 col-md-6 form-field" style="text-align: right;padding: 0px">
		<label class="radio-inline">
			<input type="radio" name="type-order" value="true" checked="checked">Không
		</label>
		<label class="radio-inline">
			<input type="radio" name="type-order" value="false">Có
		</label>
	</div>

	<div class="col-xs-6 col-md-2 form-field dropdown" style="padding: 0px;clear: both;">
		<label>Mã giảm giá</label>
	</div>
	<div class="col-xs-6 col-md-4 form-field dropdown" style="padding:0px;">
		<input type="text" class="form-control dropdown-toggle" data-toggle="dropdown" id="coupon"
			   value="${type == 1? order.coupon : ''}">
		<input id="coupon-use-quick" type="hidden" value="${coupon}"/>
		<ul id="coupons" class="dropdown-menu" role="menu" style=" margin-left: 15px;" aria-labelledby="coupon">
		</ul>
	</div>

	<div class="col-xs-6 col-md-2 form-field" name="amount-label" style="display: none">
		<label id="amount-text">Tiền ứng<span style="color: red">*</span></label>
	</div>
	<div class="col-xs-6 col-md-4 form-field" style="padding: 0px;display: none" name="amount-label-input">
		<input type="text" class="form-control" id="amount" style="text-align: right;"
			   value="<fmt:formatNumber type="number" maxFractionDigits="3" value="${empty order.goodAmount? 0: order.goodAmount}"/>">
	</div>

	<div class="form-group">
		<label><i>Tiền giảm giá</i></label>
		<span style="float: right"><i>&nbsp;đ</i></span>
		<label id="couponAmount" style="float: right">${order.discount * -1}</label>
	</div>

	<div class="form-group">
		<label>Phí ship</label>
		<span style="float: right"><i>&nbsp;đ</i></span>
		<label id="shipAmount" style="float: right"></label>
	</div>

	<div class="form-group">
		<label id="action">Shop nợ Xe nhàn</label>
		<span style="float: right"><i>&nbsp;đ</i></span>
		<label id="totalAmount" style="float: right"></label>
	</div>

	<div class="form-group center">
		<button class="btn btn-primary" onclick="move()">
			<i class="fa fa-arrow-left"></i>&nbsp;Quay lại
		</button>
		<button id="btn-create" class="btn btn-success" onclick="create()">${action}</button>
		<%--<button class="btn btn-primary">--%>
			<%--Đặt lại&nbsp;<i class="fa fa-refresh"></i>--%>
		<%--</button>--%>
	</div>


	<%--noti--%>
	<div class="alert alert-success" style="clear: both; white-space: pre; padding: 0px;">
		Đừng bỏ lỡ cơ hội hưởng giá ship đặc biệt không giới hạn từ Xe Nhàn nhé.
		1. Thời gian tạo đơn: 19h - 7h mỗi ngày từ 02/01 - 10/02/2018
		2. Giá khuyến mại: 15.000đ/ đơn
		3. Không áp dụng kèm code khuyến mại
		4. Không áp dụng khi sửa đơn sau khung giờ vàng
		5. Khu vực giao hàng áp dụng:
		- Nội thành Hà Nội
		- Nội thành và Ngoại thành Hồ Chí Minh
	</div>

	<input type="hidden" id="order-id" value="${order.id}">
	<input type="hidden" id="type" value="${type}">
	<input type="hidden" id="type-des" value="${action}">
	<input type="hidden" id="order-status" value="${order.status}">
	<input type="hidden" id="created-time" value="${order.createdDate}">
	<input type="hidden" id="shop-name" value="${shop.shopName}">
</div>

</div>
