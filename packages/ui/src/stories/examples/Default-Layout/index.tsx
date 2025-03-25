import { Box } from "@/atoms/Box"
import { Button } from "@/atoms/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/Dropdown"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { Suspense, useState } from "react"

export default function DefaultLayoutExample({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box className={` pointer-all vertical full shadow-5xl shadow-4xl shadow-3xl main-section antialiased relative sombra font-nunito text-sm font-normal`}>
        <Box className="relative">
          <Box className="navbar-sticky main-container text-white-dark min-h-screen">
            <Box className="main-content flex flex-col min-h-screen">
              <Header>
                <div className="mr-auto"></div>
                <Button className="btn-twitch">Entrar com twitch</Button>
                <Button className="ml-5 btn-black text-white">Criar conta</Button>
              </Header>
              <Sidebar>a</Sidebar>
              <Suspense>
                <Box data-overlap="false" className="page-container scrollable">
                  <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-white">Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Box>
              </Suspense>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}