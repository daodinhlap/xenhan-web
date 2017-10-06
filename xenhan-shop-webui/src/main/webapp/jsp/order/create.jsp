<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<ul class="nav nav-tabs">
  <li><a data-toggle="tab" href="#create">Tạo Đơn</a></li>
  <li class="active"><a data-toggle="tab" href="#import">Nhập Đơn Từ Excel</a></li>
</ul>

<div class="tab-content">
  <div id="create" class="tab-pane fade in">
    	<jsp:include page="create.form.jsp"></jsp:include>
  </div>
  <div id="import" class="tab-pane fade in active">
    	<jsp:include page="create.excel.jsp"></jsp:include>
  </div>
</div>