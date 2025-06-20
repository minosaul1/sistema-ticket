"use client"

import React, { useState } from "react"
import api from "@/lib/api"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Ticket, Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"

interface TokenResponse {
  access: string
  refresh: string
  user: {
    id: number
    username: string
    first_name: string
    last_name: string
    email: string
  }
}
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await api.post<TokenResponse>("login/", {
        username: formData.username,
        password: formData.password,

      })

      const { access, refresh, user } = response.data

      localStorage.setItem("access_token", access)
      localStorage.setItem("refresh_token", refresh)
      localStorage.setItem("user", JSON.stringify(response.data))

      toast.success("Sesión iniciada correctamente")
      router.push("/dashboard")
    } catch (error: any) {
      {/**if (axios.isAxiosError(error) && error.response) {
        const msg = error.response.data?.error || "Credenciales incorrectas"
        toast.error(msg)
      }
      else {
        toast.error("Error de red o del servidor")
      }
         */}
      //console.error("Login failed", error)
      //alert("Credenciales incorrectas")
      toast.error("Error de credenciales")

    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Ticket className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>Accede al sistema de tickets de soporte</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de Usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="usuario123"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              ← Volver al inicio
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
