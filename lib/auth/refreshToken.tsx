import axios from "axios"
interface RefreshTokenResponse {
    access: string;
}
export const refreshToken = async (): Promise<string | null> => {
    const refresh = localStorage.getItem("refresh")
    if (!refresh) return null

    try {
        const res = await axios.post<RefreshTokenResponse>("http://localhost:8000/api/token/refresh/", {
            refresh,
        })
        const newAccess = res.data.access
        localStorage.setItem("access", newAccess)
        return newAccess
    } catch (error) {
        console.log("Error al refrescar el token: ", error)
        return null
    }
}