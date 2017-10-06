function Page (page){
    this.endNumber = page.endNumber;
    this.pageItems = page.pageItems;
    this.pageNumber = page.pageNumber;
    this.pageSize = page.pageSize;
    this.pagesAvailable = page.pagesAvailable;
    this.startNumber = page.startNumber;
    this.time = page.time;
    this.totalItems = page.totalItems;
}

function Total(total) {
    this.total = total.total;
    this.totalDropoffAmount = total.totalDropoffAmount;
    this.totalGoodAmount = total.totalGoodAmount;
    this.totalPickupAmount = total.totalPickupAmount;
    this.totalReturnAmount = total.totalReturnAmount;
    this.totalShipAmount = total.totalShipAmount;
}
