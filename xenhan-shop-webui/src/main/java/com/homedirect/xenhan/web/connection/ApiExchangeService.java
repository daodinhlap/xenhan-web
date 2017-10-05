package com.homedirect.xenhan.web.connection;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.client.HttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homedirect.repo.model.response.RepositoryResponse;
import com.homedirect.repo.model.response.UserSessionResponse;
import com.homedirect.session.model.UserSession;

/**
 *  Author : Nhu Dinh Thuan
 *          Email:thuan.nhu@homedirect.com.vn
 * Jul 25, 2017
 */
@Component
@PropertySource("classpath:application.properties")
public class ApiExchangeService {
  
  public final static String TOKEN_ATTRIBUTE_NAME = "TOKEN-ID";

  protected Environment env;

  @Autowired
  protected RestTemplate restTemplate;

  private final static Logger logger = LoggerFactory.getLogger(ApiExchangeService.class);

  protected String apiAddress;

  private ObjectMapper MAPPER = new ObjectMapper();

  @Autowired
  public ApiExchangeService(Environment env, HttpClient httpClient) {
    this.env = env;
    this.apiAddress = env.getProperty("xenhan.frontgate.url");
    logger.info("\n Call XeNhan Url === "  + env.getProperty("xenhan.frontgate.url") + "\n");
    restTemplate = new RestTemplate(new HttpComponentsClientHttpRequestFactory(httpClient));
  }
  
  public RestTemplate getTemplate() { return restTemplate; }

  public String createURL(String...paths) {
    StringBuilder builder = new StringBuilder(apiAddress);
    for (String path : paths) {
      builder.append('/').append(path);
    }
    return builder.toString();
  }

  public UriComponentsBuilder buildUrlWithToken(HttpServletRequest request, String...paths) {
    String url = createURL(paths);
    UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url);
    buildTokenParam(builder, request);
    return builder;
  }
  
  public URI createEncodeUrlWithToken(HttpServletRequest request, String...paths) {
    String url = createURL(paths);
    UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url);
    buildTokenParam(builder, request);
    return builder.build().encode().toUri();
  }

  public UriComponentsBuilder buildUrl(String...paths) {
    String url = createURL(paths);
    UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url);
    return builder;
  }

  public String createUrlWithToken(HttpServletRequest request, String...paths) {
    UriComponentsBuilder builder = buildUrlWithToken(request, paths);
    return builder.toUriString();
  }

  public void buildUserPhoneParam(UriComponentsBuilder builder) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if(auth != null) builder.queryParam("phone", ((UserSession)auth.getPrincipal()).getUser().getPhone());
  }

  protected void buildTokenParam(UriComponentsBuilder builder, HttpServletRequest request) {
    HttpSession session = request.getSession();
    String token = (String)session.getAttribute(TOKEN_ATTRIBUTE_NAME);
    builder.queryParam("token-id", token);
  }

  protected String createURL(String ctx, String action, String tokenId) {
    return apiAddress + "/" + ctx + "/" + action + "?token-id=" + tokenId;
  }

  public <V> ResponseEntity<RepositoryResponse<V>> post(HttpServletRequest httpRequest, String url, Object request) {
    return post(httpRequest, url, request, new TypeReference<RepositoryResponse<V>>(){});
  }

  public <V> ResponseEntity<RepositoryResponse<V>> post(HttpServletRequest httpRequest, String url, Object request, TypeReference<?> reference) {
    try {
      HttpEntity<Object> requestEntity = createEntity(httpRequest, request);

      ResponseEntity<String> entity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

      RepositoryResponse<V> response =  MAPPER.readValue(entity.getBody(), reference);

      return new ResponseEntity<RepositoryResponse<V>>(response, HttpStatus.OK);
    } catch (HttpClientErrorException e) {
      logger.error(e.getMessage(), e);
      return new ResponseEntity<RepositoryResponse<V>>(e.getStatusCode());
    } catch (IOException e) {
      logger.error(e.getMessage(), e);
      return new ResponseEntity<RepositoryResponse<V>>(HttpStatus.UNPROCESSABLE_ENTITY);
    } catch (Exception e) {
      logger.error(e.getMessage());
      if(Integer.valueOf(e.getMessage().trim()) == HttpServletResponse.SC_SERVICE_UNAVAILABLE){
        return new ResponseEntity<RepositoryResponse<V>>(HttpStatus.FORBIDDEN);
      }
      return new ResponseEntity<RepositoryResponse<V>>(HttpStatus.BAD_REQUEST);
    }
  }

  public <V> Optional<V> getForObject(HttpServletRequest httpRequest, String url, TypeReference<RepositoryResponse<V>> reference) {
    try {
      RepositoryResponse<V> response = this.<V>get(httpRequest, url, reference);
      if(isUnSuccessResponse(response))  return Optional.empty();
      return Optional.of(response.getData());
    } catch (RestClientException e) {
      logger.error(e.getMessage(), e);
      return Optional.empty();
    } 
  }

  public <V> Optional<V> getForObject(HttpServletRequest httpRequest, URI uri, TypeReference<RepositoryResponse<V>> reference) {
    try {
      RepositoryResponse<V> response = get(httpRequest, uri.toURL().toString(), reference);
      if(isUnSuccessResponse(response)) return Optional.empty();
      return Optional.of(response.getData());
    } catch (RestClientException|MalformedURLException e) {
      logger.error(e.getMessage(), e);
      return Optional.empty();
    } 
  }

  public <T> RepositoryResponse<T> get(HttpServletRequest httpRequest, URI uri, TypeReference<?> reference) throws RestClientException {
    try {
      return get(httpRequest, uri.toURL().toString(), reference);
    } catch (MalformedURLException e) {
      logger.error(e.getMessage(), e);
      return null;
    } 
  }

  public <T> RepositoryResponse<T> get(HttpServletRequest httpRequest, String url, TypeReference<?> reference) throws RestClientException {
    HttpEntity<?> entity = createEntity(httpRequest);
    //    logger.info("GET from URL ---> "+ url + " : " + headers.getFirst("User-Agent"));
    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
    try {
      return MAPPER.readValue(response.getBody(), reference);
    } catch (IOException e) {
      logger.error(e.getMessage(), e);
      return null;
    }

  }

  public boolean isUnSuccessResponse(RepositoryResponse<?> response) {
    return Integer.valueOf(response.getCode()) != XnErrorCode.SUCCESS || response.getData() == null;
  }
  
  public boolean isSuccessResponse(RepositoryResponse<?> response) {
    return Integer.valueOf(response.getCode()) == XnErrorCode.SUCCESS && response.getData() != null;
  }
  
  public ResponseEntity<String> login(HttpServletRequest request) {
    String username = request.getParameter("username");
    String password = request.getParameter("password");

    UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiAddress + "/xenhan/login");
    builder.queryParam("username", username).queryParam("password", password);
    URI uri = builder.build().encode().toUri();

    logger.info("\n login ---  > "+ username + " : "+ password + " \n");

    HttpEntity<?> entity = createEntity(request);
    return restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);
  }
  
  public UserSession getUserSession(HttpServletRequest request, String token) {
    String url = apiAddress + "/user/get?token-id=" + token;
    try {
      HttpEntity<?> reqEntity = createEntity(request);
      ResponseEntity<UserSessionResponse> entity = restTemplate.exchange(url, HttpMethod.GET, reqEntity, UserSessionResponse.class);
//      SimpleUser simpleUser = entity.getBody().getData().getUser();
//      logger.info("\n ==> GET USER SESSION: {} - {}\n", url, MAPPER.writeValueAsString(simpleUser));
      return entity.getBody().getData();
    } catch (RestClientException e) {
      logger.error(url + " : " + e.toString(), e);
      return null;
    }
  }
  
  private HttpHeaders transfer(HttpServletRequest httpRequest) {
    HttpHeaders headers = new HttpHeaders();
    headers.set("User-Agent", httpRequest.getHeader("User-Agent"));
    headers.set("X-Forwarded-For", httpRequest.getRemoteAddr());
    return headers;
  }
  
  private HttpEntity<Object> createEntity(HttpServletRequest httpRequest) {
    return new HttpEntity<Object>(transfer(httpRequest));
  }
  
  private HttpEntity<Object> createEntity(HttpServletRequest httpRequest, Object data) {
    HttpHeaders headers = transfer(httpRequest);
    return new HttpEntity<Object>(data, headers);
  }

}