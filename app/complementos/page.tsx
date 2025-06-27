"use client"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Search, Eye, Plus, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ComplementoList } from "@/components/Complemento/ComplementoList"
export default function ComplementosPage() {
    const token = useAuth()
    const [searchTerm, setSearchTerm] = useState("")
    const [tipoFilter, setTipoFilter] = useState("all")

    return (
        <ProtectedRoute allowedRoles={["admin", "tecnico"]}>
            <div className="min-h-screen bg-gray-50">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Buscar Componentes"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10" />
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
                            <Link href="/complementos/nuevo">
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nuevo Componente
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <ComplementoList />
                </main>
            </div >
        </ProtectedRoute >
    )
}