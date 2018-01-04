<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>


<div class="col-md-6 col-md-offset-3 mobile-padding">
	<div class="container card" >
		<div class="center">
			<h2>
				THÔNG TIN KHUYẾN MẠI
			</h2>
		</div>

		<div>
			<table class="table table-hover click">
				<tbody id="table-ad">

				</tbody>
			</table>
		</div>

	</div>
</div>

<!-- ad -->
<div id="advertising" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title" id="ad-title"></h4>
			</div>
			<div class="modal-body">
				<p id="ad-content"></p>
			</div>
			<div class="modal-footer">
			</div>

		</div>
	</div>
</div>