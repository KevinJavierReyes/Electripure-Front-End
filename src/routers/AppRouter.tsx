import ConfirmPasswordPage from "../pages/ConfirmPasswordPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConfirmEmailPhonePage from "../pages/ConfirmEmailPhonePage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/confirm/:token/step/1" element={<ConfirmPasswordPage />} />
        <Route path="/confirm/:token/step/2" element={<ConfirmEmailPhonePage />} />
        <Route path="/confirm/:token/step/3" element={<h2> Page is building</h2>} />
        <Route path="*" element={<label className="mx-auto">No existe la ruta especificada</label>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
