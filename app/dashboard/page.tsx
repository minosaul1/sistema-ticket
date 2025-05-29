import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ticket, Monitor, Users, Wrench, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Datos simulados - en producción vendrían de la base de datos
  const stats = {
    totalTickets: 156,
    ticketsAbiertos: 23,
    ticketsEnProceso: 12,
    ticketsResueltos: 121,
    equiposTotal: 89,
    usuariosActivos: 45,
  }

  const recentTickets = [
    {
      id: 1,
      equipo: "PC-001",
      usuario: "Juan Pérez",
      tipo: "Mantenimiento Preventivo",
      estatus: "Abierto",
      fecha: "2024-01-15",
    },
    {
      id: 2,
      equipo: "LAP-005",
      usuario: "María García",
      tipo: "Reparación",
      estatus: "En Proceso",
      fecha: "2024-01-14",
    },
    {
      id: 3,
      equipo: "PC-012",
      usuario: "Carlos López",
      tipo: "Instalación Software",
      estatus: "Resuelto",
      fecha: "2024-01-13",
    },
  ]

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

          {/* Quick Actions */}
          {/*<Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Accesos directos a funciones principales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/tickets/nuevo">
                <Button className="w-full justify-start">
                  <Ticket className="h-4 w-4 mr-2" />
                  Nuevo Ticket
                </Button>
              </Link>
              <Link href="/equipos">
                <Button variant="outline" className="w-full justify-start">
                  <Monitor className="h-4 w-4 mr-2" />
                  Gestionar Equipos
                </Button>
              </Link>
              <Link href="/usuarios">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Administrar Usuarios
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Wrench className="h-4 w-4 mr-2" />
                Mantenimiento
              </Button>
            </CardContent>
          </Card>*/}
        </div>
      </main>
    </div>
  )
}
