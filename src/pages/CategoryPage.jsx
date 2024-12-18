import { useEffect } from "react";
import { useCategories } from '../context/CategoryContext';
import { useCart } from '../context/CartContext';  // Si necesitas agregar algo al carrito relacionado con categorías
import CategoryCard from "../components/CategoryCard"; // Componente para mostrar la categoría
import { Link } from 'react-router-dom';
import { IoAddCircleSharp } from "react-icons/io5"; // Icono para agregar

function CategoriesPage() {
    const { getCategories, categories } = useCategories(); // Hook para obtener categorías
    const { addToCart } = useCart();  // Función para agregar al carrito (si deseas usarla)

    useEffect(() => {
        getCategories();  // Llamada para obtener categorías cuando se monta el componente
    }, []);

    if (categories.length === 0) 
        return (<h1>No hay categorías para listar</h1>);  // Mensaje si no hay categorías disponibles

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black py-10">
            <div className="container mx-auto px-6 lg:px-20">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-5xl font-extrabold text-white">Categorías</h1>
                    <Link
                        to="/add-categories"  // Ruta para agregar categoría
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center transition duration-300 shadow-md"
                    >
                        <IoAddCircleSharp size={24} className="mr-2" />
                        Agregar Categoría
                    </Link>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {
                        categories.map((category) => (
                            <CategoryCard 
                                key={category._id} 
                                category={category} 
                                addToCart={() => addToCart(category._id)}  
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default CategoriesPage;
