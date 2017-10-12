var form = new FormRegisterShop();
var noti = new Notify();
var url_register = BASE_URL + "/shop/luu-shop";
//===================================================================================
//Register Shop
function registerShop() {
	if(form.validate().length != 0){
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

function cancelRegisterShop(){
	noti.confirm("<strong>Bạn muốn hủy việc đăng ký Shop?</strong>", function(result) { if (result) { goHome(); }; });
}


function FormRegisterShop() {
    this.name = function() {return $('#name').val()};
    this.phone = function() {return $('#phone').val().trim()};
    this.address = function() { return $('#address').val().trim() };

    this.province = function() {
		return $('#hochiminh:visible').length == 0 ? 1 : 2;
	};
    this.district = function() {
		return $('#hochiminh:visible').length == 0 ? $('#district-hn').val() : $('#district-hcm').val();
	};
    this.email = function() { return $('#email').val().trim() };
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
        if (!this.name()) {
            error.push({message:"Xin vui lòng nhập tên Shop", id: "name"});
        }
        if (!this.phone()) {
            error.push({message:"Xin vui lòng nhập số điện thoại", id: "phone"});
        }
        if (!this.address()) {
            error.push({message:"Xin vui lòng nhập địa chỉ", id: "address"});
        }
        if (!this.province()) {
            error.push({message:"Xin vui lòng nhập Tỉnh/TP", id: "alert"});
        }
        if (!this.district()) {
            error.push({message:"Xin vui lòng nhập Quận/Huyện", id: "alert"});
        }
        return error;
	}
}


