package com.homedirect.xenhan.model.web.response;
/* author: minhhieu */

import com.homedirect.xenhan.user.model.response.AdvertisingEntity;

import java.util.List;

public class AdPrioritize {

  private List<AdvertisingEntity> ads;
  private int numberBadge;

  public AdPrioritize() {
  }

  public AdPrioritize(List<AdvertisingEntity> ads, int numberBadge) {
    this.ads = ads;
    this.numberBadge = numberBadge;
  }

  public List<AdvertisingEntity> getAds() {
    return ads;
  }

  public void setAds(List<AdvertisingEntity> ads) {
    this.ads = ads;
  }

  public int getNumberBadge() {
    return numberBadge;
  }

  public void setNumberBadge(int numberBadge) {
    this.numberBadge = numberBadge;
  }
}
