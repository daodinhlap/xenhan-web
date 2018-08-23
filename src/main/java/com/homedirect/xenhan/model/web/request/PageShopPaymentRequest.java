package com.homedirect.xenhan.model.web.request;

/**
 * @project: xenhan-api
 * @author: minhhieu on 19/10/2017
 */
public class PageShopPaymentRequest {

  private Object shopDebit;
  private long orderId;

  private int index;
  private int size;


  public PageShopPaymentRequest() {
  }

  public Object getShopDebit() {
    return shopDebit;
  }

  public void setShopDebit(Object shopDebit) {
    this.shopDebit = shopDebit;
  }

  public long getOrderId() {
    return orderId;
  }

  public void setOrderId(long orderId) {
    this.orderId = orderId;
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
}
