"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Monitor, Plus, Search, Filter, Eye, Edit } from "lucide-react"

export default function EquiposPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFilter, setTipoFilter] = useState("all")

  // Datos simulados - en producción vendrían de la base de datos
  const equipos = [
    {
      id: 1,
      nom_equipo: "PC-001",
      marca: "Dell",
      modelo: "OptiPlex 7090",
      tipo_equipo: "Desktop",
      ram: "16GB",
      disco: "SSD",
      capacidad: "512GB",
      procesador: "Intel Core i7-11700",
      n_serie: "DL2024001",
      mac: "00:1B:44:11:3A:B7",
      ubicacion: "Oficina 101",
      usuario: "Juan Pérez",
    },
    {
      id: 2,
      nom_equipo: "LAP-005",
      marca: "HP",
      modelo: "EliteBook 840",
      tipo_equipo: "Laptop",
      ram: "8GB",
      disco: "SSD",
      capacidad: "256GB",
      procesador: "Intel Core i5-1135G7",
      n_serie: "HP2024005",
      mac: "00:1B:44:11:3A:C8",
      ubicacion: "Sala de Juntas",
      usuario: "María García",
    },
    {
      id: 3,
      nom_equipo: "PC-012",
      marca: "Lenovo",
      modelo: "ThinkCentre M720",
      tipo_equipo: "Desktop",
      ram: "8GB",
      disco: "HDD",
      capacidad: "1TB",
      procesador: "Intel Core i5-9400",
      n_serie: "LN2024012",
      mac: "00:1B:44:11:3A:D9",
      ubicacion: "Recepción",
      usuario: "Carlos López",
    },
    {
      id: 4,
      nom_equipo: "LAP-008",
      marca: "ASUS",
      modelo: "VivoBook 15",
      tipo_equipo: "Laptop",
      ram: "12GB",
      disco: "SSD",
      capacidad: "512GB",
      procesador: "AMD Ryzen 5 5500U",
      n_serie: "AS2024008",
      mac: "00:1B:44:11:3A:EA",
      ubicacion: "Oficina 205",
      usuario: "Laura Sánchez",
    },
  ]

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Desktop":
        return "default"
      case "Laptop":
        return "secondary"
      case "Server":
        return "destructive"
      default:
        return "outline"
    }
  }

  const filteredEquipos = equipos.filter((equipo) => {
    const matchesSearch =
      equipo.nom_equipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipo.usuario.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTipo = tipoFilter === "all" || equipo.tipo_equipo === tipoFilter
    return matchesSearch && matchesTipo
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Monitor className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Equipos</h1>
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
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar equipos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Desktop">Desktop</SelectItem>
                <SelectItem value="Laptop">Laptop</SelectItem>
                <SelectItem value="Server">Server</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Equipo
            </Button>
          </div>
        </div>

        {/* Equipos Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Equipos</CardTitle>
            <CardDescription>{filteredEquipos.length} equipos encontrados</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipo</TableHead>
                  <TableHead>Marca/Modelo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Especificaciones</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipos.map((equipo) => (
                  <TableRow key={equipo.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold">{equipo.nom_equipo}</p>
                        <p className="text-xs text-gray-500">{equipo.n_serie}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{equipo.marca}</p>
                        <p className="text-sm text-gray-600">{equipo.modelo}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTipoColor(equipo.tipo_equipo)}>{equipo.tipo_equipo}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{equipo.ram} RAM</p>
                        <p>
                          {equipo.disco} {equipo.capacidad}
                        </p>
                        <p className="text-xs text-gray-500">{equipo.procesador}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{equipo.usuario}</TableCell>
                    <TableCell className="text-sm">{equipo.ubicacion}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
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
