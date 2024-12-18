import { useEffect } from "react";
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';  // Nuevo contexto para carrito
import ProductCard from "../components/ProductCard";
import { Link } from 'react-router-dom';
import { IoAddCircleSharp } from "react-icons/io5"; // Icono para agregar

function ProductsPage() {
    const { getProducts, products } = useProducts();
    const { addToCart } = useCart();  // Función para agregar al carrito

    useEffect(() => {
        getProducts();
    }, [getProducts]);


    if (products.length === 0) 
        return (<h1>No hay productos para listar</h1>);

    return (<div className="min-h-screen bg-gradient-to-br from-gray-800 to-black py-10">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-5xl font-extrabold text-white">Productos</h1>
                        <Link
                            to="/add-product"  // Ruta para agregar categoría
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center transition duration-300 shadow-md"
                        >
                            <IoAddCircleSharp size={24} className="mr-2" />
                            Agregar Productos
                        </Link>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {
                products.map((product) => (
                    <ProductCard 
                        key={product._id} 
                        product={product} 
                        addToCart={() => addToCart(product._id)}  // Enlace a la función agregar al carrito
                        />
                    ))
                }
            </div>
        </div>
    </div>
);
}

export default ProductsPage;
