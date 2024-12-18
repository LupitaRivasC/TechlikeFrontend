import { useForm } from "react-hook-form";
import { useCategories } from "../context/CategoryContext";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoBagAdd } from "react-icons/io5";

function CategoryFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    createCategory,
    getCategory,
    updateCategory,
    errors: categoryErrors,
  } = useCategories();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadCategory() {
      if (params.id) {
        try {
          const category = await getCategory(params.id);
          setValue("nombre", category.nombre);
        } catch (error) {
          console.error("Error al cargar la categoría:", error);
        }
        console.log("hola")

      }
    }
    loadCategory();
  }, [params.id, getCategory, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        await updateCategory(params.id, data);
        console.log("si hay parametros")
      } else {
        await createCategory(data);
        console.log("No hay parametros")
      }
      navigate("/categories");
    } catch (error) {
      console.error("Error al enviar datos:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Algo salió mal"}`);
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 to-gray-900">
      <div className="bg-gray-800 shadow-lg max-w-lg w-full p-8 rounded-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          {params.id ? "Editar Categoría" : "Crear Categoría"}
        </h1>
        {categoryErrors?.map((error, i) => (
          <div className="text-red-500 py-2 my-2" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Nombre de la Categoría
            </label>
            <input
              type="text"
              id="nombre"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Nombre de la categoría"
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:shadow-lg transition"
            >
              <IoBagAdd size={20} />
              {params.id ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryFormPage;
