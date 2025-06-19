"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, TrendingUp, AlertCircle, Clock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogoutButton } from "@/components/LogoutButton" // Importar el botón de cierre de sesión
import { TiketsList } from "@/components/Tiket/TiketsList";
import { useEffect, useState } from "react"
import { getTicketStats } from "@/api/Tikets.api"
import { TicketStats } from "@/types/tikets.types"
import { data } from "autoprefixer"
import { stat } from "fs"




export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<TicketStats>({
    totalTickets: 0,
    ticketsAbiertos: 0,
    ticketsEnProceso: 0,
    ticketsResueltos: 0,
  })

  useEffect(() => {
    getTicketStats()
      .then((data: TicketStats) => setStats(data))
      .catch(console.error)
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets: {stats.totalTickets}</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{/*stats.totalTickets*/}</div>
              {/**  <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% desde el mes pasado
              </p>*/}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Abiertos: {stats.ticketsAbiertos}</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{/*stats.ticketsAbiertos*/}</div>
              <p className="text-xs text-muted-foreground">Requieren atención inmediata: {stats.ticketsAbiertos}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Proceso: {stats.ticketsEnProceso}</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{/*stats.ticketsEnProceso*/}</div>
              <p className="text-xs text-muted-foreground">Siendo atendidos por técnicos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resueltos : {stats.ticketsResueltos} </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{/*stats.ticketsResueltos*/}</div>
              <p className="text-xs text-muted-foreground">Completados exitosamente</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Recent Tickets */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <Link href="/tickets">
              <Button variant="outline" className="w-full">
                Ver Todos los Tickets
              </Button>
            </Link>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center">
            <div className="w-full max-w-4xl">
              <TiketsList />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
