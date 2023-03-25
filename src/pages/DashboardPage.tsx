import React, { useEffect } from "react";
import Navegation from "../components/Navigation";
import { Outlet } from "react-router-dom";
import { useFirebaseApp } from 'reactfire';
import { Messaging, getMessaging, onMessage } from "firebase/messaging";
import { FirebaseApp } from "firebase/app";
import { generateToken } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { ElectripureState } from "../interfaces/reducers";
import { generateFCMToken, showToast } from "../actions/electripure";

function DashboardPage () {
    const dispatch = useDispatch();
    const app: FirebaseApp = useFirebaseApp();
    const messaging: Messaging = getMessaging(app);
    const fcmToken: string|null = useSelector((state: ElectripureState) => state.fcmToken);

    useEffect(() => {
        console.log("FCM Token: ", fcmToken);
        if (fcmToken == null) {
            dispatch(generateFCMToken({
                "messaging": messaging,
            }));
        } else {
            onMessage(messaging, (payload) => {
                console.log('Message received. ', payload);
                dispatch(showToast({
                    "title": payload.notification?.title ?? "",
                    "message": payload.notification?.body ?? "",
                    "status": payload.data?.status ?? "info",
                  }));
            });
        }
    }, [fcmToken]);

    

    return (
        <React.Fragment>
            <Navegation>
                <div className="px-[30px] py-[10px] w-full">
                    <Outlet />
                </div>
            </Navegation>
        </React.Fragment>
    );
}

export default DashboardPage;
