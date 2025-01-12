import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Home } from "../pages/Home";
import React from "react";

const DefaultLayout = React.lazy(() => import("../components/DefaultLayout"))
const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
]

export const appRoute = createBrowserRouter(routes)