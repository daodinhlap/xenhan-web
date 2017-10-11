<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<script type="text/template" id="qq-template-excel">
        <div class="qq-uploader-selector qq-uploader qq-gallery" qq-drop-area-text="Drop files here">
            <div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
                <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
            </div>
            <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
                <span class="qq-upload-drop-area-text-selector"></span>
            </div>
            <div class="qq-upload-button-selector qq-upload-button">
                <div>Chọn Tập Excel</div>
            </div>
            <span class="qq-drop-processing-selector qq-drop-processing">
                <span>Tiến trình hủy bỏ files...</span>
                <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
            </span>
            <ul class="qq-upload-list-selector qq-upload-list" role="region" aria-live="polite" aria-relevant="additions removals">
                <li>
                    <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>
                    <div class="qq-progress-bar-container-selector qq-progress-bar-container">
                        <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar"></div>
                    </div>
                    <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
                    <div class="qq-thumbnail-wrapper">
                        <img class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale>
                    </div>
                    <button type="button" class="qq-upload-cancel-selector qq-upload-cancel">X</button>
                    <button type="button" class="qq-upload-retry-selector qq-upload-retry">
                        <span class="qq-btn qq-retry-icon" aria-label="Thử Lại"></span>
                       Thử Lại
                    </button>

                    <div class="qq-file-info">
                        <div class="qq-file-name">
                            <span class="qq-upload-file-selector qq-upload-file"></span>
                            <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Sửa Tên File"></span>
                        </div>
                        <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">
                        <span class="qq-upload-size-selector qq-upload-size"></span>
                        <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">
                            <span class="qq-btn qq-delete-icon" aria-label="Xóa"></span>
                        </button>
                        <button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause">
                            <span class="qq-btn qq-pause-icon" aria-label="Dừng"></span>
                        </button>
                        <button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue">
                            <span class="qq-btn qq-continue-icon" aria-label="Tiếp Tục"></span>
                        </button>
                    </div>
                </li>
            </ul>

            <dialog class="qq-alert-dialog-selector">
                <div class="qq-dialog-message-selector"></div>
                <div class="qq-dialog-buttons">
                    <button type="button" class="qq-cancel-button-selector">Đóng</button>
                </div>
            </dialog>

            <dialog class="qq-confirm-dialog-selector">
                <div class="qq-dialog-message-selector"></div>
                <div class="qq-dialog-buttons">
                    <button type="button" class="qq-cancel-button-selector">Không</button>
                    <button type="button" class="qq-ok-button-selector">Có</button>
                </div>
            </dialog>

            <dialog class="qq-prompt-dialog-selector">
                <div class="qq-dialog-message-selector"></div>
                <input type="text">
                <div class="qq-dialog-buttons">
                    <button type="button" class="qq-cancel-button-selector">Thay Đổi</button>
                    <button type="button" class="qq-ok-button-selector">Ok</button>
                </div>
            </dialog>
        </div>
    </script>
<div class="col-md-8 col-md-offset-3  mobile-padding">
	<div id="info-receiver" class="container card">
		<div class="center">
			<h2>Tạo Đơn Bằng Excel</h2>
		</div>
		<div class="center container"
			style="margin-bottom: 20px; margin-top: 30px">
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-lg-8">
					<div id="fine-uploader-gallery"></div>
				</div>
				<div class="col-xs-6 col-lg-4" style="margin-top: 30px">
					<a target="_blank"
						href="/resources/file/DanhSachDonHang_ShopXeNhan.xlsx"> <i
						class="glyphicon glyphicon-download-alt"></i>Tải Mẫu
					</a>
				</div>
			</div>
			<c:if test="${not empty error}">
				<div class="row" style="margin-top: 20px">
					<div class="alert alert-success" role="alert">${error}</div>
				</div>
			</c:if>
		</div>
	</div>


	<c:if test="${not empty orders}">
		<div class="container card" style="padding: 15px; margin-top: 20px">
			<div id="accordion" role="tablist">
				<input id="number-of-order" type="hidden" value="${orders.size()}"
					style="display: none">
				<c:forEach items="${orders}" var="order" varStatus="loop">
					<div class="card">
						<div class="card-header" role="tab" id="headingOne"
							style="margin-top: 10px; margin-left: 10px">
							<h3 class="mb-0" style="display: inline">
								<a data-toggle="collapse" href="#order-${loop.index + 1}"
									aria-expanded="true" aria-controls="order-${loop.index}">
									Đơn Hàng ${loop.index + 1}</a>
							</h3>
							- Tiền Hàng:
							<fmt:formatNumber type="number" maxFractionDigits="3"
								value="${order.goodAmount}" />
							- Phí Ship:
							<fmt:formatNumber type="number" maxFractionDigits="3"
								value="${order.shipAmount}" />
							- ${order.dropoff.contact.phone} - Giao: ${order.dropoff.address}
						</div>
					</div>

					<div id="order-${loop.index + 1}" class="collapse" role="tabpanel"
						aria-labelledby="headingOne" data-parent="#accordion">
						<div class="card-body">
							<table class="table borderless" style="margin-top: 20px">
								<tbody>
									<tr>
										<td width="40%">Loại đơn *:</td>
										<td><a href="#" id="type-${loop.index}"
											data-type="select" data-url="/order-excel/sua-don-tu-excel"
											data-value="${order.COD ? '1' : '2'}"
											data-name="type" data-pk="${loop.index}"
											data-original-title="Chọn Loại Đơn"
											class="editable editable-empty">${order.COD ? 'COD' : 'Ứng Tiền'}</a></td>
									</tr>
									<tr>
										<td>Gói Cước *:</td>
										<td><a href="#" id="package-${loop.index}"
											data-type="select" data-url="/order-excel/sua-don-tu-excel"
											data-name="package" data-pk="${loop.index}"
											data-value="${order.packageId}"
											data-original-title="Chọn Gói Cước"
											class="editable editable-empty"> <c:choose>
													<c:when test="${order.packageId == 1}">Hỏa Tốc</c:when>
													<c:when test="${order.packageId == 2}">Tốc Độ</c:when>
													<c:otherwise>Tiết Kiệm</c:otherwise>
												</c:choose>
										</a></td>
									</tr>

									<tr>
										<td>Tiền Hàng *:</td>
										<td><a href="#" data-url="/order-excel/sua-don-tu-excel"
											data-name="good-amount" id="good-amount-${loop.index}"
											data-type="text" data-pk="${loop.index}"> <fmt:formatNumber
													type="number" maxFractionDigits="3"
													value="${order.goodAmount}" />
										</a></td>
									</tr>
									<tr>
										<td>Mã Giảm Giá*:</td>
										<td><a href="#" data-url="/order-excel/sua-don-tu-excel"
											data-name="coupon" id="coupon-${loop.index}" data-type="text"
											data-pk="${loop.index}">${order.coupon}</a></td>
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
										<td><a href="#" data-url="/order-excel/sua-don-tu-excel"
											data-name="address" id="address-${loop.index}"
											data-type="text" data-pk="${loop.index}">${order.dropoff.address}</a></td>
									</tr>
									<tr>
										<td>Tỉnh/TP* :</td>
										<td><a href="#" id="province-${loop.index}"
											data-type="select" data-url="/order-excel/sua-don-tu-excel"
											data-name="province" data-pk="${loop.index}"
											data-original-title="Chọn Tỉnh/Thành Phố"
											data-value="${order.dropoff.town.id}"
											class="editable editable-empty">${order.dropoff.town.name}</a></td>
									</tr>
									<tr>
										<td>Quận/Huyện* :</td>
										<td><a href="#" id="district-${loop.index}"
											data-type="select" data-url="/order-excel/sua-don-tu-excel"
											data-name="district" data-pk="${loop.index}"
											data-original-title="Chọn Quận/Huyện"
											data-value="${order.dropoff.town.district.id}"
											class="editable editable-empty">${order.dropoff.town.district.name}</a></td>
									</tr>
									<tr>
										<td>Khách Nhận Hàng</td>
										<td><a href="#" data-url="/order-excel/sua-don-tu-excel"
											data-name="name" id="name-${loop.index}" data-type="text"
											data-pk="${loop.index}">${order.dropoff.contact.name}</a></td>
									</tr>
									<tr>
										<td>Điện Thoại Khách Nhận</td>
										<td><a href="#" data-url="/order-excel/sua-don-tu-excel"
											data-name="phone" id="phone-${loop.index}" data-type="text"
											data-pk="${loop.index}">${order.dropoff.contact.phone}</a></td>
									</tr>
									<tr>
										<td>Thông Tin Thêm</td>
										<td><a href="#" data-url="/order-excel/sua-don-tu-excel"
											data-name="message" id="message-${loop.index}" data-type="text"
											data-pk="${loop.index}">${order.orderMessage}</a></td>
									</tr>

									<tr>
										<td colspan="2" align="center">
											<div class="row">
												<div class="col-xs-6">
													<a class="btn btn-primary" href="/order-excel/luu-don-tu-excel?index=${loop.index}">Nhập
														Đơn</a>
												</div>
												<div class="col-xs-6">
													<a class="btn btn-warning" href="/order-excel/xoa-don-tu-excel?index=${loop.index}">Xóa
														Đơn</a>
												</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</c:forEach>
			</div>
			<div style="margin-top: 20px; vertical-align: center" align="center">
				<a href="/order-excel/luu-het" class="btn btn-primary">Tạo Đơn</a>
			</div>
		</div>
	</c:if>
</div>
<link href="/resources/css/app/fine-uploader.min.css" rel="stylesheet">
<style>
.borderless td, .borderless th {
    border: none;
}
</style>
