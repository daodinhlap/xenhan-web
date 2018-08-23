package com.homedirect.xenhan.model.web.response;

/***************************************************************************
 * Copyright 2016 by HomeDirect - All rights reserved.                *
 **************************************************************************/

import com.fasterxml.jackson.annotation.JsonInclude;
import com.homedirect.xenhan.user.model.Dropoff;
import com.homedirect.xenhan.user.model.ShopEntity;
import com.homedirect.xenhan.user.model.SimpleUserEntity;

import java.util.Date;
import java.util.List;

/**
 *  Author : Do Van Khoi
 *  Email: khoi.do@homedirect.com.vn
 * Aug 9, 2017
 */
public class OrderResponse {

    private long id;
    private Date createdDate;
    private Date lastUpdate;
    private long closedDate;
    private ShopEntity shop;

    private String orderMessage;
    private double goodAmount;

    private double originalShipAmount;
    private String coupon;
    private int discount;
    private double shipAmount;

    private long packageId;
    private String packageName;
    private long timeOut;

    private double refund;

    private boolean COD;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<String> pickupImages;

    private Dropoff dropoff;
    private String creator;
    private int status;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String statusDescription;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private SimpleUserEntity shipper;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private SimpleUserEntity pickupShipper;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private SimpleUserEntity dropoffShipper;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private SimpleUserEntity returnShipper;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private SimpleUserEntity author;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long exportDate;

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public Date getCreatedDate() { return createdDate; }
    public void setCreatedDate(Date createdDate) { this.createdDate = createdDate; }

    public Date getLastUpdate() { return lastUpdate; }
    public void setLastUpdate(Date lastUpdate) { this.lastUpdate = lastUpdate; }

    public long getClosedDate() { return closedDate; }
    public void setClosedDate(long closedDate) { this.closedDate = closedDate; }

    public ShopEntity getShop() { return shop; }
    public void setShop(ShopEntity shop) { this.shop = shop; }

    public String getOrderMessage() { return orderMessage; }
    public void setOrderMessage(String orderMessage) { this.orderMessage = orderMessage; }

    public double getGoodAmount() { return goodAmount; }
    public void setGoodAmount(double goodAmount) { this.goodAmount = goodAmount; }

    public double getOriginalShipAmount() { return originalShipAmount; }
    public void setOriginalShipAmount(double originalShipAmount) { this.originalShipAmount = originalShipAmount; }

    public String getCoupon() { return coupon; }
    public void setCoupon(String coupon) { this.coupon = coupon; }

    public int getDiscount() { return discount; }
    public void setDiscount(int discount) { this.discount = discount; }

    public double getShipAmount() { return shipAmount; }
    public void setShipAmount(double shipAmount) { this.shipAmount = shipAmount; }

    public long getPackageId() { return packageId; }
    public void setPackageId(long packageId) { this.packageId = packageId; }

    public String getPackageName() { return packageName; }
    public void setPackageName(String packageName) { this.packageName = packageName; }

    public long getTimeOut() { return timeOut; }
    public void setTimeOut(long timeOut) { this.timeOut = timeOut; }

    public double getRefund() { return refund; }
    public void setRefund(double refund) { this.refund = refund; }

    public boolean isCOD() { return COD; }
    public void setCOD(boolean cOD) { COD = cOD; }

    public List<String> getPickupImages() { return pickupImages; }
    public void setPickupImages(List<String> pickupImages) { this.pickupImages = pickupImages; }

    public Dropoff getDropoff() { return dropoff; }
    public void setDropoff(Dropoff dropoff) { this.dropoff = dropoff; }

    public String getCreator() { return creator; }
    public void setCreator(String creator) { this.creator = creator; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public String getStatusDescription() { return statusDescription; }
    public void setStatusDescription(String statusDescription) { this.statusDescription = statusDescription; }

    public SimpleUserEntity getShipper() { return shipper; }
    public void setShipper(SimpleUserEntity shipper) { this.shipper = shipper; }

    public SimpleUserEntity getPickupShipper() { return pickupShipper; }
    public void setPickupShipper(SimpleUserEntity pickupShipper) { this.pickupShipper = pickupShipper; }

    public SimpleUserEntity getDropoffShipper() { return dropoffShipper; }
    public void setDropoffShipper(SimpleUserEntity dropoffShipper) { this.dropoffShipper = dropoffShipper; }

    public SimpleUserEntity getReturnShipper() { return returnShipper; }
    public void setReturnShipper(SimpleUserEntity returnShipper) { this.returnShipper = returnShipper; }

    public SimpleUserEntity getAuthor() { return author; }
    public void setAuthor(SimpleUserEntity author) { this.author = author; }

    public Long getExportDate() { return exportDate; }
    public void setExportDate(Long exportDate) { this.exportDate = exportDate; }

}
