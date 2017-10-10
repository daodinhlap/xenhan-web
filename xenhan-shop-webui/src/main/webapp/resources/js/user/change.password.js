var noti = new Notify();
var form = new Form();
var URL_CHANGE_PASS = BASE_URL + "/user/change-password";
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