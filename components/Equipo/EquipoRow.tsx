// components/EquipoRow.tsx
import { EquiposData } from "@/api/Equipos.api"
import { TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit } from "lucide-react"

type EquipoRowProps = {
  equipo: EquiposData
}

export function EquipoRow({ equipo }: EquipoRowProps) {
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

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div>
          <p className="font-semibold">{equipo.marca}</p>
          <p className="text-xs text-gray-500">{equipo.n_serial}</p>
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
          <p>{equipo.ram} GB RAM</p>
          <p>{equipo.disco} {equipo.capacidad} GB</p>
          <p className="text-xs text-gray-500">{equipo.procesador}</p>
        </div>
      </TableCell>
      <TableCell className="text-sm">---</TableCell>
      <TableCell className="text-sm">{equipo.ubicacion}</TableCell>
      <TableCell>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
