"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Edit } from "lucide-react"
import { obtenerTickets } from '@/api/Tikets.api'
import { TiketsData } from '@/types/tikets.types'
import toast from "react-hot-toast"


export default function TicketsPage() {

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [Tikets, setTikets] = useState<TiketsData[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    obtenerTickets()
      .then(data => {
        setTikets(data)
        setLoading(false)
        toast.success("Tickets cargados con exito")
      })
      .catch(() => {
        toast.error("error al mostrar los tikets")
        setLoading(false)
      })
  }, []);

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

  const filteredTickets = Tikets.filter((ticket) => {
    const lower = searchTerm.toLowerCase()
    const matchesSearch =
      ticket.fk_equipo.toString().includes(lower) ||
      ticket.fecha_reporte.toLowerCase().includes(lower) ||
      ticket.tipo_servicio.toLowerCase().includes(lower) ||
      ticket.comentarios.toLowerCase().includes(lower) ||
      ticket.fk_reporta.toLowerCase().includes(lower) ||
      (ticket.fk_tecnico ?? false)

    const matchesStatus =
      statusFilter === "all" || ticket.estatus === statusFilter

    return matchesSearch && matchesStatus
  })


  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar tickets por usuario o tecnico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Abierto">Abierto</SelectItem>
                <SelectItem value="En Proceso">En Proceso</SelectItem>
                <SelectItem value="Resuelto">Resuelto</SelectItem>
                <SelectItem value="Cerrado">Cerrado</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/tickets/nuevo">
              <Button><Plus className="h-4 w-4 mr-2" />Nuevo Ticket</Button>
            </Link>
          </div>
        </div>

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Tickets</CardTitle>
            <CardDescription>{filteredTickets.length} tickets encontrados</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Estatus</TableHead>
                  <TableHead>Fecha Reporte</TableHead>
                  <TableHead>Inicio Servicio</TableHead>
                  <TableHead>Finalizó Servicio</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Comentarios</TableHead>
                  <TableHead>Equipo</TableHead>
                  <TableHead>Reportó</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">#{ticket.id}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(ticket.estatus)}>
                        {ticket.estatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{new Date(ticket.fecha_reporte).toLocaleString()}</TableCell>
                    <TableCell className="text-sm">
                      {ticket.fecha_inicio ? new Date(ticket.fecha_inicio).toLocaleString() : "—"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {ticket.fecha_final ? new Date(ticket.fecha_final).toLocaleString() : "—"}
                    </TableCell>
                    <TableCell className="text-sm">{ticket.tipo_servicio}</TableCell>
                    <TableCell className="text-sm">{ticket.comentarios}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.fk_equipo.id}</Badge>
                      <Badge variant="outline">{ticket.fk_equipo.marca}</Badge>
                      <Badge variant="outline">{ticket.fk_equipo.modelo}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{ticket.fk_reporta}</TableCell>
                    <TableCell className="text-sm">
                      {ticket.fk_tecnico ? ticket.fk_tecnico : <span className="text-gray-500">Sin asignar</span>}
                    </TableCell>


                    <TableCell>
                      <Link href={`/tickets/${ticket.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
