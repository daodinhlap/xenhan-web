/***************************************************************************
 * Copyright 2003-2007 by VietSpider - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.web.auth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.session.ConcurrentSessionFilter;
import org.springframework.security.web.session.SimpleRedirectSessionInformationExpiredStrategy;

/**
 *  Author : Nhu Dinh Thuan
 *          Email:nhudinhthuan@yahoo.com
 * Jan 12, 2016
 */
public class XnConcurrentSessionFilter extends ConcurrentSessionFilter {
  
  private String expiredUrl;

  private org.springframework.security.core.session.SessionRegistry sessionRegistry;

  private LogoutHandler[] handlers = new LogoutHandler[] { new SecurityContextLogoutHandler() };
  private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

  public XnConcurrentSessionFilter(SessionRegistry sessionRegistry) {
    super(sessionRegistry);
    this.sessionRegistry = sessionRegistry;
  }

  public XnConcurrentSessionFilter(SessionRegistry sessionRegistry, String expiredUrl) {
    super(sessionRegistry, new SimpleRedirectSessionInformationExpiredStrategy(expiredUrl));
    this.expiredUrl = expiredUrl;
    this.sessionRegistry = sessionRegistry;
  }

  @Override
  public void afterPropertiesSet() {
    super.afterPropertiesSet();
  }

//  @Override
//  protected String determineExpiredUrl(HttpServletRequest request, SessionInformation info) {
//    return super.determineExpiredUrl(request, info);
//  }

  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
    HttpServletRequest request = (HttpServletRequest) req;
    HttpServletResponse response = (HttpServletResponse) res;

    HttpSession session = request.getSession(false);

    if (session == null) {
      chain.doFilter(request, response);
      return;
    }
    
    SessionInformation info = sessionRegistry.getSessionInformation(session.getId());
    
    if (info == null) {
      chain.doFilter(request, response);
      return;
    }
    
    if(info.isExpired()) {
      doLogout(request, response);

      String targetUrl = expiredUrl;

      if (targetUrl != null) {
        request.getSession().setAttribute("error", "Đã có ai đó đăng nhập tài khoản này.");
        redirectStrategy.sendRedirect(request, response, targetUrl);
        return;
      }
      response.getWriter().print("Tài khoản đã được đăng nhập bởi một người khác");
      response.flushBuffer();
      return;
    }
    sessionRegistry.refreshLastRequest(info.getSessionId());

    chain.doFilter(request, response);
  }


  private void doLogout(HttpServletRequest request, HttpServletResponse response) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    for (LogoutHandler handler : handlers) {
      handler.logout(request, response, auth);
    }
  }

  @Override
  public void setLogoutHandlers(LogoutHandler[] handlers) {
    super.setLogoutHandlers(handlers);
  }


}
