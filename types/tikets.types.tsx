export type TiketsData = {
    id: number;
    estatus: string;
    fecha_reporte: string;
    fecha_inicio: string | null;
    fecha_final: string | null;
    tipo_servicio: string;
    comentarios: string;
    fk_equipo: { id: number; marca: string, modelo: string };
    fk_reporta: String;
    fk_tecnico: number | null;
};

export type CreatePayloadTicket = {
    tipo_servicio: string;
    comentarios: string;
    fk_equipo: number;
}