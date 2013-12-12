<?php
error_reporting(E_ALL);

$title = "Pompeii - Gif Generator"; 
$desc = "Get updates on Paul W.S. Anderson's action drama, Pompeii, starring Kit Harington, Emily Browning and Kiefer Sutherland. In theaters 2014."; 
$url = "http://pompeiimovie.tumblr.com/"; 
$image = "http://flash.sonypictures.com/movies/pompeii/share/tumblr/pompeii_share.jpg"; 
$facebook_url = "https://www.facebook.com/PompeiiMovie";    
$keywords = "Pompeii,Mt. Vesuvius,Paul W.S. Anderson,Action,Drama,Emily Browning,Kit Harington,Carrie-Anne Moss,Kiefer Sutherland,Paz Vega,Jessica Lucas,Sony Pictures,FilmDistrict,TriStar Pictures,Constantin Film";
$og_title = "Pompeii – Official Movie Tumblr Site";
$share_tags = "#PompeiiMovie";    
$share_title = "Pompeii";    
$share_content = "Pompeii share content"; 
$share_content_tumblr = "Pompeii tumblr share content"; 
$share_url = "http://pompeiimovie.tumblr.com/"; 
$share_image = "http://flash.sonypictures.com/movies/pompeii/share/tumblr/pompeii_share.jpg"; 
$view_on_wall_link = "/tagged/pompeiimovie";
$font1 = "goudytrajanregular";
$font2 = "Lato";
$video_width = 640;
$video_height = 266;
$output_video_width = 400;
$output_video_height = 166;
$gif_frame_rate = 4;  
$frame_delay = 15;
$watermark_src = "themes/".$theme."/watermark.png"; 
$user_images_folder = "gifs";

$_environments_list = array(
	'testing' => array(
		'stage.sonypictures.com'
	),
	'production' => array(
		'www.sonypictures.com'
	)
);
$debugging = true; 
$tracking = false; 
date_default_timezone_set('UTC');

setEnvironment($_environments_list);
switch (ENVIRONMENT) {
	case 'development':
		define("CDN", "../cdn/");
		define("BLOGNAME", "pompeiidev.tumblr.com");
		define("CONSUMER_KEY", "CTz2LZ01VUTVhdoib2XM9wDvdE5bphn9wmsi3zyTmYrtmTuMhD");
		define("CONSUMER_SECRET", "hod74WSG3ZLRJs2tdOO0FWRuxt4gRRyxnzJbj2auC9E4FD5iI0");
		define("OAUTH_TOKEN", "ri7IoyC2uNo56yRdXE4qgzAMepQPdaHt28FLEBXYu6kSSb2ixv");
		define("OAUTH_SECRET", "LARTp5dptZN6X6wO2D8bXPMyishfz4nExEm1x3znmIfwjsP1gx"); 
		//define("TWITTER_CONSUMER_KEY", "b5SgSCBxWyhao6NzykdrQ"); 
		//define("TWITTER_CONSUMER_SECRET", "PjzQQxPrEazIlk3AyUfpxZ1AvFbbhVIkiS4pETfJU"); 
		break;

	case 'testing':
		$debugging = false; 
		$tracking = true; 
		define("CDN", "//stage.sonypictures.com/origin-flash/movies/pompeii/tumblr/gifgenerator/");
		define("BLOGNAME", "pompeiimoviedev.tumblr.com"); 
		define("CONSUMER_KEY", "VTrFOn4QnQvbFZ8T99yzbA1uEbITTvjZOxHhdBJ6b5sZvTElwe");
		define("CONSUMER_SECRET", "dRtvkuC0CrNNFelkomO7h1kiNwHQBW0BhzNWUQ4j7QFRt0v9Qw");
		define("OAUTH_TOKEN", "ojLMdByU0IyDKCaMZHyq84Tifg8DxoMQzaYnfvlKsizqu0GSZs");
		define("OAUTH_SECRET", "EYBF7qfIfzbEgbj1Aw3Dq2XosPha4YWGfDh9ktqBJt6SO0exti"); 
		//define("TWITTER_CONSUMER_KEY", "gUrBZNK9SUVHeH1VBhqA"); 
		//define("TWITTER_CONSUMER_SECRET", "bgTEFkMMBX9QwAR7U9RcSLtiz0ndPT6X1w1gk3i7o"); 
		break;

	case 'production':
		$debugging = false; 
		$tracking = true; 
		error_reporting(0);
		define("CDN", "//flash.sonypictures.com/movies/pompeii/tumblr/gifgenerator/");    
		define("BLOGNAME", "pompeiimovie.tumblr.com");            
		define("CONSUMER_KEY", "AEbtgNWSbnRCFndfKHbs3BbokGwxtcPcOM9QG4ZiAGN0EzjRcy");
        define("CONSUMER_SECRET", "4ZkUP7sKzno9I2uvuFTh1UQUCAxZHNj8wrRptIiQJxXpiZFBzB");
        define("OAUTH_TOKEN", "mIOEofDsVlL4aVAURn3fkDLndzomAEYj7WOaw5fGpgWnUvrvlS");
        define("OAUTH_SECRET", "Fav0av6joZXZYKZSiPj9PLsLvkP4h6h2eeqwPIpA6GJByhScxI");
        //define("TWITTER_CONSUMER_KEY", "6HdHkNJAP8K8XCdWXgwteg");
        //define("TWITTER_CONSUMER_SECRET", "AIJ2q44oskbVYSFY8cX4N5nuNFsZpuEux7sbM3DfTeM"); 
		break;

	default:
		exit('The application environment is not set correctly.');
}

$share_blogname = BLOGNAME; 
//$preload = createImagePreload("assets/img");
$webroot = curPagePath(); 






function setEnvironment($list) {
	$_host_name = $_SERVER[ 'HTTP_HOST' ];
	$_this_env = 'development'; // this is the default env
	foreach ( $list as $env_name => $env_urls ) {
		foreach ( $env_urls as $url ) {
			if ( preg_match( "/{$url}$/", $_host_name ) ) {
				$_this_env = $env_name; // boom, we found it
				break 2;
			}
		}
	}
	define( 'ENVIRONMENT', $_this_env );
}

function curPagePath() {
	$protocol = strtolower(array_shift(explode("/", $_SERVER["SERVER_PROTOCOL"])));
	$pathArr = explode("/", $_SERVER["SCRIPT_NAME"]);
	array_pop($pathArr);
	$path = implode("/",$pathArr)."/";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$fullpath = $protocol."://".$_SERVER["HTTP_HOST"].":".$_SERVER["SERVER_PORT"].$path;
	} else {
		$fullpath = $protocol."://".$_SERVER["HTTP_HOST"].$path;
	}
	return $fullpath;
}

function createImagePreload($dir) { 
    $root = scandir($dir); 
    foreach($root as $value) { 
        if($value === '.' || $value === '..') {continue;} 
        if(is_file("$dir/$value")) {$result[]="$dir/$value";continue;} 
        foreach(createImagePreload("$dir/$value") as $value) { 
            $result[]=$value; 
        } 
    } 
	$preload = "\t\t<div style='display: none;''>\n";
	foreach ($result as $img){
		$preload .= "\t\t\t<img src='".CDN.str_replace("assets/", "", $img)."' />\n";
	}
	$preload .= "\t\t</div>";
	return $preload;
} 
