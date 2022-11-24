import { HashRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import ConfirmCaptchaPage from "../pages/CreatePasswordStepper/ConfirmCaptchaPage";
import LoginPage from "../pages/LoginPage";
import ConfirmCodePage from "../pages/ConfirmCodePage";
import SelectVerifyMethodPage from "../pages/SelectVerifyMethodPage";
import RequestResetPasswordPage from "../pages/RequestResetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ConfirmCodeSentPage from "../pages/ConfirmCodeSentPage";
import UserListPage from "../pages/UserListPage";
import { Fragment } from "react";
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
import AmpsGraph from "../components/Graphs/AmpsGraph";
import VoltsGraph from "../components/Graphs/VoltsGraph";
import PowerPage from "../pages/PowerPage";
import PowerActiveGraph from "../components/Graphs/PowerActiveGraph";
import PowerApparent from "../components/Graphs/PowerApparent";
import PowerLine1 from "../components/Graphs/PowerLine1";
import PowerLine2 from "../components/Graphs/PowerLine2";
import PowerLine3 from "../components/Graphs/PowerLine3";
import PowerReactive from "../components/Graphs/PowerReactive";
import PowerFactor from "../components/Graphs/PowerFactor";
import MeterPage from "../pages/MeterPage";
import HarmonicPage from "../pages/HarmonicPage";
import HarmonicAmpLine1 from "../components/Graphs/HarmonicAmpLine1";
import HarmonicAmpLine2 from "../components/Graphs/HarmonicAmpLine2";
import HarmonicAmpLine3 from "../components/Graphs/HarmonicAmpLine3";
import HarmonicVoltLine1 from "../components/Graphs/HarmonicVoltLine1";
import HarmonicVoltLine2 from "../components/Graphs/HarmonicVoltLine2";
import HarmonicVoltLine3 from "../components/Graphs/HarmonicVoltLine3";

const AppRouter = () => {



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
          {/* <Route path="/confirm/:token/step/4" element={<IsAuthenticated><CreateBackupContactsPage /></IsAuthenticated>}  /> */}

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
                    <Route path="apmsvolts" element={<AmpsVoltsPage />}>
                      <Route path="amps" element={<AmpsGraph />} />
                      <Route path="volts" element={<VoltsGraph />} />
                      <Route path="*" element={<div></div>} />
                    </Route>
                    <Route path="power" element={<PowerPage />}>
                      <Route path="active" element={<PowerActiveGraph />} />
                      {/* <Route path="factor" element={<PowerFactor />} /> */}
                      <Route path="apparent" element={<PowerApparent />} />
                      <Route path="reactive" element={<PowerReactive />} />
                      <Route path="linea" element={<PowerLine1 />} />
                      <Route path="lineb" element={<PowerLine2 />} />
                      <Route path="linec" element={<PowerLine3 />} />
                      <Route path="*" element={<div></div>} />
                    </Route>
                    <Route path="harmonic" element={<HarmonicPage />}>
                      <Route path="amp/line1" element={<HarmonicAmpLine1 />} />
                      <Route path="amp/line2" element={<HarmonicAmpLine2 />} />
                      <Route path="amp/line3" element={<HarmonicAmpLine3 />} />
                      <Route path="volt/line1" element={<HarmonicVoltLine1 />} />
                      <Route path="volt/line2" element={<HarmonicVoltLine2 />} />
                      <Route path="volt/line3" element={<HarmonicVoltLine3 />} />
                      <Route path="*" element={<div></div>} />
                    </Route>
                  </Route>
                  {/* <Route path="*" index element={<div>Site</div>} />
                </Route>
                <Route path="*" index element={<div>Site</div>} />
              </Route> */}
              <Route index element={<div></div>} />
            </Route>
            <Route path="*" element={<div></div>} />
          </Route>

          {/* Else */}
          <Route path="*" element={<Navigate to="/login"/>} />
          {/* <Route path="*" element={<label className="mx-auto">No existe la ruta especificada</label>} /> */}

        </Routes>
      </HashRouter>
      <Toast/>
      <Loading/>
    </Fragment>
  );
};

export default AppRouter;
