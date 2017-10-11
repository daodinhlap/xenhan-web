/***************************************************************************
 * Copyright 2016 by HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.model;

/**
 *  Author : Nhu Dinh Thuan
 *          Email:thuan.nhu@homedirect.com.vn
 * Oct 11, 2017
 */
public class OrderValidateEntity {

  private Long id;
  
  private String field;
  
  private String value;
  
  private String message;
  
  private boolean error = false;
  
  public OrderValidateEntity() {
    
  }
  
  public OrderValidateEntity(Long id) {
    this.id = id;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getField() {
    return field;
  }

  public void setField(String field) {
    this.field = field;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public boolean getError() { return error;  }
  public void setError(boolean error) { this.error = error; }
  
  
}
