import { useCart } from '../context/CartContext';
import CartCard from '../components/CartCard'; // Importar el componente que muestra cada producto del carrito
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar para manejar la redirección

function CartPage() {
    const { cart, getCart } = useCart(); // Obtiene los productos del carrito desde el contexto
    const navigate = useNavigate(); // Hook para redirigir a otra página

    console.log(cart);

    useEffect(() => {
        getCart(); // Llama a la función para cargar los datos del carrito
    }, [getCart]); // Asegura que se ejecute cuando `getCart` cambie

    // Calcular el total del carrito
    const getTotal = () => {
        return cart.reduce((total, item) => total + item.producto.price * item.cantidad, 0);
    };

    // Manejar la redirección al hacer clic en el botón de "Proceder al Pago"
    const handleProceedToPayment = () => {
        navigate('/ticket', { state: { cart } }); // Redirige a la página de pago y pasa el carrito como estado
    };
    return (
        <div className="max-w-screen-lg mx-auto p-10">
            <h1 className="text-3xl font-bold text-white text-center mb-8">CARRITO DE COMPRAS</h1>
            <div className="space-y-6">
                {cart.length > 0 ? (
                    cart.map((item) => <CartCard key={item._id} item={item} />) // Renderiza los productos del carrito
                ) : (
                    <p className="text-white text-center">Tu carrito está vacío</p>
                )}
            </div>

            {cart.length > 0 && (
                <div className="mt-6 text-white text-lg font-semibold">
                    <p>Total: ${getTotal().toFixed(2)}</p>
                    {/* Botón para proceder al pago */}
                    <button
                        onClick={handleProceedToPayment} // Llama a la función de redirección al hacer clic
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 mt-4 rounded-full transition duration-300 flex items-center shadow-lg transform hover:-translate-y-1"
                    >
                        Proceder al Pago
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartPage;
