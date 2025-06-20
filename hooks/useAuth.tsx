import { useEffect, useState } from "react"
import { refreshToken } from "@/lib/auth/refreshToken"
import { useRouter } from "next/navigation"

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const checkToken = async () => {
            const access = localStorage.getItem("access_token")
            if (!access) {
                const refreshed = await refreshToken()
                if (refreshed) {
                    setToken(refreshed)
                }
                else {
                    router.push("/login")
                }
            } else {
                setToken(access)
            }
        }
        checkToken()
    }, [router])
    return token
}
