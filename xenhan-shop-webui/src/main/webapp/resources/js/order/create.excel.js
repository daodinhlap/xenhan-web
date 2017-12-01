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
		}
	}
});


$(function() {
	var numberOfOrder = $('#number-of-order').prop('value');
	for (i = 0; i < numberOfOrder; ++i) {
		$('#type-' + i).editable({
			emptytext: '...',
			mode: "inline",
			source: [
				{value: 1, text: 'COD'},
				{value: 2, text: 'Ứng Tiền'}
				]
		});
		$('#package-' + i).editable({
			emptytext: '...',
			mode: "inline",
			source: [
				{value: 1, text: 'Hỏa Tốc'},
				{value: 2, text: 'Tốc Độ'},
				{value: 3, text: 'Tiết Kiệm'}
				]
		});
		$('#good-amount-' + i).editable({
			title: 'Tổng Tiền Hàng',
			mode: "inline",
			emptytext: '...'
		});
		
		$('#coupon-' + i).editable({
			title: 'Mã Giảm Giá',
			mode: "inline",
			emptytext: '...',
			success: function(response, newValue) {
				var index = getIndex(this.id);
				$('#coupon-' + index).css({ 'color': 'black'});
				validate(index);
			}
		});
		$('#address-' + i).editable({
			validate:function(value) {
				if((!value || 0 === value.length)) return 'Xin hãy nhập địa chỉ giao hàng';
			},
			mode: "inline",
			emptytext: '...',
			title: 'Địa Chỉ Giao Hàng'
		});

		$('#name-' + i).editable({
			title: 'Tên Khách Cần Giao Hàng',
			mode: "inline",
			emptytext: '...'
		});

		$('#phone-' + i).editable({
			validate:function(value){
				if((!value || 0 === value.length)) return 'Xin hãy nhập số điện thoại';
			},
			emptytext: '...',
			mode: "inline",
			title: 'Số Điện Thoại Giao Hàng'
		});

        $('#pickupProvince-' + i).editable({
            source: provinces,
            mode: "inline",
            params: function(params) {
                provinces.forEach(function(entry) {
                    if(params.value == entry.value) params.label = entry.text;
                });
                return params;
            },
            success: function(response, newValue) {
                var index = getIndex(this.id);
                $('#pickupDistrict-' + index).editable('option', 'source', districts[newValue]);
                $('#pickupDistrict-' + index).editable('setValue', null);
                $('#pickupProvince-' + index).css({ 'color': 'black'});
                validate(index);
            }
        });

		$('#province-' + i).editable({
			source: provinces,
			mode: "inline",
			params: function(params) {
				provinces.forEach(function(entry) {
					if(params.value == entry.value) params.label = entry.text;
				});
				return params;
			},
			success: function(response, newValue) {
				var index = getIndex(this.id);
				$('#district-' + index).editable('option', 'source', districts[newValue]);
				// var districtsOf = districts[newValue];
				$('#district-' + index).editable('setValue', null);
				$('#province-' + index).css({ 'color': 'black'});
				validate(index);
			}
		});

        $('#pickupDistrict-' + i).editable({
            source: districts[$('#pickupProvince-' + i).attr('data-value')],
            emptytext: '...',
            mode: "inline",
            params: function(params) {
                var id = this.id;
                districts[1].forEach(function(entry) {
                    if(params.value == entry.value) params.label = entry.text;
                });
                if(params.label != null) return params;
                districts[2].forEach(function(entry) {
                    if(params.value == entry.value) params.label = entry.text;
                });
                return params;	x
            },
            success: function(response, newValue) {
                var index = getIndex(this.id);
                validate(index);
            }
        });

		$('#district-' + i).editable({
			source: districts[$('#province-' + i).attr('data-value')],
			emptytext: '...',
			mode: "inline",
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
			},
			success: function(response, newValue) {
				var index = getIndex(this.id);
				validate(index);
			}
		});

		$('#message-' + i).editable({
			title: 'Thông Tin Thêm',
			mode: "inline",
			emptytext: '...'
		});
		
		validate(i);
		
		$('#order-' + (i+1)).on('show.bs.collapse', function () {
			var id = getIndex(this.id);
			$('#card-' + id).css({ 'background-color': '#ddd8c1'});
			collapse(this.id);
			//$(this).siblings('.panel-heading').addClass('active');
		});

		$('#order-' + (i+1)).on('hide.bs.collapse', function () {
			var id = getIndex(this.id);
			$('#card-' + id).css({ 'background-color': 'white'});
			//$(this).siblings('.panel-heading').removeClass('active');
		});
	}
	
});

function collapse(id) {
	var numberOfOrder = $('#number-of-order').prop('value');
	for (i = 0; i < numberOfOrder; ++i) {
		if(id == 'order-' + (i+1)) continue;
		$('#order-' + (i+1)).collapse('hide');
	}
}

function getIndex(text) {
	var idx = text.indexOf('-');
	return text.substring(idx+1);
}

function validate(i) {
	$.ajax({url: "/order-excel/kiem-tra-du-lieu?index=" + i, success: function(result) {
		if(result == null) return;

        $('#pre-fee-' + result.id).text(result.fee);
        $('#fee-' + result.id).text(result.fee);
		$('#coupon-value-' + result.id).text(result.couponValue);
		
		if(!result.error) {
			$('#save-' + result.id).attr('disabled', false);
			$('#order-entity-' + result.id).css({ 'color': 'black'});
			$('#alert-order-' + result.id).text('');
			$('#save-' + result.id).attr('href', '/order-excel/luu-don-tu-excel?index=' + result.id);
			
			disableSaveAll();
			return;
		}
		
		$('#' + result.field + '-' + result.id).css({ 'color': 'red'});
		$('#' + result.field + '-' + result.id).tooltipText = result.message;

		$('#order-entity-' + result.id).css({ 'color': 'red'});

		$('#save-' + result.id).attr('disabled', true);
		$('#save-' + result.id).attr('href', '#');

		$('#alert-order-' + result.id).text(result.message);

		disableSaveAll();
	}});
}

function disableSaveAll() {
	var numberOfOrder = $('#number-of-order').prop('value');
	var errorColor = 'rgb(255, 0, 0)';
	for (i = 0; i < numberOfOrder; ++i) {
		if($('#order-entity-' + i).css('color') != errorColor) continue;
		$('#save-all').attr('disabled', true);
		$('#save-all').attr('href', '#');	
		return;
	}

	$('#save-all').attr('disabled', false);
	$('#save-all').attr('href', '/order-excel/luu-het');
}
