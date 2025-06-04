"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ticket, TrendingUp, AlertCircle, Clock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogoutButton } from "@/components/LogoutButton" // Importar el botón de cierre de sesión

export default function DashboardPage() {
  const router = useRouter()

  // Estados para estadísticas y tickets recientes
  const [stats, setStats] = useState({
    totalTickets: 0,
    ticketsAbiertos: 0,
    ticketsEnProceso: 0,
    ticketsResueltos: 0,
    equiposTotal: 0,
    usuariosActivos: 0,
  })

  const [recentTickets, setRecentTickets] = useState([])

  // Fetch de estadísticas y tickets recientes desde el backend Django
  useEffect(() => {
    // Aquí podrías llamar a tu API para obtener las estadísticas y tickets recientes
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/dashboard/") // Asegúrate de que esta ruta sea la correcta
        const data = await response.json()

        // Asignar datos de las estadísticas
        setStats({
          totalTickets: data.totalTickets,
          ticketsAbiertos: data.ticketsAbiertos,
          ticketsEnProceso: data.ticketsEnProceso,
          ticketsResueltos: data.ticketsResueltos,
          equiposTotal: data.equiposTotal,
          usuariosActivos: data.usuariosActivos,
        })

        // Asignar los tickets recientes
        setRecentTickets(data.recentTickets)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      }
    }

    fetchData()
  }, [])

  // Función para obtener el color basado en el estado de los tickets
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Abierto":
        return "destructive"
      case "En Proceso":
        return "default"
      case "Resuelto":
        return "secondary"
      default:
        return "default"
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
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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
              {/* Botón para cerrar sesión */}
              <LogoutButton />
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTickets}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Abiertos</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.ticketsAbiertos}</div>
              <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.ticketsEnProceso}</div>
              <p className="text-xs text-muted-foreground">Siendo atendidos por técnicos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resueltos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.ticketsResueltos}</div>
              <p className="text-xs text-muted-foreground">Completados exitosamente</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tickets */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Tickets Recientes</CardTitle>
              <CardDescription>Últimos tickets reportados en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">#{ticket.id}</span>
                        <Badge variant="outline">{ticket.equipo}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{ticket.tipo}</p>
                      <p className="text-xs text-gray-500">Reportado por: {ticket.usuario}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusColor(ticket.estatus)}>{ticket.estatus}</Badge>
                      <p className="text-xs text-gray-500 mt-1">{ticket.fecha}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/tickets">
                  <Button variant="outline" className="w-full">
                    Ver Todos los Tickets
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
