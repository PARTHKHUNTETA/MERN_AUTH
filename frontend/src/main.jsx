import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomeScreen />} />
      <Route index path="/login" element={<LoginScreen />} />
      <Route index path="/register" element={<RegisterScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
