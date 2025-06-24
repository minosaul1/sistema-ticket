"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Ticket, ArrowLeft, Save } from "lucide-react"
import { useForm, Controller } from "react-hook-form";
import { getEquiposSinReporte } from '@/api/Equipos.api'
import { CreateTicket } from '@/api/Tikets.api'
import toast from "react-hot-toast"
import { EquiposData } from '@/types/EquipoTypes'
import { useAuth } from "@/hooks/useAuth"
import ProtectedRoute from "@/components/ProtectedRoute"


interface FormData {

  servicio: string;
  comentarios: string;
  equipo: number;
};

export default function NuevoTicketPage() {

  const token = useAuth()
  const router = useRouter()
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormData>()
  const [submitting, setSubmitting] = useState(false)
  const [Equipos, setEquipos] = useState<EquiposData[]>([]);
  const [serverError, setServerError] = useState<string | null>(null)

  useEffect(() => {
    getEquiposSinReporte()
      .then(data => {
        setEquipos(data)
      })
      .catch(() => {
        toast.error("error al cargar lo equipos")
      })
  }, [])

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setServerError(null);
    const payload = {
      tipo_servicio: data.servicio,
      comentarios: data.comentarios,
      fk_equipo: data.equipo
    }

    try {
      await CreateTicket(payload);

      router.push("/tickets");
      toast.success("Ticket creado con exito...")
    } catch (error: any) {
      setServerError("No se pudo crear el ticket.");
      toast.success("Error, Intentarlo mas tarde...")
    }
    finally {
      setSubmitting(false);

    }
  }


  return (
    <ProtectedRoute allowedRoles={["admin", "tecnico", "usuario"]}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Ticket className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Nuevo Ticket</h1>
              </div>
              <Link href="/tickets">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Crear un Nuevo Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="tipo_servicio">Servicio*</Label>
                  <Input id="tipo_servicio" {...register("servicio", { required: true })} disabled={submitting} />
                  {errors.servicio && <p className="text-red-600 text-sm">Este campo es obligatorio</p>}
                </div>

                <div>
                  <Label htmlFor="comentarios">Comentarios*</Label>
                  <Input id="comentarios" {...register("comentarios", { required: true })} disabled={submitting} />
                  {errors.comentarios && <p className="text-red-600 text-sm">Este campo es obligatorio</p>}
                </div>

                <div>
                  <Label htmlFor="equipo">Equipo*</Label>
                  <Controller
                    name="equipo"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <select
                        id="equipo"
                        {...field}
                        disabled={submitting}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      >
                        <option value="">-- Selecciona un equipo --</option>
                        {Equipos.length === 0 ? (<option disabled value="">
                          No hay opciones
                        </option>
                        ) : (
                          Equipos.map((equipo) => (
                            <option key={equipo.id} value={equipo.id}>
                              {equipo.modelo}
                            </option>
                          ))
                        )}
                      </select>
                    )}
                  />
                  {errors.equipo && (
                    <p className="text-red-600 text-sm">Este campo es obligatorio</p>
                  )}
                </div>
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Guardando..." : "Crear Ticket"}
                </Button>
              </form>

            </CardContent>
          </Card>
        </main>
      </div >
    </ProtectedRoute>
  )
}
