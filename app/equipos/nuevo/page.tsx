"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { CreateEquipo } from "@/api/Equipos.api"
import { EquiposData } from "@/types/EquipoTypes"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function NuevoEquipoPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<Omit<EquiposData, "id">>()

  const onSubmit = async (data: Omit<EquiposData, "id">) => {
    try {
      // Convertir strings numéricos a number (si no usas type="number")
      data.ram = Number(data.ram)
      data.capacidad = Number(data.capacidad)

      await CreateEquipo(data)
      toast.success("Equipo guardado correctamente")
      router.push("/equipos")
    } catch (error) {
      console.error("Error al crear equipo:", error)
      toast.error("No se pudo crear el equipo")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Agregar Nuevo Equipo</h1>
          <Link href="/equipos">
            <Button variant="outline" disabled={isSubmitting}>Volver</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Formulario de Nuevo Equipo</CardTitle>
            <CardDescription>Completa los datos para agregar un equipo nuevo</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <Label htmlFor="marca">Marca *</Label>
                  <Input id="marca" {...register("marca", { required: "La marca es obligatoria" })} />
                  {errors.marca && <p className="text-sm text-red-600">{errors.marca.message}</p>}
                </div>

                <div>
                  <Label htmlFor="modelo">Modelo *</Label>
                  <Input id="modelo" {...register("modelo", { required: "El modelo es obligatorio" })} />
                  {errors.modelo && <p className="text-sm text-red-600">{errors.modelo.message}</p>}
                </div>

                <div>
                  <Label htmlFor="tipo_equipo">Tipo de equipo *</Label>
                  <Select onValueChange={value => setValue("tipo_equipo", value)} defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Desktop">Desktop</SelectItem>
                      <SelectItem value="Laptop">Laptop</SelectItem>
                      <SelectItem value="Server">Server</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipo_equipo && <p className="text-sm text-red-600">{errors.tipo_equipo.message}</p>}
                </div>

                <div>
                  <Label htmlFor="ram">RAM (GB) *</Label>
                  <Input id="ram" type="number" {...register("ram", {
                    required: "La RAM es obligatoria",
                    valueAsNumber: true,
                  })} />
                  {errors.ram && <p className="text-sm text-red-600">{errors.ram.message}</p>}
                </div>

                <div>
                  <Label htmlFor="disco">Tipo de Disco *</Label>
                  <Select onValueChange={value => setValue("disco", value)} defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo de disco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HDD">HDD</SelectItem>
                      <SelectItem value="SSD">SSD</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.disco && <p className="text-sm text-red-600">{errors.disco.message}</p>}
                </div>

                <div>
                  <Label htmlFor="capacidad">Capacidad (GB) *</Label>
                  <Input id="capacidad" type="number" {...register("capacidad", {
                    required: "La capacidad es obligatoria",
                    valueAsNumber: true,
                  })} />
                  {errors.capacidad && <p className="text-sm text-red-600">{errors.capacidad.message}</p>}
                </div>

                <div>
                  <Label htmlFor="procesador">Procesador *</Label>
                  <Input id="procesador" {...register("procesador", { required: "El procesador es obligatorio" })} />
                  {errors.procesador && <p className="text-sm text-red-600">{errors.procesador.message}</p>}
                </div>

                <div>
                  <Label htmlFor="n_serial">Número de Serie *</Label>
                  <Input id="n_serial" {...register("n_serial", { required: "El número de serie es obligatorio" })} />
                  {errors.n_serial && <p className="text-sm text-red-600">{errors.n_serial.message}</p>}
                </div>

                <div>
                  <Label htmlFor="mac">MAC</Label>
                  <Input id="mac" {...register("mac")} />
                </div>

                <div>
                  <Label htmlFor="ubicacion">Ubicación *</Label>
                  <Input id="ubicacion" {...register("ubicacion", { required: "La ubicación es obligatoria" })} />
                  {errors.ubicacion && <p className="text-sm text-red-600">{errors.ubicacion.message}</p>}
                </div>
              </div>

              <div className="pt-6">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar Equipo"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
