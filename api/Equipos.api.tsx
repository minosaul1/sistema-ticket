import axios from 'axios';
export type EquiposData = {
    id: number;
    marca: string;
    tipo_equipo: string;
    ram: number;
    disco: string;
    capacidad: number;
    procesador: string;
    n_serial: string;
    mac: string;
    modelo: string;
    ubicacion: String;
};
const Equipos = axios.create({
    baseURL: 'http://localhost:8000/control'
})

//export const AllgetEquipos = () => {
//   return axios.get<EquiposData[]>('/')
//}

export const AllgetEquipos = () => {
    const token = localStorage.getItem("access_token");
    return Equipos.get<EquiposData[]>('/equipo/', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const CreateEquipo = (data: Omit<EquiposData, "id">) => Equipos.post('/equipo/', data);