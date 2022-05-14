<?php
$requestPayload = file_get_contents("php://input");
$object= json_decode($requestPayload,true);

//var_dump($object);

//$escenas = '"'.$object[0].'"';
$escenas = '"'.$object[0];
$escenas = basename($escenas);
print($escenas);
$fp = fopen($escenas, "a+"); //crea archivo .vtt con el nombre del archivo
file_put_contents($escenas, "WEBVTT"); //escribe la cabecera del archivo VTT
//file_put_contents($escenas, escenas.id,FILE_APPEND); //escribe la cabecera del archivo VTT


for ($i = 1; $i < sizeof($object); $i++) {
    file_put_contents($escenas,"\n",FILE_APPEND);
    file_put_contents($escenas,$object[$i]['id'],FILE_APPEND);
    file_put_contents($escenas,"\n",FILE_APPEND);  
    file_put_contents($escenas,decimal_to_time($object[$i]['ini']),FILE_APPEND); 
    file_put_contents($escenas," --> ",FILE_APPEND);
    file_put_contents($escenas,decimal_to_time($object[$i]['fin']),FILE_APPEND); 
    file_put_contents($escenas,"\n",FILE_APPEND); 
    file_put_contents($escenas,$object[$i]['texto'],FILE_APPEND); 
    file_put_contents($escenas,"\n\n",FILE_APPEND); 
}

//console.log(videoMrRobot.children[2].src);

//Para pasar de float a formato vtt HH:MM:SS:MS
function decimal_to_time($decimal) {
    $hours = floor($decimal / 60);
    $minutes = floor($decimal % 60);
    $seconds = $decimal - (int)$decimal;
    $seconds = round($seconds * 60);

    return "00:".str_pad($hours, 2, "0", STR_PAD_LEFT) . ":" . str_pad($minutes, 2, "0", STR_PAD_LEFT) . "." . str_pad($seconds, 2, "0", STR_PAD_LEFT)."0";
}
?>