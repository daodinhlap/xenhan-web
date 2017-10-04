var noti = new Notify();
var form = new FormBank();
var referrer = document.referrer;
// URL
var url_addBank = BASE_URL + "/ngan-hang/them-ngan-hang";
var url_updateBank = BASE_URL + "/ngan-hang/cap-nhat-ngan-hang";

//===================================================================================
function submit(id){
	var url = url_addBank;
	var message = "Thêm tài khoản ngân hàng thành công";
	if(id){ 
		url = url_updateBank;
		message = "Cập nhật tài khoản ngân hàng thành công";
	}
	if(form.validate().length != 0){
		noti.error(error);
		return;
	}
	noti.cleanError();
	

	$.ajax({
		  type: 'POST',
		  contentType : 'application/json',
		  url: url,
		  data: JSON.stringify(form.request())
	}).done(function(data) {
		console.log(JSON.stringify(data));
		if(data.code != ErrorCode.SUCCESS){
			noti.fail("Thông báo",data.message,function(){});
			return;
		}
		noti.dialog(icon_check + message, 1);
		setTimeout(() => {
			window.location.assign(referrer);
		}, 1000);
	  }).fail(function(data) {
		  console.log("Error: " + JSON.stringify(data));
		  noti.fail("Thông báo",Error_message.UNKNOW_ERROR, function(){});
	  });
}

function FormBank (){
	this.id =  function(){return $('#id').val()};
	this.bankId = function(){return $('input[name=bank]:checked').val()};
	this.branchName = function(){return $('#branchName').val()};
	this.bankAccountName = function(){return $('#bankAccountName').val()};
	this.bankAccount = function(){return $('#bankAccount').val()};
	this.isDefault = function(){return $('#isDefault').is(':checked') ? 1 : 0  };
	
	
	this.validate = function (){
		return validate (this.bankId(), this.branchName(), this.bankAccountName(), this.bankAccount());
	}
	this.request = function(){
		return {
			id: Number(this.id()),
			bankId : this.bankId(),
			branchName: this.branchName(),
			bankAccountName: this.bankAccountName(),
			bankAccount : this.bankAccount(),
			isDefault: this.isDefault()
		}
	}
}

function validate (bankId, branchName, bankAccountName, bankAccount) {
	if(!bankId || !branchName || !bankAccountName || !bankAccount){
		error.push({message:Error_message.EMPTY_INPUT, id: "alert"});
	}
	return error;
}
//str= str.toLowerCase();
//str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
//str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
//str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
//str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
//str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
//str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
//str= str.replace(/đ/g,"d");
//str= str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g,"-");
//str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
//str= str.replace(/^\-+|\-+$/g,"");//cắt bỏ ký tự - ở đầu và cuối chuỗi