import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import App from './App'

import axios from "axios";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";

axios.defaults.baseURL=process.env.REACT_APP_BASE_URL
axios.defaults.withCredentials=true

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </CookiesProvider>
  // </React.StrictMode>
);
function createStore(rootReducer: any) {
  throw new Error("Function not implemented.");
}
