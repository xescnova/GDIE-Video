<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Procesando el archivo enviado</title>
<style type="text/css">
*{ font-family:Segoe, "Segoe UI", "DejaVu Sans", "Trebuchet MS", Verdana, sans-serif}
.main{ margin:auto; border:1px solid #7C7A7A; width:50%; text-align:left; padding:30px; background:#85c587}
input[type=submit]{ background:#6ca16e; width:100%;
    padding:5px 15px; 
    background:#ccc; 
    cursor:pointer;
	font-size:16px;
   
}
table td{ padding:5px;}
</style>
</head>

<body bgcolor="#bed7c0">
<div class="main">
<h1>Subir archivo con PHP:</h1>
<?php
$directorio = 'video/';
$subir_archivo = $directorio.basename($_FILES['subir_archivo']['name']);
if (move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $subir_archivo)) {
    //print_r($subir_archivo);
    $nombre = pathinfo($subir_archivo); 
    $file = $nombre['filename'].".vtt";
    //echo $file;
    $fp = fopen("video/".$file, "x+"); //crea archivo .vtt con el nombre del archivo
    file_put_contents("video/".$file, "WEBVTT"); //escribe la cabecera del archivo VTT
    echo "El archivo es válido y se cargó correctamente.<br><br>";
    echo"<a href='".$subir_archivo."' target='_blank'><img src='".$subir_archivo."' width='150'></a>";
    } else {
       echo "La subida ha fallado";
    }
    echo "</div>";
?>
<br>
<div style="border:1px solid #000000; text-transform:uppercase">  
<h3 align="center"><div align="center"><a href="editor.html">Volver </a></div></h3></div>

 
</div>
	</body>
</html>