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
    '/chooseProfileType/signup',
    '/landing/solicitations/create'
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
    console.log('dsaindiosandaiosndsaio')
    if (response?.data.response === 'ok') {
      console.log('3124123132')

      navigate(response?.data.isStore ? '/store/dashboard' : '/dashboard')
    }
  }
  return (
    <Outlet />
  )
}