import axios from './axios';

// Llamada al API para obtener todos los perfiles
export const getProfilesRequest = () => axios.get('/profiles');

// Llamada al API para obtener un perfil por ID
export const getProfileRequest = (id) => axios.get('/profiles/' + id);

// Llamada al API para agregar un perfil
export const createProfileRequest = (profile) =>
  axios.post('/profiles', profile, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// Llamada al API para eliminar un perfil
export const deleteProfileRequest = (id) => axios.delete('/profiles/' + id);

// Llamada al API para editar un perfil
export const updateProfileRequest = (id, profile) => axios.put('/profiles/' + id, profile);
