import { Box } from "@app/ui"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "./Header"

export default function DefaultLayout() {
  return (
    <>
      <Box className={` leftbar-game-icon vertical full main-section antialiased relative font-nunito text-sm font-normal`}>
        <Box className="relative">
          <Box className="navbar-sticky main-container text-white-dark min-h-screen">
            <Box className="main-content flex flex-col min-h-screen">
              <Header />
              <Suspense>
                <Box data-overlap="false" className="animate__fadeIn animate__animated page-container scrollable">
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