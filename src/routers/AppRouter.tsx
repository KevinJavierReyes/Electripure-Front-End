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

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/verify/confirm" element={<ConfirmCodePage />} />
        <Route path="/login/verify/select" element={<SelectVerifyMethodPage />} />
        <Route path="/reset" element={<RequestResetPasswordPage />} />
        <Route path="/reset/sent" element={<ConfirmCodeSentPage />} />
        <Route path="/reset/confirm" element={<ResetPasswordPage />} />
        <Route path="/confirm/:token/step/1" element={<ConfirmPasswordPage />} />
        <Route path="/confirm/:token/step/2" element={<ConfirmEmailPhonePage />} />
        <Route path="/confirm/:token/step/3" element={<ConfirmCaptchaPage />}  />
        <Route path="/confirm/:token/step/4" element={<ConfirmContactsPage />}  />
        <Route path="*" element={<label className="mx-auto">No existe la ruta especificada</label>} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
