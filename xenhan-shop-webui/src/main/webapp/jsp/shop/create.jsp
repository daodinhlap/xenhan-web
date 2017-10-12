<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<c:set var = "fullName"><%= session.getAttribute("FULLNAME") %></c:set>
<c:set var = "phone"><%= session.getAttribute("USERNAME") %></c:set>

<div class="col-md-6 col-md-offset-3  mobile-padding">

<div id="info-receiver" class="container card">
    <div class="center" style="margin-bottom: 20px">
            <h2 class="page-header">THÔNG TIN ĐĂNG KÝ SHOP</h2>
	</div>

    <div class="form-group">
		<label>Tên shop<span style="color: red">*</span></label>
        <input placeholder="Tên Shop" type="text" class="form-control" id="name" value="${fullName}">
    </div>

	<div class="form-group">
		<label>Số điện thoại <span style="color: red">*</span></label>
		<span style="float: right; font-size: 12px;"><i>SĐT Xe Nhàn liên hệ lấy hàng</i></span>
		<input  type="text" class="form-control" id="phone" placeholder="Nhập số điện thoại" value="${phone}">
	</div>

    <div class="form-group">
        <label>Địa chỉ <span style="color: red">*</span></label>
		<span style="float: right; font-size: 12px;"><i>Địa chỉ Xe Nhàn lấy hàng</i></span>
        <input placeholder="Số nhà, tên tòa nhà, tên đường, tên khu vực ..."  type="text" class="form-control" id="address">
    </div>
    
    <div>
		  <label>Tỉnh/TP <span style="color: red">*</span></label>
		  <ul class="nav nav-tabs" role="tablist" id="province-tab">
		    <li role="presentation" class="active"><a href="#hochiminh" aria-controls="hochiminh" role="tab" data-toggle="tab">Hồ Chí Minh</a></li>
		    <li role="presentation"><a href="#hanoi" aria-controls="hanoi" role="tab" data-toggle="tab">Hà Nội</a></li>
		  </ul>
		
		  <!-- Tab panes -->
		  <div class="tab-content" style="margin-top: 5px">
		  	<label>Quận/Huyện <span style="color: red">*</span></label>
		    <div role="tabpanel" class="tab-pane active" id="hochiminh"><select class="form-control" id="district-hcm">
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
				    
		            <option value="51">Bình Chánh</option>
				    <option value="44">Bình Thạnh</option>
				    <option value="48">Bình Tân</option>
				    <option value="53">Cần Giờ</option>
				    <option value="49">Củ Chi</option>
				    <option value="43">Gò Vấp</option>
				    <option value="50">Hóc Môn</option>
				    <option value="52">Nhà Bè</option>
				    <option value="47">Phú Nhuận</option>
				    <option value="54">Thủ Đức</option>
				    <option value="45">Tân Bình</option>
				    <option value="46">Tân Phú</option>
		        </select></div>
		    	<div role="tabpanel" class="tab-pane" id="hanoi"><select class="form-control" id="district-hn">
				    <option value="3">Ba Đình</option>
				    <option value="10">Bắc Từ Liêm</option>
				    <option value="6">Cầu Giấy</option>
				    <option value="4">Đống Đa</option>
				    <option value="2">Hai Bà Trưng</option>
				    <option value="1">Hoàn Kiếm</option>
				    <option value="9">Hoàng Mai</option>
				    <option value="29">Hà Đông</option>
				    <option value="12">Gia Lâm</option>
				    <option value="8">Long Biên</option>
				    <option value="11">Nam Từ Liêm</option>
				    <option value="7">Tây Hồ</option>
				    <option value="5">Thanh Xuân</option>
				    <option value="15">Thanh Trì</option>
				    
				    <option value="25">Ba Vì</option>
				    <option value="13">Đông Anh</option>
				    <option value="28">Mê Linh</option>
				    <option value="20">Mỹ Đức</option>
				    <option value="23">Hoài Đức</option>
				    <option value="21">Chương Mỹ</option>
				    <option value="18">Phú Xuyên</option>
				    <option value="26">Phúc Thọ</option>
				    <option value="16">Quốc Oai</option>
				    <option value="14">Sóc Sơn</option>
				    <option value="30">Sơn Tây</option>
				    <option value="24">Thanh Oai</option>
				    <option value="17">Thường Tín</option>
				    <option value="27">Thạch Thất</option>
				    <option value="22">Đan Phượng</option>
				    <option value="19">Ứng Hòa</option>
		        </select></div>
		  </div>
	</div>

    <div class="form-group">
        <label>Email</label>
        <input  type="text" class="form-control" id="email">
    </div>

    <div class="form-group">
        <label>Website</label>
        <input  type="text" class="form-control" id="website">
    </div>
	<p id="alert"></p>
    <%--BUTTON--%>
    <div class="form-group center">
        <button class="btn btn-danger" onclick="cancelRegisterShop()">Hủy</button>
        <button class="btn btn-success" onclick="registerShop()"> Đăng ký</button>
    </div>
</div>
</div>