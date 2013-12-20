<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">

<html lang="en">
    <head>
    <?php
	require_once 'includes/settings.php';   
	require_once 'includes/browser_helper.php';   
	$config = array(
		"user_browser" => $user_browser,
		"device_type" => $device_type,
		"browser_version" => $device_type,
		"browser_type" => $browser_type,
		"user_agent" => $user_agent,
		"modern_browser" => $modern,
		"view_port" => $view_port,
		"site_url" => $url,
		"cdn" => CDN,
		"share_fb_app_id" => $share_fb_app_id,
		"share_blogname" => $share_blogname,
		"share_tags" => $share_tags,
		"share_title" => $share_title,
		"share_content" => $share_content,
		"share_url" => $share_url,
		"share_image" => $share_image,
		"webroot" => $webroot,
		"user_images_folder" => $user_images_folder,
		"view_on_wall_link" => $view_on_wall_link,
		"video_width" => $video_width,
		"video_height" => $video_height,
		"font1" => $font1,
		"font2" => $font2,
		"debugging" => $debugging,
		"tracking" => $tracking,
		"theme" => $theme,
		"btn_rollovers" => $btn_rollovers,
		"environment" => ENVIRONMENT 
	);
	?>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title><?php echo $title; ?></title>
    <meta name="description" content="<?php echo $desc; ?>">
    <meta name="keywords" content="<?php echo $keywords; ?>">
    <meta name="viewport" content="<?php echo $view_port; ?>">
    <meta property="og:title" content="<?php echo $og_title; ?>" />
    <meta property="og:description" content="<?php echo $desc; ?>" />
    <meta property="og:url" content="<?php echo $url; ?>" />
    <meta property="og:image" name="thumb" content="<?php echo $image; ?>" />
    <meta property="og:type" content="movie" />
    <meta property="og:site_name" content="<?php echo $title; ?>" />
    <link href="js/libraries/video-js/video-js.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="theme_style.php?theme=<?php echo $theme;?>" />
    <link rel="stylesheet" href="css/ui-lightness/jquery-ui-1.10.3.custom.css" />
    <script type="text/javascript">
        <?php echo "var config = ". json_encode($config) . ";";?>  
    </script>
    </head>
    <body>
        <div id="fb-root"></div>
        
        <script src="js/libraries/video-js/video.js" type="text/javascript"></script> 
        <script src="js/libraries/jquery-1.9.1.js" type="text/javascript"></script> 
        <script src="js/libraries/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script> 
        <script src="js/libraries/jquery.ui.touch-punch.min.js" type="text/javascript"></script> 
        <script src="js/libraries/TweenMax.min.js" type="text/javascript"></script> 
        <script src="js/libraries/modernizr.js" type="text/javascript"></script> 
        <script src="js/site/share.js" type="text/javascript"></script> 
        <script src="js/site/site.js" type="text/javascript"></script> 
        <script src="themes/<?php echo $theme;?>/lang-<?php echo $theme;?>-<?php echo $lang;?>.js" type="text/javascript"></script>
        
        <div id="site_holder">
            <div id="site_content">
                <div id="gif_title">GIF GENERATOR</div>
                <div id="steps">
                    <div class="step">
                        <div class="step_desc content_font"></div>
                        <div class="step_content"></div>
                        <div id="slider_holder">
                        	<div id="slider_instructions" class="content_font"></div>
                            <div id="slider_range"></div>
                            <div id="slider_instructions2" class="content_font"></div>
                        </div>
                        <div class="step_nav"></div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
