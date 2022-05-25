var JsonActors;
var imagenActual;
var actorActual;
var mainPackage;
function pathSplitter(str) {
    return str.split('\\').pop().split('/').pop();
}

window.onload = (function() {

    var lastPeerId = null;
    var peer = null; // own peer object
    var conn = null;
    var recvIdInput = document.getElementById("receiver-id");
    var status = document.getElementById("status");
    var message = document.getElementById("message");
    
    var sendMessageBox = document.getElementById("sendMessageBox");
    var sendButton = document.getElementById("sendButton");
    var clearMsgsButton = document.getElementById("clearMsgsButton");
    var connectButton = document.getElementById("connect-button");
    var cueString = "<span class=\"cueMsg\">Cue: </span>";

    /**
     * Create the Peer object for our end of the connection.
     *
     * Sets up callbacks that handle any events related to our
     * peer object.
     */
    function initialize() {
        // Create own peer object with connection to shared PeerJS server
        peer = new Peer(null, {
            debug: 2
        });

        peer.on('open', function(id) {
            // Workaround for peer.reconnect deleting previous id
            if (peer.id === null) {
                console.log('Received null id from peer open');
                peer.id = lastPeerId;
            } else {
                lastPeerId = peer.id;
            }

            console.log('ID: ' + peer.id);
            var idCon = document.getElementById("connID");
            idCon.innerHTML = '<strong style="color:rgb(106, 4, 229);">Your ID:</strong> ' + peer.id;
        });
        peer.on('connection', function(c) {
            // Allow only a single connection	
            if (conn && conn.open) {
                c.on('open', function() {
                    c.send("Already connected to another client");
                    setTimeout(function() { c.close(); }, 500);
                });
                return;
            }
            // Check URL params for comamnds that should be sent immediately
            var command = getUrlParam("command");
            if (command)
            conn.send(command);
            conn = c;
            console.log("Connected to: " + conn.peer);
            status.innerHTML = "Connected";
            ready();
        });
        peer.on('disconnected', function() {
            status.innerHTML = "Connection lost. Please reconnect";
            console.log('Connection lost. Please reconnect');

            // Workaround for peer.reconnect deleting previous id
            peer.id = lastPeerId;
            peer._lastServerId = lastPeerId;
            peer.reconnect();
        });
        peer.on('close', function() {
            conn = null;
            status.innerHTML = "Connection destroyed. Please refresh";
            console.log('Connection destroyed');
        });
        peer.on('error', function(err) {
            console.log(err);
            alert('' + err);
        });
    };

    /**
     * Create the connection between the two Peers.
     *
     * Sets up callbacks that handle any events related to the
     * connection and data received on it.
     */
    function join() {
        // Close old connection
        if (conn) {
            conn.close();
        }

        // Create connection to destination peer specified in the input field
        conn = peer.connect(recvIdInput.value, {
            reliable: true
        });

        conn.on('open', function() {
            status.innerHTML = "Connected to: " + conn.peer;
            console.log("Connected to: " + conn.peer);
            conn.send(actorActual);
            // Check URL params for comamnds that should be sent immediately
            var command = getUrlParam("command");
            if (command)
                conn.send(command);
        });
        
        // Handle incoming data (messages only since this is the signal sender)
        conn.on('data', function(data) {
            //debugger;
            console.log("received: "+data)
            if (typeof data != 'object')
            {
                addMessage("<span class=\"peerMsg\">Peer:</span> " + data);
                if(data.toLowerCase() == actorActual.Nombre.toLowerCase())
                {
                    document.getElementById('youWin').innerHTML = "YOU LOST!";
                    document.getElementById('correct').src = "/assets/img/lost.gif";
                }   
            }
        });
        conn.on('close', function() {
            status.innerHTML = "Connection closed";
        });
    };

    async function ready() {
        conn.on('data', function(data) {
            console.log("Data recieved");
            console.log("received: "+data)
            if (typeof data == 'object')
            {
                setImg(data);
            }
            
            var cueString = "<span class=\"cueMsg\">Cue: </span>";
            switch (data) {
                case 'Go':
                    go();
                    addMessage(cueString + data);
                    break;
                case 'Fade':
                    fade();
                    addMessage(cueString + data);
                    break;
                case 'Off':
                    off();
                    addMessage(cueString + data);
                    break;
                case 'Reset':
                    reset();
                    addMessage(cueString + data);
                    break;
                default:
                    if (typeof data != 'object')
                    {
                        addMessage("<span class=\"peerMsg\">Peer:</span> " + data);
                        if(data.toLowerCase() == actorActual.Nombre.toLowerCase())
                        {
                            document.getElementById('youWin').innerHTML = "YOU LOST!";
                            document.getElementById('correct').src = "/assets/img/lost.gif";
                        }   
                    }
                    break;
            };
        });
        conn.on('close', function() {
            status.innerHTML = "Connection reset<br>Awaiting connection...";
            conn = null;
        });
    };

    /**
     * Get first "GET style" parameter from href.
     * This enables delivering an initial command upon page load.
     *
     * Would have been easier to use location.hash.
     */
    function getUrlParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return null;
        else
            return results[1];
    };

    /**
     * Send a signal via the peer connection and add it to the log.
     * This will only occur if the connection is still alive.
     */
    function signal(sigName) {
        if (conn && conn.open) {
            conn.send(sigName);
            console.log(sigName + " signal sent");
            addMessage(cueString + sigName);
        } else {
            console.log('Connection is closed');
        }
    }



    function addMessage(msg) {
        var now = new Date();
        var h = now.getHours();
        var m = addZero(now.getMinutes());
        var s = addZero(now.getSeconds());

        if (h > 12)
            h -= 12;
        else if (h === 0)
            h = 12;

        function addZero(t) {
            if (t < 10)
                t = "0" + t;
            return t;
        };

        message.innerHTML = "<br><span class=\"msg-time\">" + h + ":" + m + ":" + s + "</span>  -  " + msg + message.innerHTML;
    };

    

    async function getJsonData()
    {
        responseActors = await fetch('assets/json/actores.json');
        JsonActors = await responseActors.json();
        changeImg();
    }

    function changeImg()
    {
        var img = document.getElementById("actImg");
        actorActual = JsonActors[Math.floor(Math.random() * JsonActors.length)];
        imagenActual = "assets/img/"+pathSplitter(actorActual.Imagen);
        img.src = imagenActual;
    }

    function setImg(data)
    {
        actorActual = data;
        var imgData = actorActual.Imagen;
        var img = document.getElementById("actImg");
        imagenActual = "assets/img/"+pathSplitter(imgData);
        //debugger;
        img.src = imagenActual;
    }

    function clearMessages() {
        message.innerHTML = "";
        addMessage("Msgs cleared");
    };

    // Listen for enter in message box
    sendMessageBox.addEventListener('keypress', function(e) {
        var event = e || window.event;
        var char = event.which || event.keyCode;
        if (char == '13')
            sendButton.click();
    });
    // Send message
    sendButton.addEventListener('click', function() {
        if (conn && conn.open) {
            var msg = sendMessageBox.value;
            sendMessageBox.value = "";
            conn.send(msg);
            console.log("Sent: " + msg);
<<<<<<< HEAD
            
            if (typeof msg != 'object')
            {
                if(msg.toLowerCase() == actorActual.Nombre.toLowerCase())
                {
                    addMessage("<span class=\"peerMsg\">Peer:</span> " + msg);
                    document.getElementById('youWin').innerHTML = "YOU WIN!";
                    document.getElementById('fire1').src = "/assets/img/firework.gif";
                    document.getElementById('correct').src = "/assets/img/correct.gif";
                    document.getElementById('fire2').src = "/assets/img/firework.gif";
                }
                else
                {
                    addMessage("<span class=\"peerMsg\">Peer:</span> " + msg);
                }   
            }
            
=======
            addMessage("<span class=\"selfMsg\">Yo: </span> " + msg);
>>>>>>> fb45143c52b54e4acabf25ecccf7d14eea0400f2
        } else {
            console.log('Connection is closed');
        }
    });

    // Clear messages box
    clearMsgsButton.addEventListener('click', clearMessages);
    // Start peer connection on click
    connectButton.addEventListener('click', join);

    // Since all our callbacks are setup, start the process of obtaining an ID
    initialize();
    getJsonData();
})();