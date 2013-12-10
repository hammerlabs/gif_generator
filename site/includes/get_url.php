<?php
	function curPageURL() {
		 $pageURL = 'http';
		 //if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
		 $pageURL .= "://";
		 if ($_SERVER["SERVER_PORT"] != "80") {
		  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
		 } else {
		  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
		 }
		 return $pageURL;  
	}  
	
	function stripParameters($url) {
		$paramIndex = strpos( $url ,'?');
		if($paramIndex !== false){
			return substr($url, 0, $paramIndex);
		}else{
			return $url;
		}
	} 
	
	function getUrl() {
		 $pageURL = 'http';
		 //if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
		 $pageURL .= "://";
		 if ($_SERVER["SERVER_PORT"] != "80") {
		  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
		 } else {
		  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
		 }
		 return $pageURL;  
	}  

	$current_url = stripParameters(curPageURL()); 
	$cdn = "";
	$debugging = false; 
	$url = getUrl();
	if (strpos($current_url, "http://ahdev.tumblr.com/")){
	   	$cdn = "http://cdn-dev.triggerglobal.com/sony/americanhustle/gif_generator/cdn/"; 
		$debugging = false; 

	}elseif (strpos($current_url, "ahgifdev.tumblr.com")){
	   	$cdn = "http://cdn-dev.triggerglobal.com/sony/americanhustle/gif_generator/cdn/"; 
		$debugging = false; 
         
	}elseif (strpos($current_url, "stage.sonypictures.com")){   
		$cdn = "http://stage.sonypictures.com/origin-flash/movies/americanhustle/gif_generator/";
		$debugging = false;      
		
	}elseif (strpos($current_url, "www.americanhustle-movie.com")){       
		$cdn = " http://flash.sonypictures.com/movies/americanhustle/gif_generator/cdn/";
		$debugging = false;
	
	}elseif (strpos($current_url, "dev.triggerglobal.com")){  	
	   	$cdn = "http://cdn-dev.triggerglobal.com/sony/americanhustle/gif_generator/cdn/";     
		$debugging = true; 

	}elseif (strpos($current_url, "qa.triggerglobal.com")){  	
	   	$cdn = "http://cdn-dev.triggerglobal.com/sony/americanhustle/gif_generator/cdn/";  
		$debugging = true;  

	}elseif (strpos($current_url, "stage.triggerglobal.com")){  	
	   	$cdn = "http://cdn-dev.triggerglobal.com/sony/americanhustle/gif_generator/cdn/"; 
		$debugging = true;
	}elseif (strpos($current_url, "cdn-dev.triggerglobal.com")){  	
	   	$cdn = 	"http://cdn-dev.triggerglobal.com/sony/americanhustle/gif_generator/cdn/"; 
		$debugging = true;
	}elseif (strpos($current_url, ".local/") || strpos($current_url, "hammerlabs.com/")){  	
	   	$cdn = "../cdn/";
		$debugging = true;   
	}else {  	
	   	$cdn = "http://flash.sonypictures.com/movies/americanhustle/gif_generator/";  
	   	
		$debugging = false;
	} 
	

?>