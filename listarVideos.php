<?php
$arrFiles = array();
//$handle = opendir("video/");
$handle = opendir("assets/img");
//$handle = opendir("https://alumnes-ltim.uib.es/gdie2206/video");

if ($handle) {
    while (($entry = readdir($handle)) !== FALSE) {
        if (($entry != ".") && ($entry != "..") && (((strpos($entry, '.mp4') !== false) || (strpos($entry, '.m3u8') !== false)))) {
            $arrFiles[] = $entry;
        }
    }
}

echo json_encode($arrFiles, JSON_UNESCAPED_SLASHES);

closedir($handle);
