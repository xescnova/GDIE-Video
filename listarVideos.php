<?php
$arrFiles = array();
$handle = opendir("video/");
//$handle = opendir("assets/img");

if ($handle) {
    while (($entry = readdir($handle)) !== FALSE) {
        if (($entry != ".") && ($entry != "..") && (((strpos($entry, '.mp4') !== false) || (strpos($entry, '.mpd') !== false)))) {
            $arrFiles[] = $entry;
        }
    }
}

echo json_encode($arrFiles, JSON_UNESCAPED_SLASHES);

closedir($handle);
