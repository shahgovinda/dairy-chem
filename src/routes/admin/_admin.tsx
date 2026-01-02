import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar'
export const Route = createFileRoute('/admin/_admin')({
  component: Layout,
})

function Layout() {
  return (
    <SidebarProvider >
      <AppSidebar />
      <main className='relative w-full'>
        <div className='absolute inset-0 bg-[url("/logo.jpeg")] bg-center bg-no-repeat bg-fixed opacity-10 -z-10' />
        <SidebarTrigger className='' />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
