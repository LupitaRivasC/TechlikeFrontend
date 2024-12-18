import { useForm, Controller } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import uploadIcon from "../assets/addphoto.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoBagAdd, IoCloseSharp } from "react-icons/io5";
import { Tooltip } from "@material-tailwind/react";
import { useCategories } from "../context/CategoryContext";

function ProductsFormPage() {
  const server = import.meta.env.VITE_BASE_URL+"/img/";
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: 0.0,
      description: "",
      image: uploadIcon,
    },
  });
  const { categories, getCategories } = useCategories();
  const { createProduct, getProduct, updateProduct, errors: productErrors } = useProducts();
  const [selectedImage, setSelectedImage] = useState(uploadIcon);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const inputImage = useRef(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        try {
          const product = await getProduct(params.id);
          setValue("name", product.name);
          setValue("price", product.price);
          setValue("description", product.description);
          setValue("origin", product.origin);
          setValue("category", product.category);
          setValue("quantity", product.quantity);

          if (product.imageUrl) {
            setExistingImageUrl(product.imageUrl);
            setSelectedImage(server + product.imageUrl);
          }
        } catch (error) {
          console.error("Error al cargar el producto:", error);
        }
      }
    }
    loadProduct();
  }, [params.id, getProduct, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("origin", data.origin);
      formData.append("category", data.category);
      formData.append("quantity", data.quantity);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      } else if (existingImageUrl && data.image === uploadIcon) {
        formData.append("existingImage", existingImageUrl); // Enviar la URL de la imagen existente
      }

      if (params.id) {
        await updateProduct(params.id, formData);
      } else {
        await createProduct(formData);
      }
      navigate("/products");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Formulario de Producto</h1>
        {productErrors?.map((error, i) => (
          <div className="text-red-500 py-2" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nombre del producto"
              {...register("name", { required: true })}
            />
            {errors.name && <div className="text-red-500 text-sm mt-1">El nombre es requerido</div>}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              step="0.10"
              id="price"
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Precio del producto"
              {...register("price", { required: true, min: 0.0, valueAsNumber: true })}
            />
            {errors.price && <div className="text-red-500 text-sm mt-1">El precio es requerido</div>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <input
              type="text"
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descripción del producto"
              {...register("description", { required: true })}
            />
            {errors.description && <div className="text-red-500 text-sm mt-1">La descripción es requerida</div>}
          </div>

          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
              Origen
            </label>
            <input
              type="text"
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Origen del producto"
              {...register("origin", { required: true })}
            />
            {errors.origin && <div className="text-red-500 text-sm mt-1">El origen es requerido</div>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("category", { required: true })}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(({ _id, nombre }) => (
                <option value={_id} key={_id}>
                  {nombre}
                </option>
              ))}
            </select>
            {errors.category && <div className="text-red-500 text-sm mt-1">La categoría es requerida</div>}
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Cantidad
            </label>
            <input
              type="number"
              className="w-full mt-1 bg-gray-50 border border-gray-300 text-gray-900 
              rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Cantidad del producto"
              {...register("quantity", { required: true })}
            />
            {errors.quantity && <div className="text-red-500 text-sm mt-1">La cantidad es requerida</div>}
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
                <IoBagAdd size={24} />
              </button>
            </Tooltip>

            <Tooltip content="Cancelar" placeholder="bottom-end">
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md"
                onClick={() => navigate("/product")}
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

export default ProductsFormPage;
