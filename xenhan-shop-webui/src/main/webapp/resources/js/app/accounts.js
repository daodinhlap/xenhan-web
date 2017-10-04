var noti = new Notify();
var form = new FormProfile();

var url_updateInfo = BASE_URL + "/tai-khoan/cap-nhat-ho-so";
var url_authenMethod = BASE_URL + "/tai-khoan/auth-method?method=";
var url_setupPIN = BASE_URL + "/tai-khoan/doi-mat-khau?mode=";

var province_id = "province";
var district_id = "district";
var selectedDistrict = $('select#'+district_id).val();
var selectedProvince = $('select#'+province_id).val();
// ================================================================

$(document).ready(function() {
	//Date picker
	configDatePicker(['dateOfIdentity', 'dateOfBirth']);
	$('#dateOfIdentity').blur(() => {
		$('#dateOfIdentity').next().css({"top":"4px","font-size":"12px","color":"#9f9f9f"});
	})
	$('#dateOfBirth').blur(() => {
		$('#dateOfBirth').next().css({"top":"4px","font-size":"12px","color":"#9f9f9f"});
	})

	// back btn
	$('#btn-edit-profile').click(function(){
		backViewAccount();
	});
	
	// handler change province
	$('select#province').change(function() {
		var province = this.value;
		getPlacesByProvince(province, district_id);
	});
	//handler change authen method
	$('#authen-method').change((e) => {
		setAuthenMethod(e);
	});
	$('#setup-authen').click(() => {
		window.location.href = url_setupPIN + form.authenMethod();
	});
	
	// check is Edit mode
	if($('#isEdit').val() != ""){
		$('#btn-edit-profile').click();
		$('#identityCard').focus();
		$('#isEdit').val("")
	}
});

function updateInfo() {
	if(form.validate().length != 0){
		noti.error(error);
		return;
	}
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_updateInfo,
		data : JSON.stringify(form.request())
	}).done(function(data) {
		console.log(JSON.stringify(data));
		if(data.code != "01"){
			noti.fail("Thông báo",data.message, function(){});
			return;
		}
		noti.dialog(icon_check + "Cập nhật thông tin thành công!", 1);
		setTimeout(() => {
//			reload();
			document.location.href='/tai-khoan/truy-van-tai-khoan';
		}, 1000);
	}).fail(function(data) {
		console.log("Error: " + data);
		noti.fail("Thông báo","Có lỗi xảy ra! Xin vui lòng thực hiện lại", function(){});
	});
}


function setAuthenMethod(e){
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url_authenMethod + form.authenMethod(),
	}).done(function(data) {
		if(data.code != ErrorCode.SUCCESS){
			noti.fail("Thông báo", "Có lỗi khi thay đổi phương thức xác thực giao dịch. Xin vui lòng thử lại", function(){});
			return;
		}
		// go setup PIN
		var hasPIN = e.currentTarget.dataset.pincode;
		if(hasPIN === 'false' && form.authenMethod() === AuthenMethod.PINCODE){
			window.location.href = url_setupPIN + AuthenMethod.PINCODE ;
		}
	}).fail(function(data) {
		console.log("Error: " + data);
	});
}

function backViewAccount(){
	$('#account-view').toggle();
	$('#account-update').toggle();
	getPlaces(province_id, district_id, selectedProvince);
}

function configDatePicker(ids){
	for(i=0; i<ids.length; i++){
		$('#'+ids[i]).datetimepicker({
			locale:'vi',
			useCurrent: false,
			showClear:true,
			ignoreReadonly:true,
			format: 'DD/MM/YYYY',
			maxDate: new Date()
		});
	}
}


// MODEL

function FormProfile (){
	var re = /\D/g;
	var accountNo_ = 'accountNo';
	var fullName_ = 'name';
	var dateOfBirth_ = 'dateOfBirth';
	var email_ = 'email';
	var identityCard_ = 'identityCard';
	var dateOfIdentity_ = 'dateOfIdentity';
	var placeOfIdentity_ = 'placeOfIdentity';
	var address_ = 'address';
	var province_ = 'province';
	var district_ = 'district';
	
	this.accountNo = function(){return $('#'+accountNo_).text()};
	this.authenMethod = function(){return $('#authen-method').is(':checked') ? AuthenMethod.PINCODE : AuthenMethod.OTP  };
	
	this.fullName = function(){return $('#'+fullName_).val()};
	this.gender = function(){return $('[name=gender]:checked').val()};
	this.dateOfBirth = function(){return ISOformat($('#'+dateOfBirth_).val())};
	this.email = function(){return $('#'+email_).val()};
	this.identityCard = function(){return $('#'+identityCard_).val()};
	this.dateOfIdentity = function(){return ISOformat($('#'+dateOfIdentity_).val())};
	this.placeOfIdentity = function(){return $('#'+placeOfIdentity_).val()};
	this.address = function(){return $('#'+address_).val()};
	this.province = function(){return $('select#'+province_).val()};
	this.district = function(){return $('select#'+district_).val()};
	
	this.validate = function(){
		if(this.identityCard()){
			if(this.identityCard().length != 9 && this.identityCard().length != 12){
				error.push({message:"Số CMT không đúng định dạng hoặc có độ dài không hợp lệ", id: identityCard_});
			}
		}
		if(!isEmpty(this.placeOfIdentity()) && (this.placeOfIdentity().length < 2 || this.placeOfIdentity().length > 100)) {
			error.push({message:"Nơi cấp CMT không hợp lệ! Nơi cấp có độ dài từ 2-100 ký tự", id: placeOfIdentity_});
		}
		if(!isEmpty(this.address()) && (this.address().length < 2 || this.address().length > 100)) {
			error.push({message:"Địa chỉ không hợp lệ! Địa chỉ có độ dài từ 2-100 ký tự", id: address_});
		}
		return error;
	}
	
	this.request = function(){
		return {
			fullName : this.fullName(),
			gender: this.gender(),
			birthday: this.dateOfBirth() ? Date.parse(this.dateOfBirth()).getTime() : "",
			email: this.email(),
			identityCard : this.identityCard(),
			dateOfIdentity: this.dateOfIdentity()? Date.parse(this.dateOfIdentity()).getTime() : "",
			placeOfIdentity : this.placeOfIdentity(),
			address: this.address(),
			province : this.province(),
			district : this.district()
		}
	}
	this.requestSetupPin = function(){
		return {
			  accountNo: this.accountNo(),
			  pinCode:"",
			  authenMethod:this.authenMethod()
		}
	}
}
