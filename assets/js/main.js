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
var act = document.getElementById("imgBoton");
var tracks = video.textTracks;
var escenas = tracks[0];
var personajes = tracks[1];
var actorImgId = 0;
var actorImgCount = [];
var selectedActor;
// Variables al guardar la escena
var actoresDeLaEscena = []; // Actor que se guardan en la escena.
var imgDelActor = []; // Imagenes actor que se guardan en la escena. characterName
var urlDelActor = []; // Url actor que se guardan en la escena.
var personajeDelActor = []; // Personaje actor que se guardan en la escena.
//
// Variables al cargar el editor
const persJson = [];
const imgJson = [];
const urlJson = [];
const charJson = [];
// Variables de calidad de video
const defaultOptions = {};
var quals = [];
personajes.mode = "showing";
escenas.mode = "hidden";
var hls;


video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('play', setDuration);
video.addEventListener('timeupdate', updateTimeElapsed);
volume.addEventListener('mousemove', volumebar);
video.addEventListener('timeupdate', timebar);
timeVid.addEventListener('input', moveBar);
video.addEventListener('play', setDuration);


function hlsFunction() {
    var vidPlayer = document.getElementById("videoMrRobot");
    if (Hls.isSupported()) {
        hls = new Hls();
        console.log("HLS");
        hls.loadSource("https://alumnes-ltim.uib.es/gdie2206/video/manifest.m3u8");
        hls.attachMedia(vidPlayer);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            const availableQualities = hls.levels.map((l) => l.height);
            availableQualities.unshift(0);

            // Añadir calidades a las opciones
            defaultOptions.quality = {
                default: 0,
                options: availableQualities,
                forced: true,
                onChange: (e) => qualityUpdate(e),
            }
           
        });

    } else {
        vidPlayer.src = "https://alumnes-ltim.uib.es/gdie2206/video/videoGDIE.mkv";
        console.log("MP4");
    }
};


const videoWorks = !!document.createElement('video').canPlayType;
hlsFunction();
console.log(defaultOptions.quality);
if (videoWorks) {
    volumebar();
    timebar();
    video.muted = false;
    //setQuality();
}

function qualityUpdate(newQuality) {
    if (newQuality === 0) {
        window.hls.currentLevel = -1; //Enable AUTO quality if option.value = 0
    } else {
        window.hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
                window.hls.currentLevel = levelIndex;
            }
        });
    }
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

function setQuality() {
    document.getElementById("qualityOptions");
    for (i = 1; i < defaultOptions.quality.options.length - 1; i++) {
        quals.push(defaultOptions.quality.options[i]);
    }
    timeVid.max = Math.round(video.duration);
}
//qualityOptions

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
        btnTimer.textContent = "Start time";
    } else {
        if (tInicio.value) {
            tFin.value = tiempo;
            btnTimer.textContent = "Reset";
        } else {
            tInicio.value = tiempo;
        }
    }
    debugger;
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


function hideQualityOptions() {
    if (document.getElementById("qualityOptions").hidden) {
        document.getElementById("qualityOptions").hidden = false;
    }
    else {
        document.getElementById("qualityOptions").hidden = true;
    }
}

function selectOtherOption() {
    var option;
    for (i = 0; i < select.length; i++) {
        option = select[i];
        option.selected = false;
    }
    for (i = 0; i < select.length; i++) {
        option = select[i];
        if (!option.disabled) {
            option.selected = true;
            //selectedActor = selectedActor = "assets/" + imgJson[i+1];
        }
    }
    actorImg();
}

function checkOptions() {
    var option;
    for (i = 0; i < select.length; i++) {
        option = select[i];
        if (!option.disabled) {
            return true;
        }
        return false;
    }
}

function findImg(sel) {
    for (var i = 0; i < persJson.length; i++) {
        if (persJson[i] == sel) {
            return imgJson[i];
        }
    }
}

function findUrl(sel) {
    for (var i = 0; i < persJson.length; i++) {
        if (persJson[i] == sel) {
            return urlJson[i];
        }
    }
}

function findCharacter(sel) {
    for (var i = 0; i < persJson.length; i++) {
        if (persJson[i] == sel) {
            return charJson[i];
        }
    }
}

function addActor() {
    if (checkOptions()) {
        var charsCard = document.getElementById("addCharacters");
        var div = document.createElement('div');
        div.setAttribute("id", "imgActor" + actorImgId);
        div.setAttribute("class", "card");
        div.innerHTML = '<img id="img' + actorImgId + '" class="editor-img" src=' + selectedActor + ' width="125px">';
        actorImgCount.push("imgActor" + actorImgId);
        select.options[select.selectedIndex].setAttribute("disabled", "");
        // Añadimos datos del actor
        actoresDeLaEscena.push(select.value);
        imgDelActor.push(findImg(select.value));
        urlDelActor.push(findUrl(select.value));
        personajeDelActor.push(findCharacter(select.value));
        // Fin
        selectOtherOption();
        charsCard.appendChild(div);
        actorImgId++;
    }
}

function enableOptions() {
    var option;
    for (i = 0; i < select.length; i++) {
        option = select[i];
        if (option.value == actoresDeLaEscena[actoresDeLaEscena.length - 1]) {
            option.removeAttribute("disabled");
        }
    }
}

function removeActor() { //
    if (actorImgCount.length > 0) {
        var charsCard = document.getElementById("addCharacters");
        charsCard.removeChild(document.getElementById(actorImgCount[actorImgCount.length - 1]));
        enableOptions();
        actorImgCount.pop();
        actoresDeLaEscena.pop();
        imgDelActor.pop();
        urlDelActor.pop();
        personajeDelActor.pop();
        actorImgId--;
        selectOtherOption();
    }

}
$.getJSON('assets/json/actores.json', function (data) {
    if (select) {
        arr = data;
        for (var i = 0; i < arr.length; i++) {
            var option = document.createElement("OPTION");
            var txt = document.createTextNode(arr[i].Nombre);
            option.appendChild(txt);
            select.insertBefore(option, select.lastChild);
            persJson.push(arr[i].Nombre);
            imgJson.push(arr[i].Imagen);
            urlJson.push(arr[i].URL);
            charJson.push(arr[i].Personaje);
            selectedActor = "assets/" + imgJson[0];
        }
    }
});


function actorImg() {
    for (var i = 0; i < persJson.length; i++) {
        if (select.value == persJson[i]) {
            selectedActor = "assets/" + imgJson[i];
        }
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
            div.setAttribute("class", "card");
            div.innerHTML = '<img onclick="infoActor(' + "'" + arrayPersonajes[index].URL + "'" + ')" src="assets/' + arrayPersonajes[index].Imagen + '" height="150px" width="150px"><div class="card-block px-2"><p class="card-title" style="text-align: center"></p><p class="card-text" style="text-align: center">' + arrayPersonajes[index].Personaje + '</p></div>';
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
    //video.setAttribute("poster", "assets/img/" + src.split('.').slice(0, -1).join('.') + ".png");
    filename = src.split('.').slice(0, -1).join('.');
    document.getElementById("idMetadados").setAttribute("src", "https://alumnes-ltim.uib.es/gdie2206/video/" + filename + ".vtt");
    $("#escenasVideo").empty();
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

function infoActor(idIMDB) {
    var settings = {
        "url": "https://imdb-api.com/API/Name/k_srpdxysi/" + idIMDB,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        //console.log(response);
        var infoP = document.getElementById("infoPersonaje");
        infoP.innerHTML = ' ';
        var div = document.createElement('div');
        div.setAttribute("class", "card");
        var conocido = []
        var arraypelis = response["knownFor"];
        for (var i = 0; i < arraypelis.length; i++) {
            conocido.push(arraypelis[i].fullTitle + "");
        }
        div.innerHTML = '<img src="assets/' + response["image"] + '" height="150px" width="150px"><div class="card-block px-2"><p class="card-title" style="text-align: center"><h2>' + response["name"] + '</h2></p><h4>Biografía:</h4><p class="card-text" style="text-align: center">' + response["summary"] + '</p><h4>Conocido por:</h4><p class="card-text" style="text-align: center">' + conocido.toString() + '</p></div>';
        infoP.appendChild(div.cloneNode(true));
    });
}

function ajaxCall() {
    var escenas = JSON.stringify(personajes.cues[0]);
    var array = [videoMrRobot.children[2].src];
    for (var i = 0; i < personajes.cues.length; i++) {
        const colasActivas = { id: personajes.cues[i].id, ini: personajes.cues[i].startTime, fin: personajes.cues[i].endTime, texto: personajes.cues[i].text }
        array.push(colasActivas);
    }
    var json = JSON.stringify(array);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "guardarEscenas.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        //console.log(this.response);
    }
    xhr.send(json);
    return false;
}



function masEscenas() {

    // const urlParams = new URLSearchParams(window.location.search);
    const tituloEscena = document.getElementById('title').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;


    var a = startTime.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var startSeconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    var b = endTime.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var endSeconds = (b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]);
    if (document.body.contains(document.getElementById('escenasVideo'))) {
        let cues = personajes.cues;
        //Mira si la nueva escena no se solapa con ninguna ya introducida
        for (let i = 0; i < cues.length; i++) {
            if (endSeconds > cues[i].startTime && endSeconds < cues[i].endTime) {
                alert("No se pueden solapar escenas");
                return false;
            }
            if (startSeconds > cues[i].startTime && startSeconds < cues[i].endTime) {
                alert("No se pueden solapar escenas");
                return false;
            }
            //console.log(actoresDeLaEscena);
        }
        //alert("Todo correcto");
        var texto = '[';
        for (let i = 0; i < actoresDeLaEscena.length; i++) {
            texto = texto + '\n        {\n        "Nombre": "' + actoresDeLaEscena[i] + '",\n        "Personaje": "' + personajeDelActor[i] + '",\n        "URL":"' + urlDelActor[i] + '",\n        "Imagen":"' + imgDelActor[i] + '"\n         }';
            if (i + 1 < actoresDeLaEscena.length) {
                texto = texto + ',';
            }
        }
        texto = texto + '\n]';
        var x = new VTTCue(startSeconds, endSeconds, texto);
        x.id = tituloEscena;
        personajes.addCue(x);

        console.log(personajes.cues);
        $("#escenasVideo").empty();
        listarEscenas();

    }



}