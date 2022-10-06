import "./index.css";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import truck from "redux-thunk";
import { electripureReducer } from "./reducers/electipure";
import ReactDOM from "react-dom/client";
import AppRouter from "./routers/AppRouter";

const composeAlt: any =  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancer: any = composeAlt(applyMiddleware(truck));

const store = createStore(electripureReducer, composeEnhancer);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);