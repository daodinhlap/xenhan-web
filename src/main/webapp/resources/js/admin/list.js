var formMember = new FormMember();
var noti = new Notify();
var members = [];

var URL_LIST = BASE_URL + "/admin/list";
var URL_ADD = BASE_URL + "/admin/add";
var URL_DELETE = BASE_URL + "/admin/delete";
//================================================================

//ON LOADED
$(document).ready(function($) {

    getListMember();

    $("#btn-add-member").click(function () {
        if(formMember.validate().length != 0) return;
        $(this).button('loading');
    });

});

function getListMember() {
    members = [];
    buildTable();

    $.ajax({
        type : 'GET',
        contentType : 'application/json',
        url : URL_LIST,
    }).done(function(data) {
        if (!data) {
            noti.error([{message: data, id: "member-alert"}]);
            return;
        }

        members = data;
        buildTable(data)

    }).fail(function(data) {
        console.log(data);
        // noti.fail("Thông báo!","Có lỗi xảy ra. Xin vui lòng thử lại sau", function() { reload() });
    });
}

function addMember() {
    var hasError = formMember.validate();
    if(hasError.length != 0){
        noti.error(error);
        return;
    }

    $.ajax({
        type : 'POST',
        contentType : 'application/json',
        url : URL_ADD,
        data : JSON.stringify(formMember.getRequest())
    }).done(function(data) {
        if(ErrorCode.DUPLICATE_MEMBER == data.code ){
            error.push({message: "Nhân viên đã được thêm", id: "member-alert"});
            noti.error(error);
            return;
        }
        if(ErrorCode.USER_EXISTED == data.code || ErrorCode.MEMBERSHIP_EXISTED == data.code){
            $("#modal-add-member").modal("hide");
            noti.ok("Tạo nhân viên thành công", "SĐT: " + formMember.getPhone() + " đã có tài khoản HomeDirect<br>" +
                " Hãy đăng nhập bằng tài khoản đã có");
            rebuildTable();
            return;
        }
        if(ErrorCode.SUCCESS == data.code){
            rebuildTable();
            $("#modal-add-member").modal("hide");
            noti.dialog("Tạo nhân viên thành công", 2);
            return;
        }

        if (data.code != 1) {
            error.push({message: data.message, id: "member-alert"});
            noti.error(error);
            return;
        }
    }).fail(function(data) {
        console.log(data);
        noti.fail("Thông báo!","Có lỗi xảy ra. Xin vui lòng thử lại sau", function() { reload() });
    }).always(function () {
        $("#btn-add-member").button('reset');
    });
}

function cancel() {
    formMember.reset();
    noti.cleanError();
}

function rebuildTable() {
    members.push(formMember.getNewMember());
    buildTable(members);
    formMember.reset();
}

function buildTable(members) {
    var table = $('#table-members');
    table.empty();

    if(!members) return;

    table.hide();
    members.forEach(function(member, i){
        // var trigger = "data-toggle='modal' data-target='#modal-"+ member.id +"'";
        table.append(
            $("<tr>")
                .append($("<td>"+(i+1)+"</td>"))
                .append($("<td align='left'>").text(member.fullName))
                .append($("<td align='left'>").text(member.phone))
                .append("<td align='center'>" +
                    "<i class='fa fa-times' data-toggle='tooltip' title='Xóa nhân viên' style=' cursor: pointer;' " +
                    "onclick=\"deleteMember('" + member.userName + "', '"+member.fullName+"')\"></i></td>")
        );
    });
    table.fadeIn();

    $('[data-toggle="tooltip"]').tooltip();
}

function deleteMember(phone, name){
    noti.confirmWithBtn("Bạn muốn xóa nhân viên "+name+" ?", "Đồng ý", "Không", function(result){if(result) doDelete(phone)});
}

function doDelete(userName) {
    if(!userName) return;
    $.ajax({
        type : 'GET',
        url : URL_DELETE + "?user-name=" + userName,
    }).done(function(data) {
        if (ErrorCode.SUCCESS != data.code) {
            noti.fail("Thông báo!","Xóa nhân viên không thành công", function() { reload() });
            return;
        }
        removeMemberLocal(userName);

    }).fail(function(data) {
        noti.fail("Thông báo!","Có lỗi xảy ra. Xin vui lòng thử lại sau", function() { reload() });
    });
}

function removeMemberLocal(userName) {
    var member = members.filter(function (member) {
        return member.userName == userName;
    })
    var index = members.indexOf(member);
    members.splice(index, 1);
    noti.dialog("Xóa nhân viên thành công", 1.5);
    buildTable(members);
}

function FormMember() {
    this.getName = function() {return $('#member-name').val()};
    this.getGender = function() { return $('input[name=member-gender]:checked').val() };
    this.getPhone = function() { return $('#member-phone').val().trim() };
    this.getEmail = function() { return $('#member-email').val().trim() };
    this.getPass = function() {return $('#member-password').val()};
    this.getConfirmPass = function() {return $('#member-confirmPassword').val()};


    this.reset = function() {
        $('#member-name').val("");
        $('#member-phone').val("");
        $('#member-email').val("");
        $('#member-password').val("");
        $('#member-confirmPassword').val("")
    };

    this.validate = function(){
        if (!this.getPhone() && !this.getPass() && !this.getName() && !this.getConfirmPass() && !this.getEmail()) {
            error.push({message: Error_message.EMPTY_INPUT, id: "member-alert"});
            return error;
        }
        if (this.getName().length < 6 || this.getName().length > 50) {
            error.push({message:"Họ tên hợp lệ có độ dài từ 6 đến 50 ký tự", id: "member-name"});
        }
        if (!this.getEmail()) {
            error.push({message:"Xin vui lòng nhập Email", id: "member-email"});
        }
        if (this.getEmail() && !validateEmail(this.getEmail())) {
            error.push({message:"Email không đúng định dạng", id: "member-email"});
        }
        if (!this.getPhone()) {
            error.push({message:"Xin vui lòng nhập số điện thoại", id: "member-phone"});
        }
        if (this.getPhone() && !validatePhone(this.getPhone())) {
            error.push({message:"Số điện thoại không đúng định dạng", id: "member-phone"});
        }
        if (this.getPass().length < 6 || this.getPass().length > 30) {
            error.push({message:"Mật khẩu hợp lệ có độ dài từ 6 - 30 ký tự", id: "member-password"});
        }
        if (this.getConfirmPass().length < 6 || this.getConfirmPass().length > 30) {
            error.push({message:"Mật khẩu hợp lệ có độ dài từ 6 - 30 ký tự", id: "member-confirmPassword"});
        }
        if (strcmp(this.getPass(), this.getConfirmPass()) != 0 && this.getConfirmPass().length >= 6) {
            error.push({message:"Mật khẩu không khớp. Nhập lại mật khẩu", id: "member-confirmPassword"});
        }
        return error;
    }

    this.getRequest = function() {
        return {
            name: this.getName(),
            username : this.getPhone(),
            phone : this.getPhone(),
            password : this.getPass(),
            email : this.getEmail(),
            gender: this.getGender()
        }
    }

    this.getNewMember = function () {
        return {
            "fullName":this.getName(),
            "userName":this.getPhone(),
            "phone":this.getPhone()
        }
    }
}
