"use client";

import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Ticket, ArrowLeft, Edit, Save, Monitor, User, Calendar, Clock } from "lucide-react"
import { getTikect, UpdateTiket } from '@/api/Tikets.api'
import { TiketsData } from '@/types/tikets.types'
import { EquiposData } from '@/types/EquipoTypes'
import { TecnicoData, UserData } from '@/types/User.types'
import { getTecnicos } from '@/api/Usuarios.api'
import { getEquipoId } from '@/api/Equipos.api'
import toast from "react-hot-toast"
import { useForm, Controller } from "react-hook-form";
import { data } from "autoprefixer";
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"



interface FormData {
  tecnico: string;
};
type Props = {
  ticketData: TiketsData;
  tecnicoData: TecnicoData;
  setTicketData: (data: TiketsData) => void;
  setTecnico: (data: TecnicoData) => void;
};

export default function TicketDetailPage({ params }: { params: Promise<{ id: number }> }) {

  const token = useAuth()
  const { id } = use(params)
  const [isEditing, setIsEditing] = useState(false)
  const [ticketData, setTicketData] = useState<TiketsData | null>(null)
  const [tecnico, setTecnico] = useState<TecnicoData[]>([])
  const [equipoData, setEquipoData] = useState<EquiposData | null>(null)
  const { register, handleSubmit, control, formState: { errors }, reset, getValues } = useForm<FormData>()
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()


  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTikect(id)
        if (data.estatus.toLowerCase() === "cerrado" || data.estatus.toLowerCase() === "resuelto") {
          toast.error("No puedes reabrir ticket cerrado")
          return
        }

        const dataEquipo = await getEquipoId(data.fk_equipo.id)
        setEquipoData(dataEquipo)
        setTicketData(data)
        toast.success("Ticket cargado con éxito...")
      }
      catch (err) {
        router.push("/forbidden")

      }

    }
    fetchTicket()
  }, [id])
  // Carga técnicos
  useEffect(() => {
    const fetchTecnico = async () => {
      try {
        const data = await getTecnicos()
        setTecnico(data)
      }
      catch (error) {
        toast.error("Error al cargar tecnicos...")
      }
    };
    fetchTecnico();
  }, [])
  //const te = setTecnico.find(item => item.id = ticketData?.fk_tecnico)
  const tecnicoSeleccionado = tecnico.find(
    item => item.id === ticketData?.fk_tecnico || item.id === ticketData?.fk_tecnico
  )

  if (!ticketData || !equipoData) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      cargando Ticket...
    </div>
  )



  const getStatusColor = (status: string) => {
    switch (status) {
      case "Abierto":
        return "destructive"
      case "En proceso":
        return "default"
      case "Resuelto":
        return "secondary"
      case "Cerrado":
        return "outline"
      default:
        return "default"
    }
  }

  const handleSave = async () => {

    try {
      const updateData: Partial<TiketsData> = {
        estatus: ticketData.estatus,
        comentarios: ticketData.comentarios,
        fk_tecnico: ticketData.fk_tecnico,
      };
      const updated = await UpdateTiket(ticketData.id, updateData);
      setTicketData(updated);
      setIsEditing(false);

      toast.success("Estado actualizado correctamente");
      router.push("/tickets");
    }
    catch (error) {
      toast.error("Error al actualizar el ticket...")
    }


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
                    <Select value={ticketData.estatus}
                      onValueChange={(value) => setTicketData({ ...ticketData, estatus: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Abierto">Abierto</SelectItem>
                        <SelectItem value="En proceso">En proceso</SelectItem>
                        <SelectItem value="Resuelto">Resuelto</SelectItem>
                        <SelectItem value="Cerrado">Cerrado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}
                {/* Observaciones */}
                {/* 
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
                </div> */}
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
                  {/*<div>
                    <span className="font-medium">Nombre:</span>
                    <p className="text-gray-600">{equipoData}</p>
                  </div> */}
                  <div>
                    <span className="font-medium">Marca:</span>
                    <p className="text-gray-600">{equipoData.marca}</p>
                  </div>
                  <div>
                    <span className="font-medium">Modelo:</span>
                    <p className="text-gray-600">{equipoData.modelo}</p>
                  </div>
                  <div>
                    <span className="font-medium">Tipo:</span>
                    <p className="text-gray-600">{equipoData.tipo_equipo}</p>
                  </div>
                  <div>
                    <span className="font-medium">RAM:</span>
                    <p className="text-gray-600">{equipoData.ram}</p>
                  </div>
                  <div>
                    <span className="font-medium">Disco:</span>
                    <p className="text-gray-600">
                      {equipoData.disco} {equipoData.capacidad}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Procesador:</span>
                    <p className="text-gray-600">{equipoData.procesador}</p>
                  </div>
                  <div>
                    <span className="font-medium">Ubicación:</span>
                    <p className="text-gray-600">{equipoData.ubicacion}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Número de Serie:</span>
                    <p className="text-gray-600">{equipoData.n_serial}</p>
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
                    <p className="text-sm text-gray-600">{ticketData.fk_reporta}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label>Asigna un tecnico</Label>
                      <Controller
                        name="tecnico"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              const id = parseInt(value); // Convertimos a número
                              field.onChange(id);
                              setTicketData(prev =>
                                prev ? { ...prev, fk_tecnico: id } : prev
                              );
                            }}
                            value={ticketData.fk_tecnico?.toString() || ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona un Técnico" />
                            </SelectTrigger>
                            <SelectContent>
                              {tecnico.length === 0 ? (
                                <SelectItem value="">No hay Técnicos disponibles.</SelectItem>
                              ) : (
                                tecnico.map(tec => (
                                  <SelectItem key={tec.id} value={tec.id.toString()} >
                                    {tec.nombre}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.tecnico && (
                        <p className="text-red-600 text-sm">Este campo es obligatorio</p>)}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium">Técnico </p>
                      <p className="text-sm text-gray-600">{ticketData.fk_tecnico || "Sin asignar"}</p>
                    </div>
                  )}

                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Fecha de reporte</p>
                    <p className="text-sm text-gray-600">{new Date(ticketData.fecha_reporte).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Fecha de inicio</p>
                    <p className="text-sm text-gray-600">{ticketData.fecha_inicio ? new Date(ticketData.fecha_inicio).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })
                      : 'sin fecha'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Fecha Final</p>
                    <p className="text-sm text-gray-600">{ticketData.fecha_final ? new Date(ticketData.fecha_final).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })
                      : 'sin fecha'}</p>
                  </div>
                </div>
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
        </div >
      </main >
    </div >
  )
}
