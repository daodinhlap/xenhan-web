package com.homedirect.xenhan.shop.controller;
/* author: minhhieu */

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.Promotion;
import com.homedirect.xenhan.model.web.response.AdPrioritize;
import com.homedirect.xenhan.user.model.response.AdvertisingEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
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
    ModelAndView mv = new ModelAndView("noti.list");
    mv.addObject("title", "Xe Nhàn - Tin tức");
    return mv;
  }

  @GetMapping(value = "/get")
  public Object get(HttpServletRequest httpRequest) {
    return list(httpRequest);
  }

  @GetMapping(value = "/prioritize")
  public Object getPrioritize(HttpServletRequest httpRequest) {
    List<AdvertisingEntity> ads = list(httpRequest);
    if(CollectionUtils.isEmpty(ads)) return null;

    List<AdvertisingEntity> prioritizes = ads.stream().filter(ad -> ad.isPrioritize()).collect(Collectors.toList());
    int numberBadge = setNotiBadge(ads, httpRequest);
    if(!CollectionUtils.isEmpty(prioritizes)) {
      return new AdPrioritize(prioritizes, numberBadge);
    }
    return new AdPrioritize(null, numberBadge);
  }

  @PostMapping(value = "/close")
  public Object close(@RequestBody List<AdvertisingEntity> ads, HttpServletRequest httpRequest) {
    String url = apiExchangeService.createUrlWithToken(httpRequest, "advertising", "close");
    List<Long> adIds = ads.stream().map(ad-> ad.getId()).collect(Collectors.toList());
    url += "&ids=" + adIds.toString().replace("[","").replace("]","");

    RepositoryResponse res = apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<?>>() {});
    if(apiExchangeService.isSuccessResponse(res)){
      long numberOfSeen = ads.stream().filter(ad -> ad.getPromotionStatus() == Promotion.RECEIVED).count();
      if(numberOfSeen == 0) return res;
      setNotiBadge(numberOfSeen, httpRequest);
    }
    return res;
  }

  @GetMapping(value = "/view")
  public Object view(@RequestParam(value = "ad-id") Long adId, HttpServletRequest httpRequest) {
    String url = apiExchangeService.createUrlWithToken(httpRequest, "advertising", "view");
    url += "&ad-id=" + adId;
    RepositoryResponse res = apiExchangeService.get(httpRequest, url, new TypeReference<RepositoryResponse<?>>() {});
    if(apiExchangeService.isSuccessResponse(res)) setNotiBadge(-1, httpRequest);
    return res;
  }

  private void setNotiBadge(long number, HttpServletRequest httpRequest){
    Object oldNumber = httpRequest.getSession().getAttribute("NOTI_BADGE");
    if( oldNumber == null || StringUtils.isEmpty(oldNumber)) return;
    int newNumber = (Integer) oldNumber;
    newNumber += number;
    httpRequest.getSession().setAttribute("NOTI_BADGE", newNumber <= 0 ? "" : oldNumber);
  }

  private int setNotiBadge(List<AdvertisingEntity> ads, HttpServletRequest httpRequest){
    List<AdvertisingEntity> receiAds = ads.stream()
            .filter(ad -> ad.getPromotionStatus() == Promotion.RECEIVED || ad.getPromotionStatus() == Promotion.WAITING)
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
