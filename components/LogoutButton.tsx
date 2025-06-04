// /components/LogoutButton.tsx

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // Eliminar el token de localStorage (o sessionStorage, cookies, dependiendo de cómo estés manejando la autenticación)
    localStorage.removeItem("token")  // O usa cookies si es necesario

    // Si usas cookies, puedes hacer algo como:
    // Cookies.remove("token")  // Si usas la librería `js-cookie`

    // Redirigir a la página de login
    router.push("/login")
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  )
}
