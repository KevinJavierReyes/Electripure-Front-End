import ConfirmPasswordPage from "../pages/ConfirmPasswordPage";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import ConfirmEmailPhonePage from "../pages/ConfirmEmailPhonePage";
import ConfirmCaptchaPage from "../pages/ConfirmCaptchaPage";
import ConfirmContactsPage from "../pages/ConfirmContactsPage";
import LoginPage from "../pages/LoginPage";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
