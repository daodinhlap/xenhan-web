<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>

	<div class="alert alert-success">
        Xin vui lòng <a href="/lien-he">liên hệ</a> để cập nhật thông tin thanh toán
	</div>
	<c:choose>
		<c:when test="${shopPayment.method == 0}">
			<div class="form-group">
				<div class="error">
					<p>Không có thông tin</p>
					<div class="controls">
						<p>${error}</p>
					</div>
				</div>
			</div>
		</c:when>
		<c:otherwise>
			
			<c:if test="${shopPayment.method == 1}">
				<div class="form-group" style="margin-top: 20px">
					<div class="col-xs-6 col-md-4" style="padding-right: 0px">Hình thức thanh toán</div>
					<div class="col-xs-6 col-md-8"><p>${shopPayment.method == 1? "Chuyển khoản": "Tiền mặt"}</p></div>
				</div>

				<div class="form-group">
					<div class="col-xs-6 col-md-4">Tên chủ tài khoản</div>
					<div class="col-xs-6 col-md-8"><p>${shopPayment.bankAccountName}</p></div>
				</div>

				<div class="form-group">
					<div class="col-xs-6 col-md-4">Số tài khoản</div>
					<div class="col-xs-6 col-md-8"><p>${shopPayment.bankAccountNo}</p></div>
				</div>

				<div class="form-group">
					<div class="col-xs-6 col-md-4">Tên ngân hàng</div>
					<div class="col-xs-6 col-md-8"><p>${shopPayment.bankName}</p></div>
				</div>

				<div class="form-group">
					<div class="col-xs-6 col-md-4">Tên chi nhánh</div>
					<div class="col-xs-6 col-md-8"><p>${shopPayment.branchName}</p></div>
				</div>
			</c:if>
			<c:if test="${shopPayment.method == 2}">
				<div class="form-group" style="margin-top: 20px">
					<div class="col-xs-6 col-md-4">Hình thức thanh toán</div>
					<div class="col-xs-6 col-md-8"><p>${shopPayment.method == 1? "Chuyển khoản": "Tiền mặt"}</p></div>
				</div>

				<div class="form-group">
					<div class="col-xs-6 col-md-4">Họ tên</div>
					<div class="col-xs-6 col-md-8"><p>${shopPayment.fullName}</p></div>
				</div>

				<div class="form-group">
					<div class="col-xs-6 col-md-4">Số CMTND</div>
					<div class="col-xs-6 col-md-8"><p>${shopPayment.identityCard}</p></div>
				</div>

				<div class="form-group">
					<div class="col-xs-6 col-md-4">Ngày cấp</div>
                    <jsp:useBean id="dateOfIdentity" class="java.util.Date" />
                    <jsp:setProperty name="dateOfIdentity" property="time" value="${shopPayment.dateOfIdentity}" />
                    <div class="col-xs-6 col-md-8"><p><fmt:formatDate pattern="dd/MM/yyyy" value="${dateOfIdentity}" /></p></div>
				</div>

				<div class="form-group">
					<div class="col-xs-6 col-md-4">Nơi cấp</div>
					<div class="col-xs-6 col-md-8"><p>${shopPayment.placeOfIdentity}</p></div>
				</div>

			</c:if>
		</c:otherwise>
	</c:choose>




