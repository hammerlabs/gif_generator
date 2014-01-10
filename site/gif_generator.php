<?php

require_once('includes/settings.php');
require_once('includes/tumblr_helper.php');    

$oauth_response = authorizeToken();
if (!is_array($oauth_response) && $oauth_response->success === false) {
	header('Content-Type: application/json');
	print( json_encode( $oauth_response ) );
	exit;
}
$usercontent = buildGif();
$usercontent["oauth_response"] = $oauth_response;
$usercontent["post_response"] = postPhoto($usercontent["url"], $share_tags);
//header('Content-Type: application/json');
//print( "<!--" . json_encode( $usercontent ) . "-->" );
echo '<img id="user_gif" src="' . $usercontent["url"] . '" post_id="'.$usercontent["post_response"]["response"]->response->id.'" gif_name="' . $usercontent["name"] . '" />';  
exit;

function meminuse( $l ) {
	$unit = array( 'b', 'kb', 'mb', 'gb', 'tb', 'pb' );
	$size = memory_get_usage( true );
	$meminuse = @round( $size / pow( 1024, ( $i = floor( log( $size, 1024 ) ) ) ), 2 ) . ' ' . $unit[ $i ];
	error_log( "MEM LOG: {$l} / {$meminuse}" ); 
}

function getGifParam($name, $default, $min, $max) {
	$value = $default;
	if(!empty($_GET[$name])) $value = htmlspecialchars($_GET[$name]);   
	if ( is_numeric( $value ) && $value > 0 ) {
		if($value < $min){
			$value = $min;
		}else if($value > $max){
			$value = $max;
		}
	} 
	return $value;
}
function buildGif() {

	//ini_set( 'memory_limit', '32M' );
	$gif_name = $GLOBALS['theme']."_gif_".date("U").".gif";     
	$width = $GLOBALS['output_video_width'];
	$height = $GLOBALS['output_video_height'];
	$gif_frames = $GLOBALS['gif_frames'];  

	$duration = $GLOBALS['duration'];
	$start = getGifParam("s", 1745, 0, $duration);
	$end = getGifParam("e", 1817, $start + $gif_frames, $start + 80);

	$clip_duration = $end - $start;
	$gif_frame_rate = floor( $clip_duration / $gif_frames );//$GLOBALS['gif_frame_rate'];  
	$frame_delay = floor( (($clip_duration - $gif_frames) * 2.5) / $gif_frames );//$GLOBALS['frame_delay'];

	$watermark = new Imagick();
	$watermark->readImage($GLOBALS['watermark_src']);
	$watermark_height=$watermark->getImageHeight();
	$watermark_y = $height - $watermark_height;

	$new_gif = new Imagick();
	//meminuse( __LINE__ );
	//error_log( "start: {$start} / end: {$end} / duration: {$duration} / gif_frame_rate: {$gif_frame_rate} / frame_delay: {$frame_delay}" ); 
	//print( "<!--" . "start: {$start} / end: {$end} / duration: {$duration} / gif_frame_rate: {$gif_frame_rate} / gif_frames: {$gif_frames} / clip_duration: {$clip_duration} / frame_delay: {$frame_delay}" . "-->" );

	for($i=$start;$i<$end;$i=$i+$gif_frame_rate) {
		$image_id = "themes/".$GLOBALS['theme']."/frames/frames_" . $i . ".jpg"; 
	    $frame = new Imagick();
	    $frame->readImage($image_id);
		//$frame->resizeImage($width,$height,Imagick::FILTER_LANCZOS,1);    
		$frame->compositeImage( $watermark, Imagick::COMPOSITE_DEFAULT, 0, $watermark_y );
		$frame->setImageDelay($frame_delay);
	    $new_gif->addImage($frame);  
		$frame->clear();                    
	}

	//meminuse( __LINE__ );
	$gif_url = $GLOBALS['user_images_folder'].'/'.$gif_name;
	$new_gif->writeImages($gif_url, true); // combine all image into one single image
	$new_gif->clear();
	//meminuse( __LINE__ );
	return array('url'=>$gif_url,'name'=>$gif_name);
}
?> 
