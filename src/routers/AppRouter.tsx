import ConfirmPasswordPage from "../pages/ConfirmPasswordPage";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import ConfirmEmailPhonePage from "../pages/ConfirmEmailPhonePage";
import ConfirmCaptchaPage from "../pages/ConfirmCaptchaPage";
import ConfirmContactsPage from "../pages/ConfirmContactsPage";
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
          <Route path="/confirm/:token/step/1" element={<ConfirmPasswordPage />} />
          <Route path="/confirm/:token/step/2" element={<ConfirmEmailPhonePage />} />
          <Route path="/confirm/:token/step/3" element={<ConfirmCaptchaPage />}  />
          <Route path="/confirm/:token/step/4" element={<IsAuthenticated><ConfirmContactsPage /></IsAuthenticated>}  />

          {/* Reset password */}
          <Route path="/reset" element={<RequestResetPasswordPage />} />
          <Route path="/reset/sent" element={<ConfirmCodeSentPage />} />
          <Route path="/reset/:token/confirm" element={<ResetPasswordPage />} />

          {/* Dashboard */}
          <Route path="/user/list" element={<IsAuthenticated><UserListPage /></IsAuthenticated>} />

          {/* Else */}
          <Route path="*" element={<label className="mx-auto">No existe la ruta especificada</label>} />

        </Routes>
      </HashRouter>
      <Toast/>
      <Loading/>
    </Fragment>
  );
};

export default AppRouter;
