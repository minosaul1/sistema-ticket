"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";
import { useEffect, useState } from "react";

type Role = "admin" | "tecnico" | "usuario"
type Section = "equipos" | "usuarios" | "tickets" | "complementos"

const hasPermission = (role: Role | undefined, section: Section): boolean => {
    const accessMap: Record<Section, Role[]> = {
        equipos: ["admin", "tecnico"],
        usuarios: ["admin"],
        tickets: ["admin", "tecnico", "usuario"],
        complementos: ["admin", "tecnico"],
    }
    return !!role && accessMap[section].includes(role)
}

export function NavBar() {
    const [user, SetUser] = useState<{ role?: string }>({})

    useEffect(() => {
        const usersrt = localStorage.getItem("user")
        if (usersrt) {
            const userData = JSON.parse(usersrt)
            SetUser(userData.user)
        }
    }, [])
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <div className="flex items-center">
                        <Users className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
                    </div>
                    <nav className="flex space-x-4">
                        <Link href="/dashboard">
                            <Button variant="ghost">Dashboard</Button>
                        </Link>
                        {hasPermission(user.role as Role, "tickets") && (
                            <Link href="/tickets">
                                <Button variant="ghost">Tickets</Button>
                            </Link>
                        )
                        }
                        {hasPermission(user.role as Role, "equipos") && (
                            <Link href="/equipos">
                                <Button variant="ghost">Equipos</Button>
                            </Link>
                        )
                        }
                        {hasPermission(user.role as Role, "complementos") &&
                            <Link href="/complementos">
                                <Button variant="ghost">Complementos </Button>
                            </Link>

                        }
                        {hasPermission(user.role as Role, "usuarios") && (
                            <Link href="/usuarios">
                                <Button variant="ghost">Usuarios</Button>
                            </Link>
                        )
                        }
                        {/* Aquí agregamos el LogoutButton que ya maneja la acción de cerrar sesión */}

                        <LogoutButton />
                    </nav>
                </div>
            </div>
        </header>


    )
}