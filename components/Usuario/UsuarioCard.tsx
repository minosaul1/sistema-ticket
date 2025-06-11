import { UserData } from '@/types/User.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Eye, Edit } from "lucide-react"
import { Badge } from "@/components/ui/badge"
type UserProps = {
    user: UserData
}

export function UsuarioCard({ user }: UserProps) {

    const getRolColor = (rol: string) => {
        switch (rol) {
            case "Admin":
                return "destructive"
            case "Técnico":
                return "default"
            case "Usuario":
                return "secondary"
            default:
                return "outline"
        }
    }


    return (

        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>{user.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="text-sm text-gray-500">ID: {user.id}</div>
                <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{user.user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{user.telephone}</span>
                </div>
                <Badge variant={getRolColor(user.role)}>{user.role}</Badge>
                <div className="text-sm">Equipos asignados: {user.equipos_asignados}</div>
                <div className="text-sm">Tickets activos: {user.tickets_activos}</div>
            </CardContent>
        </Card>
    )
}