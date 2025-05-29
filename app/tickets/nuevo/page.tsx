"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Ticket, ArrowLeft, Save } from "lucide-react"

export default function NuevoTicketPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    equipo: "",
    usuario_reporta: "",
    tecnico: "",
    tipo_servicio: "",
    observaciones: "",
    comentarios: "",
  })

  // Datos simulados - en producción vendrían de la base de datos
  const equipos = [
    { id: 1, nombre: "PC-001", ubicacion: "Oficina 101" },
    { id: 2, nombre: "LAP-005", ubicacion: "Sala de Juntas" },
    { id: 3, nombre: "PC-012", ubicacion: "Recepción" },
    { id: 4, nombre: "LAP-008", ubicacion: "Oficina 205" },
  ]

  const usuarios = [
    { id: 1, nombre: "Juan Pérez", rol: "Usuario" },
    { id: 2, nombre: "María García", rol: "Usuario" },
    { id: 3, nombre: "Carlos López", rol: "Usuario" },
    { id: 4, nombre: "Laura Sánchez", rol: "Usuario" },
  ]

  const tecnicos = [
    { id: 5, nombre: "Ana Martínez", rol: "Técnico" },
    { id: 6, nombre: "Carlos Ruiz", rol: "Técnico" },
    { id: 7, nombre: "Pedro González", rol: "Técnico" },
  ]

  const tiposServicio = [
    "Mantenimiento Preventivo",
    "Mantenimiento Correctivo",
    "Reparación",
    "Instalación Software",
    "Instalación Hardware",
    "Soporte Técnico",
    "Configuración",
    "Actualización",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se enviarían los datos a la base de datos
    console.log("Nuevo ticket:", formData)
    router.push("/tickets")
  }

  return (
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Crear Nuevo Ticket de Soporte</CardTitle>
            <CardDescription>Completa la información para crear un nuevo ticket de soporte técnico</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Usuario que reporta */}
                {/*<div className="space-y-2">
                  <Label htmlFor="usuario_reporta">Usuario que Reporta *</Label>
                  <Select
                    value={formData.usuario_reporta}
                    onValueChange={(value) => setFormData({ ...formData, usuario_reporta: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el usuario" />
                    </SelectTrigger>
                    <SelectContent>
                      {usuarios.map((usuario) => (
                        <SelectItem key={usuario.id} value={usuario.nombre}>
                          {usuario.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>*/}
                
                {/* Equipo */}
                {/*<div className="space-y-2">
                  <Label htmlFor="equipo">Equipo *</Label>
                  <Select
                    value={formData.equipo}
                    onValueChange={(value) => setFormData({ ...formData, equipo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un equipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipos.map((equipo) => (
                        <SelectItem key={equipo.id} value={equipo.nombre}>
                          {equipo.nombre} - {equipo.ubicacion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>*/}

                {/* Técnico asignado */}
                {/*<div className="space-y-2">
                  <Label htmlFor="tecnico">Técnico Asignado</Label>
                  <Select
                    value={formData.tecnico}
                    onValueChange={(value) => setFormData({ ...formData, tecnico: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Asignar técnico (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sin asignar">Sin asignar</SelectItem>
                      {tecnicos.map((tecnico) => (
                        <SelectItem key={tecnico.id} value={tecnico.nombre}>
                          {tecnico.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>*/}

              {/* Equipo */}
              <div className="space-y-2">
                <Label htmlFor="observaciones">Equipo *</Label>
                <Textarea
                  id="observaciones"
                  placeholder="Describe la marca de tu equipo"
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              {/* Especificaciones */}
              <div className="space-y-2">
                <Label htmlFor="observaciones">Especificaciones *</Label>
                <Textarea
                  id="observaciones"
                  placeholder="Describe las especificaciones..."
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              {/* Observaciones */}
              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones *</Label>
                <Textarea
                  id="observaciones"
                  placeholder="Describe el problema o solicitud..."
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              {/* Comentarios */}
              <div className="space-y-2">
                <Label htmlFor="comentarios">Comentarios Adicionales</Label>
                <Textarea
                  id="comentarios"
                  placeholder="Información adicional o comentarios..."
                  value={formData.comentarios}
                  onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Crear Ticket
                </Button>
                <Link href="/tickets" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
