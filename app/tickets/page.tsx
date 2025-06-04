"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Ticket, Plus, Search, Filter, Eye } from "lucide-react"
import { LogoutButton } from "@/components/LogoutButton" // Importar el botón de cierre de sesión

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Array vacío para llenar con datos reales en producción
  const tickets: Array<{
    id: number
    equipo: string
    usuario: string
    tecnico: string | null
    tipo: string
    estatus: string
    fecha_reporte: string
    fecha_inicio: string
    observaciones: string
  }> = []

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

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.equipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.estatus === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Ticket className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Tickets</h1>
            </div>
            <nav className="flex space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/tickets">
                <Button variant="ghost">Tickets</Button>
              </Link>
              <Link href="/equipos">
                <Button variant="ghost">Equipos</Button>
              </Link>
              <Link href="/usuarios">
                <Button variant="ghost">Usuarios</Button>
              </Link>
              <LogoutButton />
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
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
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Ticket
              </Button>
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
                  <TableHead>Equipo</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">#{ticket.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.equipo}</Badge>
                    </TableCell>
                    <TableCell>{ticket.usuario}</TableCell>
                    <TableCell>
                      {ticket.tecnico ? (
                        <span className="text-sm">{ticket.tecnico}</span>
                      ) : (
                        <span className="text-sm text-gray-500">Sin asignar</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">{ticket.tipo}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(ticket.estatus)}>{ticket.estatus}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{ticket.fecha_reporte}</TableCell>
                    <TableCell>
                      <Link href={`/tickets/${ticket.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
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
