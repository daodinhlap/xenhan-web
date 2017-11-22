var form = new FormRegister();
var noti = new Notify();
//URL
var url_login = BASE_URL + "/login";
var url_register = BASE_URL + "/tao-tai-khoan-nguoi-dung";
//===================================================================================
//ON LOAD
$(document).ready(function() {
    $('#phone').keypress(function(event) {
        if (event.keyCode == 13 || event.which == 13) {
            $('#password').focus();
        }
    });
    $('#password').keypress(function(event) {
        if (event.keyCode == 13 || event.which == 13) {
            loginXenhan();
        }
    });
    form.setPhone("");
    form.setPass("");

    //forgot pass
    $("#forgotPassword").click(function(){
        noti.fail("Thông báo","Xin vui lòng liên hệ<br>" +
			"Hà Nội: <b>02471099710</b> (nhánh 2)<br>" +
			"Hồ Chí Minh: <b>02871099710</b> (nhánh 3)<br> " +
			"để được hỗ trợ",
			function(){});
    });
});

//Register xenhan user
function registerXenhan() {
    $("#btn-register").attr("disabled","disabled");
	var hasError = form.validate();
	if(hasError ==  undefined || hasError.length != 0){
		noti.error(error);
        $("#btn-register").removeAttr("disabled");
		return;
	}

	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_register,
		data : JSON.stringify(form.requestRegister()),
		dataType : 'text'
	}).done(function(data) {
		if (data != 'done') {
            if(handlerError(data)) return;
			error.push({message: data, id: "alert"});
            noti.error(error);
			return;
		} 
		window.location.replace('/thanh-cong?phone=' + form.phone());
	}).fail(function(data) {
		console.log(data);
		noti.fail("Thông báo!","Đăng ký không thành công. Vui lòng thử lại sau", function() { reload() });
	}).always(function () {
        $("#btn-register").removeAttr("disabled");
    });
}

function handlerError(data){
    if(!data.includes("Đã tồn tại user:")) return;

    var message = "Bạn đã có tài khoản HomeDirect tại dịch vụ: <br>";
    var DOMAIN_XENHAN = "XENHAN";
    var DOMAIN_PAYDEE = "PayDee";

    if(data.includes(DOMAIN_XENHAN)) message += "<strong>Xe Nhàn</strong><br>";
    if(data.includes(DOMAIN_PAYDEE)) message += "<strong>Mtop</strong><br>";

    message += "Xin vui lòng đăng nhập bằng tài khoản đã có!<br>"
	message += "<div class='center '><a href='/dang-nhap'><button class='btn btn-success btn-xenhan'>Đăng nhập</button></a></div>";

	noti.fail("Thông báo", message, function () {
        window.location.replace('/dang-nhap');
    })
	return true;
}


//Login Xenhan
function loginXenhan() {
	var phone = form.phone();
	var pass = form.password();
	if (isEmpty(phone) || isEmpty(pass)) {
		error.push({message: Error_message.EMPTY_INPUT, id: "alert"});
		noti.error(error);
		return;
	}
	if (!validatePhone(phone.trim().replace(/ /g,""))) {
		error.push({message: "Vui lòng nhập lại số điện thoại của bạn", id: "alert"});
		noti.error(error);
		return;
	}
	$.ajax({
		type : 'POST',
		url : '/login',
		data : 'username='+ phone + '&password=' + pass,
	}).done(function(data) {
		window.location.href = '/';
	}).fail(function(data) {
		window.location.href = '/';
	});

}

function cancleRegister(){
	noti.confirm("<strong>Bạn muốn hủy việc đăng ký ?</strong>",
			function(result) {
		if (result) { goHome(); };
	});
}

function validate(name, email, phone, password, confirmPass) {
	if (!phone && !password && !name && !confirmPass) {
		error.push({message: Error_message.EMPTY_INPUT, id: "alert"});
		return error;
	}
	if (name.length < 6 || name.length > 50) {
		error.push({message:"Họ tên hợp lệ có độ dài từ 6 đến 50 ký tự", id: "name"});
	}
    if (!email) {
        error.push({message:"Xin vui lòng nhập Email", id: "email"});
    }
    if (email && !validateEmail(email)) {
        error.push({message:"Email không đúng định dạng", id: "email"});
    }
	if (!phone) {
		error.push({message:"Xin vui lòng nhập số điện thoại", id: "phone"});
	}
	if (!validatePhone(phone) && phone) {
		error.push({message:"Số điện thoại không đúng định dạng", id: "phone"});
	}
	if (password.length < 6 || password.length > 30) {
		error.push({message:"Mật khẩu hợp lệ có độ dài từ 6 - 30 ký tự", id: "password"});
	}
	if (confirmPass.length < 6 || confirmPass.length > 30) {
		error.push({message:"Mật khẩu hợp lệ có độ dài từ 6 - 30 ký tự", id: "confirmPassword"});
	}
	if (strcmp(password, confirmPass) != 0 && confirmPass.length >= 6) {
		error.push({message:"Mật khẩu không khớp. Nhập lại mật khẩu", id: "confirmPassword"});
	}
	return error;
}

function FormRegister() {
	this.name = function() {return $('#name').val()};
	this.phone = function() { return $('#phone').val().trim() };
	this.email = function() { return $('#email').val().trim() };
	this.gender = function() { return $('input[name=gender]:checked').val() };
	this.password = function() {return $('#password').val()};
	this.confirmPass = function() {return $('#confirmPassword').val()};
	this.otp = function() {return $('#otp').val()};

	this.setPhone = function(value){ $('#phone').val(value) };
	this.setPass = function(value){ $('#password').val(value) };

	this.requestRegister = function() {
		return {
			username : this.phone(),
			phone : this.phone(),
			email : this.email(),
			gender : this.gender(),
			name : this.name(),
			password : this.password()
		}
	}
	this.requestLogin = function() {
		return {
			username : this.phone(),
			password : md5(this.password())
		}
	}
	this.validate = function() {
		return validate(this.name(),this.email(), this.phone(), this.password(), this.confirmPass());
	}
}
