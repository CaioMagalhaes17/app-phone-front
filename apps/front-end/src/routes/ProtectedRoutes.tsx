/* eslint-disable react-hooks/rules-of-hooks */

import { Navigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { getClientProfile } from "../api/user/client/getProfile";
import useStore from "../state";
import { getStoreProfile } from "../api/user/store/getProfile";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = localStorage.getItem("accessToken");
  const isStore: string | null = localStorage.getItem('isStore')
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { setClientInfos, setStoreInfos } = useStore()

  if (!accessToken) {
    return <Navigate to={isStore && isStore === 'true' ? "/store/login" : "/login"} replace />;
  }

  useEffect(() => {
    const checkAuth = async () => {
      if (isStore === 'false') {
        await loadClient()
      } else {
        await loadStore()
      }
    }
    checkAuth()
  }, [location])

  async function loadClient() {
    const response = await getClientProfile()
    setClientInfos(response)
    setIsLoading(false)
  }

  async function loadStore() {
    const response = await getStoreProfile()
    setStoreInfos(response)
    setIsLoading(false)
    console.log('dsadas31232')
  }

  if (isLoading) {
    return <div> Carregando...</div>
  }

  return children;
};