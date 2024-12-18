import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  createProfileRequest,
  getProfilesRequest,
  deleteProfileRequest,
  getProfileRequest,
  updateProfileRequest,
} from "../api/perfil.js";

const ProfilesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProfiles = () => {
  const context = useContext(ProfilesContext);
  if (!context) {
    throw new Error("useProfiles debe estar definido en un contexto");
  }
  return context;
};

// Cambio de nombre a 'ProfileProvider'
export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [errors, setErrors] = useState([]); // Para manejar errores

  const createProfile = async (profile) => {
    try {
      await createProfileRequest(profile);
      getProfiles();
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error);
    }
  };

  const getProfiles = async () => {
    try {
      const res = await getProfilesRequest();
      setProfiles(res.data);
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error);
    }
  };

  const deleteProfile = async (id) => {
    try {
      const res = await deleteProfileRequest(id);
      if (res.status === 200) {
        setProfiles(profiles.filter(profile => profile._id !== id));
      }
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error);
    }
  };

  const getProfile = async (id) => {
    try {
      const res = await getProfileRequest(id); // Se pasa 'id' como parámetro
      return res.data;
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error);
    }
  };

  const updateProfile = async (id, profile) => {
    try {
      const res = await updateProfileRequest(id, profile); // Corregido para incluir parámetros
      console.log(res);
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        createProfile,
        getProfiles,
        deleteProfile,
        getProfile,
        updateProfile,
        errors,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
}

// Corrección del uso de propTypes
ProfileProvider.propTypes = {
  children: PropTypes.any,
};
