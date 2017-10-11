<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<div class="col-md-6 col-md-offset-3  mobile-padding">
	<div class="container card" id="account-view">
		<div class="center">
			<h2>
				THÔNG TIN TÀI KHOẢN <span style="color: #f3931f; cursor: pointer;"><i id="enable" class="fa fa-pencil-square-o"></i></span>
			</h2>
		</div>
		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#home">Thông tin người dùng
			</a></li>
			<li><a data-toggle="tab" href="#menu1">Đổi mật khẩu</a></li>
			<li><a data-toggle="tab" href="#menu2">Thông tin shop</a></li>
		</ul>

		<div class="tab-content">
			<div id="home" class="tab-pane fade in active">
				<jsp:include page="user.detail.jsp"></jsp:include>
			</div>
			<div id="menu1" class="tab-pane fade">
				<jsp:include page="user.change.password.jsp"></jsp:include>
			</div>
			<div id="menu2" class="tab-pane fade">
				<jsp:include page="detail.jsp"></jsp:include>
			</div>
		</div>
		
	</div>
</div>