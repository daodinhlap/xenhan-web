package com.homedirect.xenhan.model.web.response;

import java.util.Date;

public class CardResponse {
  
  public final static int LOCK = -1;
  public final static int PENDING = 0;
  public final static int ACTIVE = 1;
  public final static int USED = 2;

  private Long serialCode;
  private Integer lotId;
  private String pinCode;
  private Integer status = PENDING;
  private Date expirationDate;
  private int denomination;


  public Long getSerialCode() { return serialCode; }
  public void setSerialCode(Long serialCode) { this.serialCode = serialCode; }
  public Integer getLotId() { return lotId; }

  public void setLotId(Integer lotId) { this.lotId = lotId; }
  public String getPinCode() { return pinCode; }
  public void setPinCode(String pinCode) { this.pinCode = pinCode; }

  public Integer getStatus() { return status; }
  public void setStatus(Integer status) { this.status = status; }
  public Date getExpirationDate() { return expirationDate; }

  public void setExpirationDate(Date expirationDate) { this.expirationDate = expirationDate; }
  public int getDenomination() { return denomination; }
  public void setDenomination(int denomination) { this.denomination = denomination; }

  @Override
  public String toString() {
    return "CardResponse{" +
            "serialCode=" + serialCode +
            ", lotId=" + lotId +
            ", pinCode='" + pinCode + '\'' +
            ", status=" + status +
            ", expirationDate=" + expirationDate +
            ", denomination=" + denomination +
            '}';
  }
}
