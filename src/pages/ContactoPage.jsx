import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

function ContactoPage() {
    return (
        <div className="flex flex-col items-center justify-center 
        min-h-screen bg-gradient-to-br from-gray-900 to-gray-600">
            <div className="bg-white max-w-4xl w-full p-10 rounded-lg shadow-2xl">
                <h1 className="text-6xl font-extrabold text-gray-800 text-center mb-8">Contáctanos</h1>

                <div className="text-gray-600 text-lg space-y-6">
                    <p className="flex items-center"><span className="font-bold mr-2">📍 Dirección:</span> Dorados de Villa #17, Colonia La Toma, Zacatecas</p>
                    <p className="flex items-center"><span className="font-bold mr-2">📞 Teléfono:</span> 492 180 3737</p>
                    <p className="flex items-center"><span className="font-bold mr-2">✉️ Email:</span> <a href="mailto:techlike@gmail.com" className="text-blue-500 underline hover:text-blue-700 transition-colors">techlike@gmail.com</a></p>
                </div>

                <hr className="my-8 h-px bg-gradient-to-r from-purple-500 via-gray-300 to-purple-500" />

                <div className="text-center">
                    <h2 className="text-4xl font-semibold text-gray-800 mb-8">Síguenos en nuestras redes sociales</h2>
                    <div className="flex justify-center space-x-8">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-5xl hover:text-blue-700 transition-transform transform hover:rotate-6 hover:scale-125 duration-300"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 text-5xl hover:text-blue-500 transition-transform transform hover:rotate-6 hover:scale-125 duration-300"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 text-5xl hover:text-pink-600 transition-transform transform hover:rotate-6 hover:scale-125 duration-300"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 text-5xl hover:text-blue-800 transition-transform transform hover:rotate-6 hover:scale-125 duration-300"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://wa.me/4921803737"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-500 text-5xl hover:text-green-600 transition-transform transform hover:rotate-6 hover:scale-125 duration-300"
                        >
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 italic">¡Gracias por visitarnos! Estamos aquí para ayudarte 😊</p>
                </div>
            </div>
        </div>
    );
}

export default ContactoPage;
