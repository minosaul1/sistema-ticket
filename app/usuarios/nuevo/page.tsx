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
import { useForm, Controller } from "react-hook-form";
import { createUser } from '@/api/Usuarios.api'
import { useAuth } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/ProtectedRoute"


interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  telephone?: string;
  rol: "admin" | "tecnico" | "usuario";
  username: string;
  password: string;
};

export default function NuevoUsuarioPage() {

  const token = useAuth()
  const router = useRouter()
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormData>();
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setServerError(null);
    const payload = {
      user: {
        username: `${data.first_name.toLowerCase()}_${Date.now()}`,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password
      },
      telephone: data.telephone ?? null,
      address: null,
      role_input: data.rol,
      equipos_asignados: 0,
      tickets_activos: 0,
    }
    try {
      await createUser(payload);
      router.push("/usuarios");
    } catch (error: any) {
      //console.error(error);
      setServerError("No se pudo crear el usuario.");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-2xl font-bold text-gray-900">Agregar Nuevo Usuario</h1>
              <Link href="/usuarios">
                <Button variant="outline" disabled={submitting}>Cancelar</Button>
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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="first_name">Nombre *</Label>
                  <Input id="first_name" {...register("first_name", { required: true })} disabled={submitting} />
                  {errors.first_name && <p className="text-red-600 text-sm">Este campo es obligatorio</p>}
                </div>

                <div>
                  <Label htmlFor="last_name">Apellido *</Label>
                  <Input id="last_name" {...register("last_name", { required: true })} disabled={submitting} />
                  {errors.last_name && <p className="text-red-600 text-sm">Este campo es obligatorio</p>}
                </div>

                <div>
                  <Label htmlFor="email">Correo *</Label>
                  <Input id="email" type="email" {...register("email", { required: true })} disabled={submitting} />
                  {errors.email && <p className="text-red-600 text-sm">Correo inválido o requerido</p>}
                </div>

                <div>
                  <Label htmlFor="telephone">Teléfono</Label>
                  <Input id="telephone" {...register("telephone")} disabled={submitting} />
                </div>

                <div>
                  <Label htmlFor="password">Contraseña *</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                    placeholder="Contraseña"
                    disabled={submitting}
                  />
                  {errors.password && <p className="text-red-600 text-sm">Contraseña requerida (mínimo 8 caracteres)</p>}
                </div>

                <div>
                  <Label>Rol *</Label>
                  <Controller
                    name="rol"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select disabled={submitting} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="tecnico">Técnico</SelectItem>
                          <SelectItem value="usuario">Usuario</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.rol && <p className="text-red-600 text-sm mt-1">Selecciona un rol</p>}
                </div>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Guardando..." : "Guardar Usuario"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
