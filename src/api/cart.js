import axios from './axios';

// Llamada al API para obtener el carrito del usuario
export const getCartRequest = () => axios.get('/cart');

// Llamada al API para agregar un producto al carrito
export const addToCartRequest = (cartItem) => axios.post('/cart', cartItem, {});

// Llamada al API para eliminar un producto del carrito por ID
export const deleteCartRequest = (id) => axios.delete('/cart/' + id);
