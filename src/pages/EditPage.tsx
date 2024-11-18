import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../api";
import { useForm } from "react-hook-form";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const EditPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = (await getProductById(productId as string)) as Product;
        setProduct(data);
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("price", data.price);
        setValue("quantity", data.quantity);
        setValue("imageUrl", data.imageUrl);
        console.log("Producto obtenido exitosamente");
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
    };

    fetchProduct();
  }, [productId, setValue]);

  const onSubmit = async (data: Product) => {
    try {
      await updateProduct(productId as string, data);
      console.log("Producto actualizado exitosamente");
      navigate(`/productos/${productId}`);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Nombre</label>
          <input
            {...register("name", { required: "El nombre es requerido" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block">Descripción</label>
          <textarea
            {...register("description", {
              required: "La descripción es requerida",
            })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label className="block">Precio</label>
          <input
            type="number"
            {...register("price", { required: "El precio es requerido" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block">Cantidad</label>
          <input
            type="number"
            {...register("quantity", { required: "La cantidad es requerida" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.quantity && (
            <p className="text-red-500">{errors.quantity.message}</p>
          )}
        </div>
        <div>
          <label className="block">URL de la Imagen</label>
          <input
            {...register("imageUrl", {
              required: "La URL de la imagen es requerida",
            })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditPage;
