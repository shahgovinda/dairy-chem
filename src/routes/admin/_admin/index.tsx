import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Home, LayoutDashboard, Package, Settings } from 'lucide-react'

export const Route = createFileRoute('/admin/_admin/')({
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <p className='border'>admin index</p>
  )
}
