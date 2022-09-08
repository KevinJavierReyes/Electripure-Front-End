import HomePage from "../pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@progress/kendo-theme-bootstrap/dist/all.css";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<label className="text-4xl font-bold">Login</label>} />
        <Route path="*" element={<label className="mx-auto">No existe la ruta especificada</label>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
