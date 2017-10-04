var url_places = BASE_URL + "/place/get-places";
var url_province = BASE_URL + "/place/get-place-by-province?province=";
var url_withdraw_province = BASE_URL + "/place/get-district-withdraw-by-province?province=";

function getPlaces(province_id, district_id, selectedProvince){
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url_places
	}).done(function(data) {
		
		var data_province = [];
		$.each(data.data, function(idx, value) {
			data_province.push({id: value.name, text: value.name});
		});	
		
		$("#" + province_id).select2({
			data: data_province,
			placeholder: "Chọn Tỉnh/Thành Phố",
			allowClear: true
		});
		if(!selectedProvince) selectedProvince = "Hà Nội"; 
		getPlacesByProvince(selectedProvince, district_id);
		
	}).fail(function(data) {
		console.log("Error: " + data);
	});
}

function getPlacesByProvince(province, district_id){
	$('select#' + district_id + ' option').remove();
	if(!province){return;}
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url_province + province
	}).done(function(data) {
		var data_district = [];
		$.each(data.data, function(idx, value) {
			data_district.push({id: value.name, text: value.name});
		});
		$("#"+district_id).select2({
			data: data_district,
			placeholder: "Chọn Quận/Huyện",
			allowClear: true
		});
		$("#"+ district_id).val(selectedDistrict).trigger('change');
		
		
	}).fail(function(data) {
		console.log("Error: " + data);
	});
}

function getPlacesWithdrawByProvince(province, district_id){
	$('select#' + district_id + ' option').remove();
	if(!province){return;}
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : url_withdraw_province + province
	}).done(function(data) {
		var data_district = [];
		$.each(data.data, function(idx, value) {
			data_district.push({id: value, text: value});
		});
		$("#"+district_id).select2({
			data: data_district,
			placeholder: "Chọn Quận/Huyện",
			allowClear: true
		});
		$("#"+ district_id).val(selectedDistrict).trigger('change');
		
		
	}).fail(function(data) {
		console.log("Error: " + data);
	});
}