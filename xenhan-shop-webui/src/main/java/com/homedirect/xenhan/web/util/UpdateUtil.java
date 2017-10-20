package com.homedirect.xenhan.web.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.homedirect.repo.batch.model.UserRecord;
import com.homedirect.repo.model.User;
import com.homedirect.repo.model.UserProfile;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.xenhan.model.AttributeConfig;
import com.homedirect.xenhan.model.Shop;
import com.homedirect.xenhan.shop.controller.AbstractController;
import com.homedirect.xenhan.util.DateUtil;
import com.homedirect.xenhan.util.JsonUtil;
import com.homedirect.xenhan.web.connection.ApiExchangeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;

/**
 * @project: xenhan-api
 * @author: minhhieu on 19/10/2017
 */
@Component
public class UpdateUtil {

    private final static Logger logger = LoggerFactory.getLogger(AbstractController.class);
    private final static int DEFAULT_DISTRICT_ID_HN = 1;
    private final static int DEFAULT_DISTRICT_ID_HCM = 31;

    protected @Autowired ApiExchangeService apiExchangeService;

    public byte[] updateUser(String name, String value, HttpServletRequest httpRequest, HttpServletResponse httpResponse)
            throws UnsupportedEncodingException {

        UserRecord userRecord = getUserRecord(httpRequest);
        User user = userRecord.getUser();
        UserProfile userProfile = userRecord.getUserProfile();
        switch (name) {
            case "name": userProfile.setFullName(value); break;
            case "phone": user.setPhone(value); break;
            case "email": user.setEmail(value); break;
            case "gender": userProfile.setGender(Integer.valueOf(value)); break;
            case "address": userProfile.setAddress(value); break;
            case "province": userProfile.setProvince(value);
                             userProfile.setDistrict(null); break;
            case "district": userProfile.setDistrict(value); break;
            case "placeOfBirth": userProfile.setPlaceOfBirth(value); break;
            case "birthDay": userProfile.setBirthday(DateUtil.ddMMyyyy2Date(value)); break;
            case "identityCard": userProfile.setIdentityCard(value); break;
            case "dateOfIdentity": userProfile.setDateOfIdentity(DateUtil.ddMMyyyy2Date(value)); break;
            case "facebook": userProfile.setFacebookId(value); break;
            default: return "error".getBytes();
        }
        return updateUser(httpRequest, httpResponse, userRecord).getBytes("utf8");
    }

    private String updateUser(HttpServletRequest httpRequest, HttpServletResponse httpResponse, UserRecord userRecord) {
        String url = apiExchangeService.createUrlWithToken(httpRequest, "user", "update-user-record");
        ResponseEntity<RepositoryResponse<Object>> resp = apiExchangeService.post(httpRequest, url, userRecord);

        logger.info("--- response " + resp.getStatusCodeValue() + " : "+ resp.getBody().getMessage());
        if(apiExchangeService.isUnSuccessResponse(resp.getBody())) {
            httpResponse.setStatus(HttpStatus.SERVICE_UNAVAILABLE.ordinal());
            return resp.getBody().getMessage();
        }
        return "done";
    }

    private UserRecord getUserRecord(HttpServletRequest httpRequest) {
        String url = apiExchangeService.createUrlWithToken(httpRequest, "user", "get-user-record");
        RepositoryResponse<UserRecord> entity = apiExchangeService.get(httpRequest, url,
                new TypeReference<RepositoryResponse<UserRecord>>() {});
        logger.info("\n GET USER RECORD: {}", JsonUtil.toJson(entity.getData()));
        return entity.getData();
    }

    public byte[] updateShop(Shop shop, String name, String value, HttpServletRequest httpRequest, HttpServletResponse httpResponse)
            throws UnsupportedEncodingException {
        switch (name) {
            case "shopName": shop.setFullName(value); break;
            case "shopAddress": shop.setAddress(value); break;
            case "shopProvince": shop.getTown().setId(Long.valueOf(value));
                                 int defaultId = Long.valueOf(value) == 1? DEFAULT_DISTRICT_ID_HN : DEFAULT_DISTRICT_ID_HCM;
                                 shop.getTown().getDistrict().setId(defaultId); break;
            case "shopDistrict": shop.getTown().getDistrict().setId(Long.valueOf(value)); break;
            case "shopPhone": shop.setPhone(value); break;
            case "shopEmail": shop.setEmail(value); break;
            case "shopWebsite": shop.setWebsite(value); break;
            default: return "error".getBytes();
        }
        return updateShop(httpRequest, httpResponse, shop).getBytes("utf8");
    }

    private String updateShop(HttpServletRequest httpRequest, HttpServletResponse httpResponse, Shop shop) {
        String url = apiExchangeService.createUrlWithToken(httpRequest, "shop", "update-shop-profile");
        TypeReference<RepositoryResponse<Shop>> reference = new TypeReference<RepositoryResponse<Shop>>() {};
        ResponseEntity<RepositoryResponse<Shop>> resp = apiExchangeService.post(httpRequest, url, shop, reference);

        logger.info("--- response " + resp.getStatusCodeValue() + " : "+ resp.getBody().getMessage());
        if(apiExchangeService.isUnSuccessResponse(resp.getBody())) {
            httpResponse.setStatus(HttpStatus.SERVICE_UNAVAILABLE.ordinal());
            return resp.getBody().getMessage();
        }
        httpRequest.getSession().setAttribute(AttributeConfig.SHOP, resp.getBody().getData());
        return "done";
    }
}
