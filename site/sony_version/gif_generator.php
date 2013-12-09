<?php   

error_reporting(E_ALL);   
  
/*define("CONSUMER_KEY", "CTz2LZ01VUTVhdoib2XM9wDvdE5bphn9wmsi3zyTmYrtmTuMhD");
define("CONSUMER_SECRET", "hod74WSG3ZLRJs2tdOO0FWRuxt4gRRyxnzJbj2auC9E4FD5iI0");
define("OAUTH_TOKEN", "ri7IoyC2uNo56yRdXE4qgzAMepQPdaHt28FLEBXYu6kSSb2ixv");
define("OAUTH_SECRET", "LARTp5dptZN6X6wO2D8bXPMyishfz4nExEm1x3znmIfwjsP1gx"); */
//keys for americanhustledev.tumblr.com
define("CONSUMER_KEY", "VTrFOn4QnQvbFZ8T99yzbA1uEbITTvjZOxHhdBJ6b5sZvTElwe");
define("CONSUMER_SECRET", "dRtvkuC0CrNNFelkomO7h1kiNwHQBW0BhzNWUQ4j7QFRt0v9Qw");
define("OAUTH_TOKEN", "ojLMdByU0IyDKCaMZHyq84Tifg8DxoMQzaYnfvlKsizqu0GSZs");
define("OAUTH_SECRET", "EYBF7qfIfzbEgbj1Aw3Dq2XosPha4YWGfDh9ktqBJt6SO0exti"); 
//define("CDN", "http://cdn-dev.triggerglobal.com/sony/americanhustle/gif_generator/cdn/");
//define("CDN", "http://stage.sonypictures.com/movies/americanhustle/tumblr/gifgenerator/");    
define("CDN", "http://stage.sonypictures.com/movies/americanhustle/tumblr/gifgenerator/"); 
//define("CDN", "http://sonypictures.com/movies/americanhustle/tumblr/gifgenerator/");    
//define("BLOGNAME", "ahdev.tumblr.com");     
define("BLOGNAME", "americanhustlemoviedev.tumblr.com"); 
//define("BLOGNAME", "americanhustlemovie.tumblr.com");            
     	
require_once('tumblroauth/tumblroauth.php');    

authorizeToken();   

function authorizeToken() {   
	     
	$req_url = 'http://www.tumblr.com/oauth/request_token';
	$authurl = 'http://www.tumblr.com/oauth/authorize';
	$acc_url = 'http://www.tumblr.com/oauth/access_token';

	$tum_oauth = new TumblrOAuth(CONSUMER_KEY, CONSUMER_SECRET);
	$request_token = $tum_oauth->getRequestToken();

	$_SESSION['request_token'] = $token = $request_token['oauth_token'];
	$_SESSION['request_token_secret'] = $request_token['oauth_token_secret'];

	// Check the HTTP Code.  It should be a 200 (OK), if it's anything else then something didn't work.
	switch ($tum_oauth->http_code) {
	  case 200:
	        buildGif();   
	    break;
	default:
	    // Give an error message
	    echo 'Could not connect to Tumblr. Refresh the page or try again later.';
	}   

}
 
  
function buildGif() {     
	
	$new_gif = new Imagick();

		$frame_rate 	= 	24;
	$duration 		= 	3300;
	
	
	
	if(!empty($_GET["d"])) $duration = htmlspecialchars($_GET["d"]);   
	if($duration > 5000 || $duration <= 0){
		///set duration to 100 if it is greater than 180 or less than 0
		$duration = 3300;
		
	}
	///start default at 100
	$start = 100; 
	if(!empty($_GET["s"])) {
		
		$start = htmlspecialchars($_GET["s"]);
		if($start < 0 || $start > $duration){
			$start = 0;
			
		}
		//$start = round($start * $frame_rate);
	}  

	$end = 200; 
	if(!empty($_GET["e"])) {
		$end = htmlspecialchars($_GET["e"]);  
		//$end = round($end * $frame_rate);  
		if($end > $duration || $end < 0) {
		
			$end = $duration - 200;
		}
	} 
	if($end - $start <= 1 || $end - $start > 80){
		///make sure the difference between start and end is greater than 1
		
		
		$start = 1745;
		$end   = 1817;
		$duration = 3300;
		
	}
	
	   
      
	$curr_time = date("U");
	$id = "ah_gif_" . $curr_time;     
	$width = 400;
	$height = 169;
	$suffix = ".gif";
	$gif_name = $id.$suffix;    
	$title = "#AmericanHustle";  
	$gif_frame_rate = 4;  
	$frame_delay = 15;
	//$watermark = new Imagick( "images/wwd_logo.png" );

	for($i=$start;$i<$end;$i=$i+$gif_frame_rate)
	{

		$image_id = "frames/frames_" . $i . ".jpg"; 
		$textx = 10;   
		$texty = 160;
		$font_size = 18;    
	    $frame = new Imagick();
	    $frame->readImage($image_id);
		$frame->resizeImage($width,$height,Imagick::FILTER_LANCZOS,1);    
		//$frame->compositeImage( $watermark, imagick::COMPOSITE_OVER, 280, 144 );  		 

		$shadow = new ImagickDraw();
		$shadow->setFillColor('#ffc500');   
		$shadow->setFillOpacity(.5);    
		$shadow->setFont('fonts/Baumans-Regular.ttf');
		$shadow->setFontSize( $font_size );
		$shadow->setStrokeColor("#000");    
		$shadow->setstrokewidth(10);
		$shadow->setStrokeOpacity(.15);   
		$shadow->setStrokeAntialias(500);  
		$frame->annotateImage($shadow, $textx, $texty, 0, $title);

		$text = new ImagickDraw();
		$text->setFillColor('#ffc500');   
		$text->setFillOpacity(1);
		$text->setFont('fonts/Baumans-Regular.ttf');
		$text->setFontSize( $font_size );
		$frame->annotateImage($text, $textx, $texty, 0, $title);         

		$frame->setImageDelay($frame_delay);

	    $new_gif->addImage($frame);                      

	}

	$new_gif->writeImages('gifs/' . $gif_name, true); // combine all image into one single image   	

	$gif_url = 'gifs/' . $gif_name;  
	//echo '<img id="new_gif_img" post_id="" src="' . $gif_url . '" style="margin:70px 120px 70px 120px;"/>';  
	//echo $gif_url;        

	postGif($gif_url, $gif_name);    
	
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

function postGif($gif_url, $gif_name) {    
	
	//echo $gif_url. "<br/>";  
	
	$req_url = 'http://www.tumblr.com/oauth/request_token';
	$authurl = 'http://www.tumblr.com/oauth/authorize';
	$acc_url = 'http://www.tumblr.com/oauth/access_token';

	$headers = array("Host" => "http://api.tumblr.com/", "Content-type" => "application/x-www-form-urlencoded", "Expect" => "");
	$params = array("tags" => "AmericanHustleTrailer", "data" => array(file_get_contents($gif_url)), "type" => "photo");

	$blogname = BLOGNAME;    
		
	oauth_gen("POST", "http://api.tumblr.com/v2/blog/$blogname/post", $params, $headers);
    
	
	$ch = curl_init();
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
	//echo "2nd " . $response. "<br/>";  
	$response = json_decode( $response );
    //echo "2nd " . $response. "<br/>";   
	 if ( isset( $response->meta ) && isset( $response->meta->status ) && $response->meta->status == 201 ) {   
		$post_id = $response->response->id;
		$post_url = "http://{$blogname}/post/{$post_id}";
		$response->response->post_url = $post_url; 
		//echo $post_url. "<br/>";              
	    echo '<img id="new_gif_img" post_id="' . $post_id . '" src="' . $gif_url . '" gif_name="' . $gif_name . '" style="margin:70px 120px 70px 120px;"/>';  
	   //return array( 'status' => true, 'response' => $response->response );
	} else {
		//return array( 'status' => false, 'errors' => $response->response->errors );
	}
        
	
}    

 
?> 
