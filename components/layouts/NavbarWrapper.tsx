// components/layouts/NavbarWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import { NavBar } from './NavBar'

export default function NavbarWrapper() {
    const pathname = usePathname()
    const hideNavbar = ['/login', '/register', '/'].includes(pathname)

    if (hideNavbar) return null
    return <NavBar />
}
