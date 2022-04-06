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
var volumeValue = document.getElementById('valueVol');
var botonpl = document.getElementById("botonPlay");
var imgplay = document.getElementById("imgBoton");
var tracks = video.textTracks;
var escenas = tracks[0];
var personajes = tracks[1];
personajes.mode = "showing";
escenas.mode = "hidden";

video.addEventListener('loadedmetadata', initializeVideo);
//video.addEventListener('timeupdate', updateProgress);
video.addEventListener('timeupdate', updateTimeElapsed);
volume.addEventListener('mousemove', volumebar);
video.addEventListener('timeupdate', timebar);
timeVid.addEventListener('onchange', moveBar);
//timeVid.addEventListener('mousemove', moveBar);
//seek.addEventListener('mousemove', updateSeekTooltip);


const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
    volumebar();
        //video.controls = true;
    video.muted = false;
    timeVid.max = video.duration*100;

}

function playvid()
{
    const videoWorks = !!document.createElement('video').canPlayType;
    if (videoWorks) {
        if(video.paused)
        {
            video.play();
            imgplay.src = "assets/img/pause.png";
        }
        else
        {
            video.pause();
            imgplay.src = "assets/img/play.png";
        }
    }
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

function timebar() {
    //bar.style.width = barpos * 100 + "%";
    var timeval = (video.currentTime / video.duration) * 100;
    var color = 'linear-gradient(90deg, rgb(251, 60, 60) ' + timeval + '%, rgb(214,214,214)' + timeval + '%)';
    if(!video.paused)
    {
        timeVid.value = timeval;
    }
    
    timeVid.style.background = color;  
}

function moveBar() {
    video.pause();
    video.currentTime = timeVid.value;
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
            div.setAttribute("class", "col-sm-2");
            div.innerHTML = '<img src="assets/' + arrayPersonajes[index].Imagen + '" height="300px" width="200px"><div class="card-block px-2"><h2 class="card-title"><a href="' + arrayPersonajes[index].URL + '" target="_blank">' + arrayPersonajes[index].Nombre + '</a></h2><p class="card-text">' + arrayPersonajes[index].Personaje + '</p></div>';
            personajesDiv.appendChild(div.cloneNode(true));
        }
    }
}

function listarEscenas() {
    let cues = personajes.cues;
    console.log(cues);
    for (let i = 0; i < cues.length; i++) {
        var escenasDiv = document.getElementById("escenasVideo");
        var div = document.createElement('div');
        div.innerHTML = '<p id="nombresP">Nombre: ' + cues[i].id + '---Duración: ' + cues[i].startTime + '---' + cues[i].endTime + 's' + ' <button class="btn btn-primary" style="float:right;padding-right=100px;" onclick="eliminarCola(' + i + ')" type="submit">X</button></p>';
        escenasDiv.appendChild(div.cloneNode(true));
    }
}

function eliminarCola(id) {
    personajes.removeCue(personajes.cues[id]);
    document.getElementById("nombresP");
    nombresP.innerHTML = '';
    listarEscenas();
    console.log(personajes.cues);
}