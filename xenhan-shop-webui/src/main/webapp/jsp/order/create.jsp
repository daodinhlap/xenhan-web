<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<div class="col-md-6 col-md-offset-3  mobile-padding">
    <div id="info-receiver" class="container card">
	<div class="center">
		<h2>NGƯỜI NHẬN HÀNG</h2>
	</div>
	<p id="alert"></p>

	<div class="form-group pickup-place">
		<div class="col-xs-12 col-md-6 form-field">
			<label>Tỉnh/TP lấy hàng<span style="color: red">*</span></label>
			<select class="form-control" id="pickupProvince">
				<option ${shop.town.name == 'Hà Nội' ? 'selected': ''} value="1">Hà Nội</option>
				<option ${shop.town.name == 'Hồ Chí Minh' ? 'selected': ''} value="2">Hồ Chí Minh</option>
			</select>
		</div>

		<div class="col-xs-12 col-md-6 form-field">
			<label>Quận/Huyện lấy hàng<span style="color: red">*</span></label>
			<c:set var = "shopDistrict" value = "${shop.town.district.id}"/>
			<select class="form-control" name="pickupDistrict" id="pickupDistrict-1" style="display: none">
				<option ${shopDistrict == '1'? 'selected':''} value="1">Hoàn Kiếm</option>
				<option ${shopDistrict == '2'? 'selected':''} value="2">Hai Bà Trưng</option>
				<option ${shopDistrict == '3'? 'selected':''} value="3">Ba Đình</option>
				<option ${shopDistrict == '4'? 'selected':''} value="4">Đống Đa</option>
				<option ${shopDistrict == '5'? 'selected':''} value="5">Thanh Xuân</option>
				<option ${shopDistrict == '6'? 'selected':''} value="6">Cầu Giấy</option>
				<option ${shopDistrict == '7'? 'selected':''} value="7">Tây Hồ</option>
				<option ${shopDistrict == '8'? 'selected':''} value="8">Long Biên</option>
				<option ${shopDistrict == '9'? 'selected':''} value="9">Hoàng Mai</option>
				<option ${shopDistrict == '10'? 'selected':''} value="10">Bắc Từ Liêm</option>
				<option ${shopDistrict == '11'? 'selected':''} value="11">Nam Từ Liêm</option>
				<option ${shopDistrict == '12'? 'selected':''} value="12">Gia Lâm</option>
				<option ${shopDistrict == '15'? 'selected':''} value="15">Thanh Trì</option>
				<option ${shopDistrict == '29'? 'selected':''} value="29">Hà Đông</option>
			</select>
			<select class="form-control" name="pickupDistrict" id="pickupDistrict-2" style="display: none">
				<option ${shopDistrict == '31'? 'selected':''} value="31">Quận 1</option>
				<option ${shopDistrict == '32'? 'selected':''} value="32">Quận 2</option>
				<option ${shopDistrict == '33'? 'selected':''} value="33">Quận 3</option>
				<option ${shopDistrict == '34'? 'selected':''} value="34">Quận 4</option>
				<option ${shopDistrict == '35'? 'selected':''} value="35">Quận 5</option>
				<option ${shopDistrict == '36'? 'selected':''} value="36">Quận 6</option>
				<option ${shopDistrict == '37'? 'selected':''} value="37">Quận 7</option>
				<option ${shopDistrict == '38'? 'selected':''} value="38">Quận 8</option>
				<option ${shopDistrict == '39'? 'selected':''} value="39">Quận 9</option>
				<option ${shopDistrict == '40'? 'selected':''} value="40">Quận 10</option>
				<option ${shopDistrict == '41'? 'selected':''} value="41">Quận 11</option>
				<option ${shopDistrict == '42'? 'selected':''} value="42">Quận 12</option>
				<option ${shopDistrict == '47'? 'selected':''} value="47">Phú Nhuận</option>
				<option ${shopDistrict == '44'? 'selected':''} value="44">Bình Thạnh</option>
				<option ${shopDistrict == '45'? 'selected':''} value="45">Tân Bình</option>
				<option ${shopDistrict == '46'? 'selected':''} value="46">Tân Phú</option>
				<option ${shopDistrict == '54'? 'selected':''} value="54">Thủ Đức</option>
				<option ${shopDistrict == '51'? 'selected':''} value="51">Bình Chánh</option>
				<option ${shopDistrict == '48'? 'selected':''} value="48">Bình Tân</option>
				<option ${shopDistrict == '43'? 'selected':''} value="43">Gò Vấp</option>
				<option ${shopDistrict == '50'? 'selected':''} value="50">Hóc Môn</option>
				<option ${shopDistrict == '52'? 'selected':''} value="52">Nhà Bè</option>
			</select>
		</div>

		<div class="form-group col-xs-12 col-md-6">
			<label>Địa chỉ lấy hàng<span style="color: red">*</span></label>
			<input placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực...." type="text" value="${shop.address}"
				   class="form-control" id="pickupddress">
		</div>

	</div>

	<div class="col-xs-12 col-md-6 form-field">
		<label>Họ tên</label>
		<input placeholder="Họ tên người nhận hàng"
			type="text" class="form-control" id="userName" value="${order.dropoff.contact.name}">
	</div>
	<div class="col-xs-12 col-md-6 form-field">
		<label>Số điện thoại <span style="color: red">*</span></label>
		<input placeholder="SĐT người nhận" type="text" class="form-control" id="phone" value="${order.dropoff.contact.phone}">
	</div>

	<%--<div class="col-xs-12 col-md-6 form-field">--%>
		<%--<label>Tỉnh/TP <span style="color: red">*</span></label>--%>
		<%--<select--%>
			<%--class="form-control" id="province">--%>
			<%--<option ${shop.town.name == 'Hà Nội' ? 'selected': ''} value="1">Hà Nội</option>--%>
			<%--<option ${shop.town.name == 'Hồ Chí Minh' ? 'selected': ''} value="2">Hồ Chí Minh</option>--%>
		<%--</select>--%>
	<%--</div>--%>

	<div class="col-xs-12 col-md-12 form-field">
		<label>Quận/Huyện <span style="color: red">*</span></label>
		<select class="form-control" name="district" id="district-1" style="display: none">
			<option ${shopDistrict == '1'? 'selected':''} value="1">Hoàn Kiếm</option>
			<option ${shopDistrict == '2'? 'selected':''} value="2">Hai Bà Trưng</option>
			<option ${shopDistrict == '3'? 'selected':''} value="3">Ba Đình</option>
			<option ${shopDistrict == '4'? 'selected':''} value="4">Đống Đa</option>
			<option ${shopDistrict == '5'? 'selected':''} value="5">Thanh Xuân</option>
			<option ${shopDistrict == '6'? 'selected':''} value="6">Cầu Giấy</option>
			<option ${shopDistrict == '7'? 'selected':''} value="7">Tây Hồ</option>
			<option ${shopDistrict == '8'? 'selected':''} value="8">Long Biên</option>
			<option ${shopDistrict == '9'? 'selected':''} value="9">Hoàng Mai</option>
			<option ${shopDistrict == '10'? 'selected':''} value="10">Bắc Từ Liêm</option>
			<option ${shopDistrict == '11'? 'selected':''} value="11">Nam Từ Liêm</option>
			<option ${shopDistrict == '12'? 'selected':''} value="12">Gia Lâm</option>
			<option ${shopDistrict == '15'? 'selected':''} value="15">Thanh Trì</option>
			<option ${shopDistrict == '29'? 'selected':''} value="29">Hà Đông</option>
		</select>
		<select class="form-control" name="district" id="district-2" style="display: none">
			<option ${shopDistrict == '31'? 'selected':''} value="31">Quận 1</option>
			<option ${shopDistrict == '32'? 'selected':''} value="32">Quận 2</option>
			<option ${shopDistrict == '33'? 'selected':''} value="33">Quận 3</option>
			<option ${shopDistrict == '34'? 'selected':''} value="34">Quận 4</option>
			<option ${shopDistrict == '35'? 'selected':''} value="35">Quận 5</option>
			<option ${shopDistrict == '36'? 'selected':''} value="36">Quận 6</option>
			<option ${shopDistrict == '37'? 'selected':''} value="37">Quận 7</option>
			<option ${shopDistrict == '38'? 'selected':''} value="38">Quận 8</option>
			<option ${shopDistrict == '39'? 'selected':''} value="39">Quận 9</option>
			<option ${shopDistrict == '40'? 'selected':''} value="40">Quận 10</option>
			<option ${shopDistrict == '41'? 'selected':''} value="41">Quận 11</option>
			<option ${shopDistrict == '42'? 'selected':''} value="42">Quận 12</option>
			<option ${shopDistrict == '47'? 'selected':''} value="47">Phú Nhuận</option>
			<option ${shopDistrict == '44'? 'selected':''} value="44">Bình Thạnh</option>
			<option ${shopDistrict == '45'? 'selected':''} value="45">Tân Bình</option>
			<option ${shopDistrict == '46'? 'selected':''} value="46">Tân Phú</option>
			<option ${shopDistrict == '54'? 'selected':''} value="54">Thủ Đức</option>
			<option ${shopDistrict == '51'? 'selected':''} value="51">Bình Chánh</option>
			<option ${shopDistrict == '48'? 'selected':''} value="48">Bình Tân</option>
			<option ${shopDistrict == '43'? 'selected':''} value="43">Gò Vấp</option>
			<option ${shopDistrict == '50'? 'selected':''} value="50">Hóc Môn</option>
			<option ${shopDistrict == '52'? 'selected':''} value="52">Nhà Bè</option>
		</select>
	</div>

	<div class="col-xs-12 col-md-12 form-field">
		<label>Địa chỉ <span style="color: red">*</span></label>
		<input placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực...." type="text" value="${order.dropoff.address}"
			   class="form-control" id="address">
	</div>

	<div class="col-xs-12 col-md-12 form-field">
		<label>Ghi chú</label>
		<textarea class="form-control" rows="3" id="note"
			placeholder="Mô tả đơn hàng/Lời nhắn">${order.orderMessage}</textarea>
	</div>

	<div class="form-group center">
		<%--<button class="btn btn-primary">--%>
			<%--<i class="fa fa-refresh"></i>&nbsp;Đặt lại--%>
		<%--</button>--%>
		<button class="btn btn-primary" onclick="next()">
			Tiếp tục&nbsp;<i class="fa fa-arrow-right"></i>
		</button>
	</div>
</div>

<%-- --===============================================----%>
<div id="info-order" class="container card" style="display: none;">
	<div class="center">
		<h2>Tiền hàng</h2>
	</div>

	<div class="form-group">
		<label>Loại đơn<span style="color: red">*</span></label> <select
			class="form-control" id="cod">
			<option ${order.COD == 'true'? 'selected':''} value="true">COD</option>
			<option ${order.COD == 'false'? 'selected':''} value="false">Ứng tiền</option>
		</select>
	</div>

	<div class="form-group">
		<label id="amount-text">Tiền hàng<span style="color: red">*</span></label>
		<input type="text" class="form-control" id="amount" style="text-align: right;"
			   value="<fmt:formatNumber type="number" maxFractionDigits="3" value="${empty order.goodAmount? 0: order.goodAmount}"/>">
	</div>
	<div class="form-group">
		<label>Mã giảm giá</label>
		<input type="text" class="form-control" id="coupon" value="${type == 1? order.coupon:''}"
			${type == 1 && not empty order.coupon? 'disabled':''}>
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
		<button class="btn btn-success" onclick="create()">${action}</button>
		<%--<button class="btn btn-primary">--%>
			<%--Đặt lại&nbsp;<i class="fa fa-refresh"></i>--%>
		<%--</button>--%>
	</div>
	<input type="hidden" id="order-id" value="${order.id}">
	<input type="hidden" id="type" value="${type}">
	<input type="hidden" id="type-des" value="${action}">
	<input type="hidden" id="order-status" value="${order.status}">
</div>

</div>