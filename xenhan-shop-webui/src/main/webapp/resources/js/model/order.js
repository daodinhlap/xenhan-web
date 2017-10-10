class Order {
    constructor() {
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
}

class Dropoff {
    constructor() {
        this.contact;
        this.address;
        this.town;
        this.dropoffDate;
        this.location;
        this.description;
        this.province;
        this.district;
    }

}

class Contact {
    constructor(userName, phone){
        this.name = userName;
        this.phone = phone;
    }
}

class CouponResponse{
    constructor()
    {
        this.amount = "";
        this.cardCode = "";
        this.cardSerial = "";
        this.description = "";
        this.status = "";
        this.transRef = "";
    }
}


class OrderRequest {
    constructor() {
        this.orderId;
        this.orderMessage;
        this.dropoff;
        this.goodAmount;
        this.cod;
        this.shopName;
        this.shipAmount ;

        this.packageId ;
        this.couponCode;
    }
}
