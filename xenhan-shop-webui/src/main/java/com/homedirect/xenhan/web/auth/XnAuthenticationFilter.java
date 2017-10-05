package com.homedirect.xenhan.web.auth;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.homedirect.repo.model.Membership;
import com.homedirect.xenhan.model.AttributeConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.TextEscapeUtils;

import com.homedirect.session.model.UserSession;
import com.homedirect.xenhan.web.connection.ApiExchangeService;
import org.springframework.util.CollectionUtils;

public class XnAuthenticationFilter extends UsernamePasswordAuthenticationFilter { //AbstractAuthenticationProcessingFilter {
  
  private static final Logger LOGGER = LoggerFactory.getLogger(XnAuthenticationFilter.class);
  
  public final static String ERROR_LOGIN = "Số điện thoại hoặc mật khẩu không đúng! Xin vui lòng thử lại";
  public final static String ERROR_LOGIN_XN = "Bạn chưa đăng ký sử dụng dịch vụ Xe Nhàn!";
  public static final String SPRING_SECURITY_LAST_USERNAME_KEY = "SPRING_SECURITY_LAST_USERNAME";

  private ApiExchangeService apiExchangeService;

  protected XnAuthenticationFilter(ApiExchangeService apiExchangeService) {
    this.apiExchangeService = apiExchangeService;
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request,
                                              HttpServletResponse response) throws AuthenticationException {
    ResponseEntity<String> loginResponse = null;
    try {
      loginResponse = apiExchangeService.login(request);
//      loginResponse = restTemplate.getForEntity(uri, String.class);
    } catch (Exception e) {
      logger.error("LOGIN ERROR " + e.getMessage(), e);
      return loginFailured(request, response, ERROR_LOGIN);
    }

    if(HttpServletResponse.SC_OK == response.getStatus()) {
      String token = loginResponse.getBody();
      UserAuthentication authentication = loginSuccess(request, response, token);
      if(authentication == null) return loginFailured(request, response, ERROR_LOGIN);
      
      // check user has account on XENHAN
      List<Membership> memberships = authentication.getUser().getUser().getMemberships().stream().filter(member -> {
        return member.getDomain().equals(AttributeConfig.XN_DOMAIN)
                && member.getGroupName().contains(AttributeConfig.XN_SHOP_PREFIX);
      }).collect(Collectors.toList());
      
      HttpSession session = request.getSession(true);
      if (session != null) { // getAllowSessionCreation()
        String usernameKey = TextEscapeUtils.escapeEntities(request.getParameter("username"));
        session.setAttribute(SPRING_SECURITY_LAST_USERNAME_KEY, usernameKey);
        session.setAttribute(AttributeConfig.USERNAME, usernameKey);
        if(!CollectionUtils.isEmpty(memberships)) {
          session.setAttribute(AttributeConfig.SHOPNAME, memberships.get(0).getGroupName());
        } 
//        session.setAttribute(AttributeConfig.MEMBERSHIPS, memberships);
        session.setAttribute(AttributeConfig.FULLNAME, authentication.getUser().getUser().getUserProfile().getFullName());
        session.setAttribute(AttributeConfig.IDENTITY, authentication.getUser().getUser().getUserProfile().getIdentityCard());
        session.setAttribute(ApiExchangeService.TOKEN_ATTRIBUTE_NAME, token);
      }

      List<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();
      grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
      UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken(authentication.getUser(), token, grantedAuths);
      user.setDetails(authentication.getDetails());
      return user;
    }

    return loginFailured(request, response, ERROR_LOGIN);
  }

  private  UserAuthentication loginFailured(HttpServletRequest request, HttpServletResponse response, String message) {
    UserAuthentication auth = new UserAuthentication();
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    request.getSession().setAttribute("error", message);
    return auth;
  }

  private UserAuthentication loginSuccess(HttpServletRequest request, HttpServletResponse response, String token) {
    LOGGER.info("\n ---- > "+   token +"\n");

    UserSession userSession =  apiExchangeService.getUserSession(request, token);
    if(userSession == null) return null;

    UserAuthentication auth = new UserAuthentication(userSession);
    response.setStatus(HttpServletResponse.SC_OK);

    return auth;
  }


  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                          FilterChain chain, Authentication authResult)
                                              throws IOException, ServletException {
    super.successfulAuthentication(request, response, chain, authResult);
  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            AuthenticationException failed) throws IOException, ServletException {
    String username = request.getParameter("username");
    String password = request.getParameter("password");
    request.getSession().setAttribute("username", username);
    request.getSession().setAttribute("password", password);
    super.unsuccessfulAuthentication(request, response, failed);
  }


}