"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Monitor, Plus, Search, Filter, Eye, Edit } from "lucide-react"
import { EquiposList } from "@/components/Equipo/EquiposList"
import { useAuth } from "@/hooks/useAuth"

export default function EquiposPage() {
  const token = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFilter, setTipoFilter] = useState("all")

  // Array vacío para llenar con datos reales
  const equipos: Array<{
    id: number
    nom_equipo: string
    marca: string
    modelo: string
    tipo_equipo: string
    ram: string
    disco: string
    capacidad: string
    procesador: string
    n_serie: string
    mac: string
    ubicacion: string
    usuario: string
  }> = []

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
            <Link href="/equipos/nuevo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Equipo
              </Button>
            </Link>
          </div>
        </div>
        <EquiposList />

      </main>
    </div>
  )
}
