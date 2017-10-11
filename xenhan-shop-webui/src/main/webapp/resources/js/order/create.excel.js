$('#fine-uploader-gallery').fineUploader({
	template: 'qq-template-excel',
	request: {
		endpoint: '/order-excel/nhap-don-tu-excel'
	},
	validation: {
		allowedExtensions: ['xlsx', 'xls']
	},
	callbacks: {
		onComplete: function(id, name, response) {
			if(response['success'] != true) return;
			location.reload();
			//setInterval(window.location.replace('/shop/danh-sach-don-tu-excel'), 1*1000);
		}
	}
});


$(function() {
	var numberOfOrder = $('#number-of-order').prop('value');
	for (i = 0; i < numberOfOrder; ++i) {
		$('#type-' + i).editable({
			source: [
				{value: 1, text: 'COD'},
				{value: 2, text: 'Ứng Tiền'}
				]
		});
		$('#package-' + i).editable({
			source: [
				{value: 1, text: 'Hỏa Tốc'},
				{value: 2, text: 'Tốc Độ'},
				{value: 3, text: 'Tiết Kiệm'}
				]
		});
		$('#good-amount-' + i).editable({
			title: 'Tổng Tiền Hàng'
		});
		$('#coupon-' + i).editable({
			title: 'Mã Giảm Giá',
			success: function(response, newValue) {
				var index = getIndex(this.id);
				$('#coupon-' + index).css({ 'color': 'black'});
				validate(index);
			}
		});
		$('#address-' + i).editable({
			validate:function(value){
				if((!value || 0 === value.length)) return 'Xin hãy nhập địa chỉ giao hàng';
			},
			title: 'Địa Chỉ Giao Hàng'
		});

		$('#name-' + i).editable({
			title: 'Tên Khách Cần Giao Hàng'
		});

		$('#phone-' + i).editable({
			validate:function(value){
				if((!value || 0 === value.length)) return 'Xin hãy nhập số điện thoại';
			},
			title: 'Số Điện Thoại Giao Hàng'
		});


		$('#province-' + i).editable({
			source: provinces,
			params: function(params) {
				provinces.forEach(function(entry) {
					if(params.value == entry.value) params.label = entry.text;
				});
				return params;
			},
			success: function(response, newValue) {
				var index = getIndex(this.id);
				$('#district-' + index).editable('option', 'source', districts[newValue]);
				$('#district-' + index).editable('setValue', null);
				$('#province-' + index).css({ 'color': 'black'});
				validate(index);
			}
		});


		$('#district-' + i).editable({
			source: districts[$('#province-' + i).attr('data-value')],
			params: function(params) {
				var id = this.id;
				districts[1].forEach(function(entry) {
					if(params.value == entry.value) params.label = entry.text;
					//console.log(entry.value + ' : '+ entry.text);
				});
				if(params.label != null) return params;
				districts[2].forEach(function(entry) {
					if(params.value == entry.value) params.label = entry.text;
					//console.log(entry.value + ' : '+ entry.text);
				});
				return params;
			}
		});

		$('#message-' + i).editable({
			title: 'Thông Tin Thêm'
		});
		validate(i);

	}
});

function getIndex(text) {
	var idx = text.indexOf('-');
	return text.substring(idx+1);
}

function validate(i) {
	$.ajax({url: "/order-excel/kiem-tra-du-lieu?index=" + i, success: function(result) {
		if(result == null) return;
		
		if(!result.error) {
			$('#save-' + result.id).attr('disabled', false);
			$('#order-entity-' + result.id).css({ 'color': 'black'});
			$('#alert-order-' + result.id).text('');
			$('#save-' + result.id).attr('href', '/order-excel/luu-don-tu-excel?result.id=' + result.id);
			
			$('#save-all').attr('disabled', false);
			$('#save-all').attr('href', '/order-excel/luu-het');
			return;
		}
		
		$('#' + result.field + '-' + result.id).css({ 'color': 'red'});
		$('#' + result.field + '-' + result.id).tooltipText = result.message;

		$('#order-entity-' + result.id).css({ 'color': 'red'});

		$('#save-' + result.id).attr('disabled', true);
		$('#save-' + result.id).attr('href', '#');
		
		$('#alert-order-' + result.id).text(result.message);

		$('#save-all').attr('disabled', true);
		$('#save-all').attr('href', '#');
		
	}});
}

$('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
  });

  $('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
  });

var provinces = new Array({value: 1, text: 'Hà Nội'},
		{value: 2, text: 'Hồ Chí Minh'});

var districts = {
		1: [{value:3, text: 'Ba Đình'}, 
			{value:10, text: 'Bắc Từ Liêm'},
			{value: 6, text: 'Cầu Giấy'},
			{value: 4, text: 'Đống Đa'},
			{value: 2, text: 'Hai Bà Trưng'},
			{value: 1, text: 'Hoàn Kiếm'},
			{value: 9, text: 'Hoàng Mai'},
			{value: 29, text: 'Hà Đông'},
			{value: 12, text: 'Gia Lâm'},
			{value: 8, text: 'Long Biên'},
			{value: 11, text: 'Nam Từ Liêm'},
			{value: 7, text: 'Tây Hồ'},
			{value: 5, text: 'Thanh Xuân'},
			{value: 15, text: 'Thanh Trì'},

			{value: 25, text: 'Ba Vì'},
			{value: 13, text: 'Đông Anh'},
			{value: 28, text: 'Mê Linh'},
			{value: 20, text: 'Mỹ Đức'},
			{value: 23, text: 'Hoài Đức'},
			{value: 21, text: 'Chương Mỹ'},
			{value: 18, text: 'Phú Xuyên'},
			{value: 26, text: 'Phúc Thọ'},
			{value: 16, text: 'Quốc Oai'},
			{value: 14, text: 'Sóc Sơn'},
			{value: 30, text: 'Sơn Tây'},
			{value: 24, text: 'Thanh Oai'},
			{value: 17, text: 'Thường Tín'},
			{value: 27, text: 'Thạch Thất'},
			{value: 22, text: 'Đan Phượng'},
			{value: 19, text: 'Ứng Hòa'}], 

			2: [{value: 31, text: 'Quận 1'}, 
				{value: 32, text: 'Quận 2'},
				{value: 33, text: 'Quận 3'},
				{value: 34, text: 'Quận 4'},
				{value: 35, text: 'Quận 5'},
				{value: 36, text: 'Quận 6'},
				{value: 37, text: 'Quận 7'},
				{value: 38, text: 'Quận 8'},
				{value: 39, text: 'Quận 9'},
				{value: 40, text: 'Quận 10'},
				{value: 41, text: 'Quận 11'},
				{value: 42, text: 'Quận 12'},

				{value: 51, text: 'Bình Chánh'},
				{value: 44, text: 'Bình Thạnh'},
				{value: 48, text: 'Bình Tân'},
				{value: 53, text: 'Cần Giờ'},
				{value: 49, text: 'Củ Chi'},
				{value: 43, text: 'Gò Vấp'},
				{value: 50, text: 'Hóc Môn'},
				{value: 52, text: 'Nhà Bè'},
				{value: 47, text: 'Phú Nhuận'},
				{value: 54, text: 'Thủ Đức'},
				{value: 45, text: 'Tân Bình'},
				{value: 46, text: 'Tân Phú'}] 
};


