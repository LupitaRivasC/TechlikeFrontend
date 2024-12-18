import { useEffect } from "react";
import { useProfiles } from '../context/PerfilContext'; // Cambié el contexto a 'useProfiles'
import ProfileCard from "../components/PerfilCard"; // Cambié 'ProductCard' a 'ProfileCard'

function ProfilesPage() {
    const { getProfiles, profiles } = useProfiles(); // Cambié 'products' por 'profiles'

    useEffect(() => {
        getProfiles(); // Obtengo los perfiles
    }, [getProfiles]);

    if (profiles.length === 0) 
        return (<h1>No hay perfiles para listar</h1>); // Mensaje si no hay perfiles

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {
                profiles.map((profile) => (  // Cambio de 'products' a 'profiles'
                    <ProfileCard 
                        key={profile._id}  // Uso 'profile._id'
                        profile={profile}  // Paso 'profile' al 'ProfileCard'
                    />
                ))
            }
        </div>
    );
}

export default ProfilesPage;
