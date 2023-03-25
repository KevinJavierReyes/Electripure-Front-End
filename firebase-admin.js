// Set google credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = require("path").join(__dirname, "electripure-498d1-firebase-adminsdk-lnlg0-16973e5d5a.json");

const { getMessaging } = require('firebase-admin/messaging');
const { initializeApp, applicationDefault } = require('firebase-admin/app');

const app = initializeApp({
    credential: applicationDefault()
});

const messaging = getMessaging(app);
const tokens = [
    "cCiy2zHgfCoYU8xtGcOaWy:APA91bH2IGhfijjD8B5ZG3FEyD4mm0Q923b1UsMI_KQVy2GSSJeFxSrRu5ak9hpmbliBg5rJ_q0lpDAZ0udwztUn0gVvpO7IXMFJunq_bAAPlKYG7n3fAlwGrFyzSvRuyVLNzo1VQLfx"
];
(async () => {
    await messaging.subscribeToTopic(tokens, "worker");
    console.log("SendAll", await messaging.sendAll([{
        "token": tokens[0],
        // "topic": "worker",
        "notification": {
            "body": "Alert content...",
            "title": "Alert !!!"
        },
        data: {
            "status": "success"
        }
    }]));
})();