import PropTypes from 'prop-types';

function TicketCard({ item }) {
    const server = 'http://localhost:4000/img/';

    // Función para calcular el total de un solo producto
    const calculateProductTotal = (product) => {
        return product.producto.price * product.cantidad;
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
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

TicketCard.propTypes = {
    item: PropTypes.object.isRequired,
};

export default TicketCard;
