import "./index.css";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import truck from "redux-thunk";
import { electripureReducer } from "./reducers/electipure";
import ReactDOM from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import { FirebaseAppProvider } from 'reactfire';


const composeAlt: any =  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancer: any = composeAlt(applyMiddleware(truck));

const store = createStore(electripureReducer, composeEnhancer);

const firebaseConfig = {
  "apiKey": "AIzaSyDRx7HiK9jki6_WNKpR2DiflthdnLNuVrE",
  "authDomain": "electripure-498d1.firebaseapp.com",
  "projectId": "electripure-498d1",
  "storageBucket": "electripure-498d1.appspot.com",
  "messagingSenderId": "179416245805",
  "appId": "1:179416245805:web:37e35d078736ad16563aa4"
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AppRouter />
    </FirebaseAppProvider>
  </Provider>
);