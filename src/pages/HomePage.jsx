function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center 
      min-h-screen bg-gradient-to-br from-gray-900 to-gray-600">
      <div className="bg-white max-w-lg w-full p-12 rounded-lg shadow-2xl">
        <div className="flex justify-center items-center mb-8">
          <img
            src="/techlike.png"
            alt="Logo de TechLike"
            className="w-48 h-48 rounded-full border-8 border-blue-500 shadow-2xl transform hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h1 className="text-5xl font-extrabold mb-4 text-center text-blue-700 hover:text-blue-800 transition-colors duration-300">
          Bienvenidos a TechLike
        </h1>
        <p className="text-center text-lg text-gray-700 mt-5 leading-relaxed">
          Donde la tecnología y la innovación se unen para ofrecerte lo mejor.
          Encuentra productos de última generación con la mejor calidad y precios competitivos.
        </p>
        <hr className="my-8 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
        <p className="text-center text-xs text-gray-500">
          Derechos Reservados MGRC &#9400; 2024
        </p>
      </div>
    </div>
  );
}

export default HomePage;