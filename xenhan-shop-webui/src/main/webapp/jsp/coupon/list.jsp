<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<div class="col-md-6 col-md-offset-3 mobile-padding">
	<div class="container card">
		<div class="center">
			<div class="col-md-offset-3 col-md-6 col-xs-6">
				<h2> MÃ KHUYẾN MẠI</h2>
			</div>

			<div class="col-md-3 col-xs-6" style="margin-top: 10px">
				<select id="status" class="form-control">
					<option value="3">Khả dụng</option>
					<option value="2">Hết hiệu lực</option>
				</select>
			</div>
		</div>

		<div>
			<table class="table table-hover click">
				<thead>
					<tr>
						<th style="color: #92c78a;"><i class="fa fa-hashtag"/></th>
						<th><i style="color: #92c78a;" class="fa fa-barcode" aria-hidden="true"></i>&nbsp; Mã Coupon </th>
						<th><i style="color: #92c78a;" class="fa fa-usd" aria-hidden="true"></i>&nbsp; Mệnh giá </th>
						<th><i style="color: #92c78a;" class="fa fa-calendar" aria-hidden="true"></i>&nbsp; Ngày hết hạn </th>
					</tr>
				</thead>
				<tbody id="table-coupons">
				</tbody>
			</table>
		</div>

	</div>
</div>