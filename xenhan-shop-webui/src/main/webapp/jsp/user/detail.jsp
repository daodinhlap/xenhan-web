<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>

<div class="col-md-6 col-md-offset-3  mobile-padding">

	<div class="container card" id="account-view">
		<div class="center">
            <h2><span>THÔNG TIN NGƯỜI DÙNG</span>
                <span style="color: #f3931f; cursor: pointer;"><i id="enable" class="fa fa-pencil-square-o"></i></span>
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
					<div class="form-group" id="user">
                        <div class="col-xs-4 col-md-4">Họ Tên</div>
                        <div class="col-xs-8 col-md-8"><a href="#" id="name" 
											data-type="text" data-url="/user/sua-thong-tin-nguoi-dung"
											data-name="name" data-pk="${user.user.phone}"
											data-original-title="Họ Tên"
											data-value="${user.userProfile.fullName}"
											class="editable editable-empty">${user.userProfile.fullName}</a>
						</div>
					</div>
					<!-- PHONE -->
					<div class="form-group">
                        <div class="col-xs-4 col-md-4">Số điện thoại</div>
                        <%--<div class="col-xs-8 col-md-8"><label>${user.user.phone}</label></div>--%>
						<div class="col-xs-8 col-md-8"><a href="#" id="phone"
														  data-type="text" data-url="/user/sua-thong-tin-nguoi-dung"
														  data-name="phone" data-pk="${user.user.phone}"
														  data-original-title="Số Điện Thoại Giao Hàng"
														  data-value="${user.user.phone}"
														  class="editable editable-empty">${user.user.phone}</a></div>
					</div>
					<!-- EMAIL -->
					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Email</div>
                            <%--<div class="col-xs-8 col-md-8"><label>${user.user.email}</label></div>--%>
							<div class="col-xs-8 col-md-8"><a href="#" id="email"
															  data-type="text" data-url="/user/sua-thong-tin-nguoi-dung"
															  data-name="email" data-pk="${user.user.phone}"
															  data-original-title="Email"
															  data-value="${user.user.email}"
															  class="editable editable-empty">${user.user.email}</a></div>
					</div>
					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Giới Tính</div>
                            <%--<div class="col-xs-8 col-md-8"><label${user.userProfile.gender == 1 ? 'Nam' : 'Nữ'}></label></div>--%>
							<div class="col-xs-8 col-md-8"><a href="#" id="gender"
															  data-type="select" data-url="/user/sua-thong-tin-nguoi-dung"
															  data-name="gender" data-pk="${user.user.phone}"
															  data-original-title="Email"
															  data-value="${user.userProfile.gender}"
															  class="editable editable-empty">${user.userProfile.gender == 1 ? 'Nam' : 'Nữ'}</a></div>
					</div>
					<!-- ADDRESS -->
					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Địa chỉ</div>
                            <%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.address}</label></div>--%>
							<div class="col-xs-8 col-md-8"><a href="#" id="address"
															  data-type="text" data-url="/user/sua-thong-tin-nguoi-dung"
															  data-name="address" data-pk="${user.user.phone}"
															  data-original-title="Địa chỉ"
															  data-value="${user.userProfile.address}"
															  class="editable editable-empty">${user.userProfile.address}</a></div>
					</div>
					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Tỉnh/Thành phố</div>
                            <%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.province}</label></div>--%>
							<div class="col-xs-8 col-md-8"><a href="#" id="province"
															  data-type="select" data-url="/user/sua-thong-tin-nguoi-dung"
															  data-name="province" data-pk="${user.user.phone}"
															  data-original-title="Tỉnh/TP"
															  data-value="${user.userProfile.province == 'Hà Nội'? 1: 2}"
															  class="editable editable-empty">${user.userProfile.province}</a></div>
					</div>
					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Quận/Huyện</div>
                            <%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.district}</label></div>--%>
							<div class="col-xs-8 col-md-8"><a href="#" id="district"
															  data-type="select" data-url="/user/sua-thong-tin-nguoi-dung"
															  data-name="district" data-pk="${user.user.phone}"
															  data-original-title="Quận/Huyện"
															  data-value="${user.userProfile.district}"
															  class="editable editable-empty">${user.userProfile.district}</a></div>
					</div>

					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Nơi Sinh</div>
                            <%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.placeOfBirth}</label></div>--%>
							<div class="col-xs-8 col-md-8"><a href="#" id="placeOfBirth"
															  data-type="text" data-url="/user/sua-thong-tin-nguoi-dung"
															  data-name="identity" data-pk="${user.user.phone}"
															  data-original-title="Nơi Sinh"
															  data-value="${user.userProfile.placeOfBirth}"
															  class="editable editable-empty">${user.userProfile.placeOfBirth}</a></div>
					</div>

					<div class="form-group">
                        <div class="col-xs-4 col-md-4">Ngày Sinh</div>
                        <div class="col-xs-8 col-md-8"><label>
                            <fmt:formatDate value="${user.userProfile.birthday}" pattern="dd-MM-yy"/></label></div>
					</div>

					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Số CMT</div>
                            <%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.identityCard}</label></div>--%>
							<div class="col-xs-8 col-md-8"><a href="#" id="identityCard"
															  data-type="text" data-url="/user/sua-thong-tin-nguoi-dung"
															  data-name="identityCard" data-pk="${user.user.phone}"
															  data-original-title="Số CMT"
															  data-value="${user.userProfile.identityCard}"
															  class="editable editable-empty">${user.userProfile.identityCard}</a></div>
					</div>

					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Ngày Cấp</div>
                            <div class="col-xs-8 col-md-8"><label>
                                <fmt:formatDate value="${user.userProfile.dateOfIdentity}" pattern="dd-MM-yy"/></label></div>
					</div>

					<div class="form-group">
                            <div class="col-xs-4 col-md-4">Facebook</div>
                            <%--<div class="col-xs-8 col-md-8"><label>${user.userProfile.facebookId}</label></div>--%>
							<div class="col-xs-8 col-md-8"><a href="#" id="facebook"
															  data-type="text" data-url="/user/sua-thong-tin-nguoi-dung"
															  data-name="facebook" data-pk="${user.user.phone}"
															  data-original-title="Facebook"
															  data-value="${user.userProfile.facebookId}"
															  class="editable editable-empty">${user.userProfile.facebookId}</a></div>
					</div>

				</c:otherwise>
			</c:choose>
	</div>

</div>
