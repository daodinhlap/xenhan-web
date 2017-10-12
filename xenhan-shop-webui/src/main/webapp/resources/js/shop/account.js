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
			 success: function(response, newValue) {
			 	var id = this.id;
			 	var idx = id.indexOf('-');
			 	id = id.substring(idx+1);
			 	$('#district-' + id).editable('option', 'source', districts[newValue]);
			 	$('#district-' + id).editable('setValue', null);
			 }
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

