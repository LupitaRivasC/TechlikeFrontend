function PrincipalPage() {
    return (
      <div className="flex flex-col items-center justify-center 
      min-h-screen bg-gradient-to-br from-gray-900 to-gray-600">
        <div className="bg-white max-w-5xl w-full p-10 rounded-lg shadow-lg">
          <div className="flex items-center space-x-10 mb-10">
            <img
              src="techlike.png"
              alt="Logo de TECHLIKE"
              className="w-36 h-36 rounded-full border-8 border-gray-500 shadow-xl"
            />
            <div>
              <h1 className="text-5xl font-extrabold text-gray-800">
                TECHLIKE
              </h1>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg">
                Descubre los mejores accesorios para teléfonos y computadoras. Encuentra todo lo que necesitas para complementar tu tecnología con calidad y estilo.
              </p>
            </div>
          </div>

          <hr className="my-8 h-px bg-gray-300" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-4xl font-semibold text-gray-800">Misión</h2>
              <p className="text-gray-600 mt-2 text-lg">
                Facilitar la adquisición de accesorios tecnológicos de calidad a través de una plataforma confiable y fácil de usar, donde la satisfacción del cliente es nuestra prioridad.
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-semibold text-gray-800">Visión</h2>
              <p className="text-gray-600 mt-2 text-lg">
                Convertirnos en la plataforma líder para la compra de accesorios tecnológicos, reconocida por su innovación, calidad y compromiso con la experiencia del cliente.
              </p>
            </div>
          </div>

          <hr className="my-8 h-px bg-gray-300" />

          <div className="mt-10">
            <h2 className="text-4xl font-semibold text-gray-800">Nuestros Valores</h2>
            <ul className="text-gray-600 mt-4 text-lg list-disc pl-5">
              <li className="mb-2">Innovación: Incorporamos las últimas tendencias tecnológicas para satisfacer las necesidades de nuestros clientes.</li>
              <li className="mb-2">Calidad: Ofrecemos productos cuidadosamente seleccionados para garantizar una excelente relación calidad-precio.</li>
              <li className="mb-2">Accesibilidad: Hacemos que la tecnología esté al alcance de todos, con opciones flexibles y competitivas.</li>
              <li>Confianza: Construimos relaciones basadas en la transparencia, la seguridad y el respeto mutuo.</li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default PrincipalPage;
