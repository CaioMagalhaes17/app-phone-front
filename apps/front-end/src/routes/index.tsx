import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Home } from "../pages/Home/client";
import React from "react";
import ClientLogin from "../pages/Authentication/client/ClientLogin";
import StoreLogin from "../pages/Authentication/store/StoreLogin";
import StoreSignUp from "../pages/Authentication/store/StoreSignup";
import { ProtectedRoute } from "./ProtectedRoutes";
import ClientMapSearch from "../pages/Map/Search";
import { CreateSolicitation } from "../pages/Solicitations/client/Create";
import { SolicitationsList } from "../pages/Solicitations/client/List";
import { SolicitationDetails } from "../pages/Solicitations/client/Details";
import Error404 from "../pages/404Page";
import { StoreHome } from "../pages/Home/store";
import StoreMapEdit from "../pages/Map/Edit/store";
import { AvaliableSolicitations } from "../pages/Solicitations/store/List/Avaliable";
import { StoreSolicitationDetails } from "../pages/Solicitations/store/Details";
import { StoreBudgetList } from "../pages/Budgets/store/List";
import { StoreProfileOwner } from "../pages/Profile/store/Owner";
import { EditStoreProfile } from "../pages/Profile/store/Edit";
import { StoreFeedbacksList } from "../pages/Profile/store/Feedbacks";
import { ClientBudgetsList } from "../pages/Budgets/client/List";
import { StoreProfile } from "../pages/Profile/store";
import { BudgetDetails } from "../pages/Budgets/client/Details";
import { UserConfigurations } from "../pages/Configurations/client";
import { UserStoreConfigurations } from "../pages/Configurations/store";
import { StoreMarket } from "../pages/Market/client/StoreMarket";
import { ClientMarketProduct } from "../pages/Market/client/Product";
import { StoreMarketProfile } from "../pages/Market/store/profile";
import { StoreProductsRowEdit } from "../pages/Market/store/products/RowEdit";
import { ProductEdit } from "../pages/Market/store/products/ProductEdit";
import { ProductCreate } from "../pages/Market/store/products/ProductCreate";
import { ClientMarketHome } from "../pages/Market/client/home";
import { ClientMarketCategoryProducts } from "../pages/Market/client/category";
import { UserSignUp } from "../pages/Authentication";
import { LandingHome } from "../pages/Landing/home";
import { PublicRoutes } from "./PublicRoutes";
import { StorePlans } from "../pages/Plans";
import { LandingCreateSolicitation } from "../pages/Landing/solicitation";

const ClientMapEdit = React.lazy(() => import("../pages/Map/Edit/client"))
const DefaultLayout = React.lazy(() => import("../components/DefaultLayout"))
const ClientSignUp = React.lazy(() => import("../pages/Authentication/client/ClientSignUp"))
const StoreProfilePicker = React.lazy(() => import("../pages/Authentication/store/profile/ProfilePicker"))

export const routes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
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
        element: <CreateSolicitation />
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
        path: '/budgets/list',
        element: <ClientBudgetsList />,
      },
      {
        path: '/store/dashboard',
        element: <StoreHome />,
      },
      {
        path: '/store-profile/:id',
        element: <StoreProfile />,
      },
      {
        path: '/store/map/edit',
        element: <StoreMapEdit />,
      },
      {
        path: '/store/avaliable/solicitations',
        element: <AvaliableSolicitations />,
      },
      {
        path: '/store/solicitation/:id',
        element: <StoreSolicitationDetails />,
      },
      {
        path: '/store/budget/list',
        element: <StoreBudgetList />,
      },
      {
        path: '/store/profile',
        element: <StoreProfileOwner />,
      },
      {
        path: '/store/profile/edit',
        element: <EditStoreProfile />,
      },
      {
        path: '/store-feedbacks/:id',
        element: <StoreFeedbacksList />,
      },
      {
        path: '/budget/:id',
        element: <BudgetDetails />
      },
      {
        path: '/configurations',
        element: <UserConfigurations />
      },
      {
        path: '/store/configurations',
        element: <UserStoreConfigurations />
      },
      {
        path: '/instagram/auth',
        element: <UserStoreConfigurations />
      },
      {
        path: '/market',
        element: <ClientMarketHome />
      },
      {
        path: '/market/store/:id',
        element: <StoreMarket />
      },

      {
        path: '/market/store/product/:id',
        element: <ClientMarketProduct />
      },
      {
        path: '/store/market',
        element: <StoreMarketProfile />
      },
      {
        path: '/store/market/row/edit',
        element: <StoreProductsRowEdit />
      },
      {
        path: '/store/market/product/edit/:id',
        element: <ProductEdit />
      },
      {
        path: '/store/market/product/create/:id',
        element: <ProductCreate />
      },
      {
        path: '/market/by-category/:category',
        element: <ClientMarketCategoryProducts />
      },
      {
        path: '/store/plans',
        element: <StorePlans />
      },

    ]
  },
  {
    element: (
      <PublicRoutes />
    ),
    children: [
      {
        path: '/landing/solicitations/create',
        element: <LandingCreateSolicitation />
      },
      {
        path: '/signup',
        element: <ClientSignUp />
      },
      {
        path: '/chooseProfileType/:id',
        element: <UserSignUp />
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
      },
      {
        path: '/',
        element: <LandingHome />
      }
    ]
  }

]

export const appRoute = createBrowserRouter(routes)