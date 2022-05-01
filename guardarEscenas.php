<?php
$requestPayload = file_get_contents("php://input");
$object= json_decode($requestPayload,true);

var_dump($object);
$fp = fopen("escenasP.vtt", "x+"); //crea archivo .vtt con el nombre del archivo
file_put_contents("escenasP.vtt", "WEBVTT"); //escribe la cabecera del archivo VTT
//file_put_contents("escenasP.vtt", object[0].id,FILE_APPEND); //escribe la cabecera del archivo VTT

for ($i = 0; $i < sizeof($object); $i++) {
    file_put_contents("escenasP.vtt","\n",FILE_APPEND);
    file_put_contents("escenasP.vtt",$object[$i]['id'],FILE_APPEND);
    file_put_contents("escenasP.vtt","\n",FILE_APPEND);  
    file_put_contents("escenasP.vtt",decimal_to_time($object[$i]['ini']),FILE_APPEND); 
    file_put_contents("escenasP.vtt"," ---> ",FILE_APPEND);
    file_put_contents("escenasP.vtt",decimal_to_time($object[$i]['fin']),FILE_APPEND); 
    file_put_contents("escenasP.vtt","\n",FILE_APPEND); 
    file_put_contents("escenasP.vtt",$object[$i]['texto'],FILE_APPEND); 
}


//Para pasar de float a formato vtt HH:MM:SS:MS
function decimal_to_time($decimal) {
    $hours = floor($decimal / 60);
    $minutes = floor($decimal % 60);
    $seconds = $decimal - (int)$decimal;
    $seconds = round($seconds * 60);

    return "00:".str_pad($hours, 2, "0", STR_PAD_LEFT) . ":" . str_pad($minutes, 2, "0", STR_PAD_LEFT) . "." . str_pad($seconds, 2, "0", STR_PAD_LEFT);
}
?>