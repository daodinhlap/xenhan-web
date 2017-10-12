<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>

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
		<div class="form-group" id="user">
			<div class="col-xs-4 col-md-4">Họ tên</div>
			<div class="col-xs-8 col-md-8"><a href="#" id="name"
											  data-type="text" data-url="/shop/sua-thong-tin-nguoi-dung"
											  data-name="name" data-pk="${user.user.phone}"
											  data-original-title="Họ Tên"
											  data-value="${user.userProfile.fullName}"
											  class="editable editable-empty">${user.userProfile.fullName}</a>
			</div>
		</div>
		<!-- PHONE -->
		<div class="form-group">
			<div class="col-xs-4 col-md-4">Số điện thoại</div>
			<div class="col-xs-8 col-md-8"><label>${user.user.phone}</label></div>
		</div>
		<!-- EMAIL -->
		<div class="form-group">
			<div class="col-xs-4 col-md-4">Email<span style="color: red">*</span></div>
				<%--<div class="col-xs-8 col-md-8"><label>${user.user.email}</label></div>--%>
			<div class="col-xs-8 col-md-8"><a href="#" id="email"
											  data-type="text" data-url="/shop/sua-thong-tin-nguoi-dung"
											  data-name="email" data-pk="${user.user.phone}"
											  data-original-title="Email"
											  data-value="${user.user.email}"
											  class="editable editable-empty">${user.user.email}</a></div>
		</div>
		<div class="form-group">
			<div class="col-xs-4 col-md-4">Giới tính</div>
				<%--<div class="col-xs-8 col-md-8"><label${user.userProfile.gender == 1 ? 'Nam' : 'Nữ'}></label></div>--%>
			<div class="col-xs-8 col-md-8"><a href="#" id="gender"
											  data-source="[{value: 1, text: 'Nam'}, {value: 2, text: 'Nữ'}]"
											  data-type="select" data-url="/shop/sua-thong-tin-nguoi-dung"
											  data-name="gender" data-pk="${user.user.phone}"
											  data-original-title="Email"
											  data-value="${user.userProfile.gender}"
											  class="editable editable-empty">${user.userProfile.gender == 1 ? 'Nam' : 'Nữ'}</a></div>
		</div>
		<!-- ADDRESS -->
		<div class="form-group">
			<div class="col-xs-4 col-md-4">Địa chỉ<span style="color: red">*</span></div>
				<%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.address}</label></div>--%>
			<div class="col-xs-8 col-md-8"><a href="#" id="address"
											  data-type="text" data-url="/shop/sua-thong-tin-nguoi-dung"
											  data-name="address" data-pk="${user.user.phone}"
											  data-original-title="Địa chỉ"
											  data-value="${user.userProfile.address}"
											  class="editable editable-empty">${user.userProfile.address}</a></div>
		</div>
		<div class="form-group">
			<div class="col-xs-4 col-md-4">Tỉnh/Thành phố<span style="color: red">*</span></div>
				<%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.province}</label></div>--%>
			<div class="col-xs-8 col-md-8"><a href="#" id="province"
											  data-type="select" data-url="/shop/sua-thong-tin-nguoi-dung"
											  data-name="province" data-pk="${user.user.phone}"
											  data-original-title="Tỉnh/TP"
											  data-value="${user.userProfile.province == 'Hà Nội'? 1: 2}"
											  class="editable editable-empty">${user.userProfile.province}</a></div>
		</div>

		<div class="form-group">
			<div class="col-xs-4 col-md-4">Quận/Huyện<span style="color: red">*</span></div>
				<%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.district}</label></div>--%>
			<div class="col-xs-8 col-md-8"><a href="#" id="district"
											  data-type="select" data-url="/shop/sua-thong-tin-nguoi-dung"
											  data-name="district" data-pk="${user.user.phone}"
											  data-original-title="Quận/Huyện"
											  class="editable editable-empty">${user.userProfile.district}</a></div>
		</div>

		<div class="form-group">
			<div class="col-xs-4 col-md-4">Nơi sinh</div>
				<%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.placeOfBirth}</label></div>--%>
			<div class="col-xs-8 col-md-8"><a href="#" id="placeOfBirth"
											  data-type="text" data-url="/shop/sua-thong-tin-nguoi-dung"
											  data-name="identity" data-pk="${user.user.phone}"
											  data-original-title="Nơi Sinh"
											  data-value="${user.userProfile.placeOfBirth}"
											  class="editable">${user.userProfile.placeOfBirth}</a></div>
		</div>

		<div class="form-group">
			<div class="col-xs-4 col-md-4">Ngày sinh</div>
				<%--<div class="col-xs-8 col-md-8"><label>--%>
				<%--<fmt:formatDate value="${user.userProfile.birthday}" pattern="dd-MM-yy"/></label></div>--%>
			<div class="col-xs-8 col-md-8"><a href="#" id="birthDay"
											  data-type="date" data-url="/shop/sua-thong-tin-nguoi-dung"
											  data-name="birthDay" data-pk="${user.user.phone}"
											  data-original-title="Ngày sinh"
											  data-value="<fmt:formatDate value="${user.userProfile.birthday}" pattern="dd/MM/yyyy"/>"
											  class="editable editable-empty">
				<fmt:formatDate value="${user.userProfile.birthday}" pattern="dd/MM/yyyy"/></a>
			</div>
		</div>

		<div class="form-group">
			<div class="col-xs-4 col-md-4">Số CMT</div>
				<%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.identityCard}</label></div>--%>
			<div class="col-xs-8 col-md-8"><a href="#" id="identityCard"
											  data-type="text" data-url="/shop/sua-thong-tin-nguoi-dung"
											  data-name="identityCard" data-pk="${user.user.phone}"
											  data-original-title="Số CMT"
											  data-value="${user.userProfile.identityCard}"
											  class="editable editable-empty">${user.userProfile.identityCard}</a></div>
		</div>

		<div class="form-group">
			<div class="col-xs-4 col-md-4">Ngày cấp</div>
				<%--<div class="col-xs-8 col-md-8"><label>--%>
				<%--<fmt:formatDate value="${user.userProfile.dateOfIdentity}" pattern="dd-MM-yy"/></label></div>--%>
			<div class="col-xs-8 col-md-8"><a href="#" id="dateOfIdentity"
											  data-type="date" data-url="/shop/sua-thong-tin-nguoi-dung"
											  data-name="dateOfIdentity" data-pk="${user.user.phone}"
											  data-original-title="Ngày cấp"
											  data-value="<fmt:formatDate value="${user.userProfile.dateOfIdentity}" pattern="dd/MM/yyyy"/>"
											  class="editable editable-empty">
				<fmt:formatDate value="${user.userProfile.dateOfIdentity}" pattern="dd/MM/yyyy"/></a>
			</div>
		</div>

		<div class="form-group">
			<div class="col-xs-4 col-md-4">Facebook</div>
				<%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.facebookId}</label></div>--%>
			<div class="col-xs-8 col-md-8"><a href="#" id="facebook"
											  data-type="text" data-url="/shop/sua-thong-tin-nguoi-dung"
											  data-name="facebook" data-pk="${user.user.phone}"
											  data-original-title="Facebook"
											  data-value="${user.userProfile.facebookId}"
											  class="editable editable-empty">${user.userProfile.facebookId}</a></div>
		</div>

	</c:otherwise>
</c:choose>

