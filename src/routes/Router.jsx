import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import AuthRoutes from "./AuthRoutes";
import DashboardRoutes from "./dashboardRoutes";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />, //  Redirect to Login
  },
  {
    path: "/",
    element: <App />,
    children: [...AuthRoutes],
  },
  ...DashboardRoutes,
]);

export default Router;
