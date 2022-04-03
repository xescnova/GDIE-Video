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
const videoControls = video.controls;

video.addEventListener('timeupdate', updateProgress);

const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
    //video.controls = true;
    video.muted = false;

}

function updateProgress() {
    var barpos = video.currentTime / video.duration;
    bar.style.width = barpos * 100 + "%";
}




//Play y pause del vídeo
function botonPlay() {
    var bPrueba = document.getElementById("botonPlay");
    b = document.getElementById("imgBoton")
    bPrueba.onclick = function() {
        if (video.paused) {
            video.play();
            b.src = "assets/img/pause.png"
        } else {
            video.pause();
            b.src = "assets/img/play.png"
        }
    }
}