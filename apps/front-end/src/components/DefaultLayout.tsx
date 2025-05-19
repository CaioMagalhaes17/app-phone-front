import { Box } from "@app/ui"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Sidebar } from "./SIdebar"
import useStore from "../state"

export default function DefaultLayout() {
  const { closeSidebar, isMobile } = useStore()
  return (
    <>
      <Box className={` leftbar-game-icon vertical font-extrabold full main-section antialiased relative font-nunito text-sm font-normal`}>
        <Box className="relative">
          <Box className="navbar-sticky main-container text-white-dark min-h-screen">
            <Box className="main-content flex flex-col min-h-screen">
              <Header />
              <Sidebar />
              <Suspense>
                <Box className="hidden shadow-3xl shadow-4xl teste-default bg-success bg-warning bg-danger text-warning text-success text-danger text-primary" />
                <Box data-overlap="false" id="page-container" style={{ left: closeSidebar || isMobile ? '0px' : '305px' }} className="animate__fadeIn animate__animated page-container scrollable">
                  <Outlet />
                </Box>
              </Suspense>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}