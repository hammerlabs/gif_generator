<?php
function annotateLineSpaced($image, $draw, $x, $y, $ang, $lines, $spacing) {
   //$lines = explode("\n", $text);
   foreach ($lines as $line) {
      $image->annotateImage($draw, $x, $y, $ang, $line);
      $y += $spacing;
   }
}

function wordWrapAnnotation(&$image, &$draw, $textlines, $maxWidth)
{
    $lines = array();
    $i = 0;
    $j = 0;
    //$lineHeight = 0;
    while ($j < count($textlines)) {
	    $i = 0;
	    $words = explode(" ", $textlines[$j]);
 	    while($i < count($words) ) {
	        $currentLine = $words[$i];
	        if($i+1 >= count($words)) {
	            $lines[] = $currentLine;
		    	//print("1: used all words in line: ".$currentLine."\n");
	            break;
	        }
	        //Check to see if we can add another word to this line
	        $metrics = $image->queryFontMetrics($draw, $currentLine . ' ' . $words[$i+1]);
	        while($metrics['textWidth'] <= $maxWidth) {
	            //If so, do it and keep doing it!
	            $currentLine .= ' ' . $words[++$i];
	            if($i+1 >= count($words)) {
	                break;
	            }
	            $metrics = $image->queryFontMetrics($draw, $currentLine . ' ' . $words[$i+1]);
	        }
	        //We can't add the next word to this line, so loop to the next line
	        $lines[] = $currentLine;
	        $i++;
	        //Finally, update line height
	        //if($metrics['textHeight'] > $lineHeight)
	            //$lineHeight = $metrics['textHeight'];
	    }
	    $j++;
	    //return array($lines, $lineHeight);
    }
    return $lines;
}