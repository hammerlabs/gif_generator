<?php
require_once 'includes/settings.php';   
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
echo $less->compileFile("themes/".$theme."/".$theme.".less");
