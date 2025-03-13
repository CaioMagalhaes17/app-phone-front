/* eslint-disable react-hooks/rules-of-hooks */

import { Navigate, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import { getClientProfile } from "../api/user/client/getProfile";
import useStore from "../state";
import { getStoreProfile } from "../api/user/store/getProfile";
import { LoadGoogleApi } from "../adapters/Map/lib/ApiLoader";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = localStorage.getItem("accessToken");
  const isStore: string | null = localStorage.getItem('isStore')
  const [isLoading, setIsLoading] = useState(true)
  const { setClientInfos, setStoreInfos, setIsMapLoaded, clientInfos } = useStore()
  const isLoaded = LoadGoogleApi()
  const location = useLocation()
  const isStoreRoute = location.pathname.startsWith("/store")

  if (!accessToken) {
    return <Navigate to={isStore && isStore === 'true' ? "/store/login" : "/login"} replace />;
  }

  useEffect(() => {
    const checkAuth = async () => {
      if (isStore === 'false') {
        if (!clientInfos.name) {
          await loadClient()
        }
      } else {
        await loadStore()
      }
    }
    setIsMapLoaded(isLoaded)
    checkAuth()
    checkRoute()

  }, [location, isLoaded])

  async function loadClient() {
    console.log('niggerszinh')
    const response = await getClientProfile()
    setClientInfos(response)
    setIsLoading(false)
  }

  async function loadStore() {
    const response = await getStoreProfile()
    setStoreInfos(response)
    setIsLoading(false)
  }

  function checkRoute() {
    console.log(isStoreRoute, isStore)
    if (isStoreRoute && isStore === 'false') {
      return <Navigate to={"/404"} replace />;
    }

    if (!isStoreRoute && isStore === 'true') {
      if (location.pathname.startsWith('/store-feedbacks') && location.pathname.startsWith('/store/home')) return
      return window.location.href = '/404'
    }
  }

  if (isLoading) {
    return <div> Carregando...</div>
  }

  return children;
};