import React from "react";
import AuthForm from "../pages/auth/AuthForm";

const AuthRoutes = [
  {
    path: "/login",
    element: <AuthForm isRegister={false} />,
  },
  {
    path: "/register",
    element: <AuthForm isRegister={true} />,
  },
];

export default AuthRoutes;
