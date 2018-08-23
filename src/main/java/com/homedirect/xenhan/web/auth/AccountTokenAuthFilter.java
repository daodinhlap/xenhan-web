package com.homedirect.xenhan.web.auth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class AccountTokenAuthFilter extends UsernamePasswordAuthenticationFilter {
  
  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                          FilterChain chain, Authentication authResult)
                                              throws IOException, ServletException {
    request.getSession().removeAttribute("error");
    super.successfulAuthentication(request, response, chain, authResult);
  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            AuthenticationException failed) throws IOException, ServletException {
    String username = request.getParameter("username");
    request.getSession().setAttribute("username", username);
    super.unsuccessfulAuthentication(request, response, failed);
  }

}