/**
 * Template Name: Vesperr - v4.7.0
 * Template URL: https://bootstrapmade.com/vesperr-free-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

/**
 * Video Mr. Robot
 */
const video = document.querySelector('.video');
const bar = document.getElementById('progressBar');
const playbtn = document.getElementById('playbtn');
const volume = document.getElementById('volbar');
const timeVid = document.getElementById('timebar');
const videoControls = video.controls;
const imgmute = document.getElementById("imgMute");
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const select = document.getElementById("actorsAvailable");
var volumeValue = document.getElementById('valueVol');
var botonpl = document.getElementById("botonPlay");
var imgplay = document.getElementById("imgBoton");
var tracks = video.textTracks;
var escenas = tracks[0];
var personajes = tracks[1];
var arr;
const persJson = [];
const imgJson = [];
personajes.mode = "showing";
escenas.mode = "hidden";


video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('play', setDuration);
video.addEventListener('timeupdate', updateTimeElapsed);
volume.addEventListener('mousemove', volumebar);
video.addEventListener('timeupdate', timebar);
timeVid.addEventListener('input', moveBar);

const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
    volumebar();
    timebar();
    video.muted = false;
}

function playvid() {
    const videoWorks = !!document.createElement('video').canPlayType;
    if (videoWorks) {
        if (video.paused) {
            video.play();
            imgplay.src = "assets/img/pause.png";
        } else {
            video.pause();
            imgplay.src = "assets/img/play.png";
        }
    }
}

function setDuration() {
    timeVid.max = Math.round(video.duration);
}

function formatTime(timeInSeconds) {
    //const result2 = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    var minutes = Math.floor(timeInSeconds / 60).toString();
    var seconds = (timeInSeconds % 60).toString();
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return {
        minutes,
        seconds
    };
};

function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
    listarEscenas();
    timeVid.max = Math.round(video.duration);
    //timeVid.setAttribute('max', videoDuration);
}

function updateTimeElapsed() {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}

/*function updateProgress() {
    var barpos = video.currentTime / video.duration;
    bar.style.width = barpos * 100 + "%";
}*/


//Play y pause del vídeo
function botonPlay() {

    botonpl.onclick = function () {
        if (video.paused) {
            video.play();
            imgplay.src = "assets/img/pause.png"
        } else {
            video.pause();
            imgplay.src = "assets/img/play.png"
        }
    }
}

//Mute y unmute del vídeo
function botonMuted() {
    var botonmt = document.getElementById("botonMute");
    botonmt.onclick = function () {
        if (video.muted) {
            video.muted = false;
            imgmute.src = "assets/img/soundon.png";
        } else {
            video.volume = 0;
            video.muted = true;
            imgmute.src = "assets/img/soundoff.png";
        }
    }
}

function botonSubt() {
    var bS = document.getElementById("botonSubt");
    imgsub = document.getElementById("imgSub")
    bS.onclick = function () {
        var esc = escenas.mode;
        console.log(esc);
        if (esc == "hidden") {
            escenas.mode = "showing";
            imgsub.src = "assets/img/CC_ON.png"
        } else {
            escenas.mode = "hidden";
            imgsub.src = "assets/img/CC_OFF.png"
        }
    }
}

function volumebar() {
    var actualval = volume.value;
    var color = 'linear-gradient(90deg, rgb(251, 60, 60) ' + actualval + '%, rgb(214,214,214)' + actualval + '%)';
    volume.style.background = color;
    if (!video.muted) {
        video.volume = volume.value / 100;
    }
}

function timebar() {
    //bar.style.width = barpos * 100 + "%";
    //timeVid.max = videoDuration;
    var timeval = 100 * Math.round(video.currentTime) / timeVid.max;
    var color = 'linear-gradient(90deg, rgb(251, 60, 60) ' + timeval + '%, rgb(214,214,214)' + timeval + '%)';
    if (!video.paused) {
        timeVid.value = Math.round(video.currentTime);
    }
    timeVid.style.background = color;
}

function moveBar() {
    video.pause();
    video.currentTime = timeVid.value;
    imgplay.src = "assets/img/pause.png";
    video.play();
}

function getCurrentTime() {
    var btnTimer = document.getElementById("sel-tiempo");
    var tInicio = document.getElementById("startTime");
    var tFin = document.getElementById("endTime");
    var tiempo = new Date(video.currentTime * 1000).toISOString().slice(11, 19);
    if (tFin.value) {
        tFin.value = null;
        tInicio.value = null;
        btnTimer.textContent = "Seleccionar Tiempo";
    } else {
        if (tInicio.value) {
            tFin.value = tiempo;
            btnTimer.textContent = "Reset";
        } else {
            tInicio.value = tiempo;
        }
    }
}

function plusTen() {
    video.currentTime = video.currentTime + 10;
}

function minusTen() {
    video.currentTime = video.currentTime - 10;
}


function openFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
    }
}

function actorImg() {
    var imagenActor = document.getElementById("imgActor");
    for (var i = 0; i < persJson.length; i++) {
        if (select.value == persJson[i]) {
            imagenActor.src = "assets/" + imgJson[i];
        }
    }
}

function addActor() { //
    var charsSel = document.getElementById("selectorschar");
    var divSel = document.createElement('div');
    divSel.innerHTML = '<select name="character" class="selector-actor" onchange="actorImg()" id="actorsAvailable2"></select>';
    charsSel.appendChild(divSel);
    var charsCard = document.getElementById("addCharacters");
    var div = document.createElement('div');
    div.setAttribute("class", "card");
    div.innerHTML = '<img id="imgActor" class="editor-img" src="assets/img/Rami_Malek.jpg" width="125px">';
    charsCard.appendChild(div);
}

$.getJSON('assets/json/actores.json', function (data) {
    if (select) {
        arr = data;
        for (var i = 0; i < arr.length; i++) {
            var option = document.createElement("OPTION");
            var txt = document.createTextNode(arr[i].Personaje);
            option.appendChild(txt);
            select.insertBefore(option, select.lastChild);
            persJson.push(arr[i].Personaje);
            imgJson.push(arr[i].Imagen);
        }
    }
});





personajes.oncuechange = event => {
    if (document.body.contains(document.getElementById('personajesCaja'))) {
        let cues = personajes.activeCues; // array of current cues
        console.log(personajes.cues);
        var arrayPersonajes = JSON.parse(cues[0].text);
        var personajesDiv = document.getElementById("personajesCaja");
        personajesDiv.innerHTML = '';
        for (let index = 0; index < arrayPersonajes.length; index++) {
            var personajesDiv = document.getElementById("personajesCaja");
            var div = document.createElement('div');
            div.setAttribute("class", "card");
            div.innerHTML = '<img src="assets/' + arrayPersonajes[index].Imagen + '" height="150px" width="150px"><div class="card-block px-2"><p class="card-title" style="text-align: center"><a href="' + arrayPersonajes[index].URL + '" target="_blank">' + arrayPersonajes[index].Nombre + '</a></p><p class="card-text" style="text-align: center">' + arrayPersonajes[index].Personaje + '</p></div>';
            personajesDiv.appendChild(div);
        }
    }
}

function listarEscenas() {
    if (document.body.contains(document.getElementById('escenasVideo'))) {
        let cues = personajes.cues;
        console.log(cues);
        for (let i = 0; i < cues.length; i++) {
            var escenasDiv = document.getElementById("escenasVideo");
            var div = document.createElement('div');
            div.innerHTML = '<div class="card"><div class="card-body"><p id="nombresP' + i + '">Nombre: ' + cues[i].id + '---Duración: ' + cues[i].startTime + '---' + cues[i].endTime + 's' + ' <button class="btn btn-primary" style="float:right;padding-right=600px" onclick="eliminarCola(' + i + ",'" + cues[i].id + "'" + ')" type="submit">X</button></p></div></div>';
            escenasDiv.appendChild(div.cloneNode(true));
        }
    }
}

//Elimina una escena, tanto el div como el la cola del vídeo.
function eliminarCola(id, idColaActual) {
    const idCola = "nombresP" + id;
    document.getElementById(idCola);
    console.log(idCola);
    $(document).ready(function () {
        $("#" + idCola).remove();
    });
    for (let i = 0; i < personajes.cues.length; i++) {
        if (idColaActual == personajes.cues[i].id) {
            personajes.removeCue(personajes.cues[i]);
        }
    }
}

//Cambia de video con setAttribute
function cambiarVideo(src) {
    video.setAttribute("src", "https://alumnes-ltim.uib.es/gdie2206/video/" + src);
    video.setAttribute("poster", "assets/img/"+src.split('.').slice(0, -1).join('.')+".png");
    video.load();
}

/*
function cambiarVideo() {
    var source = document.getElementById("idVideo");
    source.setAttribute("src", "https://alumnes-ltim.uib.es/gdie2206/subirVideos/Slap.mp4");
    video.load();
    video.play();
}
*/

function crearDropdown() {
    $.ajax({
        url: "listarVideos.php",
        type: "POST",
        success: function (result) {
            var videos = JSON.parse(result);
            for (let index = 0; index < videos.length; index++) {
                var listaVideos = document.getElementById("dropdown-videos");
                var li = document.createElement('li');
                li.innerHTML = '<a onclick="cambiarVideo(' + "'" + videos[index] + "'" + ')">' + videos[index] + '</a>';
                listaVideos.appendChild(li);
            }
        }
    });
}

function ajaxCall() {
    //var data = new FormData();
    //console.log(personajes.cues);
    var escenas = JSON.stringify(personajes.cues[0]);
    var array = [];
    for (var i = 0; i < personajes.cues.length; i++) {
        const colasActivas = { id: personajes.cues[i].id, ini: personajes.cues[i].startTime, fin: personajes.cues[i].endTime, texto: personajes.cues[i].text }
        array.push(colasActivas);
    }
    //console.log(array);
    var json = JSON.stringify(array);
    // console.log(json);
    //data.append("escenas", escenas);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "guardarEscenas.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        console.log(this.response);
    }
    xhr.send(json);
    return false;
}