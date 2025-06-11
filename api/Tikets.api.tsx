import api from './axiosConfig';
import { TiketsData, CreatePayloadTicket } from '../types/tikets.types'

export const obtenerTickets = async (): Promise<TiketsData[]> => {
    const res = await api.get<TiketsData[]>('/tiket/');
    return res.data;
};

export const getTikect = async (id: number | string): Promise<TiketsData> => {
    const res = await api.get<TiketsData>(`/tiket/${id}`);
    return res.data
}

export const UpdateTiket = async (id: number, data: Partial<TiketsData>): Promise<TiketsData> => {
    const res = await api.patch<TiketsData>(`/tiket/${id}/`, data);
    return res.data
}

export const CreateTicket = async (data: CreatePayloadTicket): Promise<TiketsData> => {
    const res = await api.post<TiketsData>('/tiket/', data);
    return res.data
}


