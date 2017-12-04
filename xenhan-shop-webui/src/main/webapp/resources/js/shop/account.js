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

$(function() {
    $('#name').editable({
        emptytext: "...",
        mode: "inline",
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

    $('#email').editable({
        mode: "inline",
        emptytext : "...",
        validate: function(value) {
            if(!value) return 'Xin hãy nhập email';
        }
    });
    
    $('#gender').editable({
        mode:"inline",
        emptytext: '...',
        source:[{value: 1, text: 'Nam'}, {value: 2, text: 'Nữ'}]
    });

    $('#address').editable({mode: "inline",  emptytext: '...'});
    
    $('#province').editable({
        mode:"inline",
    	source: provinces,
        savenochange: true,
        emptytext : "...",
    	params: function(params) {
    		provinces.forEach(function(entry) {
    			if(params.value == entry.value) params.value = entry.text;
    		});
    		return params;
    	},
    	success: function(response, newValue) {
    		// $('#district').editable('option', 'source', districts[newValue]);
    		// $('#district').editable('setValue', null);
            $('#district').editable("destroy");
            $('#district').editable({
                mode: "inline",
                emptytext: '...',
                source: districts[newValue],
                params: function(params) {
                    districts[newValue].forEach(function(entry) {
                        if(params.value == entry.value) params.value = entry.text;
                    });
                    return params;
                }
            });
            $('#district').editable('setValue', null);
    	}
    });

    var province = $('#province').attr("data-value");
    $('#district').editable({
        mode: "inline",
        emptytext: '...',
        source: districts[province],
        params: function(params) {
            districts[province].forEach(function(entry) {
                if(params.value == entry.value) params.value = entry.text;
            });
            return params;
        }
    });

    $('#placeOfBirth').editable({ mode: "inline", emptytext: "..."});
    
    $('#birthDay').editable({
        emptytext: "...",
        format: "dd/mm/yyyy",
        viewformat: "dd/mm/yyyy"
    });
    
    $('#identityCard').editable({ mode: "inline", emptytext: "..."});
    
    $('#dateOfIdentity').editable({
        emptytext: "...",
        format: "dd/mm/yyyy",
        viewformat: "dd/mm/yyyy"
    });
    $('#facebook').editable({mode:"inline", emptytext:"..."});

    // SHOP PROFILE
    $('#shopName').editable({
        mode: "inline",
        emptytext: '...',
        validate: function(value) {
            if(!value) return 'Xin hãy nhập Tên Shop';
        }
    }); // require
    
    $('#shopAddress').editable({
        mode: "inline",
        emptytext: '...',
        validate: function(value) {
            if(!value) return 'Xin hãy nhập địa chỉ Shop';
        }
    });// require
    $('#shopProvince').editable({
        mode:"inline",
        source: provinces,
        emptytext : "...",
        success: function(response, newValue) {
            $('#shopDistrict').editable('option', 'source', districts[newValue]);
            $('#shopDistrict').editable('setValue', null);
        },
        validate: function(value) {
            if(!value) return 'Xin hãy nhập Tỉnh/TP';
        }
    });
    
    var shopProvince = $('#shopProvince').attr("data-value");
    $('#shopDistrict').editable({
        mode: "inline",
        emptytext: '...',
        source: districts[shopProvince],
        validate: function(value) {
            if(!value) return 'Xin hãy nhập quận/huyện';
        }
    });// require
    
    $('#shopPhone').editable({
        mode: "inline",
        emptytext: '...',
        validate: function(value) {
            if(!value) return 'Xin hãy nhập SĐT shop';
            if(value && !validatePhone(value)) return "SĐT không đúng định dạng";
        }
    });// require
    
    $('#shopEmail').editable({
        mode:"inline",
        emptytext:"...",
        validate: function(value) {
            if(value && !validateEmail(value)) return "Email không đúng định dạng";
        }

    });
    $('#shopWebsite').editable({ mode:"inline", emptytext:"...",});
});

$('#enable').click(function() {
   $('.editable').editable('toggleDisabled');
});

$(document).ready(function() {
	$('.editable').editable('toggleDisabled');
});

