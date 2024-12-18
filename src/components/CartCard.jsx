import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';
import { IoTrashBinSharp, IoAddSharp, IoRemoveSharp } from 'react-icons/io5';

function CartCard({ item }) {
    const { deleteCart, addToCart, removeFromCart } = useCart();

    const server = import.meta.env.VITE_BASE_URL + "/img/";
    // Función para calcular el total de un solo producto
    const calculateProductTotal = (product) => {
        return product.producto.price * product.cantidad;
    };

    // Eliminar producto del carrito
    const handleDelete = () => {
        deleteCart(item._id);
    };

    // Aumentar la cantidad del producto
    const handleIncrease = () => {
        addToCart(item.producto._id); // Aumentar cantidad agregando el mismo producto al carrito
    };

    // Disminuir la cantidad del producto
    const handleDecrease = () => {
        if (item.cantidad > 1) {
            removeFromCart(item._id); // Disminuir cantidad eliminando uno de los productos del carrito
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 max-w-4xl w-full p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-white text-center mb-6">{item.producto.name}</h1>
            
            <div className="overflow-x-auto mb-4">
                <table className="min-w-full table-auto text-left text-gray-300">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="px-4 py-2 font-semibold text-white">Imagen</th>
                            <th className="px-4 py-2 font-semibold text-white">Descripción</th>
                            <th className="px-4 py-2 font-semibold text-white">Precio</th>
                            <th className="px-4 py-2 font-semibold text-white">Cantidad</th>
                            <th className="px-4 py-2 font-semibold text-white">Subtotal</th>
                            <th className="px-4 py-2 font-semibold text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-700 border-t border-gray-600">
                            <td className="px-4 py-2">
                                <img
                                    src={server + item.producto.image}
                                    alt={item.producto.name}
                                    width={50}
                                    height={50}
                                    className="rounded-md shadow-md"
                                />
                            </td>
                            <td className="px-4 py-2">{item.producto.description}</td>
                            <td className="px-4 py-2">${item.producto.price}</td>
                            <td className="px-4 py-2">{item.cantidad}</td>
                            <td className="px-4 py-2">${calculateProductTotal(item)}</td>
                            <td className="px-4 py-2 flex gap-x-4 justify-center">
                                <button
                                    className='bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full transition duration-300 flex items-center'
                                    onClick={handleDelete}
                                >
                                    <IoTrashBinSharp size={20} />
                                </button>
                                <button
                                    className={`bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-full transition duration-300 flex items-center ${item.cantidad <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={handleDecrease}
                                    disabled={item.cantidad <= 1} // Deshabilitar si la cantidad es 1
                                >
                                    <IoRemoveSharp size={20} />
                                </button>
                                <button
                                    className={`bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-full transition duration-300 flex items-center`}
                                    onClick={handleIncrease}
                                >
                                    <IoAddSharp size={20} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

CartCard.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CartCard;
