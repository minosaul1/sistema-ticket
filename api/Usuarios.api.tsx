import axios from 'axios';



const Usuarios = axios.create({
    baseURL: 'http://localhost:8000/control/usuario'
});

// Métodos de API
/*
export const getAllProductos = () => ProductosApi.get('/');

// El tipo `id` es `number` o `string`, según tu backend (usualmente `number` en Django)
export const getProducto = (id: number | string) => ProductosApi.get(`/${id}/`);

export const createProducto = (data: ProductoData) => ProductosApi.post('/', data);

export const deleteProducto = (id: number | string) => ProductosApi.delete(`/${id}/`);

export const updateProducto = (id: number | string, data: ProductoData) =>
    ProductosApi.put(`/${id}/`, data);


export const getProductoByCodigo = (codigo: string) => {
    return axios.get(`/api/producto/${codigo}/`);
};
*/