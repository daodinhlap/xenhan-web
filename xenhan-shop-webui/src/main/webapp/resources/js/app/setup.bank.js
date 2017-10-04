var noti = new Notify();

var url_delete = BASE_URL + "/ngan-hang/xoa-ngan-hang?id=";
//==========================================================
function deleteBank(id){
	noti.confirm("Bạn muốn xóa tài khoản ngân hàng này?", 
			function(result){ if(result){ excDelete(id) }});
}

function excDelete(id){
	$.ajax({
		  type: 'GET',
		  contentType : 'application/json',
		  url: url_delete + id,
	}).done(function(data) {
		console.log(JSON.stringify(data));
		if(data.code != ErrorCode.SUCCESS){
			noti.fail("Thông báo",data.message,function(){});
			return;
		}
		noti.dialog(icon_check + "Xóa tài khoản ngân hàng thành công",1);
		setTimeout(() => {
			reload();
		}, 1000);
	  }).fail(function(data) {
		  console.log("Error: " + JSON.stringify(data));
		  noti.fail("Thông báo",Error_message.UNKNOW_ERROR, function(){});
	  });
}
