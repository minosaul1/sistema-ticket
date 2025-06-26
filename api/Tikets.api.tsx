import api from '@/lib/api';
import { TiketsData, CreatePayloadTicket, TicketStats } from '../types/tikets.types'

export const obtenerTickets = async (): Promise<TiketsData[]> => {
    const res = await api.get<TiketsData[]>('tickets/tiket/');
    return res.data;
};

export const getTikect = async (id: number | string): Promise<TiketsData> => {
    const res = await api.get<TiketsData>(`tickets/tiket/${id}`);
    return res.data
}

export const UpdateTiket = async (id: number, data: Partial<TiketsData>): Promise<TiketsData> => {
    const res = await api.patch<TiketsData>(`tickets/tiket/${id}/`, data);
    return res.data
}

export const CreateTicket = async (data: CreatePayloadTicket): Promise<TiketsData> => {
    const res = await api.post<TiketsData>('tickets/tiket/', data);
    return res.data
}

export const getTicketStats = async (): Promise<TicketStats> => {
    const res = await api.get<TicketStats>('tickets/tiket/stats/');
    return res.data
}


