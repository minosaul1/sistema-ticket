import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

const TIMEOUT_MINUTES = 15
const INACTIVITY_TIMEOUT = TIMEOUT_MINUTES * 60 * 1000 // 15 minutos

export const useAutoLogout = (timeout = INACTIVITY_TIMEOUT) => {
    const router = useRouter()
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const logout = async () => {
        const refreshToken = localStorage.getItem("refresh_token")
        const accessToken = localStorage.getItem("access_token")

        // Intenta notificar al backend para invalidar el refresh token
        if (refreshToken) {
            try {
                await fetch("/api/accounts/logout/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`, // si tu endpoint requiere autenticación
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                })
            } catch (err) {
                console.error("Error al hacer logout en backend:", err)
            }
        }

        // Limpia tokens del localStorage
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")

        // Redirige al login
        router.push("/login")
    }

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            logout()
        }, timeout)
    }

    useEffect(() => {
        const handleActivity = () => resetTimer()

        window.addEventListener("mousemove", handleActivity)
        window.addEventListener("keydown", handleActivity)
        window.addEventListener("click", handleActivity)
        window.addEventListener("scroll", handleActivity)

        resetTimer()

        return () => {
            window.removeEventListener("mousemove", handleActivity)
            window.removeEventListener("keydown", handleActivity)
            window.removeEventListener("click", handleActivity)
            window.removeEventListener("scroll", handleActivity)
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [timeout])
}
