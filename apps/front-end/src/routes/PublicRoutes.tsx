import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { checkUserAuth } from "../api/checkAuth";

export function PublicRoutes() {
  const navigate = useNavigate()
  const location = useLocation()
  const routesToCheck = [
    '/login',
    '/store/login',
    '/signup',
    '/store/signup',
    '/chooseProfileType/login',
    '/chooseProfileType/signup'
  ]
  useEffect(() => {
    const asyncCheckAuth = async () => {
      await checkAuth()
    }
    if (!routesToCheck.includes(location.pathname)) {
      asyncCheckAuth()
    }
  }, [location])


  async function checkAuth() {
    const response = await checkUserAuth()
    if (response?.data.response === 'ok') {
      navigate(response?.data.isStore ? '/store/dashboard' : '/dashboard')
    }
  }
  return (
    <Outlet />
  )
}