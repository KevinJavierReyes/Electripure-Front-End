import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import reportWebVitals from "./reportWebVitals";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
