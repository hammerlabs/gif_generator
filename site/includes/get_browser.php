<?php	    
	function getBrowser() 
	{                   
		
	    $u_agent = $_SERVER['HTTP_USER_AGENT'];       
		$ua = strtolower($_SERVER['HTTP_USER_AGENT']);
	    $bname = 'Unknown';
	    $platform = 'Unknown';
	    $version= "";   
		$modern_browser = "true";  
		$browser_type = "desktop";   
		$browser_scaling = ""; 
		$tracking_type = "site";  
		$user_device = ""; 
		$ub = "";   
		$view_port = "width=device-width, target-densityDpi=device-dpi";
		$device_type = "";    
		$arrow_offset = "";   
		$tracking_type = "site"; 
		
	    //First get the platform?    
	
		
	    if (preg_match('/linux/i', $u_agent)) {
	        $platform = 'linux';   	
			$device_type = "desktop"; 
	    }
	    elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
	        $platform = 'mac';
	 		$device_type = "desktop"; 
	    }
	    elseif (preg_match('/windows|win32/i', $u_agent)) {
	        $platform = 'windows';  
			$device_type = "desktop"; 
	    }
    
	    // Next get the name of the useragent yes seperately and for good reason
	    if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent)) 
	    { 
	        $bname = 'Internet Explorer'; 
	        $ub = "MSIE";   
	    } 
	    elseif(preg_match('/Firefox/i',$u_agent)) 
	    { 
	        $bname = 'Mozilla Firefox'; 
	        $ub = "Firefox"; 
	    } 

	    elseif(preg_match('/Chrome/i',$u_agent)) 
	    { 
	        $bname = 'Google Chrome'; 
	        $ub = "Chrome";   
	    } 
	    elseif(preg_match('/Safari/i',$u_agent)) 
	    { 
	        $bname = 'Apple Safari'; 
	        $ub = "Safari"; 
	    } 
	    elseif(preg_match('/Opera/i',$u_agent)) 
	    { 
	        $bname = 'Opera'; 
	        $ub = "Opera";   
	    } 
	    elseif(preg_match('/Netscape/i',$u_agent)) 
	    { 
	        $bname = 'Netscape'; 
	        $ub = "Netscape";  
	    }  

		
    
	    // finally get the correct version number
	    $known = array('Version', $ub, 'other');
	    $pattern = '#(?<browser>' . join('|', $known) .
	    ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
	    if (!preg_match_all($pattern, $u_agent, $matches)) {
	        // we have no matching number just continue
	    }
    
	    // see how many we have
	    $i = count($matches['browser']);
	    if ($i != 1) {
	        //we will have two since we are not using 'other' argument yet
	        //see if version is before or after the name
	        if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
	            $version= $matches['version'][0];
	        }
	        else {
	            $version= $matches['version'][1];
	        }
	    }
	    else {
	        $version= $matches['version'][0];
	    }
    
	    // check if we have a number
	    if ($version==null || $version=="") {$version="?";}   
	
		if($ub == "Firefox") {
			if($version < 5) $modern_browser = "false";  
			$browser_type = "desktop";
		}
		if($ub == "Chrome") {
			if($version < 6) $modern_browser = "false";  
			$browser_type = "desktop";  
		}
		
		if($ub == "Explorer" || $ub == "MSIE") {
			if($version < 9) $modern_browser = "false";  
			$browser_type = "desktop";   
			$debugging = false;  
		}
		
		if($ub == "Safari") {
			if($version < 5) $modern_browser = "false"; 
			$browser_type = "desktop";  
		}               
		
	
		if (preg_match('/mobile/i', $u_agent)) {
	 		$device_type = "mobile"; 
			$view_port = 'width=1200, user-scalable=no'; 
			$browser_type = "mobile";  
			$modern_browser = "true"; 
			$tracking_type = "mobile";   
	    }  
	  

	    if (preg_match('/android/i', $u_agent)) {
			$device_type = "mobile";
			$browser_type = "Android";   
			$view_port = 'width=1200, user-scalable=0';  
			$modern_browser = "true"; 
			$tracking_type = "mobile";  
	    } 
	
	  	if (preg_match('/iphone/i', $u_agent)) {
			$device_type = "mobile";
			$view_port = 'width=1100, user-scalable=no';    
			$browser_type = "iPhone"; 
			$modern_browser = "true";  
			$tracking_type = "mobile"; 
	    }  
	
		if (preg_match('/IEMobile/i', $u_agent)) {
			$device_type = "mobile";
			$view_port = 'width=1100, user-scalable=no';    
			$browser_type = "IE"; 
			$modern_browser = "true"; 
	    } 
	
		if (preg_match('/ipad/i', $u_agent)) {
			$device_type = "tablet";
			$view_port = 'width=1050, user-scalable=no';    
			$browser_type = "iPad"; 
			$modern_browser = "true"; 
	    }    
	
	    if (preg_match('/tablet/i', $u_agent) || preg_match('/sony tablet/i', $u_agent)) {
			$device_type = "tablet";
			$view_port = 'width=1200, user-scalable=no';    
			$browser_type = "Android"; 
			$modern_browser = "true"; 
	    }
		
	
            
	    return array(
			'userAgent' => $u_agent,
	        'name'      => $bname,
	        'version'   => $version,
	        'platform'  => $platform,
	        'pattern'    => $pattern,
			'view_port' => $view_port,
			'device_type' => $device_type,
			'browser_name' => $ub,   
			'modern_browser' => $modern_browser,
			'browser_type' => $browser_type,
			'arrow_offset' => $arrow_offset,
			'browser_scaling' => $browser_scaling,
			'tracking_type' => $tracking_type
	    );
	} 

	// now try it
	$ua=getBrowser();
	$yourbrowser= "Your browser: " . $ua['name'] . " " . $ua['version'] . " on " .$ua['platform'] . " reports: <br >" . $ua['userAgent'] . $ua['view_port'];; 
	$user_platform= $ua['platform']; 
	$browser_version= $ua['version'];
	$user_browser = $ua['browser_name']; 
	$device_type= $ua['device_type'];   
	$modern= $ua['modern_browser'];   
	$view_port =  $ua['view_port'];   
	$arrow_offset= $ua['arrow_offset'];    
	$browser_type= $ua['browser_type']; 
	$user_agent= $ua['userAgent'];  
	$tracking_type = $ua['tracking_type'];
?>  