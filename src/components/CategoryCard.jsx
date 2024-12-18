import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import { IoTrashBinSharp, IoPencilSharp, } from 'react-icons/io5';  // Iconos necesarios

function CategoryCard({ category }) {
    const { deleteCategory} = useCategories();
    
    return (
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 max-w-md w-full p-10 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <header className="text-center mb-4">
                <h1 className="text-2xl font-bold text-white">{category.nombre}</h1>
            </header>
           
            <div className="flex justify-center gap-x-4 mt-4">
                <button
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center shadow-lg transform hover:-translate-y-1'
                    onClick={() => deleteCategory(category._id)}
                >
                    <IoTrashBinSharp size={20} className="mr-2" />
                    <span className="hidden sm:inline">Eliminar</span>
                </button>
                <Link
                    to={'/categories/' + category._id}
                    className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center shadow-lg transform hover:-translate-y-1'
                >
                    <IoPencilSharp size={20} className="mr-2" />
                    <span className="hidden sm:inline">Editar</span>
                </Link>
                
            </div>
        </div>
    );
}

CategoryCard.propTypes = {
    category: PropTypes.object.isRequired,
};

export default CategoryCard;
