package com.homedirect.xenhan.web.auth;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import com.homedirect.repo.model.Membership;
import com.homedirect.session.model.UserSession;

public class UserAuthentication implements Authentication {
  
	private static final long serialVersionUID = 3399864372644089845L;
	
	private UserSession user;
	
	private boolean authenticated = false;
	
	private String ipAddress;
	
	private String token;
	
	private List<UserRepoGrantedAuthority> authorities = new ArrayList<>();
	
	public UserAuthentication() {
  }

	public UserAuthentication(UserSession user) {
		setUserSession(user);
		authenticated = user != null;
	}
	
	public UserAuthentication(UserSession user, String token) {
    setUserSession(user);
    authenticated = user != null;
    this.token = token;
  }
	
	@Override
	public String getName() {
	  if(this.user == null) return null;
		return user.getUser().getUserName();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return  authorities;
	}

	@Override
	public Object getCredentials() {
	  if(this.user == null) return null;
		return user.getSession().getId();
	}

	@Override
	public UserSession getDetails() {
		return user;
	}

	@Override
	public Object getPrincipal() {
	  if(this.user == null) return null;
		return user.getUser();
	}

	@Override
	public boolean isAuthenticated() {
		return authenticated;
	}

	@Override
	public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException { // NOSONAR
		authenticated = isAuthenticated;
	}
	
	public UserSession getUser() {
		return user;
	}

	public void setUserSession(UserSession user) {
		this.user = user;
		if (this.user == null) return;

		List<Membership> memberships = this.user.getUser().getMemberships();

		if (memberships != null) memberships.forEach(membership -> {
			authorities.add(new UserRepoGrantedAuthority(membership.getGroupName(), membership.getMembershipType()));
		});
	}


	public String getIpAddress() { return ipAddress; }
	public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

	public String getToken() { return token; }
	public void setToken(String token) { this.token = token; }

	
}