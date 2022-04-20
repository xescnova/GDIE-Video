<?php
$arrFiles = array();
$handle = opendir("assets/img/");

if ($handle) {
    while (($entry = readdir($handle)) !== FALSE) {
        if (($entry != ".") && ($entry != "..") && (((strpos($entry, '.jpg') !== false) || (strpos($entry, '.ogg') !== false)))) {
            $arrFiles[] = $entry;
        }
    }
}

echo json_encode($arrFiles, JSON_UNESCAPED_SLASHES);

closedir($handle);