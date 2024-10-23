import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
const api_url = import.meta.env.VITE_API_URL;
interface Sale {
  id: number;
  productName: string;
  amount: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  salesAmount: number;
  quantitySold: number;
}

const TotalSales: React.FC = () => {
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(`${api_url}/api/sales/getall`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data: Sale[] = await response.json();
          setSalesData(data);
        } else {
          console.error('Failed to fetch sales data');
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  const handleViewDetails = (id: number) => {
    navigate(`/dashboard/sales_detail/${id}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center">
      <button 
        onClick={handleGoBack} 
        className="self-start mb-4 text-gray-300 hover flex items-center"
      >
        <FiArrowLeft className="mr-2" /> Back
      </button>

      <h2 className="text-2xl font-semibold mb-6">Total Sales</h2>

      {loading ? (
        <p>Loading sales data...</p>
      ) : (
        <div className="w-full max-w-4xl bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product Name</th>
                  <th className="py-3 px-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sales Amount ($)</th>
                  <th className="py-3 px-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity Sold</th>
                  <th className="py-3 px-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer Name</th>
                  <th className="py-3 px-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer Email</th>
                  <th className="py-3 px-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer Phone</th>
                  <th className="py-3 px-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-600">
                {salesData.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-700">
                    <td className="py-4 px-2 text-sm">{sale.productName}</td>
                    <td className="py-4 px-2 text-sm">${sale.salesAmount.toFixed(2)}</td>
                    <td className="py-4 px-2 text-sm">{sale.quantitySold}</td>
                    <td className="py-4 px-2 text-sm">{sale.customerName}</td>
                    <td className="py-4 px-2 text-sm">{sale.customerEmail}</td>
                    <td className="py-4 px-2 text-sm">{sale.customerPhone}</td>
                    <td className="py-4 px-2">
                      <button
                        onClick={() => handleViewDetails(sale.id)}
                        className="text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalSales;
