<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>
<%@ page import="java.util.*"%>

<div class="col-md-8 col-md-offset-2 mobile-padding">
	<div class="container card" style="padding: 15px;">
		<div>
			<tbody id="table-history">
				<c:forEach items="${orders}" var="order" varStatus="loop">
					<tr>
						<td></td>
						<td>
							<table class="table table-bordered">
								<tbody>
									<tr>
										<td style="text-align: center; font-weight: bold;" colspan="2">Đơn
											Hàng ${loop.index}</td>
									</tr>
									<tr>
										<td width="40%">Loại đơn *:</td>
										<td><a href="#" id="type" data-type="select"
											 data-url="/shop/sua-don-tu-excel"
											 data-name="type" data-pk="${loop.index}" data-original-title="Chọn Loại Đơn" class="editable editable-empty">${order.COD ? 'COD' : 'Ứ.T'}</a></td>
									</tr>
									<tr>
										<td>Gói Cước *:</td>
										<td>Toc Do</td>
									</tr>

									<tr>
										<td>Tiền Hàng *:</td>
										<td><a href="#" 
										 data-url="/shop/sua-don-tu-excel" 
										 id="good-amount" data-type="number" data-pk="${loop.index}">
											<fmt:formatNumber type="number" maxFractionDigits="3"
												value="${order.goodAmount}" /></a></td>
									</tr>
									<tr>
										<td>Mã Giảm Giá*:</td>
										<td>${order.coupon}</td>
									</tr>
									<tr>
										<td>Tiền Giảm Giá*:</td>
										<td><fmt:formatNumber type="number" maxFractionDigits="3"
												value="${order.refund}" /></td>
									</tr>
									<tr>
										<td>Phí Ship Trước Khi Giảm *</td>
										<td><fmt:formatNumber type="number" maxFractionDigits="3"
												value="${order.originalShipAmount}" /></td>
									</tr>
									<tr>
										<td>Phí Ship</td>
										<td><fmt:formatNumber type="number" maxFractionDigits="3"
												value="${order.shipAmount}" /></td>
									</tr>
									<tr>
										<td>Địa Chỉ Giao* :</td>
										<td>${order.dropoff.address}</td>
									</tr>
									<tr>
										<td>Tỉnh/TP* :</td>
										<td>${order.dropoff.town.name}</td>
									</tr>
									<tr>
										<td>Quận/Huyện* :</td>
										<td>${order.dropoff.town.district.name}</td>
									</tr>
									<tr>
										<td>Khách Nhận Hàng</td>
										<td>${order.dropoff.contact.name}</td>
									</tr>
									<tr>
										<td>Điện Thoại Khách Nhận</td>
										<td>${order.dropoff.contact.phone}</td>
									</tr>
									<tr>
										<td>Thông Tin Thêm</td>
										<td>${order.orderMessage}</td>
									</tr>

									<tr>
									  <td colspan="2" align="center">
										<div class="row">
											<div class="col-md-6">Sửa Đơn</div>
											<div class="col-md-6">Xóa Đơn</div>
										</div>
									</td>
									</tr>
								</tbody>
							</table>

						</td>
					</tr>
				</c:forEach>
		</div>
	</div>
</div>

