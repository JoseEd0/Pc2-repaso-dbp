import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, deleteProduct } from "../api";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId as string);
        setProduct(data as Product);
        console.log("Producto obtenido exitosamente");
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar el producto?")) {
      try {
        await deleteProduct(productId as string);
        console.log("Producto eliminado exitosamente");
        navigate("/productos");
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p>{product.description}</p>
      <p className="text-green-500 font-bold">${product.price}</p>
      <p>Cantidad: {product.quantity}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => navigate(`/edit/${product.id}`)}
          className="bg-yellow-500 text-white p-2 rounded"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
