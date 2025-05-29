"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Ticket, ArrowLeft, Edit, Save, Monitor, User, Calendar, Clock } from "lucide-react"

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)
  const [ticketData, setTicketData] = useState({
    id: 1,
    equipo: "PC-001",
    usuario_reporta: "Juan Pérez",
    tecnico: "Ana Martínez",
    estatus: "En Proceso",
    fecha_reporte: "2024-01-15 09:30:00",
    fecha_inicio: "2024-01-15 10:00:00",
    fecha_final: null,
    tipo_servicio: "Mantenimiento Preventivo",
    observaciones:
      "Limpieza general del equipo, actualización de software antivirus y verificación de componentes internos.",
    comentarios: "El equipo presenta acumulación de polvo en ventiladores. Se requiere limpieza profunda.",
  })

  // Datos del equipo asociado
  const equipoInfo = {
    marca: "Dell",
    modelo: "OptiPlex 7090",
    tipo_equipo: "Desktop",
    ram: "16GB",
    disco: "SSD",
    capacidad: "512GB",
    procesador: "Intel Core i7-11700",
    n_serie: "DL2024001",
    nom_equipo: "PC-001",
    mac: "00:1B:44:11:3A:B7",
    ubicacion: "Oficina 101",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Abierto":
        return "destructive"
      case "En Proceso":
        return "default"
      case "Resuelto":
        return "secondary"
      case "Cerrado":
        return "outline"
      default:
        return "default"
    }
  }

  const handleSave = () => {
    // Aquí se guardarían los cambios en la base de datos
    console.log("Guardando cambios:", ticketData)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Ticket className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Ticket #{ticketData.id}</h1>
            </div>
            <div className="flex gap-2">
              <Link href="/tickets">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
              {isEditing ? (
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información Principal del Ticket */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Ticket #{ticketData.id}
                      <Badge variant={getStatusColor(ticketData.estatus)}>{ticketData.estatus}</Badge>
                    </CardTitle>
                    <CardDescription>{ticketData.tipo_servicio}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Estado */}
                {isEditing ? (
                  <div className="space-y-2">
                    <Label>Estado del Ticket</Label>
                    <Select
                      value={ticketData.estatus}
                      onValueChange={(value) => setTicketData({ ...ticketData, estatus: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Abierto">Abierto</SelectItem>
                        <SelectItem value="En Proceso">En Proceso</SelectItem>
                        <SelectItem value="Resuelto">Resuelto</SelectItem>
                        <SelectItem value="Cerrado">Cerrado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}

                {/* Observaciones */}
                <div className="space-y-2">
                  <Label>Observaciones</Label>
                  {isEditing ? (
                    <Textarea
                      value={ticketData.observaciones}
                      onChange={(e) => setTicketData({ ...ticketData, observaciones: e.target.value })}
                      rows={4}
                    />
                  ) : (
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{ticketData.observaciones}</p>
                  )}
                </div>

                {/* Comentarios */}
                <div className="space-y-2">
                  <Label>Comentarios</Label>
                  {isEditing ? (
                    <Textarea
                      value={ticketData.comentarios}
                      onChange={(e) => setTicketData({ ...ticketData, comentarios: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{ticketData.comentarios}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Información del Equipo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Información del Equipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Nombre:</span>
                    <p className="text-gray-600">{equipoInfo.nom_equipo}</p>
                  </div>
                  <div>
                    <span className="font-medium">Marca:</span>
                    <p className="text-gray-600">{equipoInfo.marca}</p>
                  </div>
                  <div>
                    <span className="font-medium">Modelo:</span>
                    <p className="text-gray-600">{equipoInfo.modelo}</p>
                  </div>
                  <div>
                    <span className="font-medium">Tipo:</span>
                    <p className="text-gray-600">{equipoInfo.tipo_equipo}</p>
                  </div>
                  <div>
                    <span className="font-medium">RAM:</span>
                    <p className="text-gray-600">{equipoInfo.ram}</p>
                  </div>
                  <div>
                    <span className="font-medium">Disco:</span>
                    <p className="text-gray-600">
                      {equipoInfo.disco} {equipoInfo.capacidad}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Procesador:</span>
                    <p className="text-gray-600">{equipoInfo.procesador}</p>
                  </div>
                  <div>
                    <span className="font-medium">Ubicación:</span>
                    <p className="text-gray-600">{equipoInfo.ubicacion}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Número de Serie:</span>
                    <p className="text-gray-600">{equipoInfo.n_serie}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Información del Ticket */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detalles del Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Reportado por</p>
                    <p className="text-sm text-gray-600">{ticketData.usuario_reporta}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Técnico </p>
                    <p className="text-sm text-gray-600">{ticketData.tecnico || "Sin asignar"}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Fecha de reporte</p>
                    <p className="text-sm text-gray-600">{ticketData.fecha_reporte}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Fecha de inicio</p>
                    <p className="text-sm text-gray-600">{ticketData.fecha_inicio}</p>
                  </div>
                </div>

                {ticketData.fecha_final && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Fecha de finalización</p>
                      <p className="text-sm text-gray-600">{ticketData.fecha_final}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Acciones Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Monitor className="h-4 w-4 mr-2" />
                  Refacciones
                </Button>
                {/*<Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Contactar Usuario
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Ticket className="h-4 w-4 mr-2" />
                  Historial de Tickets
                </Button>*/}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
