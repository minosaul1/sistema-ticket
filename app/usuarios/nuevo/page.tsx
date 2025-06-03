"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface FormData {
  nombre: string
  correo: string
  telefono: string
  rol: string
}

export default function NuevoUsuarioPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    correo: "",
    telefono: "",
    rol: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  function validate() {
    const newErrors: Partial<FormData> = {}
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio"
    if (!formData.correo.trim()) newErrors.correo = "El correo es obligatorio"
    else if (!/^\S+@\S+\.\S+$/.test(formData.correo)) newErrors.correo = "Correo no válido"
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio"
    if (!formData.rol.trim()) newErrors.rol = "El rol es obligatorio"
    return newErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError(null)
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setSubmitting(true)

    try {
      const res = await fetch("/api/usuarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.detail || "Error al crear usuario")
      }
      router.push("/usuarios")
    } catch (error: any) {
      setServerError(error.message || "Error al enviar los datos")
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Agregar Nuevo Usuario</h1>
            <Link href="/usuarios">
              <Button variant="outline" disabled={submitting}>
                Cancelar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Formulario de Nuevo Usuario</CardTitle>
            <CardDescription>Completa los datos para agregar un usuario nuevo</CardDescription>
          </CardHeader>
          <CardContent>
            {serverError && (
              <div className="mb-4 p-3 rounded bg-red-100 text-red-700 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Nombre */}
              <div>
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                  disabled={submitting}
                  aria-invalid={!!errors.nombre}
                />
                {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>}
              </div>

              {/* Correo */}
              <div>
                <Label htmlFor="correo">Correo *</Label>
                <Input
                  id="correo"
                  type="email"
                  value={formData.correo}
                  onChange={e => setFormData({ ...formData, correo: e.target.value })}
                  disabled={submitting}
                  aria-invalid={!!errors.correo}
                />
                {errors.correo && <p className="text-red-600 text-sm mt-1">{errors.correo}</p>}
              </div>

              {/* Teléfono */}
              <div>
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                  disabled={submitting}
                  aria-invalid={!!errors.telefono}
                />
                {errors.telefono && <p className="text-red-600 text-sm mt-1">{errors.telefono}</p>}
              </div>

              {/* Rol */}
              <div>
                <Label htmlFor="rol">Rol *</Label>
                <Select
                  id="rol"
                  value={formData.rol}
                  onValueChange={value => setFormData({ ...formData, rol: value })}
                  disabled={submitting}
                  aria-invalid={!!errors.rol}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Administrador</SelectItem>
                    <SelectItem value="Técnico">Técnico</SelectItem>
                    <SelectItem value="Usuario">Usuario</SelectItem>
                  </SelectContent>
                </Select>
                {errors.rol && <p className="text-red-600 text-sm mt-1">{errors.rol}</p>}
              </div>

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Guardando..." : "Guardar Usuario"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
