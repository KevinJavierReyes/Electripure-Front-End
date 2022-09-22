import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import AppRouter from "./routers/AppRouter";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);