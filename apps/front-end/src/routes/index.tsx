import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Home } from "../pages/Home";
import React from "react";
import ClientLogin from "../pages/Authentication/client/ClientLogin";
import StoreLogin from "../pages/Authentication/store/StoreLogin";
import StoreSignUp from "../pages/Authentication/store/StoreSignup";
import { ProtectedRoute } from "./ProtectedRoutes";

const DefaultLayout = React.lazy(() => import("../components/DefaultLayout"))
const ClientSignUp = React.lazy(() => import("../pages/Authentication/client/ClientSignUp"))
const StoreProfilePicker = React.lazy(() => import("../pages/Authentication/store/profile/ProfilePicker"))

const routes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />
      },
    ]
  },
  {
    path: '/signup',
    element: <ClientSignUp />
  },
  {
    path: '/login',
    element: <ClientLogin />
  },
  {
    path: '/store/login',
    element: <StoreLogin />
  },
  {
    path: '/store/signup',
    element: <StoreSignUp />
  },
  {
    path: '/store/profile/picker',
    element: <StoreProfilePicker />
  }
]

export const appRoute = createBrowserRouter(routes)