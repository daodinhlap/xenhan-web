package com.homedirect.xenhan.model.web.request;

import com.homedirect.xenhan.model.PeriodRecord;
import com.homedirect.xenhan.util.JsonUtil;

/**
 * @project: xenhan-api
 * @author: minhhieu on 19/10/2017
 */
public class PageShopDebitRequest {

    private short typeOfView;
    private String shopName;
    private long periodId;
    private Short status;
    private Long provinceId;
    private Long districtId;
    private PeriodRecord periodRecord;

    private String fromDate;
    private String toDate;
    private int index;
    private int size;
    private String keyword;

    public PageShopDebitRequest() {
        super();
    }

    public short getTypeOfView() {
        return typeOfView;
    }

    public void setTypeOfView(short typeOfView) {
        this.typeOfView = typeOfView;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public long getPeriodId() {
        return periodId;
    }

    public void setPeriodId(long periodId) {
        this.periodId = periodId;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public Long getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(Long provinceId) {
        this.provinceId = provinceId;
    }

    public Long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Long districtId) {
        this.districtId = districtId;
    }

    public PeriodRecord getPeriodRecord() {
        return periodRecord;
    }

    public void setPeriodRecord(PeriodRecord periodRecord) {
        this.periodRecord = periodRecord;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    @Override
    public String toString() {
        return JsonUtil.toJson(this);
    }
}
