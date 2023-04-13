// Set google credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = require("path").join(__dirname, "electripure-498d1-firebase-adminsdk-lnlg0-16973e5d5a.json");

const { getMessaging } = require('firebase-admin/messaging');
const { initializeApp, applicationDefault } = require('firebase-admin/app');

const app = initializeApp({
    credential: applicationDefault()
});

const messaging = getMessaging(app);
const tokens = [
    "e2Cn1bZLBc8Il_4hDtuWDn:APA91bHwS367mmNYQiaCJYpkZMk-nJE3QQjwANxSi5yYRoh1o5wNDywRp3mmfBG8vHoeqlFhIHe_Ew0Fm5UbA4M44ybT2qU-OabRiCDe2ZCgv746_NaAcWd45w68z7IK3aqaQUr7CjjO"
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