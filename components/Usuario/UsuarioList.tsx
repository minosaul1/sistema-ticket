import { useEffect, useState } from "react";
import { UserData } from '@/types/User.types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Mail, Phone, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"

type UsuarioListProps = {
    usuarios: UserData[];
};
export function UsuarioList({ usuarios }: UsuarioListProps) {

    const getRolColor = (rol: string) => {
        switch (rol) {
            case "admin":
                return "destructive";
            case "tecnico":
                return "default";
            case "usuario":
                return "secondary";
            default:
                return "outline";
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de Usuarios</CardTitle>
                <CardDescription>{usuarios.length} usuarios encontrados</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Contacto</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Equipos</TableHead>
                            <TableHead>Tickets Activos</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usuarios.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.user.first_name}</TableCell>
                                <TableCell>
                                    <div className="text-sm text-gray-600 flex gap-1 items-center">
                                        <Mail className="w-4 h-4" />
                                        {user.user.email}
                                    </div>
                                    <div className="text-sm text-gray-600 flex gap-1 items-center">
                                        <Phone className="w-4 h-4" />
                                        {user.telephone}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getRolColor(user.role_input ?? "usuario")}>{user.role}</Badge>
                                </TableCell>
                                <TableCell>{user.equipos_asignados ?? 0}</TableCell>
                                <TableCell>{user.tickets_activos ?? 0}</TableCell>
                                <TableCell>
                                    {/*<div className="flex gap-1">*/}
                                    <Link href={`/usuarios/${user.id}`} >
                                        <Button variant="ghost" size="sm">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </Link >
                                    {/*</div>*/}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
