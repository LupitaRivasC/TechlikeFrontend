import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createProductRequest, 
         getProductsRequest, 
         deleteProductRequest, 
         getProductRequest, 
         updateProductRequest } from "../api/products";

const ProductsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("UseProducts debe estar definido en un contexto");
    }
    return context;
};

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState([]); // Corregido el ';'

    const createProduct = async (product) => {
        try {
            await createProductRequest(product);
            getProducts();
        } catch (error) {
            setErrors(error.response.data.message);
            console.log(error);
        }
    }; // Corregido el cierre de la función 'createProduct'

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            setProducts(res.data);
        } catch (error) {
            setErrors(error.response.data.message);
            console.log(error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id);
            if (res.status === 200) {
                setProducts(products.filter(product => product._id !== id));
            }
        } catch (error) {
            setErrors(error.response.data.message);
            console.log(error);
        }
    };

    const getProduct = async (id) => {
        try {
            const res = await getProductRequest(id); // Se pasa 'id' como parámetro
            return res.data;
        } catch (error) {
            setErrors(error.response.data.message);
            console.log(error);
        }
    };

    const updateProduct = async (id, product) => {
        try {
            const res = await updateProductRequest(id, product); // Corregido para incluir parámetros
            console.log(res);
        } catch (error) {
            setErrors(error.response.data.message);
            console.log(error);
        }
    };

    const updateProductNoUpdateImage = async (id, product) => {
        try {
            const res = await updateProductNoUpdateImage(id, product); // Corregido el nombre de la función
            console.log(res);
        } catch (error) {
            setErrors(error.response.data.message);
            console.log(error);
        }
    }; // Corregido el cierre de la función 'updateProductNoUpdateImage'

    return (
        <ProductsContext.Provider
            value={{
                products,
                createProduct,
                getProducts,
                deleteProduct,
                getProduct,
                updateProductNoUpdateImage,
                updateProduct,
                errors,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

// Corrección del uso de propTypes
ProductsProvider.propTypes = {
    children: PropTypes.any,
};
