<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<div id="info-receiver" class="container card">
	<div class="center">
		<h2>TẠO ĐƠN HÀNG</h2>
	</div>

	<div class="form-group">
		<label>Họ tên</label> <input placeholder="Họ tên người nhận hàng"
			type="text" class="form-control" id="userName">
	</div>
	<div class="form-group">
		<label>Số điện thoại <span style="color: red">*</span></label> <input
			placeholder="SĐT người nhận" type="text" class="form-control"
			id="phone">
	</div>
	<div class="form-group">
		<label>Địa chỉ <span style="color: red">*</span></label> <input
			placeholder="Số nhà.../ngách ..." type="text" class="form-control"
			id="address">
	</div>

	<div class="form-group" style="display: none">
		<label>Tỉnh/TP <span style="color: red">*</span></label>
		<select
			class="form-control" id="province">
			<option ${province == 'Hà Nội' ? 'selected': ''} value="1">Hà Nội</option>
			<option ${province == 'Hồ Chí Minh' ? 'selected': ''} value="2">Hồ Chí Minh</option>
		</select>
	</div>

	<div class="form-group">
		<label>Quận/Huyện <span style="color: red">*</span></label>
		<c:if test="${province == 'Hà Nội'}">
			<select class="form-control" name="district" id="district">
				<option value="1">Hoàn Kiếm</option>
				<option value="2">Hai Bà Trưng</option>
				<option value="3">Ba Đình</option>
				<option value="4">Đống Đa</option>
				<option value="5">Thanh Xuân</option>
				<option value="6">Cầu Giấy</option>
				<option value="7">Tây Hồ</option>
				<option value="8">Long Biên</option>
				<option value="9">Hoàng Mai</option>
				<option value="10">Bắc Từ Liêm</option>
				<option value="11">Nam Từ Liêm</option>
				<option value="12">Gia Lâm</option>
				<option value="15">Thanh Trì</option>
				<option value="29">Hà Đông</option>
			</select>
		</c:if>
		<c:if test="${province == 'Hồ Chí Minh'}">
			<select class="form-control" name="district" id="district">
				<option value="31">Quận 1</option>
				<option value="32">Quận 2</option>
				<option value="33">Quận 3</option>
				<option value="34">Quận 4</option>
				<option value="35">Quận 5</option>
				<option value="36">Quận 6</option>
				<option value="37">Quận 7</option>
				<option value="38">Quận 8</option>
				<option value="39">Quận 9</option>
				<option value="40">Quận 10</option>
				<option value="41">Quận 11</option>
				<option value="42">Quận 12</option>
				<option value="47">Phú Nhuận</option>
				<option value="44">Bình Thạnh</option>
				<option value="45">Tân Bình</option>
				<option value="46">Tân Phú</option>
				<option value="54">Thủ Đức</option>
				<option value="51">Bình Chánh</option>
				<option value="48">Bình Tân</option>
				<option value="43">Gò Vấp</option>
				<option value="50">Hóc Môn</option>
				<option value="52">Nhà Bè</option>
			</select>
		</c:if>

	</div>

	<div class="form-group">
		<label>Ghi chú</label>
		<textarea class="form-control" rows="3" id="note"
			placeholder="Mô tả đơn hàng/Lời nhắn"></textarea>
	</div>

	<div class="form-group center">
		<button class="btn btn-primary">
			<i class="fa fa-refresh"></i>&nbsp;Đặt lại
		</button>
		<button class="btn btn-primary" onclick="next()">
			Tiếp tục&nbsp;<i class="fa fa-arrow-right"></i>
		</button>
	</div>
</div>

<div id="info-order" class="container card" style="display: none;">
	<div class="center">
		<h2>Tiền hàng</h2>
	</div>

	<div class="form-group">
		<label>Loại đơn<span style="color: red">*</span></label> <select
			class="form-control" id="cod">
			<option value="true">COD</option>
			<option value="false">Ứng tiền</option>
		</select>
	</div>

	<div class="form-group">
		<label id="amount-text">Tiền hàng<span style="color: red">*</span></label>
		<input type="text" class="form-control" id="amount">
	</div>
	<div class="form-group">
		<label>Mã giảm giá</label> <input type="text" class="form-control"
			id="coupon">
	</div>

	<div class="form-group">
		<label><i>Tiền giảm giá</i></label> <label id="couponAmount"
			style="float: right"></label>
	</div>

	<div class="form-group">
		<label>Phí ship</label> <label id="shipAmount" style="float: right"></label>
	</div>

	<div class="form-group">
		<label id="action">Shop nợ Xe nhàn</label> <label id="totalAmount"
			style="float: right"></label>
	</div>

	<div class="form-group center">
		<button class="btn btn-primary" onclick="move()">
			<i class="fa fa-arrow-left"></i>&nbsp;Quay lại
		</button>
		<button class="btn btn-success" onclick="create()">Tạo đơn</button>
		<button class="btn btn-primary">
			Đặt lại&nbsp;<i class="fa fa-refresh"></i>
		</button>
	</div>
</div>