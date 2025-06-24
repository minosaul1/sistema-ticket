"use client"

import { Route } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

type Role = "admin" | "tecnico" | "usuario"

export default function ProtectedRoute({ children, allowedRoles, }: {
    children: React.ReactNode,
    allowedRoles: Role[]
}) {
    const router = useRouter()
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        const userSrt = localStorage.getItem("user")
        if (!token || !userSrt) {

            router.replace("/login")
        }
        try {
            if (userSrt) {
                const user = JSON.parse(userSrt)
                const role = user.user.role as Role

                if (!allowedRoles.includes(role)) {
                    router.replace("/forbidden")
                    return
                }
                setIsAuth(true)
            }
        }
        catch (error) {
            router.replace("/login")
        }
    }, [router, allowedRoles])

    if (!isAuth) return <p>Cargando...</p>
    return <>{children}</>
}