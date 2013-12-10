<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">

<html lang="en">
<head>
	
	
	<?php        

	include 'includes/get_url.php';   
	include 'includes/get_browser.php';   
	
	$config = array(
		"user_browser" => $user_browser,
		"device_type" => $device_type,
		"browser_version" => $device_type,
		"browser_type" => $browser_type,
		"user_agent" => $user_agent,
		"modern_browser" => $modern,
		"view_port" => $view_port,
		"site_url" => $url,
		"cdn" => $cdn,
		"debugging" => $debugging   
		 );
	
	?>  
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Pompeii Gif Creator</title> 
    <meta name="viewport" content="<?php echo $view_port; ?>">

	<link href='http://fonts.googleapis.com/css?family=Baumans|Raleway' rel='stylesheet' type='text/css'>  
	<link href="js/libraries/video-js/video-js.css" rel="stylesheet" type="text/css">  
	<link rel="stylesheet" href="css/theme.css" />  
	<link rel="stylesheet" href="css/ui-lightness/jquery-ui-1.10.3.custom.css" />  
	
  	<script type="text/javascript">
		     
	   
		<?php
			$js_array = json_encode($config);
			echo "var config = ". $js_array . ";\n";
		?>  
		  
        //alert("device_type = "+config["device_type"]+" browser_type = "+config["browser_type"])
	</script>      

</head>
<body>  
	<script src="js/libraries/video-js/video.js" type="text/javascript"></script>   
	<script src="js/libraries/jquery-1.9.1.js" type="text/javascript"></script>  
	<script src="js/libraries/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>  
	<script src="js/libraries/TweenMax.min.js" type="text/javascript"></script> 
	<script src="js/libraries/modernizr.js" type="text/javascript"></script>
	<script src="js/site/site.js" type="text/javascript"></script>     
	<script src="js/site/lang.js" type="text/javascript"></script>     
	
	<?
	//phpinfo()
	?> 
<!--
	<div id="omniturecode">
		<script type="text/javascript" src="http://www.sonypictures.com/global/scripts/s_code.js"></script>
		<script type="text/javascript">                                                                                 
		  s.pageName='us:movies:americanhustle:tumblr:gifcreator:index.html'
		  s.channel=s.eVar3='us:movies'
		  s.prop3=s.eVar23='us:movies:americanhustle:gifcreator'
		  s.prop4=s.eVar4='us:americanhustle'
		  s.prop5=s.eVar5='us:movies:blog'
		  s.prop11='us'     
		  var s_code=s.t();if(s_code)document.write(s_code) 
		</script>   
	</div> 
-->
   
</body>
</html>
