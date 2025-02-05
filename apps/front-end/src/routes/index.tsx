import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Home } from "../pages/Home/client";
import React from "react";
import ClientLogin from "../pages/Authentication/client/ClientLogin";
import StoreLogin from "../pages/Authentication/store/StoreLogin";
import StoreSignUp from "../pages/Authentication/store/StoreSignup";
import { ProtectedRoute } from "./ProtectedRoutes";
import ClientMapSearch from "../pages/Map/Search";
import { SolicitationsCreate } from "../pages/Solicitations/client/Create";
import { SolicitationsList } from "../pages/Solicitations/client/List";
import { SolicitationDetails } from "../pages/Solicitations/client/Details";
import Error404 from "../pages/404Page";
import { StoreHome } from "../pages/Home/store";
import StoreMapEdit from "../pages/Map/Edit/store";

const ClientMapEdit = React.lazy(() => import("../pages/Map/Edit/client"))
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
        element: <Home />,
      },
      {
        path: '/map/edit',
        element: <ClientMapEdit />
      },
      {
        path: '/map',
        element: <ClientMapSearch />
      },
      {
        path: '/solicitations/create',
        element: <SolicitationsCreate />
      },
      {
        path: '/solicitations',
        element: <SolicitationsList />
      },
      {
        path: '/solicitation/:id',
        element: <SolicitationDetails />
      },
      {
        path: '/store',
        element: <StoreHome />,
      },
      {
        path: '/store/map/edit',
        element: <StoreMapEdit />,
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
  },
  {
    path: "*",
    element: <Error404 />
  }
]

export const appRoute = createBrowserRouter(routes)