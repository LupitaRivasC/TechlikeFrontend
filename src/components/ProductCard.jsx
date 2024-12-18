import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext'; // Nuevo contexto para carrito
import { IoTrashBinSharp, IoPencilSharp, IoCartSharp } from 'react-icons/io5'; // Iconos necesarios

function ProductCard({ product }) {
    const server = 'http://localhost:4000/img/';
    const { deleteProduct } = useProducts();
    const { addToCart } = useCart(); // Función para agregar al carrito

    return (
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 max-w-md w-full p-8 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <header className="text-center mb-4">
                <h1 className="text-xl font-bold text-white">{product.name}</h1>
            </header>
            <div className="flex justify-center mb-4">
                <img
                    src={server + product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="max-h-[150px] object-contain rounded-md shadow-md"
                />
            </div>
            <div className="text-slate-300 mb-4 text-sm">
                <p className="mb-2">
                    <span className="font-semibold text-white">Precio:</span> ${product.price}
                </p>
                <p className="mb-2">
                    <span className="font-semibold text-white">Descripción:</span> {product.description}
                </p>
            </div>
            <div className="flex justify-center gap-x-2 mt-4">
                {/* Botón Eliminar */}
                <button
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 flex items-center gap-1 hover:scale-105 text-xs"
                    onClick={() => deleteProduct(product._id)}
                >
                    <IoTrashBinSharp size={16} />
                    <span>Eliminar</span>
                </button>
                {/* Botón Editar */}
                <Link
                    to={'/products/' + product._id}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 flex items-center gap-1 hover:scale-105 text-xs"
                >
                    <IoPencilSharp size={16} />
                    <span>Editar</span>
                </Link>
                {/* Botón Agregar al Carrito */}
                <button
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 flex items-center gap-1 hover:scale-105 text-xs"
                    onClick={() => addToCart({ producto: product._id })}
                >
                    <IoCartSharp size={16} />
                    <span>Agregar</span>
                </button>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;
