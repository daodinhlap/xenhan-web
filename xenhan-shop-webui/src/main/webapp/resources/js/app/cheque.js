var page = new Page(0,1);
var noti = new Notify();
var form = new FormCheque();
// URL
var url_getResult = BASE_URL + "/giao-dich/ket-qua-mua-ma-the?requestId=";
var url_cheque = BASE_URL + "/tai-khoan/xem-sao-ke";
// =======================================================================

function cheque(pageNumber){
	var pageNumber = pageNumber == undefined? 1: pageNumber;
	if(!form.validate()) return;
	
	var request = form.chequeRequest();
	request["pageNumber"] = pageNumber;
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url_cheque,
		data: JSON.stringify(request),
		dataType: "html"
	}).done(function(data) {
		$('#area-table-cheque').empty();
		$('#area-table-cheque').html(data);
	}).fail(function(data){
		console.log("Error: " + JSON.stringify(data));
	}).always(function(){
		page.set($('#pageNumber').text(), $('#pageAvailble').text());
		handlerClickRow();
	});
	
}

function previousPage(){
	pageIndex = page.pageNumber - 1;
	if(pageIndex <= 0) return;
	cheque(pageIndex);
}
function nextPage(){
	pageIndex = page.pageNumber + 1;
	if(pageIndex > page.pageAvailble) return;
	cheque(pageIndex);
}

function getBuyCardResult(requestId, tableId) {
	if(!requestId) return;
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url_getResult + requestId,
	}).done(function(data) {
				console.log(JSON.stringify(data));
				// bind to view table
				var id_card,id_serial = "";
				
				$('table#listCard-' + tableId).empty();
				$.each(data, function(idx, value) {
					id_card = "copy_card_" + tableId + page.pageNumber + idx;
					id_serial = "copy_serial_" + tableId + page.pageNumber + idx;
					$('table#listCard-' + tableId)
						.append($('<tr>')
								.append($("<td rowspan='2' class='td-list-card'><button class='btn-list-card'>"+(idx+1)+"</button></td>"+
											"<td>Mã nạp tiền</td>" +
											"<td  align='right'><a id='"+id_card+"'>"+value.cardCode+"</a></td>")))
						.append($('<tr>')
								.append($("<td>Số serial</td>" +
											"<td  align='right'><a id='"+id_serial+"'>"+value.cardSerial+"</a></td>")));
				});
				
				$('#tableListCard-'+tableId).show();
				requestId = "";
	}).fail(function(data) {
		console.log("Error: " + JSON.stringify(data));
		noti.fail("Thông báo", Error_message.UNKNOW_ERROR,function(){});
	}).always(function(){
		handlerCopyCard();
	});
}

function handlerClickRow(){
	var detail_id = "";
	var speed = 200;
	$("tbody > tr").click(function(){
		$("#btn-back-cheque").toggle(speed,"swing");
		
		detail_id = $(this).data("detail");
		var request_id = $(this).data("requestid");
		var index_id = $(this).data("index");
		if(request_id){
			getBuyCardResult(request_id, index_id);
		}
		
		$("#chequeTable").toggle(speed,"swing");
		$("#"+detail_id).toggle(speed,"swing");
	});
	
	$("#btn-back-cheque").click(function(){
		$("#chequeTable").toggle(speed,"swing");
		$("#"+detail_id).toggle(speed,"swing");
		$("#btn-back-cheque").toggle(speed,"swing");
	});
	
}
function exportTable(idTable){
	$("#"+idTable).tableExport(
			{
				headings : true,
				footers : true,
				formats : [ "xlsx"],
				fileName : "DANH-SACH-THE",
				position : "top",
			},  true);
	setTimeout(() => {
		$("#"+idTable).find("caption").find("button")[0].click();
	}, 200);
}
// ON LOADED
$(document).ready(function($) {
	//Date picker
	configDatePicker(['fromDate', 'toDate']);
	
	// search page 1
	cheque(1);
	
	$('#btn-filter-cheque').click(function(){
		$('#area-input-cheque').toggle(200,"swing");
	});
});

function configDatePicker(ids){
	for(i=0; i<ids.length; i++){
		$('#'+ids[i]).datetimepicker({
			locale:'vi',
			showClear:true,
			ignoreReadonly:true,
			useCurrent: false,
			maxDate: new Date()
		});
	}
}

// MODEL
function Page(pageNumber, pageAvailble){
	this.pageNumber = Number(pageNumber);
	this.pageAvailble = Number(pageAvailble);
	this.set = function(pageNumber, pageAvailble){
		this.pageNumber = Number(pageNumber);
		this.pageAvailble = Number(pageAvailble);
	}
}

function FormCheque(){
	this.accountNo = function(){ return $('#accSource').val()};
	this.fromDate = function(){ return $('#fromDate').val()};
	this.toDate = function(){ return $('#toDate').val()};
	
	this.status = function(){ return $('#status').val()};
	this.transId = function(){ return $('#transId').val()};
	this.type = function(){ return $('#type').val()};
	
	this.validate= function(){
		return validate(this.fromDate(), this.toDate());
	}
	
	this.chequeRequest = function(){
		return {
			accountNo: this.accountNo(),
			fromDate: parseDateInTime(this.fromDate()),
			toDate: parseDateInTime(this.toDate()),
			transId: this.transId(),
			type:this.type()
		}
	}
}
function validate(fromDate, toDate) {
	if(fromDate && toDate){
		if(parseDateInTime(fromDate) > parseDateInTime(toDate)){
			noti.fail("Thông báo","Bạn cần phải nhập ngày bắt đầu nhỏ hơn hoặc bằng ngày kết thúc",function(){});
			return false;
		}
		if(parseDateInTime(fromDate) > new Date()){
			noti.fail("Thông báo","Bạn cần phải nhập ngày bắt đầu nhỏ hơn hoặc bằng ngày hiện tại",function(){});
			return  false;
		}
	}
	return true;
}

function parseDateInTime(str_date){
	var idx_space = str_date.indexOf(" ");
	var date = str_date.substring(0, idx_space);
	
	var time = str_date.substring( idx_space + 1);
	var hours = time.substring(0, time.indexOf(":"));
	var minute = time.substring(time.indexOf(":") + 1);
	
	var date_result = Date.parse(ISOformat(date));
	if (!date_result) return "";
	date_result.setHours(hours);
	date_result.setMinutes(minute)
	return date_result.getTime(); 
}
