// /components/LogoutButton.tsx

import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth/logout"

export function LogoutButton() {

  return (
    <Button variant="ghost" onClick={logout}>
      Cerrar Sesión
    </Button>
  )
}
