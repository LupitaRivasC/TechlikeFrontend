import axios from './axios';

// Llamada al API para obtener todos los productos
export const getProductsRequest = () => axios.get('/products');

// Llamada al API para obtener un producto por ID
export const getProductRequest = (id) => axios.get('/products/' + id);

// Llamada al API para agregar un producto
export const createProductRequest = (product) => 
  axios.post('/products', product, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

// Llamada al API para eliminar un producto
export const deleteProductRequest = (id) => axios.delete('/products/' + id);

// Llamada al API para editar un producto
export const updateProductRequest = (id, product) => axios.put('/products/' + id, product);
