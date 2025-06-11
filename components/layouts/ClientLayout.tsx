"use client"

import { useAutoLogout } from "@/hooks/useAutoLogout"


export default function ClientLayout({ children }: { children: React.ReactNode }) {
    useAutoLogout()

    return (
        <>
            {children}

        </>
    )
}
