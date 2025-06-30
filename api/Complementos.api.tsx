import api from "../lib/api"
import { ComplementosData } from "../types/ComplementoTypes"

export const getAllComplementos = async (): Promise<ComplementosData[]> => {
    const res = await api.get<ComplementosData[]>('equipo/complemento/');
    return res.data

}

export const CreateComplemento = async (data: Omit<ComplementosData, "id">): Promise<ComplementosData> => {
    const res = await api.post<ComplementosData>('equipo/complemento/', data)
    return res.data
}

export const getComplementoId = async (id: number): Promise<ComplementosData> => {
    const res = await api.get<ComplementosData>(`equipo/complemento/${id}/`);
    return res.data
}

export const updateComplemento = async (id: number, data: Partial<ComplementosData>): Promise<ComplementosData> => {
    const res = await api.patch<ComplementosData>(`equipo/complemento/${id}/`, data)
    return res.data
}
