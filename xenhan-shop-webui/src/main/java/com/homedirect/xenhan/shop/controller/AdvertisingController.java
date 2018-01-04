package com.homedirect.xenhan.shop.controller;
/* author: minhhieu */

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.Promotion;
import com.homedirect.xenhan.model.web.response.AdPrioritize;
import com.homedirect.xenhan.user.model.response.AdvertisingEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/noti")
public class AdvertisingController extends AbstractController {

  @GetMapping(value = "/tin-khuyen-mai")
  public ModelAndView getView(HttpServletRequest httpRequest) {
    return new ModelAndView("noti.list");
  }

  @GetMapping(value = "/get")
  public Object get(HttpServletRequest httpRequest) {
    return list(httpRequest);
  }

  @GetMapping(value = "/prioritize")
  public Object getPrioritize(HttpServletRequest httpRequest) {
    List<AdvertisingEntity> ads = list(httpRequest);
    if(CollectionUtils.isEmpty(ads)) return null;

    Optional<AdvertisingEntity> prioritize = ads.stream().filter(ad -> ad.isPrioritize()).findFirst();
    if(prioritize.isPresent()) {
      int numberBadge = setNotiBadge(ads, httpRequest);
      return new AdPrioritize(prioritize.get(), numberBadge);
    }
    return null;
  }

  private int setNotiBadge(List<AdvertisingEntity> ads, HttpServletRequest httpRequest){
    List<AdvertisingEntity> receiAds = ads.stream()
            .filter(ad -> ad.getPromotionStatus() == Promotion.RECEIVED)
            .collect(Collectors.toList());
    httpRequest.getSession().setAttribute("NOTI_BADGE", receiAds.size());
    return receiAds.size();
  }

  private List<AdvertisingEntity> list(HttpServletRequest httpRequest){
    String url = apiExchangeService.createUrlWithToken(httpRequest, "advertising", "get");
    RepositoryResponse<List<AdvertisingEntity>> adResponse = apiExchangeService.get(httpRequest, url,
            new TypeReference<RepositoryResponse<List<AdvertisingEntity>>>() {});
    if(apiExchangeService.isUnSuccessResponse(adResponse)) return Collections.EMPTY_LIST;
    return adResponse.getData();
  }
}
