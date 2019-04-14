var firebase = require("firebase-admin");

var messaging = firebase.initializeApp({
    credential: firebase.credential.cert({
        type: "service_account",
        project_id: "iridium-blast",
        private_key_id: "569c6f47d1e582cb67d252b2cd4c2e4943c43a20",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDOSsMKWectDbn7\nqimZNRD2GrTWHh9cz1il8m2nvkzMQDbcnO8bNHv+e/WXPS3McdncU0fEopJfDXYf\nHIFTmJnLOEMlsmvHrju2TF3zJkIMTQz3v0L56d0NuuQn4FEpx0pokeszzOqtWb6v\n45yc/FcklJq9ESgaSIUUxEd4dSj6dKSUGdeESF75l+KyZl8ug6/MnH8bWyomOva5\no+aMhrOuG5rLS7OMAF8gBazhMB3bDrl+Sm2ybdDbpVQ0U/KbBaDXT6UqjMpT3P4i\nF9ITxszozsY250PIIhUvV3gpoaKrEvVpeMp0jD6SRWoiwCbKuCP7iZEg71s42sWE\ny38ZOuetAgMBAAECggEAJT7RTRajSvqd+CamYQ94Mv7qZHhG0FJtXnTRQIZ2xi/X\n1+gLsZ09v9oworA8ixuJKqLso794bun2yDI01VuJdOwBD5bRp9k41bafBc4EAcWN\nkFN7a7TCIP77v4lcDg95yzyBOzaFrmu0JnyRY7SZpTShZX5p/6jVQkUX5FM+5U0D\noeryHvVlhbPxoG/n/HiVdDZIj/Y8379IUZSCzNWMCC+q/E1N7G1iT7BDdVqV1vSB\nlKfetRRVcmiA8qLo2e796G8hXPquka+rxgL6vPCqppgexgt8bwBuCbzz9J95IPMb\nU9u3xdHQY75NgI1+sLg1kBuZpBEVlrM6PrIx2ERcjwKBgQD9gdENPXbN33neJHY/\nIzHV0FHvtas1g1HxUsrfwQYLZY79qo1l/vYlQSbgEZ2hDpa+M+P8tIdoTUIpEbVr\nOMkfV0ZRF4CNQrUFVrB2tLsTXi23rugQsDGtTKCT8qmg+OsM1ergdiBToBl/GLRw\nblVs3zZA367wvUQnc872ygycHwKBgQDQUhXRBKLCWknSe2gYP1GX7/Fy+VH/N2Pd\ndIDat1/L0z/AJTRtS7dbi139rrfQqAb9hsDC0VSTLvG3SS0uf5aLcXQSGFj01FsN\nwVZ8nZ4Ck6UrmwT/kbov0yioGW1iNnjyzMHWA0bc3DJcMfPBvIY7/7AD9xHt2Kgc\nXT3Q8J6CswKBgG4Pf1h1N/A3tuw3/lJ5EDjZAcnFoLhR9DCGlmfAoMQv6n29HziK\nEgmomJ0taLc040NeufvL0QH6kN/NvWr4s3D07iVkw74QmRDhSymuW44UFFssB7q/\nFEI+A3VYJEcr6rie4yNihbRozMj+S9CIRnRHEIHn20bPlRhf0hoZLJJXAoGASb7F\nOlkJxQNxXrGRCARiPgcS0kCwZkiVca/sbYC8yMrfpoWFKavEHQQZIdTX/WV+FAG/\n+zdfWTslFl0xQWSpRnPDQySbWRBTq2rl0vd5GDBsKCOYgWB1KLj3i4p0zm+6ITma\n5MgELetFaJ3GTK8QVe0NwlmUXz5zRJc9atnDQ0ECgYBvSt9q0sTWIhNFEmcEDMCk\nMWjk/XvSP1jLJfgwlfa0HuJAqgUf/qw7rnTMe4MSmZYVsLioL+Bcn85tPVfjFTrZ\n3p+JimE513Pn19AN8yCt6PzkWt/+wFkaZrmfkYhrxB5mK6oqzj72+xRK4c/lQYjH\ni1B6ki6dBpYX2IBjcVoYGA==\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-d8zzl@iridium-blast.iam.gserviceaccount.com",
        client_id: "102213967451011460119",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d8zzl%40iridium-blast.iam.gserviceaccount.com"
    }),
    databaseURL: "https://iridium-blast.firebaseio.com"
}).messaging();

module.exports = function(log){

    this.broadcastPush = function(data){

        log("Broadcasting : " + JSON.stringify(data));
        messaging.sendToTopic("broadcast", data, {timeToLive: 300}).then(console.log);

        // db.ref("users/").once("value", function(snapshot) {
        //     var users = snapshot.val();
    
        //     var sent = []
    
        //     Object.keys(users).forEach(function(user_name) {
        //         if (users[user_name].auths && users[user_name].auths.includes("notifications")){
        //             if (users[user_name].tokens && users[user_name].tokens.length > 0){
        //                 users[user_name].tokens.forEach(function(token){
        //                     if (token.length > 20 && !sent.includes[token]){
        //                         messaging.send({
        //                             data: data,
        //                             token: token
        //                         }).then((e)=>{
        //                             console.log(e)
        //                             sent.push(token);
        //                         }).catch((e)=>{
        //                             console.error(e);
        //                             this.removePushToken(token);
        //                         });
        //                     }
        //                 });
        //             }else{
        //                 if (user_name && user_name.length > 0) db.ref("users/" + user_name + "/tokens").set(['.']);
        //             }
        //         }
        //     });
        // });
        
    }

    // this.sendPush = function(user_name, data){
    //     db.ref("users/").once("value", function(snapshot) {
    //         var users = snapshot.val();
    //         if (data && data.title && data.title.length > 3 && data.body && data.body.length){
    //             if (users[user_name] && users[user_name].tokens && users[user_name].tokens.length > 0){
    //                 users[user_name].tokens.forEach(function(token){
    //                     if (token.length > 20){
    //                         log("Sending " + JSON.stringify(data) + " to " + user_name);
    //                         messaging.send({
    //                             data: data,
    //                             token: token
    //                         }).then((e)=>{
    //                             console.log(e)
    //                         }).catch((e)=>{
    //                             console.error(e);
    //                             this.removePushToken(token);
    //                         });
    //                     }
    //                 });
    //             }else{
    //                 db.ref("users/" + user_name + "/tokens").set(['.']);
    //             }
    //         }
    //     });
    // }

    // this.removePushToken = function(token){

    //     db.ref("users/").once("value", function(snapshot) {
    //         var users = snapshot.val();
            
    //         Object.keys(users).forEach(function(user_name) {
    //             if (users[user_name] && users[user_name].tokens && users[user_name].tokens.includes(token)){
    //                 db.ref("users/" + user_name + "/tokens").set(users[user_name].tokens.filter(function(value, index, arr){
    //                     return value != token;
    //                 }));
    //                 log("Unregistering " + token + " to " + user_name);
    //             }
    //         })
    //     });
    // }

    this.addPushToken = function(token){
        console.log("Registering " + token);
        messaging.subscribeToTopic(token, "broadcast");
    }

    this.send = function(data){ messaging.send(data) };
    this.sendToTopic = messaging.sendToTopic;
    this.subscribe = messaging.subscribeToTopic;
    this.unsubscribe = messaging.unsubscribeFromTopic;

    this.sendJoinNotif = function(partyID){
        this.broadcastPush({
            data:{partyID},
            notification: {
                title: "Une partie va commencer",
                body: "Cliquez pour rejoindre"
            }
        })
    }

    

}