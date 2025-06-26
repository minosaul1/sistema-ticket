import api from '@/lib/api';


import { UserData, CreateUserPayload, TecnicoData } from '@/types/User.types'

export const getAllUser = async (): Promise<UserData[]> => {
    const res = await api.get<UserData[]>('usuarios/usuario/');
    return res.data
}

export const getUser = async (id: number): Promise<UserData> => {
    const res = await api.get<UserData>(`usuarios/usuario/${id}`)
    return res.data

}

export const getTecnicos = async (): Promise<TecnicoData[]> => {
    const res = await api.get<TecnicoData[]>('usuarios/usuario/tecnicos-list/');
    return res.data
}

export const createUser = async (data: CreateUserPayload): Promise<UserData> => {
    const res = await api.post<UserData>('usuarios/usuario/', data)
    return res.data

}

export const UpdateUser = async (id: number, data: Partial<UserData>): Promise<UserData> => {
    const res = await api.patch<UserData>(`usuarios/usuario/${id}/`, data);
    return res.data
}