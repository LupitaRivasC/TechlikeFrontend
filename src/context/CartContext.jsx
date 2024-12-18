import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { getCartRequest, addToCartRequest, deleteCartRequest } from "../api/cart";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe estar definido dentro de un CartProvider");
    }
    return context;
};

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [errors, setErrors] = useState([]);

    // Obtener el carrito del usuario
    const getCart = async () => {
        try {
            const res = await getCartRequest();
            setCart(res.data);
        } catch (error) {
            setErrors(error.response?.data?.message || "Error al obtener el carrito");
            console.log(error);
        }
    };

    // Agregar un producto al carrito
    const addToCart = async (cartItem) => {
        try {
            const res = await addToCartRequest(cartItem);
            console.log(res.data)
        } catch (error) {
            setErrors(error.response?.data?.error || "Error al agregar al carrito");
            console.log(error);
        }
    };

    // Eliminar un producto del carrito
    const deleteCart = async (id) => {
        try {
            await deleteCartRequest(id);
            setCart((prevCart) => prevCart.filter(item => item._id !== id));
        } catch (error) {
            setErrors(error.response?.data?.message || "Error al eliminar del carrito");
            console.log(error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                getCart,
                addToCart,
                deleteCart,
                errors,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// Validación de props
CartProvider.propTypes = {
    children: PropTypes.any,
};
