import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';  // Nuevo contexto para carrito
import { IoTrashBinSharp, IoPencilSharp, IoCartSharp } from 'react-icons/io5';  // Iconos necesarios

function ProductCard({ product }) {
    const server = 'http://localhost:4000/img/';
    const { deleteProduct } = useProducts();
    const { addToCart } = useCart();  // Función para agregar al carrito
    console.log(product._id)
    return (
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 max-w-md w-full p-10 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <header className="text-center mb-4">
                <h1 className="text-2xl font-bold text-white">{product.name}</h1>
            </header>
            <div className='flex justify-center mb-4'>
                <img
                    src={server + product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className='max-h-[200px] object-contain rounded-md shadow-md'
                />
            </div>
            <div className='text-slate-300 mb-4'>
                <p className='mb-2'>
                    <span className='font-semibold text-white'>Precio:</span> ${product.price}
                </p>
                <p className='mb-2'>
                    <span className='font-semibold text-white'>Descripción:</span> {product.description}
                </p>
            </div>
            <div className="flex justify-center gap-x-4 mt-4">
                <button
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center shadow-lg transform hover:-translate-y-1'
                    onClick={() => deleteProduct(product._id)}
                >
                    <IoTrashBinSharp size={20} className="mr-2" />
                    <span className="hidden sm:inline">Eliminar</span>
                </button>
                <Link
                    to={'/products/' + product._id}
                    className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center shadow-lg transform hover:-translate-y-1'
                >
                    <IoPencilSharp size={20} className="mr-2" />
                    <span className="hidden sm:inline">Editar</span>
                </Link>
                <button
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center shadow-lg transform hover:-translate-y-1'
                    onClick={()=> addToCart({producto:product._id})}  // Llama a la función para agregar al carrito
                >
                    <IoCartSharp size={20} className="mr-2" />
                    <span className="hidden sm:inline">Agregar al Carrito</span>
                </button>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;
