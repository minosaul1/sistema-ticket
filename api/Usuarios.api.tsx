import api from '@/api/axiosConfig'
import { UserData, CreateUserPayload, TecnicoData } from '@/types/User.types'



export const getAllUser = async (): Promise<UserData[]> => {
    const res = await api.get<UserData[]>('/usuario/');
    return res.data
}

export const getUser = async (id: number): Promise<UserData> => {
    const res = await api.get<UserData>(`/usuario/${id}`)
    return res.data

}

export const getTecnicos = async (): Promise<TecnicoData[]> => {
    const res = await api.get<TecnicoData[]>('/usuario/tecnicos-list/');
    return res.data
}

export const createUser = async (data: CreateUserPayload): Promise<UserData> => {
    const res = await api.post<UserData>('/usuario/', data)
    return res.data

}

export const UpdateUser = async (id: number, data: Partial<UserData>): Promise<UserData> => {
    const res = await api.patch<UserData>(`/usuario/${id}/`, data);
    return res.data
}