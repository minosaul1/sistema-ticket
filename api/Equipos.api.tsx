//Dejamos de ocupar esto debido a que creamos las configuraciones en el otro archivo 
// import api from '@/api/axiosConfig';
import api from '@/lib/api';
import { EquiposData } from '@/types/EquipoTypes'


export const AllgetEquipos = async (): Promise<EquiposData[]> => {
    const res = await api.get<EquiposData[]>('/equipo/');
    return res.data
}

export const CreateEquipo = async (data: Omit<EquiposData, "id">): Promise<EquiposData> => {
    const res = await api.post<EquiposData>('/equipo/', data)
    return res.data;
}

export const getEquipoId = async (id: number): Promise<EquiposData> => {
    const res = await api.get<EquiposData>(`/equipo/${id}/`);
    return res.data
}

export const getEquiposSinReporte = async (): Promise<EquiposData[]> => {
    const res = await api.get<EquiposData[]>('/equipo/equipos-disponibles/')
    return res.data
}

export const UpdateEquipo = async (id: number, data: Partial<EquiposData>): Promise<EquiposData> => {
    const res = await api.patch<EquiposData>(`/equipo/${id}/`, data);
    return res.data
}
//export const CreateEquipo = (data: Omit<EquiposData, "id">) => Equipos.post('/equipo/', data);
