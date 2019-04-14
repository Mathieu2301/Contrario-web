$(function () {

    var sw = null;

    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').then(function(_sw){
        sw = _sw; Notification.requestPermission();
    });

    firebase.initializeApp({
        apiKey: "AIzaSyBR7DCsR_W3C3OHY8QRpTkQXk8Pcd7Do_E",
        authDomain: "iridium-blast.firebaseapp.com",
        databaseURL: "https://iridium-blast.firebaseio.com",
        projectId: "iridium-blast",
        storageBucket: "iridium-blast.appspot.com",
        messagingSenderId: "273479070895"
    });
    
    const messaging = firebase.messaging();

    messaging.requestPermission().then(function() {
      messaging.getToken().then(function(push_token) {
        if (push_token) socket.emit("subscribe_push", push_token);
      })
    });

    messaging.onMessage(function(payload){
        if (payload.notification){
            var notif = payload.notification;
            notif.renotify = true;
            notif.vibrate = [100, 50, 100];
            notif.tag = 'renotify';
            notif.icon = 'icons/logo192.png';
            if (payload.data.partyID){
                notif.actions = [
                    {
                        action: 'join_' + payload.data.partyID,
                        title: "Rejoindre"
                    }
                ];
            }
            sw.showNotification(notif.title, notif);
        }
    });

    var $window = $(window);

    var socket = io();

    

    $("#lobby_page>#new").on("click", function(){
        socket.emit("create_party");
    })

    socket.on("connect", function(){
        $(".body").fadeIn();

        socket.once("initialize", initialize);
        
        
    });

    function initialize(finish_initialize){
        var username = (localStorage.getItem("username") || getCookie("username") || "");
        if (username.length > 3) {
            finish_initialize(username);
        }else{
            username = "Anonymous";
            localStorage.setItem("username", username);
            setCookie("username", username);
            initialize(finish_initialize);
        }
    }

    socket.on('disconnect', () => {
        console.log("Connection lost");
        var reconnected = false;
        
        socket.on('reconnect', () => {
            console.log("Reconnected");
            reconnected = true;
        });
        
        setTimeout(function(){
            if (!reconnected) reloadApp();
        }, 3000);
    });
    
    socket.on('reconnecting', () => {
        console.log("Reconnecting");
    });

    socket.on("app_reload", reloadApp);
    
    function reloadApp(){
        $('.body').animate({
            opacity: 0
        }, 100, function() {
            location.reload();
        });
    }
    
    Array.prototype.remove=function(v){return this.filter(val=>{if(val!=v)return val});}
    String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1);}
    function random(){var t="";var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(var i=0;i<100;i++)t+=a.charAt(Math.floor(Math.random()*a.length));return t;}
    function getCookie(a){var b=a+"=";var d=decodeURIComponent(document.cookie);var ca=d.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' '){c=c.substring(1);}if(c.indexOf(b)==0){return c.substring(b.length,c.length);}}return "";}
    function setCookie(n,v){document.cookie=n+"="+v+";365;path=/"}
    function GET_(p){return (new URL(document.location)).searchParams.get(p);}
    function includes_array(str,array){var result=false;array.forEach(el=>{if(str.includes(el))result=true;});return result;}
    function copyToClipboard(text){$('#clipboard').text(text);var $temp=$("<input>");$("body").append($temp);$temp.val($('#clipboard').text()).select();document.execCommand("copy");$temp.remove();$('#clipboard').text("");}
});