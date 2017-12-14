<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>

<div class="col-md-6 col-md-offset-3 mobile-padding">
    <div class="container card" style="padding: 15px;">
        <div class="center" style="margin-bottom: 20px">
            <h2 class="page-header">
                <span>DANH SÁCH NHÂN VIÊN</span>
            </h2>
            <a href="#" style=" color: #f3921f;float:left" data-toggle="modal" data-target="#modal-add-member">
                <i class="fa fa-plus-square" aria-hidden="true"></i>&nbsp;Thêm nhân viên
            </a>
        </div>

        <div>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th style="width: 10%;color: #92c78a;">
                                <i style="color: #92c78a;" class="fa fa-hashtag"></i>
                            </th>
                            <th style="text-align: left">
                                <i style="color: #92c78a;" class="fa fa-user"></i>&nbsp;Tên
                            </th>
                            <th style="text-align: left; width: 30%">
                                <i style="color: #92c78a;" class="fa fa-phone"></i>&nbsp;SĐT
                            </th>
                            <th style="text-align: center; width: 20%">
                                <i style="color: #92c78a;" class="fa fa-cog"></i>&nbsp;Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody id="table-members">

                    </tbody>
                </table>

                <div class="alert alert-warning" style="display: none" id="alert-admin">
                    Không có nhân viên nào !
                </div>
            </div>

        </div>
    </div>

</div>
<!-- Modal -->
<div id="modal-add-member" class="modal fade" role="dialog">
    <div class="modal-dialog" style="top:0px">

        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thông tin nhân viên</h4>
            </div>
            <div class="modal-body">
                <p id="alert"></p>

                <form>
                    <div class="form-group">
                        <label>Họ và tên <span style="color: red">*</span></label>
                        <input type="text" class="form-control" id="name" name="name" value="01640924700">
                    </div>

                    <div class="form-group">
                        <label class="radio-inline">
                            <input type="radio" name="gender" value="1" checked="checked">Nam
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="gender" value="2">Nữ
                        </label>
                    </div>

                    <div class="form-group">
                        <label>Số điện thoại đăng nhập <span style="color: red">*</span></label>
                        <input type="text" class="form-control" id="phone" name="phone" value="01640924700">
                    </div>

                    <div class="form-group">
                        <label>Email <span style="color: red">*</span></label>
                        <input type="text" class="form-control" id="email" name="email" value="01640924700@gmail.com">
                    </div>

                    <div class="form-group">
                        <label>Mật khẩu <span style="color: red">*</span></label>
                        <input type="password" class="form-control" id="password" name="password" value="123456">
                    </div>

                    <div class="form-group">
                        <label>Nhập lại mật khẩu  <span style="color: red">*</span></label>
                        <input type="password" class="form-control" id="confirmPassword" value="123456">
                    </div>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" onclick="cancel()">Hủy</button>
                <button type="button" class="btn btn-primary" onclick="addMember()">Thêm nhân viên</button>
            </div>
        </div>

    </div>
</div>





