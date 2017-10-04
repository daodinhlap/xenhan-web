package com.homedirect.xenhan.web.auth;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class UserAuthProvider implements AuthenticationProvider {

  private final static Logger LOGGER = LoggerFactory.getLogger(UserAuthProvider.class);

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    String username = authentication.getName().toString();
    try {
      return successful(username, authentication.getCredentials().toString(), "ROLE_USER");
    } catch (Exception exp) {
      LOGGER.error(exp.getMessage(), exp);
    }
    return null;
  }

  private UsernamePasswordAuthenticationToken successful(String code, String password, String role) {
    List<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();
    grantedAuths.add(new SimpleGrantedAuthority(role));
    return new UsernamePasswordAuthenticationToken(code, password, grantedAuths);
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
  }
}
