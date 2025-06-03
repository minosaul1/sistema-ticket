"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

interface FormData {
  nom_equipo: string
  marca: string
  modelo: string
  tipo_equipo: string
  ram: string
  disco: string
  capacidad: string
  procesador: string
  n_serie: string
  mac: string
  ubicacion: string
  usuario: string
}

export default function NuevoEquipoPage() {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    nom_equipo: "",
    marca: "",
    modelo: "",
    tipo_equipo: "",
    ram: "",
    disco: "",
    capacidad: "",
    procesador: "",
    n_serie: "",
    mac: "",
    ubicacion: "",
    usuario: "",
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  // Validación simple (puedes ampliar según necesidades)
  function validate() {
    const newErrors: Partial<FormData> = {}
    if (!formData.nom_equipo.trim()) newErrors.nom_equipo = "Nombre del equipo es obligatorio"
    if (!formData.marca.trim()) newErrors.marca = "Marca es obligatoria"
    if (!formData.modelo.trim()) newErrors.modelo = "Modelo es obligatorio"
    if (!formData.tipo_equipo.trim()) newErrors.tipo_equipo = "Tipo de equipo es obligatorio"
    if (!formData.ram.trim()) newErrors.ram = "RAM es obligatoria"
    if (!formData.disco.trim()) newErrors.disco = "Tipo de disco es obligatorio"
    if (!formData.capacidad.trim()) newErrors.capacidad = "Capacidad es obligatoria"
    if (!formData.procesador.trim()) newErrors.procesador = "Procesador es obligatorio"
    if (!formData.n_serie.trim()) newErrors.n_serie = "Número de serie es obligatorio"
    if (!formData.ubicacion.trim()) newErrors.ubicacion = "Ubicación es obligatoria"
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
      // Enviar datos al backend - adapta la URL y el método según tu API Django
      const res = await fetch("/api/equipos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.detail || "Error desconocido al crear equipo")
      }

      // Redirigir a lista de equipos tras crear con éxito
      router.push("/equipos")
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
            <h1 className="text-2xl font-bold text-gray-900">Agregar Nuevo Equipo</h1>
            <Link href="/equipos">
              <Button variant="outline" disabled={submitting}>
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Formulario de Nuevo Equipo</CardTitle>
            <CardDescription>Completa los datos para agregar un equipo nuevo</CardDescription>
          </CardHeader>
          <CardContent>
            {serverError && (
              <div className="mb-4 p-3 rounded bg-red-100 text-red-700 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campos divididos en grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Nombre Equipo */}
                {/*<div>
                  <Label htmlFor="nom_equipo">Nombre del Equipo *</Label>
                  <Input
                    id="nom_equipo"
                    value={formData.nom_equipo}
                    onChange={(e) => setFormData({ ...formData, nom_equipo: e.target.value })}
                    disabled={submitting}
                    aria-invalid={!!errors.nom_equipo}
                  />
                  {errors.nom_equipo && <p className="text-red-600 text-sm mt-1">{errors.nom_equipo}</p>}
                </div> */}

                {/* Marca */}
                <div>
                  <Label htmlFor="marca">Marca *</Label>
                  <Input
                    id="marca"
                    value={formData.marca}
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                    disabled={submitting}
                    aria-invalid={!!errors.marca}
                  />
                  {errors.marca && <p className="text-red-600 text-sm mt-1">{errors.marca}</p>}
                </div>

                {/* Modelo */}
                <div>
                  <Label htmlFor="modelo">Modelo *</Label>
                  <Input
                    id="modelo"
                    value={formData.modelo}
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                    disabled={submitting}
                    aria-invalid={!!errors.modelo}
                  />
                  {errors.modelo && <p className="text-red-600 text-sm mt-1">{errors.modelo}</p>}
                </div>

                {/* Tipo Equipo */}
                <div>
                  <Label htmlFor="tipo_equipo">Tipo de Equipo *</Label>
                  <Select
                    value={formData.tipo_equipo}
                    onValueChange={(value) => setFormData({ ...formData, tipo_equipo: value })}
                    disabled={submitting}
                    aria-invalid={!!errors.tipo_equipo}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Desktop">Desktop</SelectItem>
                      <SelectItem value="Laptop">Laptop</SelectItem>
                      <SelectItem value="Server">Server</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipo_equipo && <p className="text-red-600 text-sm mt-1">{errors.tipo_equipo}</p>}
                </div>

                {/* RAM */}
                <div>
                  <Label htmlFor="ram">RAM *</Label>
                  <Input
                    id="ram"
                    value={formData.ram}
                    onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                    disabled={submitting}
                    aria-invalid={!!errors.ram}
                  />
                  {errors.ram && <p className="text-red-600 text-sm mt-1">{errors.ram}</p>}
                </div>

                {/* Disco */}
                <div>
                  <Label htmlFor="disco">Tipo de Disco *</Label>
                  <Select
                    id="disco"
                    value={formData.disco}
                    onValueChange={(value) => setFormData({ ...formData, disco: value })}
                    disabled={submitting}
                    aria-invalid={!!errors.disco}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo de disco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HDD">HDD</SelectItem>
                      <SelectItem value="SSD">SSD</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.disco && <p className="text-red-600 text-sm mt-1">{errors.disco}</p>}
                </div>


                {/* Capacidad */}
                <div>
                  <Label htmlFor="capacidad">Capacidad *</Label>
                  <Input
                    id="capacidad"
                    value={formData.capacidad}
                    onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
                    disabled={submitting}
                    aria-invalid={!!errors.capacidad}
                  />
                  {errors.capacidad && <p className="text-red-600 text-sm mt-1">{errors.capacidad}</p>}
                </div>

                {/* Procesador */}
                <div>
                  <Label htmlFor="procesador">Procesador *</Label>
                  <Input
                    id="procesador"
                    value={formData.procesador}
                    onChange={(e) => setFormData({ ...formData, procesador: e.target.value })}
                    disabled={submitting}
                    aria-invalid={!!errors.procesador}
                  />
                  {errors.procesador && <p className="text-red-600 text-sm mt-1">{errors.procesador}</p>}
                </div>

                {/* Número de Serie */}
                <div>
                  <Label htmlFor="n_serie">Número de Serie *</Label>
                  <Input
                    id="n_serie"
                    value={formData.n_serie}
                    onChange={(e) => setFormData({ ...formData, n_serie: e.target.value })}
                    disabled={submitting}
                    aria-invalid={!!errors.n_serie}
                  />
                  {errors.n_serie && <p className="text-red-600 text-sm mt-1">{errors.n_serie}</p>}
                </div>

                {/* MAC */}
                <div>
                  <Label htmlFor="mac">Dirección MAC</Label>
                  <Input
                    id="mac"
                    value={formData.mac}
                    onChange={(e) => setFormData({ ...formData, mac: e.target.value })}
                    disabled={submitting}
                  />
                </div>

                {/* Ubicación */}
                <div>
                  <Label htmlFor="ubicacion">Ubicación *</Label>
                  <Input
                    id="ubicacion"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                    disabled={submitting}
                    aria-invalid={!!errors.ubicacion}
                  />
                  {errors.ubicacion && <p className="text-red-600 text-sm mt-1">{errors.ubicacion}</p>}
                </div>

                {/* Usuario Asignado */}
                {/*<div>
                  <Label htmlFor="usuario">Usuario Asignado</Label>
                  <Input
                    id="usuario"
                    value={formData.usuario}
                    onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                    disabled={submitting}
                  />
                </div> */}
              </div>

              <div className="pt-6">
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Guardando..." : "Guardar Equipo"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
