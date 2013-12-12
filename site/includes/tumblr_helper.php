<?php
require_once('tumblroauth/tumblroauth.php');  
  
$req_url = 'http://www.tumblr.com/oauth/request_token';
$authurl = 'http://www.tumblr.com/oauth/authorize';
$acc_url = 'http://www.tumblr.com/oauth/access_token';
        
function authorizeToken() {   
    $tum_oauth = new TumblrOAuth(CONSUMER_KEY, CONSUMER_SECRET);
    $request_token = $tum_oauth->getRequestToken();

    $_SESSION['request_token'] = $token = $request_token['oauth_token'];
    $_SESSION['request_token_secret'] = $request_token['oauth_token_secret'];

    // Check the HTTP Code.  It should be a 200 (OK), if it's anything else then something didn't work.
    if ($tum_oauth->http_code == 200) {
        return array('success' => true, 'response' => $tum_oauth );
    } else {
        return array('success' => false, 'response' => $tum_oauth );
    }
}

function postPhoto($url, $tags) {    
    $headers = array("Host" => "http://api.tumblr.com/", "Content-type" => "application/x-www-form-urlencoded", "Expect" => "");
    $params = array("tags" => $tags, "data" => array(file_get_contents($url)), "type" => "photo", "state" => "draft");
    $blogname = BLOGNAME;    
    oauth_gen("POST", "http://api.tumblr.com/v2/blog/$blogname/post", $params, $headers);
    $ch = curl_init();
    if (ENVIRONMENT != "development") {
        if(isset($_SERVER['HTTP_FRONT_END_HTTPS'])  && (strcasecmp($_SERVER['HTTP_FRONT_END_HTTPS'],"ON")==0)){
            $proxyport=$_SERVER['HTTPS_PROXY'];
        } else {
            $proxyport=$_SERVER['HTTP_PROXY'];
        }        
        $parseArray=parse_url($proxyport);
        $port=$parseArray['port'];
        $proxy=$parseArray['host'];
        curl_setopt($ch, CURLOPT_PROXY, $proxy.':'.$port);
    }
    curl_setopt($ch, CURLOPT_USERAGENT, "PHP Uploader Tumblr v1.0");
    curl_setopt($ch, CURLOPT_URL, "http://api.tumblr.com/v2/blog/$blogname/post");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );

    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Authorization: " . $headers['Authorization'],
        "Content-type: " . $headers["Content-type"],
        "Expect: ")
    );

    $params = http_build_query($params);

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

    $response = curl_exec($ch);  
    $response = json_decode( $response );
    $success = false;
    if ( isset( $response->meta ) && isset( $response->meta->status ) && $response->meta->status == 201 ) {   
        $success = true;
        $response->response->post_url = "http://{$blogname}/post/".$response->response->id; 
    }
    return array('success' => $success, 'response' => $response );
}    

function oauth_gen($method, $url, $iparams, &$headers) {
    
    $iparams['oauth_consumer_key'] = CONSUMER_KEY;
    $iparams['oauth_nonce'] = strval(time());
    $iparams['oauth_signature_method'] = 'HMAC-SHA1';
    $iparams['oauth_timestamp'] = strval(time());
    $iparams['oauth_token'] = OAUTH_TOKEN;
    $iparams['oauth_version'] = '1.0';
    $iparams['oauth_signature'] = oauth_sig($method, $url, $iparams);
    //print $iparams['oauth_signature'];  
    $oauth_header = array();
    foreach($iparams as $key => $value) {
        if (strpos($key, "oauth") !== false) { 
           $oauth_header []= $key ."=".$value;
        }
    }
    $oauth_header = "OAuth ". implode(",", $oauth_header);
    $headers["Authorization"] = $oauth_header;
}

function oauth_sig($method, $uri, $params) {
    
    $parts []= $method;
    $parts []= rawurlencode($uri);
   
    $iparams = array();
    ksort($params);
    foreach($params as $key => $data) {
            if(is_array($data)) {
                $count = 0;
                foreach($data as $val) {
                    $n = $key . "[". $count . "]";
                    $iparams []= $n . "=" . rawurlencode($val);
                    $count++;
                }
            } else {
                $iparams[]= rawurlencode($key) . "=" .rawurlencode($data);
            }
    }
    $parts []= rawurlencode(implode("&", $iparams));
    $sig = implode("&", $parts);
    return base64_encode(hash_hmac('sha1', $sig, CONSUMER_SECRET."&". OAUTH_SECRET, true));
}

