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
    bS.onclick = function() {
        var esc = escenas.mode;
        console.log(e);
        if (esc == "hidden") {
            escenas.mode = "showing";
        } else {
            escenas.mode = "hidden";
        }
    }
}

function volumebar() {
    var actualval = volume.value;
    var color = 'linear-gradient(90deg, rgb(251, 60, 60) ' + actualval +'%, rgb(214,214,214)'+ actualval +'%)';
    volume.style.background = color;
    if (!video.muted) {
        video.volume = volume.value/100;
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
