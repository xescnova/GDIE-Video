var tracks = document.querySelector('video').textTracks;

for (var i = 0, L = tracks.length; i < L; i++) { /* tracks.length == 10 */
    if (tracks[i].language == 'en') {
        console.dir(tracks[i]);
    }
}
var v = document.querySelector('video');
console.log(v.currentTime);


//Play y pause del vídeo
function botonPlay() {
    var bPrueba = document.getElementById("botonPlay");
    b = document.getElementById("imgBoton")
    bPrueba.onclick = function() {
        if (v.paused) {
            v.play()
            b.src = "assets/img/pause.png"
        } else {
            v.pause()
            b.src = "assets/img/play.png"
        }
    }
}