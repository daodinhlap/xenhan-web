/***************************************************************************
 * Copyright 2003-2007 by VietSpider - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.web.auth;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.CopyOnWriteArraySet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.security.core.session.SessionDestroyedEvent;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;

import com.homedirect.session.model.UserSession;

/**
 *  Author : Nhu Dinh Thuan
 *          Email:nhudinhthuan@yahoo.com
 * Jan 12, 2016
 */
public class XnSessionRegistry implements SessionRegistry, ApplicationListener<SessionDestroyedEvent> {

  protected final Logger logger = LoggerFactory.getLogger(XnSessionRegistry.class);

  private final ConcurrentMap<Long, Set<String>> principals = new ConcurrentHashMap<Long, Set<String>>();

  private final Map<String, SessionInformation> sessionIds = new ConcurrentHashMap<String, SessionInformation>();
  
  public XnSessionRegistry() {
  }

  public List<Object> getAllPrincipals() {
    return new ArrayList<Object>(principals.keySet());
  }

  public List<SessionInformation> getAllSessions(Object principal,
                                                 boolean includeExpiredSessions) {
    Set<String> sessionsUsedByPrincipal =  null;
    try {
      sessionsUsedByPrincipal = principals.get(getPrincipalId(principal));
    } catch (Exception e) {
      logger.error(e.getMessage());
    }

    if (sessionsUsedByPrincipal == null) return Collections.emptyList();

    List<SessionInformation> list = new ArrayList<SessionInformation>(sessionsUsedByPrincipal.size());

    for (String sessionId : sessionsUsedByPrincipal) {
      SessionInformation sessionInformation = getSessionInformation(sessionId);

      if (sessionInformation == null) continue;

      if (includeExpiredSessions || !sessionInformation.isExpired()) {
        list.add(sessionInformation);
      }
    }
    return list;
  }

  public SessionInformation getSessionInformation(String sessionId) {
    return sessionIds.get(sessionId);
  }

  public void onApplicationEvent(SessionDestroyedEvent event) {
    String sessionId = event.getId();
    removeSessionInformation(sessionId);
  }

  public void refreshLastRequest(String sessionId) {
    SessionInformation info = getSessionInformation(sessionId);

    if (info != null)  info.refreshLastRequest();
  }

  public void registerNewSession(String sessionId, Object principal) {
    if(principal == null) {
      logger.info("\n ++++++++++++++++++ Registering session " + sessionId + ", for no principal - " + principal);
      return;
    }
    Long principalId = getPrincipalId(principal);
    logger.info("\n ++++++++++++++++++ Registering session " + sessionId + ", for no principal - " + principalId);
    
    if (getSessionInformation(sessionId) != null) {
      removeSessionInformation(sessionId);
    }

    sessionIds.put(sessionId, new SessionInformation(principal, sessionId, new Date()));

    Set<String> sessionsUsedByPrincipal = principals.get(principalId);

    if (sessionsUsedByPrincipal == null) {
      sessionsUsedByPrincipal = new CopyOnWriteArraySet<String>();
      Set<String> prevSessionsUsedByPrincipal = principals.putIfAbsent(principalId, sessionsUsedByPrincipal);
      if (prevSessionsUsedByPrincipal != null) {
        sessionsUsedByPrincipal = prevSessionsUsedByPrincipal;
      }
    }

    sessionsUsedByPrincipal.add(sessionId);

    logger.info("Sessions used by '" + principalId + "' : " + sessionsUsedByPrincipal);
  }

  public void removeSessionInformation(String sessionId) {
    SessionInformation info = getSessionInformation(sessionId);
    if (info == null) return;
    Long principalId = getPrincipalId(info.getPrincipal());

    logger.info("Removing session " + sessionId + " from set of registered sessions");

    sessionIds.remove(sessionId);

    Set<String> sessionsUsedByPrincipal = principals.get(principalId);

    if (sessionsUsedByPrincipal == null) {
      return;
    }

    logger.info("Removing session " + sessionId + " from principal's set of registered sessions");

    sessionsUsedByPrincipal.remove(sessionId);

    if (sessionsUsedByPrincipal.isEmpty()) {
      // No need to keep object in principals Map anymore
      logger.info("Removing principal " + principalId + " from registry");
      principals.remove(principalId);
    }

    logger.info("Sessions used by '" + principalId + "' : " + sessionsUsedByPrincipal);
  }

  private Long getPrincipalId(Object principal) {
    if(principal instanceof UserSession) {
      return ((UserSession)principal).getUser().getUserId();
    } 
    return new Long(principal.hashCode());
  }

}
