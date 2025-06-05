import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { AllgetEquipos } from '../../api/Equipos.api';
import type { EquiposData } from '../../api/Equipos.api';
import { EquipoRow } from '@/components/Equipo/EquipoRow';
import { toast } from "react-hot-toast";

export function EquiposList() {
    const [Equipos, setEquipos] = useState<EquiposData[]>([]);

    useEffect(() => {
        async function loadEquipos() {
            try {
                const res = await AllgetEquipos();
                const data = res.data;
                setEquipos(res.data);
                //console.log("Datos recibidos:", data);
                //setEquipos(Array.isArray(data) ? data : []);
                toast.success("Equipos cargados correctamente.");
            }
            catch (error) {
                //console.error("Error al cargar los equipos:", error);
                toast.error("Error al cargar los equiopos");
            }

        }
        loadEquipos();
    }, []);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Equipo</TableHead>
                    <TableHead>Marca/Modelo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Especificaciones</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Equipos.map((equipo) => (
                    <EquipoRow key={equipo.id} equipo={equipo} />
                ))}
            </TableBody>
        </Table>
    )
}