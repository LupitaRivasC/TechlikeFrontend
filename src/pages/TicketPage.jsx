import { useCart } from '../context/CartContext';
import TicketCard from '../components/TicketCard'; // Importar el componente que muestra cada producto del carrito
import { useEffect } from 'react';
import { jsPDF } from 'jspdf'; // Importar jsPDF

function TicketPage() {
    const { cart, getCart } = useCart(); // Obtiene los productos del carrito desde el contexto
    
    console.log(cart);

    useEffect(() => {
        getCart(); // Llama a la función para cargar los datos del carrito
    }, [getCart]); // Asegura que se ejecute cuando `getCart` cambie

    // Calcular el total del carrito
    const getTotal = () => {
        return cart.reduce((total, item) => total + item.producto.price * item.cantidad, 0);
    };

    // Función para generar el PDF del ticket
    const generatePDF = () => {
        const doc = new jsPDF();

        // Título del PDF
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('TICKET DE COMPRAS', 20, 20);

        // Configuración de la tabla
        const startY = 30; // Posición inicial para la tabla
        const rowHeight = 10; // Altura de cada fila
        let currentY = startY;

        // Encabezados de la tabla
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Imagen', 20, currentY);
        doc.text('Descripción', 40, currentY);
        doc.text('Precio', 120, currentY);
        doc.text('Cantidad', 150, currentY);
        doc.text('Subtotal', 180, currentY);

        currentY += rowHeight;

        // Añadir los productos del carrito al PDF
        cart.forEach((item,) => {
            // Imagen del producto
            const imgUrl = `http://localhost:4000/img/${item.producto.image}`;
            doc.addImage(imgUrl, 'JPEG', 20, currentY, 20, 20); // Imagen (ajustar tamaño)

            // Descripción, precio, cantidad y subtotal
            doc.setFont('helvetica', 'normal');
            doc.text(item.producto.description, 40, currentY + 3);
            doc.text(`$${item.producto.price}`, 120, currentY + 3);
            doc.text(`${item.cantidad}`, 150, currentY + 3);
            doc.text(`$${(item.producto.price * item.cantidad).toFixed(2)}`, 180, currentY + 3);

            currentY += rowHeight + 20; // Actualizar la posición Y para la siguiente fila
        });

        // Total del carrito
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(`Total: $${getTotal().toFixed(2)}`, 20, currentY);

        // Guardar el PDF
        doc.save('ticket_de_compras.pdf');
    };

    return (
        <div className="max-w-screen-lg mx-auto p-10">
            <h1 className="text-3xl font-bold text-white text-center mb-8">TICKET DE COMPRAS</h1>
            <div className="space-y-6">
                {cart.length > 0 ? (
                    cart.map((item) => <TicketCard key={item._id} item={item} />) // Renderiza los productos del carrito
                ) : (
                    <p className="text-white text-center">Tu ticket está vacío</p>
                )}
            </div>

            {cart.length > 0 && (
                <div className="mt-6 text-white text-lg font-semibold">
                    <p>Total: ${getTotal().toFixed(2)}</p>
                    <button
                        onClick={generatePDF}
                        className="mt-4 bg-blue-500 text-white p-2 rounded-md"
                    >
                        Generar PDF
                    </button>
                </div>
            )}
        </div>
    );
}

export default TicketPage;
