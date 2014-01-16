<?php
require_once 'includes/settings.php';   
$theme_less_file = "{$site_base_folder}themes/{$theme}/main.less"; 
if (!file_exists($theme_less_file))  {
	error_log("invalid less path for '{$theme}' no main.less file found at {$theme_less_file}", 0);
	exit;
}

require_once('includes/lessc.php');    
$less = new lessc;
$less->setVariables(array(
  "cdn" => '~"'.CDN.'"',
  "theme" => $theme,
  "lang" => $lang,
  "font1" => $font1,
  "font2" => $font2,
  "video_width" => $video_width."px",
  "video_height" => $video_height."px",
  "output_video_width" => $output_video_width."px",
  "output_video_height" => $output_video_height."px"
));
header('Content-Type: text/css');
echo $less->compileFile($theme_less_file);
