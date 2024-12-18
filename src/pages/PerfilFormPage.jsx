import { useForm, Controller } from "react-hook-form";
import { useProfiles } from "../context/PerfilContext"; // Contexto para perfiles
import uploadIcon from "../assets/addphoto.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoPersonAdd, IoCloseSharp } from "react-icons/io5";
import { Tooltip } from "@material-tailwind/react";

function ProfileFormPage() {
  const server = "http://localhost:4000/public/img/";
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      state: "",
      gender: "",
      age: 0,
      address: "",
      image: uploadIcon,
    },
  });

  const { createProfile, getProfile, updateProfile, errors: profileErrors } = useProfiles(); // Funciones para gestionar perfiles
  const [selectedImage, setSelectedImage] = useState(uploadIcon);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const inputImage = useRef(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      async function loadProfile() {
        try {
          const profile = await getProfile(params.id);
          setValue("fullName", profile.fullName);
          setValue("email", profile.email);
          setValue("state", profile.state);
          setValue("gender", profile.gender);
          setValue("age", profile.age);
          setValue("address", profile.address);
          if (profile.image) {
            setExistingImageUrl(profile.image);
            setSelectedImage(server + profile.image);
          }
        } catch (error) {
          console.error("Error al cargar el perfil:", error);
        }
      }
      loadProfile();
    }
  }, [params.id, getProfile, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("state", data.state);
      formData.append("gender", data.gender);
      formData.append("age", data.age);
      formData.append("address", data.address);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      } else if (existingImageUrl && data.image === uploadIcon) {
        formData.append("existingImage", existingImageUrl); // Enviar la URL de la imagen existente
      }
      console.log(formData)
      console.log(data)

      if (params.id) {
        await updateProfile(params.id, formData);
      } else {
        await createProfile(formData);
      }
      //navigate("/profiles"); // Redirige a la página de perfiles
    } catch (error) {
      console.error("Error al enviar datos:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Algo salió mal"}`);
    }
  });

  const handleImageClick = () => {
    inputImage.current.click();
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      field.onChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-600">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Formulario de Perfil</h1>
        {profileErrors?.map((error, i) => (
          <div className="text-red-500 py-2" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nombre completo"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && <div className="text-red-500 text-sm mt-1">El nombre completo es requerido</div>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Correo electrónico"
              {...register("email", { required: true })}
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">El correo electrónico es requerido</div>}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <input
              type="text"
              id="state"
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Estado"
              {...register("state", { required: true })}
            />
            {errors.state && <div className="text-red-500 text-sm mt-1">El estado es requerido</div>}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <select
              id="gender"
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("gender", { required: true })}
            >
              <option value="">Selecciona un género</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMENINO">Femenino</option>
              <option value="OTROS">Otros</option>
            </select>
            {errors.gender && <div className="text-red-500 text-sm mt-1">El género es requerido</div>}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Edad
            </label>
            <input
              type="number"
              id="age"
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Edad"
              {...register("age", { required: true, min: 0 })}
            />
            {errors.age && <div className="text-red-500 text-sm mt-1">La edad es requerida</div>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Dirección"
              {...register("address", { required: true })}
            />
            {errors.address && <div className="text-red-500 text-sm mt-1">La dirección es requerida</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Imagen</label>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Imagen seleccionada"
                className="mt-2 w-40 h-40 object-cover cursor-pointer"
                onClick={handleImageClick}
              />
            )}
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  ref={inputImage}
                  onChange={(e) => handleImageChange(e, field)}
                  className="hidden"
                />
              )}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <Tooltip content="Aceptar" placement="bottom-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                <IoPersonAdd size={24} />
              </button>
            </Tooltip>

            <Tooltip content="Cancelar" placement="bottom-end">
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md"
                onClick={() => navigate("/profiles")}
              >
                <IoCloseSharp size={24} />
              </button>
            </Tooltip>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileFormPage;
