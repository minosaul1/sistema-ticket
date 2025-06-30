import { ComplementosData } from "@/types/ComplementoTypes"
import { TableRow, TableCell } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { Eye, Edit } from "lucide-react"


type ComplementosRowProps = {
    Complemento: ComplementosData
}

export function ComplementosRow({ Complemento }: ComplementosRowProps) {

    return (
        <TableRow>
            <TableCell className="font-medium" >
                <div>
                    <p>{Complemento.tipo}</p>
                </div>
            </TableCell>
            <TableCell className="font-medium">
                <div>
                    <p>{Complemento.marca}</p>
                </div>
            </TableCell>
            <TableCell className="font-medium">
                <div>
                    <p>{Complemento.modelo}</p>
                </div>
            </TableCell>
            <TableCell className="font-medium" >
                <div>

                    <p>{Complemento.n_serial}</p>
                </div>
            </TableCell>
            <TableCell className="font-medium">
                <div>
                    <p>{Complemento.ubicacion}</p>
                </div>
            </TableCell>
            <TableCell className="font-medium" >
                <div>
                    <p>{Complemento.fk_equipo}</p>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex gap-1">
                    <Link href={`/complementos/${Complemento.id}`}>
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                    </Link>
                </div>
            </TableCell>
        </TableRow >
    )
}