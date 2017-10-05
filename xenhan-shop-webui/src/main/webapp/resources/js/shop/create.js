var form = new FormRegisterShop();
var noti = new Notify();
var url_register = BASE_URL + "/shop/luu-shop";
//===================================================================================
//Register Shop
function registerShop() {
	var hasError = form.validate();
	if(hasError ==  undefined || hasError.length != 0){
		noti.error(error);
		return;
	}

	console.log(JSON.stringify(form.requestRegisterShop()));

	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_register,
		data : JSON.stringify(form.requestRegisterShop()),
		dataType : 'text'
	}).done(function(data) {
		if (data != 'done') {
			error.push({message: data, id: "alert"});
			return;
		} 
		window.location.replace('/');
	}).fail(function(data) {
		console.log(data);
		noti.fail("Thông báo!","Đăng ký không thành công. Vui lòng thử lại sau", function() { reload() });
	});
}

function cancleRegisterShop(){
	noti.confirm("<strong>Bạn muốn hủy việc đăng ký Shop?</strong>", function(result) { if (result) { goHome(); }; });
}

function validate(address, phone) {
	if (!address && !phone) {
		error.push({message: Error_message.EMPTY_INPUT, id: "alert"});
		return error;
	}
	if (!phone) {
		error.push({message:"Xin vui lòng nhập số điện thoại", id: "phone"});
	}
	return error;
}

function FormRegisterShop() {
	this.name = function() {return $('#name').val()};
	this.address = function() { return $('#address').val().trim() };
	this.province = function() {
		return $('#hochiminh:visible').length == 0 ? 1 : 2;
	};
	this.district = function() {
		return $('#hochiminh:visible').length == 0 ? $('#district-hn').val() : $('#district-hcm').val();
	};
	this.email = function() { return $('#email').val().trim() };
	this.phone = function() {return $('#phone').val()};
	this.website = function() {return $('#website').val()};

	this.requestRegisterShop = function() {
		return {
			shopName : this.name(),
			fullName : this.name(),
			address : this.address(),
			phone : this.phone(),
			email : this.email(),
			website : this.website(),
			town : {
				id: this.province(),
				district : {
					id : this.district()
				}
			}
		}
	}

	this.validate = function() {
		return validate(this.address(), this.phone());
	}
}
