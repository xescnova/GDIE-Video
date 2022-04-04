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
const videoControls = video.controls;
const imgmute = document.getElementById("imgMute");
var volumeValue = document.getElementById('valueVol');
var tracks = video.textTracks;
var escenas = tracks[0];
var personajes = tracks[1];
personajes.mode = "showing";
escenas.mode = "hidden";

video.addEventListener('timeupdate', updateProgress);
volume.addEventListener('mousemove', volumebar);

const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
    volumebar()
        //video.controls = true;
    video.muted = false;

}

function updateProgress() {
    var barpos = video.currentTime / video.duration;
    bar.style.width = barpos * 100 + "%";
}




//Play y pause del vídeo
function botonPlay() {
    var botonpl = document.getElementById("botonPlay");
    imgplay = document.getElementById("imgBoton")
    botonpl.onclick = function() {
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
    botonmt.onclick = function() {
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
    bS.onclick = function() {
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



personajes.oncuechange = event => {
    let cues = personajes.activeCues; // array of current cues
    var arrayPersonajes = JSON.parse(cues[0].text);
    var personajesDiv = document.getElementById("personajesCaja");
    personajesDiv.innerHTML = '';
    for (let index = 0; index < arrayPersonajes.length; index++) {
        var personajesDiv = document.getElementById("personajesCaja");
        var div = document.createElement('elemento');
        div.innerHTML = '<div class="col-sm-1"><img src="assets/' + arrayPersonajes[index].Imagen + '" class="img-fluid" alt="" height="300px" width="200px"></div><div class="col-sm-2"><div class="card-block px-2"><h2 class="card-title"><a href="' + arrayPersonajes[index].URL + '">' + arrayPersonajes[index].Nombre + '</a></h2><p class="card-text">' + arrayPersonajes[index].Personaje + '</p></div></div>';
        personajesDiv.appendChild(div);
    }
}