/***************************************************************************
 * Copyright HomeDirect - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.web.connection;

import org.apache.http.HeaderElement;
import org.apache.http.HeaderElementIterator;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.conn.ConnectionKeepAliveStrategy;
import org.apache.http.message.BasicHeaderElementIterator;
import org.apache.http.protocol.HTTP;
import org.apache.http.protocol.HttpContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *  Author : DuyBV
 *          Email:duy.bui@homedirect.com
 * Apr 19, 2017
 */
public class ConnectionKeepAliveStrategyCustomization implements ConnectionKeepAliveStrategy {

  private static final Logger logger = LoggerFactory.getLogger(ConnectionKeepAliveStrategyCustomization.class);

  private static final String LOCALHOST = "localhost";

  @Override
  public long getKeepAliveDuration(HttpResponse response, HttpContext context) {
    // Honor 'keep-alive' header
    HeaderElementIterator it = new BasicHeaderElementIterator(response.headerIterator(HTTP.CONN_KEEP_ALIVE));
    while (it.hasNext()) {
      HeaderElement he = it.nextElement();
      String param = he.getName();
      String value = he.getValue();
//      logger.info("\n HeaderElementIterator param: {} - value: {} \n", param, value);
      if (value != null && param.equalsIgnoreCase("timeout")) {
        try {
          return Long.parseLong(value) * 1000;
        } catch(NumberFormatException ignore) {
        }
      }
    }
    HttpHost target = (HttpHost) context.getAttribute(HttpClientContext.HTTP_TARGET_HOST);
//    logger.info("\n Target HostName: {} \n", target.getHostName());
    if (LOCALHOST.equalsIgnoreCase(target.getHostName())) {
      // Keep alive for 5 seconds only
      return 5 * 1000;
    }
    // otherwise keep alive for 30 seconds
    return 30 * 1000;
  }

}
