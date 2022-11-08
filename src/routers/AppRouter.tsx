import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
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
import AmpsVoltsPage from "../pages/AmpsVoltsPage";
import DashboardPage from "../pages/DashboardPage";

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
          <Route path="/confirm/:token/step/4" element={<IsAuthenticated><CreateBackupContactsPage /></IsAuthenticated>}  />

          {/* Reset password */}
          <Route path="/reset" element={<RequestResetPasswordPage />} />
          <Route path="/reset/sent" element={<ConfirmCodeSentPage />} />
          <Route path="/reset/:token/confirm" element={<ResetPasswordPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<IsAuthenticated><DashboardPage /></IsAuthenticated>}>
            <Route path="user/list" element={<UserListPage />} />
            <Route path="company/list" element={<CompanyListPage />} />
            <Route path="apmsvolts" element={<AmpsVoltsPage />} />
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
