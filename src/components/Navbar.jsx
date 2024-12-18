import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    IoPersonAdd, 
    IoLogIn, 
    IoAddCircle, 
    IoLogOut, 
    IoCart, 
    IoHome, 
    IoCall,
} from "react-icons/io5";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="bg-gradient-to-r from-[#30475e] via-[#1b2f5e] to-[#163c70] my-3 flex justify-between items-center py-4 px-6 rounded-lg shadow-lg">
            <Link to={isAuthenticated ? '/principal' : '/'}>
                <div className="flex items-center">
                    <img
                        src="/techlike.png"
                        alt="Techlike Logo"
                        className="w-12 h-12 rounded-full mr-2 border-4 border-white shadow-xl"
                    />
                    <h1 className="text-2xl font-bold text-white">Techlike</h1>
                </div>
            </Link>
            <ul className="flex gap-x-6 items-center">
                {/* Rutas comunes */}
                <NavLinkItem to="/" icon={<IoHome size={24} />} label="Inicio" />

                {isAuthenticated ? (
                    <>
                        {/* Productos - Desplegable */}
                        <li className="relative group">
                            <button
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#163c70] transition duration-300"
                            >
                                <IoAddCircle size={24} />
                                <span>Productos</span>
                            </button>
                            <div className="absolute top-full left-0 mt-2 bg-[#2d3e52] rounded-lg shadow-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <NavLinkItem to="/products" label="Ver Productos" />
                                <NavLinkItem to="/add-products" label="Crear Producto" />
                            </div>
                        </li>

                        {/* Categorías - Desplegable */}
                        <li className="relative group">
                            <button
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#163c70] transition duration-300"
                            >
                                <IoAddCircle size={24} />
                                <span>Categorías</span>
                            </button>
                            <div className="absolute top-full left-0 mt-2 bg-[#2d3e52] rounded-lg shadow-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <NavLinkItem to="/categories" label="Ver Categorías" />
                                <NavLinkItem to="/add-categories" label="Crear Categoría" />
                            </div>
                        </li>

                        {/* Otras rutas */}
                        <NavLinkItem to="/cart" icon={<IoCart size={24} />} label="Carrito" />
                        <NavLinkItem to="/contacto" icon={<IoCall size={24} />} label="Contacto" />
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 bg-[#163c70] p-2 rounded-lg text-white hover:bg-[#0f2546] transition duration-300 shadow-md"
                        >
                            <IoLogOut size={24} />
                            <span>Salir</span>
                        </button>
                    </>
                ) : (
                    <>
                        {/* Rutas para usuarios no autenticados */}
                        <NavLinkItem to="/login" icon={<IoLogIn size={24} />} label="Iniciar sesión" />
                        <NavLinkItem to="/register" icon={<IoPersonAdd size={24} />} label="Registrarse" />
                    </>
                )}
            </ul>
        </nav>
    );
}

function NavLinkItem({ to, icon, label }) {
    return (
        <div>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg transition duration-300 shadow-md ${
                        isActive ? "bg-[#0f2546] text-white" : "text-gray-300 hover:text-white hover:bg-[#163c70]"
                    }`
                }
            >
                {icon}
                <span>{label}</span>
            </NavLink>
        </div>
    );
}

export default Navbar;
