$('.editable').editable('toggleDisabled');
$('#enable').click(function() {
       $('.editable').editable('toggleDisabled');
});

$(function() {
		// $('#name').editable();
		$('#name').editable({
			title: 'Họ Tên', 
	        validate: function(value) {
	            if(value == '') return 'Xin Hãy Nhập Tên!'; 
	        },
	        error: function(response, newValue) {
	        	if(response.status === 500) {
	                return 'Service unavailable. Please try later.';
	            } else {
	               alert(response.responseText);
	            }
			},
			success: function(response, newValue) {
				alert(reponse + ' : ' + newValue);
			}
		});

    	$('#email').editable();
    	$('#gender').editable({
			source:[{value: 1, text: 'Nam'}, {value: 2, text: 'Nữ'}]
		});
    	$('#address').editable();
		$('#province').editable({
			source: provinces,
			params: function(params) {
				provinces.forEach(function(entry) {
					if(params.value == entry.value) params.label = entry.text;
				});
				return params;
			},
			// success: function(response, newValue) {
			// 	var id = this.id;
			// 	var idx = id.indexOf('-');
			// 	id = id.substring(idx+1);
			// 	$('#district-' + id).editable('option', 'source', districts[newValue]);
			// 	$('#district-' + id).editable('setValue', null);
			// }
		});


		$('#district').editable({
			source: districts[$('#province').attr('data-value')],
			params: function(params) {
				districts[1].forEach(function(entry) {
					if(params.value == entry.value) params.label = entry.text;
					console.log(entry.value + ' : '+ entry.text);
				});
				if(params.label != null) return params;
				districts[2].forEach(function(entry) {
					if(params.value == entry.value) params.label = entry.text;
					console.log(entry.value + ' : '+ entry.text);
				});
				return params;
			}
		});
    	$('#placeOfBirth').editable();
    	$('#dateOfBirth').editable({
            format: 'dd-mm-yyyy',
            viewformat: 'dd/mm/yyyy',
            datepicker: {
                autoclose:true,
                clearBtn:true,
                language:'vi',
                maxDate: new Date()
            }
        });
    	$('#identityCard').editable();
        $('#dateOfIdentity').editable({
            format: 'dd-mm-yyyy',
            viewformat: 'dd/mm/yyyy',
            datepicker: {
                autoclose:true,
                clearBtn:true,
                locale:'vi',
                maxDate: new Date()
            }
        });
    	$('#facebook').editable();

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
