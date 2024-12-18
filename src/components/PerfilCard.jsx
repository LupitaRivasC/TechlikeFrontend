import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useProfiles } from '../context/PerfilContext';  // Nuevo contexto para perfiles
import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5';  // Iconos necesarios

function ProfileCard({ profile }) {
    const server = 'http://localhost:4000/img/';  // Ruta de la imagen
    const { deleteProfile } = useProfiles();  // Función para eliminar perfil

    return (
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 max-w-md w-full p-10 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <header className="text-center mb-4">
                <h1 className="text-2xl font-bold text-white">{profile.fullName}</h1>
            </header>
            <div className='flex justify-center mb-4'>
                <img
                    src={server + profile.image}
                    alt={profile.fullName}
                    width={200}
                    height={200}
                    className='max-h-[200px] object-contain rounded-md shadow-md'
                />
            </div>
            <div className='text-slate-300 mb-4'>
                <p className='mb-2'>
                    <span className='font-semibold text-white'>Estado:</span> {profile.state}
                </p>
                <p className='mb-2'>
                    <span className='font-semibold text-white'>Género:</span> {profile.gender}
                </p>
                <p className='mb-2'>
                    <span className='font-semibold text-white'>Edad:</span> {profile.age} años
                </p>
                <p className='mb-2'>
                    <span className='font-semibold text-white'>Dirección:</span> {profile.address}
                </p>
            </div>
            <div className="flex justify-center gap-x-4 mt-4">
                <button
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center shadow-lg transform hover:-translate-y-1'
                    onClick={() => deleteProfile(profile._id)}
                >
                    <IoTrashBinSharp size={20} className="mr-2" />
                    <span className="hidden sm:inline">Eliminar</span>
                </button>
                <Link
                    to={'/profiles/' + profile._id}
                    className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center shadow-lg transform hover:-translate-y-1'
                >
                    <IoPencilSharp size={20} className="mr-2" />
                    <span className="hidden sm:inline">Editar</span>
                </Link>
            </div>
        </div>
    );
}

ProfileCard.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileCard;
