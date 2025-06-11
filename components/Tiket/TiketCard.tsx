import { TiketsData } from '@/types/tikets.types'
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"



type TiketsProps = {
    tiket: TiketsData
}

export function TiketsCard({ tiket }: TiketsProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Abierto":
                return "destructive"
            case "En Proceso":
                return "default"
            case "Resuelto":
                return "secondary"
            default:
                return "default"
        }
    }

    return (
        <CardContent>
            <div className="space-y-4">
                {/*{recentTickets.map((ticket) => (*/}
                <div key={tiket.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">#{tiket.id}</span>
                            <Badge variant="outline">{tiket.fk_equipo.marca}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{tiket.fecha_reporte}</p>
                        <p className="text-xs text-gray-500">Reportado por: {tiket.fk_reporta}</p>
                    </div>
                    <div className="text-right">
                        <Badge variant={getStatusColor(tiket.estatus)}>{tiket.estatus}</Badge>
                        <p className="text-xs text-gray-500 mt-1">{tiket.tipo_servicio}</p>
                    </div>
                </div>
                {/*  ))}*/}
            </div>

        </CardContent>

    )
}



