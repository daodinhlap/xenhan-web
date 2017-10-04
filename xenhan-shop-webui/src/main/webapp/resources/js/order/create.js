var noti = new Notify();

var url_bankFee = BASE_URL + "/ngan-hang/phi?bankId=";
// ============================================

// ON LOAD
$(document).ready(function($) {

});



// MODEL
function makeOrder(){
    this.

	this.sourceAccountNo = function(){ return $('#sourceAccount').find(':selected').data('accountno')};
	this.balance = function(){ return $('#sourceAccount').val()};
	
	this.amount = function(){ return $('#amount').val()};
	this.bankAccountId = function(){ return this.bank().data("id")};
	this.bankId = function(){ return this.bank().data("bankid")};
	this.bankName = function(){ return this.bank().data("bankname")};
	this.bankAccountName = function(){ return this.bank().data("bankaccountname")};
	this.bankAccount = function(){ return this.bank().data("bankaccount")};
	this.branchName = function(){ return this.bank().data("branchname")};

	this.validate = function (){
		if(!this.amount()){
			error.push({message: Error_message.EMPTY_AMOUNT, id: "amount"});
		}
		if(numberFormat(this.amount()) > Math.round(this.balance())){
			error.push({message: Error_message.BALANCE_INVALID, id: "alert"});
		}
		return error;
	}
}

