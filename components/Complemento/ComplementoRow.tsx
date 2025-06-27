import { ComplementosData } from "@/types/ComplementoTypes"
import { TableRow, TableCell } from "@/components/ui/table"


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

                    <p>{Complemento.marca}</p>
                </div>
            </TableCell>
            <TableCell className="font-medium">
                <div>
                    <p>{Complemento.n_serial}</p>
                </div>
            </TableCell>
            <TableCell className="font-medium" >
                <div>

                    <p>{Complemento.ubicacion}</p>
                </div>
            </TableCell>
        </TableRow>
    )
}