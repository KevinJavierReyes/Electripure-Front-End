import ConfirmPasswordPage from "../pages/ConfirmPasswordPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConfirmEmailPhonePage from "../pages/ConfirmEmailPhonePage";
import ConfirmCaptchaPage from "../pages/ConfirmCaptchaPage";
import ConfirmContactsPage from "../pages/ConfirmContactsPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/confirm/:token/step/1" element={<ConfirmPasswordPage />} />
        <Route path="/confirm/:token/step/2" element={<ConfirmEmailPhonePage />} />
        <Route path="/confirm/:token/step/3" element={<ConfirmCaptchaPage />}  />
        <Route path="/confirm/:token/step/4" element={<ConfirmContactsPage />}  />
        <Route path="*" element={<label className="mx-auto">No existe la ruta especificada</label>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
