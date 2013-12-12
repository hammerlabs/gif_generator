<?php
$theme = "pompeii"; 
$lang = "en"; 
if(!empty($_GET["theme"])) $theme = htmlspecialchars($_GET["theme"]);       
if(!empty($_GET["lang"])) $theme = htmlspecialchars($_GET["lang"]);       
require_once 'themes/'.$theme.'/settings.php'; 
// edit settings in the themes/XXXX/settings.php file
