<?php
$theme = "pompeii"; 
$lang = "en"; 
$site_base_folder = dirname(__FILE__)."/../";

if(!empty($_GET["theme"])) $theme = htmlspecialchars($_GET["theme"]);
$theme_settings_file = "{$site_base_folder}themes/{$theme}/settings.php"; 
if (!file_exists($theme_settings_file))  {
	error_log("invalid theme '{$theme}' no settings.php file found at {$theme_settings_file}", 0);
	//exit;
	$theme = "default";
	$theme_settings_file = "{$site_base_folder}themes/{$theme}/settings.php";
}
if(!empty($_GET["lang"])) $lang = htmlspecialchars($_GET["lang"]);       
$lang_settings_file = "{$site_base_folder}themes/{$theme}/lang-${lang}.js"; 
if (!file_exists($theme_settings_file))  {
	error_log("invalid lang '{$lang}' no lang-{$theme}-${lang}.js file found at {$lang_settings_file}", 0);
	//exit;
	$lang = "en";
	$lang_settings_file = "{$site_base_folder}themes/{$theme}/lang-${lang}.js"; 
}
require_once $theme_settings_file; 

// edit settings in the themes/XXXX/settings.php file
