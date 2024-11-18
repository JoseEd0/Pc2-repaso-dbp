import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const AllProductos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 10; // Número de productos por página
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(skip, limit);
        setProducts(data as Product[]);
        console.log("Productos obtenidos exitosamente");
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, [skip]);

  const handleNext = () => {
    setSkip(skip + limit);
  };

  const handlePrevious = () => {
    if (skip >= limit) {
      setSkip(skip - limit);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Todos los Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded cursor-pointer"
            onClick={() => navigate(`/productos/${product.id}`)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-green-500 font-bold">${product.price}</p>
            <p>Cantidad: {product.quantity}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={skip === 0}
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AllProductos;
