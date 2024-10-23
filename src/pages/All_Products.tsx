import { useEffect, useState } from "react";
import { FaShoppingCart, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL;

type Product = {
  id: number;
  productName: string;
  productCategory: string;
  price: number;
  totalsale: number;
  stockQuantity: number;
  description: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};

const All_Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${api_url}/api/products/getall`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-800 font-medium rounded-md hover:bg-gray-700 transition duration-300 ease-in-out flex items-center space-x-2"
      >
        <IoMdArrowRoundBack className="text-lg" />
        <span>Go Back</span>
      </button>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className=" border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
          >
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.productName}
              </h2>
              <p className="text-gray-500 text-sm mb-2">{product.productCategory}</p>
              <p className="text-gray-900 font-bold text-lg mb-2">{product.price}</p>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <div className="flex items-center mb-4">
                <FaShoppingCart className="text-gray-400 mr-2" />
                <p className="text-gray-500 text-sm">Sold: {product.totalsale}</p>
              </div>
              <button
                className={`w-full py-2 font-semibold rounded ${
                  product.isAvailable
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } flex items-center justify-center text-base`}
                disabled={!product.isAvailable}
              >
                {product.isAvailable ? (
                  <>
                    <FaRegCheckCircle className="mr-2" />
                    Available
                  </>
                ) : (
                  <>
                    <FaRegTimesCircle className="mr-2" />
                    Out of Stock
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All_Products;
