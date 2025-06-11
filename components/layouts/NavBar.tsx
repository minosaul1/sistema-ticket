"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/LogoutButton";




export function NavBar() {
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
                        <Link href="/tickets">
                            <Button variant="ghost">Tickets</Button>
                        </Link>
                        <Link href="/equipos">
                            <Button variant="ghost">Equipos</Button>
                        </Link>
                        <Link href="/usuarios">
                            <Button variant="ghost">Usuarios</Button>
                        </Link>
                        {/* Aquí agregamos el LogoutButton que ya maneja la acción de cerrar sesión */}

                        <LogoutButton />
                    </nav>
                </div>
            </div>
        </header>


    )
}