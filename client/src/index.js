import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "state/index.js";
import {disableReactDevTools} from "@fvilers/disable-react-devtools"

if (process.env.NODE_ENV !== 'development') {
  disableReactDevTools()
} 

const rootElem = document.getElementById("root");
const root = ReactDOM.createRoot(rootElem);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
