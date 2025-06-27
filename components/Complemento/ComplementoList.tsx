import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { getAllComplementos } from '@/api/Complementos.api'
import { ComplementosRow } from './ComplementoRow'
import { toast } from "react-hot-toast";
import type { ComplementosData } from "@/types/ComplementoTypes"

export function ComplementoList() {
    const [Complementos, SetComplemento] = useState<ComplementosData[]>([])
    useEffect(() => {
        async function loadComplementos() {
            try {
                const res = await getAllComplementos()
                SetComplemento(res);
                toast.success("Complementos cargados correctamente.");
            } catch (error) {
                toast.error("No se pudieron cargar los Complementos...")

            }
        }
        loadComplementos()
    }, []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Numero Serie</TableHead>
                    <TableHead>Ubicacion</TableHead>
                    <TableHead>Equipo</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Complementos.map((complemento) => (
                    <ComplementosRow key={complemento.id} Complemento={complemento}></ComplementosRow>
                ))}
            </TableBody>
        </Table>
    )
}