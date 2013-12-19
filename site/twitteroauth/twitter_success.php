<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
    <head>

<?php        

require_once '../settings.php';   
require_once '../includes/browser_helper.php';    

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
    "share_blogname" => $share_blogname,
    "share_tags" => $share_tags,
    "share_title" => $share_title,
    "share_content" => $share_content,
    "share_url" => $share_url,
    "share_image" => $share_image,
    "webroot" => $webroot,
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

        <link href='http://fonts.googleapis.com/css?family=Baumans|Raleway' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Raleway:500' rel='stylesheet' type='text/css'>
        <link href='../<?php echo CDN;?>css/normalize.min.css' rel='stylesheet' type='text/css'>
        <link href='../<?php echo CDN;?>css/main.css' rel='stylesheet' type='text/css'>
        <link href='<?php echo CDN;?>css/mobile.css' rel='stylesheet' type='text/css'>

    </head>
    <body>
        <!--h2 style="color:white;">Shared to Twitter successfully</h1-->
        <script type="text/javascript">
            setTimeout(function(){
                window.close();
            }
            ,1000);
        </script>
    </body>
</html>
