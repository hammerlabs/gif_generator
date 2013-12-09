<?php  
session_start();



$file_name = $_GET['f']; 
if(strpos($file_name, '.gif') === false && strpos($file_name, '.GIF') === false){
	////did not find the gif extension
	die("I'm sorry, you may not download that file.");
	
}
$file_name = str_replace('../', '',$file_name);
$file_name = str_replace('..', '',$file_name);

                  
//$download_path = './upload/';

//if(eregi("\.\.", $filename)) die("I'm sorry, you may not download that file.");

//$file = str_replace("..", "", $filename);
                         

$file_url = "gifs/" . $file_name;
 header('Content-Type: application/octet-stream');
 header("Content-Transfer-Encoding: Binary"); 
 header("Content-disposition: attachment; filename=\"".$file_name."\""); 
 readfile($file_url);  

?>