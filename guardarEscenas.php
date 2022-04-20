<?php
$requestPayload = file_get_contents("php://input");
$object= json_decode($requestPayload,true);

var_dump($object);
$fp = fopen("escenasP.vtt", "x+"); //crea archivo .vtt con el nombre del archivo
file_put_contents("escenasP.vtt", "WEBVTT"); //escribe la cabecera del archivo VTT
file_put_contents("escenasP.vtt", object[0].id,FILE_APPEND); //escribe la cabecera del archivo VTT

?>