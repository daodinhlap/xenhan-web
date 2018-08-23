<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>


<div class="col-md-6 col-md-offset-3 mobile-padding">
	<div class="container card">
		<div class="center">
			<h2> TIN TỨC XE NHÀN</h2>
		</div>

		<div>
			<table class="table table-hover click">
				<tr><button class="btn btn-link" onclick="closeAll()" style="float: right;display: none" id="btn-close-all">
					<i class="fa fa-times" aria-hidden="true"></i> Xóa tất cả</button>
				</tr>
				<tbody id="table-ad">
				</tbody>
			</table>
		</div>

	</div>
</div>

<%--<div class="col-md-3 mobile-padding">--%>
	<%--<div class="owl-carousel owl-theme">--%>
		<%--<div class="item">--%>
			<%--<img style="width: 300px !important;" src="/resources/images/advertising/ad-1.png"/>--%>
		<%--</div>--%>
		<%--<div class="item">--%>
			<%--<img style="width: 300px !important;" src="/resources/images/advertising/ad-2.png"/>--%>
		<%--</div>--%>
	<%--</div>--%>
<%--</div>--%>


<!-- ad -->
<div id="detail-ad" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title" id="ad-title"></h4>
			</div>
			<div class="modal-body" style="white-space: pre-line;">
				<p id="ad-content"></p>
			</div>
			<div class="modal-footer">
				<button class="btn btn-default" data-dismiss="modal" id="btn-close">Xóa thông báo</button>
			</div>

		</div>
	</div>
</div>