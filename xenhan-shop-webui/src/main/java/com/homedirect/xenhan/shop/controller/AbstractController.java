/***************************************************************************
 * Copyright 2017 by NDK - All rights reserved.                *    
 **************************************************************************/
package com.homedirect.xenhan.shop.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *  Author : Duy Kien Ngo
 *          Email: duykienngo@gmail.com
 * Mar 3, 2017
 */
public class AbstractController {

  public final static String TOKEN_ATTRIBUTE_NAME = "token-id";

  @Autowired
//  protected ApiExchangeService apiExchangeService;

  private final static Logger logger = LoggerFactory.getLogger(AbstractController.class);


  public AbstractController() {
//    walletType = env.getProperty("wallet-type");
//    this.paydAddress = env.getProperty("payd.frontgate.url");
//    logger.info("\n Call Pay Url === "  + env.getProperty("payd.frontgate.url") + "\n");
  }

  


}
