function Order() {
        this.id;
        this.createdDate = '';
        this.lastUpdate = '';
        this.closedDate = '';
        this.shop = {};

        this.orderMessage = '';
        this.goodAmount = '';

        this.originalShipAmount = '';
        this.coupon = '';
        this.discount = '';
        this.shipAmount = '';

        this.packageId = '';
        this.packageName = '';
        this.timeOut = '';

        this.pickupAmount = '';
        this.returnAmount = '';
        this.finalReturnAmount = '';
        this.dropoffAmount = '';

        this.refund = '';
        this.cod = '';
        this.pickupImages = [];
        this.hubs = '';
        this.dropoff = {};
        this.creator = '';
        this.status = '';
        this.gender = '';
        this.shipper = '';
}

function Dropoff (){
        this.contact;
        this.address;
        this.town;
        this.dropoffDate;
        this.location;
        this.description;
        this.province;
        this.district;
}

function Contact (userName, phone){
    this.name = userName;
    this.phone = phone;
}

function CouponResponse(){
        this.amount = "";
        this.cardCode = "";
        this.cardSerial = "";
        this.description = "";
        this.status = "";
        this.transRef = "";
}


function OrderRequest (){
        this.orderId;
        this.orderMessage;
        this.dropoff;
        this.goodAmount;
        this.cod;
        this.shopName;
        this.shipAmount ;

        this.packageId ;
        this.coupon;

        this.pickupAddress;
        this.pickupProvince;
        this.pickupDistrict;
}
