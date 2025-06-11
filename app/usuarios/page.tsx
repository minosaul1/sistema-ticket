"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter } from "lucide-react"
import { UsuarioList } from "@/components/Usuario/UsuarioList"
import { UserData } from "@/types/User.types"
import { getAllUser } from "@/api/Usuarios.api"
import toast from "react-hot-toast"

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [rolFilter, setRolFilter] = useState<"all" | "admin" | "tecnico" | "usuario">("all");
  //const [rolFilter, setRolFilter] = useState("all");


  useEffect(() => {
    getAllUser()
      .then(data => {
        setUsuarios(data)
        toast.success("Usuarios cargados con exito")
      })
      .catch((err) => toast.error("Error al cargar usuarios", err));
  }, []);

  const handleRolChange = (value: string) => {
    setRolFilter(value as "all" | "admin" | "tecnico" | "usuario");
  };

  const filteredUsuarios = usuarios.filter((usuario) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      usuario.user.first_name.toLowerCase().includes(term) ||
      usuario.user.email.toLowerCase().includes(term)
    const matchesRol = rolFilter === "all" || usuario.role.toLowerCase() === rolFilter;
    return matchesSearch && matchesRol
  })

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={rolFilter} onValueChange={handleRolChange}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="tecnico">Técnico</SelectItem>
                <SelectItem value="usuario">Usuario</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/usuarios/nuevo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </Link>
          </div>
        </div>

        {/* Usuarios Table */}
        <UsuarioList usuarios={filteredUsuarios} />

        <></>
      </main>
    </div>
  )
}
