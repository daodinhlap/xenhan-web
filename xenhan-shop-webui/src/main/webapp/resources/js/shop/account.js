var noti = new Notify();
var form = new Form();
var URL_CHANGE_PASS = BASE_URL + "/shop/change-password";
// =====================================================
function changePassword() {

    if(form.validate().length != 0){
        noti.error(error);
        return;
    }

    var url = URL_CHANGE_PASS;
    url += "?old-password=" + form.password();
    url += "&new-password=" + form.newPassword();

    $.ajax({
        type : 'GET',
        url : url,
    }).done(function(data) {
        console.log(data);
        if(data.code == ErrorCode.NOT_MATCH_OLD_PASS){
            noti.error([{id:"alert", message: "Mật khẩu cũ không đúng"}]);
            return;
        }
        if(data.code != ErrorCode.SUCCESS){
            noti.error([{id:"alert", message: data.message}]);
            return;
        }
        noti.ok("Thông báo","Đổi mật khẩu thành công !", function () { goHome(); })

    }).fail(function(data) {
        console.log("ERROR: " + JSON.stringify(data));
    }).always(function(){
    });


}

// MODEL
function Form(){
    this.password = function(){ return $('#old-password').val()};
    this.newPassword = function(){ return $('#new-password').val()};
    this.confirmPassword = function(){ return $('#confirm-password').val()};


    this.validate = function (){
        noti.cleanError();
        if(!this.password()){
            error.push({message: Error_message.EMPTY_PASSWORD, id: "old-password"});
        }
        if(!this.newPassword()){
            error.push({message: Error_message.EMPTY_PASSWORD, id: "new-password"});
        }
        if(!this.confirmPassword()){
            error.push({message: Error_message.EMPTY_PASSWORD, id: "confirm-password"});
            return error;
        }
        if(!(this.newPassword() == this.confirmPassword())){
            error.push({message: Error_message.CONFIRM_PASS_NOT_MATCH, id: "confirm-password"});
        }
        return error;
    }
}


// $('.editable').editable();
// $('#enable').click(function() {
//        $('.editable').editable('toggleDisabled');
// });
$(function() {
    // $('#name').editable();
    $('#name').editable({
        mode:"inline",
        validate: function(value) {
            if(value == '') return 'Xin Hãy Nhập Tên!';
        },
        error: function(response, newValue) {
            if(response.status === 500) {
                return 'Service unavailable. Please try later.';
            } else {
               alert(response.responseText);
            }
        }
    });

    $('#email').editable({mode:"inline",});
    $('#gender').editable({
        mode:"inline",
        source:[{value: 1, text: 'Nam'}, {value: 2, text: 'Nữ'}]
    });
    $('#address').editable({mode:"inline",});
    // $('#province').editable({
    // 	source: provinces,
    // 	params: function(params) {
    // 		provinces.forEach(function(entry) {
    // 			if(params.value == entry.value) params.value = entry.text;
    // 		});
    // 		return params;
    // 	},
    // 	success: function(response, newValue) {
    // 	    alert(newValue);
    // 		$('#district').editable('option', 'source', districts[newValue]);
    // 		$('#district').editable('setValue', null);
    // 	}
    // });

    var province = $('#province').attr("data-value");
    $('#district').editable({
        mode:"inline",
        source: districts[province],
        params: function(params) {
            districts[province].forEach(function(entry) {
                if(params.value == entry.value) params.value = entry.text;
            });
            return params;
        }
    });
    $('#placeOfBirth').editable({mode:"inline",});
    $('#birthDay').editable({
        format:"dd/mm/yyyy",
        viewformat:"dd/mm/yyyy"
    });
    $('#identityCard').editable({mode:"inline",});
    $('#dateOfIdentity').editable({
        format:"dd/mm/yyyy",
        viewformat:"dd/mm/yyyy"
    });
    $('#facebook').editable({mode:"inline",});

    // SHOP PROFILE
    $('#shopName').editable({
        mode:"inline",
        validate: function(value) {
            if(!value) return 'Xin hãy nhập Tên Shop';
        }
    }); // require
    $('#shopAddress').editable({
        mode:"inline",
        validate: function(value) {
            if(!value) return 'Xin hãy nhập địa chỉ Shop';
        }
    });// require
    var shopProvince = $('#shopProvince').attr("data-value");
    $('#shopDistrict').editable({
        mode:"inline",
        source: districts[shopProvince],
        validate: function(value) {
            if(!value) return 'Xin hãy nhập quận/huyện';
        }
    });// require
    $('#shopPhone').editable({
        mode:"inline",
        validate: function(value) {
            if(!value) return 'Xin hãy nhập SĐT shop';
        }
    });// require
    $('#shopEmail').editable({mode:"inline",});
    $('#shopWebsite').editable({mode:"inline",});


});

var provinces = [{value: 1, text: 'Hà Nội'},{value: 2, text: 'Hồ Chí Minh'}];

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

