package com.homedirect.xenhan.web.auth;

import org.springframework.security.core.GrantedAuthority;

/**
 *  Author : Nhu Dinh Thuan
 *          Email:thuan.nhu@homedirect.com.vn
 * Jan 13, 2017
 */
public class UserRepoGrantedAuthority implements GrantedAuthority {
  
  private static final long serialVersionUID = 1L;
  private String authority;
  
  public UserRepoGrantedAuthority(String group, String mt) {
    authority = "ROLE_" + group + "/" + mt;
  }

  @Override
  public String getAuthority() {
    return authority;
  }
  
  

}