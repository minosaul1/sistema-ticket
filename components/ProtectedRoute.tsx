"use client"

import { Route } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"


export default function protectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("access")
        if (!token) {
            router.replace("/login")
        }
        else {
            setIsAuth(true)
        }
    }, [router])

    if (!isAuth) return <p>Cargando...</p>
    return <>{children}</>
}