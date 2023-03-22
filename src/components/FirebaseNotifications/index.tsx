import { FirebaseApp } from "firebase/app";
import { MessagePayload, Messaging, getMessaging, onMessage } from "firebase/messaging";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFirebaseApp } from "reactfire";
import { showToast } from "../../actions/electripure";


function FirebaseNotifications() {
    const dispatch = useDispatch();
    const firebaseApp: FirebaseApp = useFirebaseApp();
    const messagingInstance: Messaging = getMessaging(firebaseApp);
    useEffect(() => {
      onMessage(messagingInstance, {
        next: (message: MessagePayload) => {
          // {
          //   "from": "179416245805",
          //   "collapseKey": "campaign_collapse_key_9096796148012626792",
          //   "messageId": "61c0debe-8155-43e8-a7af-949b2d27ba19",
          //   "notification": {
          //       "title": "fdcsss",
          //       "body": "sdsdsds"
          //   },
          //   "data": {
          //       "gcm.n.e": "1",
          //       "google.c.a.ts": "1678969300",
          //       "google.c.a.udt": "0",
          //       "google.c.a.e": "1",
          //       "google.c.a.c_id": "9096796148012626792",
          //       "google.c.a.c_l": "fdcsss"
          //   }
          // }
          console.log("Push Notification New", message);
          dispatch(showToast({
            "message": `<strong>${message.notification!.title!}</strong> ${message.notification!.body!}`,
            "status": message.data!.status ?? "warning"
          }));
        },
        complete: () => {
          console.log("Push Notification Completed");
        },
        error: (error: Error) => {
          console.log("Push Notification Error", error.message);
        },
      });
    }, []);
  
    return (<Fragment></Fragment>);
}

export default FirebaseNotifications;