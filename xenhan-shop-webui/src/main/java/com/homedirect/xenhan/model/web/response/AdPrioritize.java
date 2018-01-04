package com.homedirect.xenhan.model.web.response;
/* author: minhhieu */

import com.homedirect.xenhan.user.model.response.AdvertisingEntity;

public class AdPrioritize {

  private AdvertisingEntity ad;
  private int numberBadge;

  public AdPrioritize() {
  }

  public AdPrioritize(AdvertisingEntity ad, int numberBadge) {
    this.ad = ad;
    this.numberBadge = numberBadge;
  }

  public AdvertisingEntity getAd() {
    return ad;
  }

  public void setAd(AdvertisingEntity ad) {
    this.ad = ad;
  }

  public int getNumberBadge() {
    return numberBadge;
  }

  public void setNumberBadge(int numberBadge) {
    this.numberBadge = numberBadge;
  }
}
