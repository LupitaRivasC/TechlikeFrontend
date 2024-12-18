import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { 
    createCategoryRequest, 
    getCategoriesRequest, 
    deleteCategoryRequest, 
    getCategoryRequest, 
    updateCategoryRequest 
} from "../api/category";

const CategoriesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("UseCategories debe estar definido en un contexto");
    }
    return context;
};

export function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState([]);

    const createCategory = async (category) => {
        try {
            const res = await createCategoryRequest(category);
            if (res.status === 201) {
                getCategories(); 
            }
        } catch (error) {
            setErrors(error.response?.data?.message || "Error al crear categoría");
            console.error(error);
        }
    };

    const getCategories = async () => {
        try {
            const res = await getCategoriesRequest();
            setCategories(res.data);
        } catch (error) {
            setErrors(error.response?.data?.message || "Error al obtener categorías");
            console.error(error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const res = await deleteCategoryRequest(id);
            if (res.status === 200) {
                setCategories(categories.filter(category => category._id !== id));
            }
        } catch (error) {
            setErrors(error.response?.data?.message || "Error al eliminar categoría");
            console.error(error);
        }
    };

    const getCategory = async (id) => {
        try {
            const res = await getCategoryRequest(id);
            return res.data;
        } catch (error) {
            setErrors(error.response?.data?.message || "Error al obtener categoría");
            console.error(error);
        }
    };

    const updateCategory = async (id, category) => {
        try {
            const res = await updateCategoryRequest(id, category);
            if (res.status === 200) {
                console.log(res);
            }
        } catch (error) {
            setErrors(error.response?.data?.message || "Error al actualizar categoría");
            console.error(error);
        }
    };

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                createCategory,
                getCategories,
                deleteCategory,
                getCategory,
                updateCategory,
                errors,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
}

CategoriesProvider.propTypes = {
    children: PropTypes.any,
};
