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
