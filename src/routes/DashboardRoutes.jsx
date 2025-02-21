import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ProtectedRoute from "./ProtectedRoute"; // For authentication check
import ProfilePage from "../pages/dashboard/ProfilePage";
import SettingsPage from "../pages/dashboard/SettingsPage";
import ErrorPage from "../pages/ErrorPage";

const dashboardRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <DashboardHome /> }, // Default dashboard home
      { path: "/dashboard/profile", element: <ProfilePage /> },
      { path: "/dashboard/settings", element: <SettingsPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];

export default dashboardRoutes;
