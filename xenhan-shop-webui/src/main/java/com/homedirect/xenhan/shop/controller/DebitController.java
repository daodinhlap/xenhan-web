package com.homedirect.xenhan.shop.controller;
/* author: minhhieu */

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.common.model.Page;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.SimpleShopDebit;
import com.homedirect.xenhan.model.web.request.PageShopDebitRequest;
import com.homedirect.xenhan.model.web.request.PageShopPaymentRequest;
import com.homedirect.xenhan.user.model.OrderEntity;
import com.homedirect.xenhan.util.JsonUtil;
import com.homedirect.xenhan.web.util.DebitExcelExport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/shop")
public class DebitController extends AbstractController {

  private @Autowired DebitExcelExport debitExcelExport;

  @GetMapping(value = "/cong-no")
  public ModelAndView debit() {
    ModelAndView mv = new ModelAndView("shop.debit");
    mv.addObject("title","Xe Nhàn - Công nợ");
    return mv;
  }

  @PostMapping(value = "/debit")
  public Object listShopDebit(@RequestBody PageShopDebitRequest request, HttpServletRequest httpRequest) {

    request.setSize(20);
    request.setTypeOfView((short) 0);
    request.setShopName((String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME));
    request.setPeriodRecord(getPeriod(httpRequest));

    String url = apiExchangeService.createUrlWithToken(httpRequest,"shop", "debit");
    return apiExchangeService.post(httpRequest, url, request).getBody();
  }

  @PostMapping(value = "/shop-payment")
  public Object shopPayments(@RequestBody PageShopPaymentRequest request, HttpServletRequest httpRequest) {

    request.setSize(20);
    logger.info("\n==> GET SHOP PAYMENT:{}", JsonUtil.toJson(request));
    String url = apiExchangeService.createUrlWithToken(httpRequest,"shop", "list-shop-payment");
    return apiExchangeService.post(httpRequest, url, request).getBody();
  }


  @GetMapping(value = "/export-debit")
  public void exportDebit(@RequestParam(value = "fromDate") String fromDate,
                          @RequestParam(value = "toDate") String toDate,
                          @RequestParam(value = "status") short status,
                          HttpServletResponse httpResponse,
                          HttpServletRequest httpRequest) throws Exception {
    PageShopDebitRequest request = new PageShopDebitRequest();
    request.setFromDate(fromDate);
    request.setToDate(toDate);
    request.setStatus(status);
    request.setSize(100);
    request.setTypeOfView((short) 0);
    request.setShopName((String) httpRequest.getSession().getAttribute(AttributeConfig.SHOPNAME));
    request.setPeriodRecord(getPeriod(httpRequest));
    String url = apiExchangeService.createUrlWithToken(httpRequest,"shop", "list-simple-shop");

    int index = 1;
    int totalPage = 1;
    List<SimpleShopDebit> debits = new LinkedList<>();
    TypeReference reference = new TypeReference<RepositoryResponse<Page<SimpleShopDebit>>>() {};
    do {
      request.setIndex(index);
      ResponseEntity<RepositoryResponse<Page<SimpleShopDebit>>> response = apiExchangeService.post(httpRequest, url, request, reference);
      Page<SimpleShopDebit> pageRes = response.getBody().getData();
      debits.addAll(pageRes.getPageItems());

      totalPage = pageRes.getPagesAvailable();
    }while (++index <= totalPage);


    String fileName = "lich-su-cong-no";
    fileName += "_tu_" + request.getFromDate();
    fileName += "_den_" + request.getToDate();
    httpResponse.setContentType("application/vnd.ms-excel");
    httpResponse.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + ".xls" +"\"");
    debitExcelExport.export(httpRequest, httpResponse, debits);
    httpResponse.getOutputStream().flush();
  }

}
