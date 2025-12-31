import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar'
export const Route = createFileRoute('/admin/_admin')({
  component: Layout,
})

function Layout() {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <main>
        <SidebarTrigger className='' />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

