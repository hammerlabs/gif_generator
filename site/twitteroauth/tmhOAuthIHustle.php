<?php

/**
*
*/

define('TMH_INDENT', 25);

// use composers autoload if it exists, or require directly if not
require __DIR__.DIRECTORY_SEPARATOR.'tmhOAuth.php';
class tmhOAuthIHustle extends tmhOAuth {

  protected $state;  

  public function __construct($config = array()) {

    $this->config = array_merge(
      array(

        // change the values below to ones for your application
        'consumer_key'    => TWITTER_CONSUMER_KEY,
        'consumer_secret' => TWITTER_CONSUMER_SECRET
      ),
      $config
    );

    if (ENVIRONMENT != "development") {
      if(isset($_SERVER['HTTP_FRONT_END_HTTPS'])  && (strcasecmp($_SERVER['HTTP_FRONT_END_HTTPS'],"ON")==0)) {
        $proxyport=$_SERVER['HTTPS_PROXY'];
        $parseArray=parse_url($proxyport);
        $port=$parseArray['port'];
        $proxy=$parseArray['host'];
        $this->config['curl_proxy']=$proxy.':'.$port;

      } else {
        if (isset($_SERVER['HTTP_PROXY'])){
          $proxyport=$_SERVER['HTTP_PROXY'];
          $parseArray=parse_url($proxyport);
          $port=$parseArray['port'];
          $proxy=$parseArray['host'];
          $this->config['curl_proxy']=$proxy.':'.$port;
        }
      }
    }



    // start a session if one does not exist  
    if(!session_id()) {  
        session_start();  
    }  

    // determine the authentication status  
    // default to 0  
    $this->state = 0;  
    // 2 (authenticated) if the cookies are set  
    if(isset($_COOKIE["access_token"], $_COOKIE["access_token_secret"])) {  
        $this->state = 2;  
    }  
    // otherwise use value stored in session  
    elseif(isset($_SESSION["authstate"])) {  
        $this->state = (int)$_SESSION["authstate"];  
    }  

    parent::__construct($this->config);
  }

  public function auth() {  
    
      // state 1 requires a GET variable to exist  
      if($this->state == 1 && !isset($_GET["oauth_verifier"])) {  
          $this->state = 0;  
      }  
    
      // Step 1: Get a request token  
      if($this->state == 0) {  
          return $this->getRequestToken();  
      }  
      // Step 2: Get an access token  
      elseif($this->state == 1) {  
          return $this->getAccessToken();  
      }  
    
      // Step 3: Verify the access token  
      return $this->verifyAccessToken();  
  }  


  private function getRequestToken() {  
      // send request for a request token  
      $this->request("POST", $this->url("oauth/request_token", ""), array(  
          // pass a variable to set the callback  
          $protocol = strtolower(array_shift(explode("/", $_SERVER["SERVER_PROTOCOL"]))); 
          'oauth_callback' => $protocol."://".$_SERVER["HTTP_HOST"].filter_var($_SERVER['PHP_SELF'], FILTER_SANITIZE_URL)
      ));  

    
      if($this->response["code"] == 200) {  
            
          // get and store the request token  
          $response = $this->extract_params($this->response["response"]);  
          $_SESSION["authtoken"] = $response["oauth_token"];  
          $_SESSION["authsecret"] = $response["oauth_token_secret"];  
    
          // state is now 1  
          $_SESSION["authstate"] = 1;  
    
          // redirect the user to Twitter to authorize  
          $url = $this->url("oauth/authorize", "") . '?oauth_token=' . $response["oauth_token"];  
          header("Location: " . $url);  
          exit;  
      }  
      return false;  
  }  

  private function getAccessToken() {  
    
      // set the request token and secret we have stored  
      $this->config["user_token"] = $_SESSION["authtoken"];  
      $this->config["user_secret"] = $_SESSION["authsecret"];  
    
      // send request for an access token  
      $this->request("POST", $this->url("oauth/access_token", ""), array(  
          // pass the oauth_verifier received from Twitter  
          'oauth_verifier'    => $_GET["oauth_verifier"]  
      ));  
    
      if($this->response["code"] == 200) {  
    
          // get the access token and store it in a cookie  
          $response = $this->extract_params($this->response["response"]);  
          setcookie("access_token", $response["oauth_token"], time()+3600*24*30);  
          setcookie("access_token_secret", $response["oauth_token_secret"], time()+3600*24*30);  
    
          // state is now 2  
          $_SESSION["authstate"] = 2;  
    
          // redirect user to clear leftover GET variables 
          $protocol = strtolower(array_shift(explode("/", $_SERVER["SERVER_PROTOCOL"]))); 
          header("Location: " . $protocol . "://".$_SERVER["HTTP_HOST"].filter_var($_SERVER['PHP_SELF'], FILTER_SANITIZE_URL) );
          exit;  
      }  
      return false;  
  }  

  private function verifyAccessToken() {  
      $this->config["user_token"] = $_COOKIE["access_token"];  
      $this->config["user_secret"] = $_COOKIE["access_token_secret"];  
    
      // send verification request to test access key  
      $this->request("GET", $this->url("1.1/account/verify_credentials"));  
    
      // store the user data returned from the API  
      $this->userdata = json_decode($this->response["response"]);  
    
      // HTTP 200 means we were successful  
      return ($this->response["code"] == 200);  
  }  


}
