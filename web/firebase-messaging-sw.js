importScripts("https://www.gstatic.com/firebasejs/5.8.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.8.2/firebase-messaging.js");

firebase.initializeApp({
    messagingSenderId: "273479070895"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    if (payload.data.notification){
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
        self.registration.showNotification(notif.title, notif);
    }
});
