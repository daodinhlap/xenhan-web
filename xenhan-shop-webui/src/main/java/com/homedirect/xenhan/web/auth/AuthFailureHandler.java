/***************************************************************************
 * Copyright 2003-2007 by VietSpider - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.web.auth;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

/**
 *  Author : Nhu Dinh Thuan
 *          Email:nhudinhthuan@yahoo.com
 * Dec 18, 2015
 */
public class AuthFailureHandler implements AuthenticationFailureHandler {

  @Override
  public void onAuthenticationFailure(HttpServletRequest req, HttpServletResponse resp,
                                      AuthenticationException exp)
                                          throws IOException, ServletException {
    req.getSession().setAttribute("error", exp.getMessage());
    req.setAttribute("error", exp.getMessage());
    
    req.getSession().setAttribute("error1", exp.getMessage());
    req.setAttribute("error1", exp.getMessage());
    
//    System.out.println(" 0sd-fsdfmsdkfsdmfks f" + AuthErrorMsgThreadLocal.get());

//    System.out.println("\n\n --  > "+exp.getMessage() + "=======  > " + req);
    resp.sendRedirect(req.getContextPath() + "/dang-nhap");
  }

}
