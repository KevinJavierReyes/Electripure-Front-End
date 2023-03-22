// Set google credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = require("path").join(__dirname, "electripure-498d1-firebase-adminsdk-lnlg0-16973e5d5a.json");

const { getMessaging } = require('firebase-admin/messaging');
const { initializeApp, applicationDefault } = require('firebase-admin/app');

const app = initializeApp({
    credential: applicationDefault()
});

const messaging = getMessaging(app);
const tokens = [
    "cCiy2zHgfCoYU8xtGcOaWy:APA91bFSPx-IsZsaVl_HhDyV4h0bW3Zf70z2T0eblMUeR6BNfIrRqfhGGFmYTQp8NWt3Iawl-HhJXrbSEwpyAulY49xKWqDHM3kR0sK-n8hb4_MSTpdVhKxptQEsNFMQKmZAl4-IzyW0",
    "e2Cn1bZLBc8Il_4hDtuWDn:APA91bEY75RA9VNBhN3mtYf_XcrZSvA_-1cS_FMicvm8hHCtstLDhAhNYcEDquo3c8T9o2XnOBnir4p2z1gOCbmyDViAK8GwYxuDXuv1bbGTJOFBn7DPt2FiH-O6lu19T-joWOJcPzIX"
];
(async () => {
    await messaging.subscribeToTopic(tokens, "worker");
    console.log("SendAll", await messaging.sendAll([{
        "token": tokens[1],
        // "topic": "worker",
        "notification": {
            "body": "Alert content...",
            "title": "Alert !!!"
        },
        data: {
            "status": "error"
        }
    }]));
})();