import axios from './axios';

// Llamada al API para obtener todas las categorías
export const getCategoriesRequest = () => axios.get('/categories');

// Llamada al API para obtener una categoría por ID
export const getCategoryRequest = (id) => axios.get(`/categories/${id}`);

// Llamada al API para agregar una categoría
export const createCategoryRequest = (category) => axios.post(`/categories`, category);

// Llamada al API para eliminar una categoría
export const deleteCategoryRequest = (id) => axios.delete(`/categories/${id}`);

// Llamada al API para editar una categoría
export const updateCategoryRequest = (id, category) => axios.put(`/categories/${id}`, category);
