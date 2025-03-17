import { Box } from "@app/ui"
import { Suspense } from "react"
import { LandingHeader } from "./Header"

export default function DefaultLanding({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box className={` leftbar-game-icon vertical font-extrabold full main-section antialiased relative font-nunito text-sm font-normal`}>
        <Box className="relative">
          <Box className="navbar-sticky main-container text-white-dark min-h-screen">
            <Box className="main-content flex flex-col min-h-screen">
              <LandingHeader />
              <Suspense>
                <Box className="hidden shadow-3xl shadow-4xl teste-default bg-success bg-warning bg-danger text-warning text-success text-danger text-primary" />
                <Box data-overlap="false" id="page-container" style={{ left: '0px' }} className="animate__fadeIn animate__animated page-container p-4 scrollable">
                  {children}
                </Box>
              </Suspense>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}