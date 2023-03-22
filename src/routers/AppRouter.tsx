import { HashRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import ConfirmCaptchaPage from "../pages/CreatePasswordStepper/ConfirmCaptchaPage";
import LoginPage from "../pages/LoginPage";
import ConfirmCodePage from "../pages/ConfirmCodePage";
import SelectVerifyMethodPage from "../pages/SelectVerifyMethodPage";
import RequestResetPasswordPage from "../pages/RequestResetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ConfirmCodeSentPage from "../pages/ConfirmCodeSentPage";
import UserListPage from "../pages/UserListPage";
import { Fragment, useEffect } from "react";
import Loading from "../components/Loading";
import Toast from "../components/Toast";
import { IsAuthenticated, IsAuthenticatedLoginToken } from "./Auth";
import CreatePasswordPage from "../pages/CreatePasswordStepper/CreatePasswordPage";
import ConfirmEmailPhonePage from "../pages/CreatePasswordStepper/ConfirmEmailPhonePage";
import CreateBackupContactsPage from "../pages/CreatePasswordStepper/CreateBackupContactsPage";
import CompanyListPage from "../pages/CompanyListPage";
import CompanyDetails from "../pages/CompanyDetails"
import UserDetails from "../pages/UserDetails"
import AmpsVoltsPage from "../pages/AmpsVoltsPage";
import DashboardPage from "../pages/DashboardPage";
import AmpsGraph from "../archive/components/Graphs/AmpsGraph";
import VoltsGraph from "../archive/components/Graphs/VoltsGraph";
import PowerPage from "../pages/PowerPage";
import MeterPage from "../pages/MeterPage";
import HarmonicPage from "../pages/HarmonicPage";
import DeviceListPage from "../pages/DeviceListPage"
import DeviceDetails from "../pages/DeviceDetails" 
import VoltageCurrentGraph from "../components/Graphs/VoltageCurrentGraph";
import VoltageCurrentPage from "../pages/VoltageCurrent";
import HarmonicGraph from "../components/Graphs/HarmonicGraph";
import PowerGraph from "../components/Graphs/PowerGraph";
import { Messaging, getMessaging, getToken, isSupported } from "firebase/messaging";
import FirebaseNotifications from "../components/FirebaseNotifications";
import { useFirebaseApp } from "reactfire";
import { FirebaseApp } from "firebase/app";

// async function generateToken(messagingInstance: Messaging) {
//   const supported = await isSupported();
//   if (!supported) {
//     console.log("Messaging not support.");
//     return;
//   }
//   const token: string = await getToken(messagingInstance, { "vapidKey": "BN2CaREzbO05UibxwJjmeXz6HKDdHsjKbh2oBW6fLbr5q00_TlHBZm7JaTF0YKtoQdmSV7qRo2V338qUMTeWVpQ" });
//   console.log("Firebase Token", token);
// }

const AppRouter = () => {

  // const firebaseApp: FirebaseApp = useFirebaseApp();
  // const messagingInstance: Messaging = getMessaging(firebaseApp);
  // useEffect(() => {
  //   generateToken(messagingInstance);
  // });

  return (
    <Fragment>
      <HashRouter>
        <Routes>
          
          {/* Login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/verify/select" element={<IsAuthenticatedLoginToken><SelectVerifyMethodPage /></IsAuthenticatedLoginToken>} />
          <Route path="/login/verify/confirm" element={<IsAuthenticatedLoginToken><ConfirmCodePage /></IsAuthenticatedLoginToken>} />

          {/* Confirm token */}
          <Route path="/confirm/:token/step/1" element={<CreatePasswordPage />} />
          <Route path="/confirm/:token/step/2" element={<ConfirmEmailPhonePage />} />
          <Route path="/confirm/:token/step/3" element={<ConfirmCaptchaPage />}  />
          <Route path="/confirm/:token/step/4" element={<CreateBackupContactsPage />}  />

          {/* Reset password */}
          <Route path="/reset" element={<RequestResetPasswordPage />} />
          <Route path="/reset/sent" element={<ConfirmCodeSentPage />} />
          <Route path="/reset/:token/confirm" element={<ResetPasswordPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<IsAuthenticated><DashboardPage /></IsAuthenticated>}>
            <Route path="user/list" element={<UserListPage />} />
            <Route path="user/details/:userId" element={<UserDetails />} />
            <Route path="company/list" element={<CompanyListPage />} />
            <Route path="company/details/:ciaId" element={<CompanyDetails />} />
            <Route path="company/:companyId" element={<Outlet />}>
              {/* <Route path="site/:siteId">
                <Route path="mdp/:siteId"> */}
                  <Route path="meter/:meterId" element={<MeterPage />}>
                    {/* <Route path="apmsvolts" element={<AmpsVoltsPage />}>
                      <Route path="amps" element={<AmpsGraph />} />
                      <Route path="volts" element={<VoltsGraph />} />
                      <Route path="*" element={<div></div>} />
                    </Route> */}
                    <Route path="voltagecurrent" element={<VoltageCurrentPage />}>
                      <Route path="*" element={<VoltageCurrentGraph />} />
                    </Route>
                    <Route path="power" element={<PowerPage />}>
                      <Route path="*" element={<PowerGraph />} />
                      {/* <Route path="active" element={<PowerActiveGraph />} />
                      <Route path="apparent" element={<PowerApparent />} />
                      <Route path="reactive" element={<PowerReactive />} />
                      <Route path="linea" element={<PowerLine1 />} />
                      <Route path="lineb" element={<PowerLine2 />} />
                      <Route path="linec" element={<PowerLine3 />} />
                      <Route path="*" element={<div></div>} /> */}
                    </Route>
                    <Route path="harmonic" element={<HarmonicPage />}>
                      <Route path="*" element={<HarmonicGraph />} />
                      {/* <Route path="amp/line1" element={<HarmonicAmpLine1 />} />
                      <Route path="amp/line2" element={<HarmonicAmpLine2 />} />
                      <Route path="amp/line3" element={<HarmonicAmpLine3 />} />
                      <Route path="volt/line1" element={<HarmonicVoltLine1 />} />
                      <Route path="volt/line2" element={<HarmonicVoltLine2 />} />
                      <Route path="volt/line3" element={<HarmonicVoltLine3 />} />
                      <Route path="*" element={<div></div>} /> */}
                    </Route>
                  </Route>
                  {/* <Route path="*" index element={<div>Site</div>} />
                </Route>
                <Route path="*" index element={<div>Site</div>} />
              </Route> */}
              <Route index element={<div></div>} />
            </Route>
            <Route path="device/list" element={<DeviceListPage />} />
            <Route path="device/details/:devId" element={<DeviceDetails />} />
            <Route path="*" element={<div></div>} />
          </Route>

          {/* Else */}
          <Route path="*" element={<Navigate to="/login"/>} />

        </Routes>
      </HashRouter>
      <FirebaseNotifications/>
      <Toast/>
      <Loading/>
    </Fragment>
  );
};

export default AppRouter;
