import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, Users, Monitor, Wrench } from "lucide-react"


export default function HomePage() {
  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Ticket className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Sistema de Tickets</h1>
            </div>
            <Link href="/login">
              <Button>Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gestión de Soporte Técnico</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sistema integral para la gestión de tickets de soporte, equipos de cómputo y mantenimiento técnico
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card>
            <CardHeader className="text-center">
              <Ticket className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Gestión de Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Crea, asigna y da seguimiento a tickets de soporte técnico con estados y prioridades
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Monitor className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Control de Equipos</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Administra el inventario de equipos de cómputo, especificaciones y ubicaciones
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Gestión de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Maneja usuarios, técnicos y administradores con diferentes niveles de acceso
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Wrench className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Mantenimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Registra refacciones, reparaciones y historial de mantenimiento</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link href="/login">
            <Button size="lg" className="text-lg px-8 py-3">
              Acceder al Sistema
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
