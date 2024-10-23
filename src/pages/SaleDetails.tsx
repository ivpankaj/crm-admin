import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTag, FaUser, FaEnvelope, FaPhone, FaCalendar } from 'react-icons/fa';

const api_url = import.meta.env.VITE_API_URL;
const SaleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [saleDetails, setSaleDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await fetch(`${api_url}/api/sales/get/${id}`);
        if (response.ok) {
          const data = await response.json();
          setSaleDetails(data);
        } else {
          console.error('Failed to fetch sale details');
        }
      } catch (error) {
        console.error('Error fetching sale details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return <p className="text-center text-gray-400">Loading sale details...</p>;
  }

  if (!saleDetails) {
    return <p className="text-center text-red-500">No sale details found.</p>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex flex-col items-center ">
      <button onClick={handleGoBack} className="self-start mb-4 text-gray-300 hover: flex items-center">
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <h2 className="text-3xl font-semibold mb-6 text-center">Sale Details</h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h3 className="text-lg font-bold mb-2"><FaTag className="inline mr-2" /> Product: {saleDetails.productName}</h3>
        <p className="mb-2"><strong><FaTag className="inline mr-2" /> Product Category:</strong> {saleDetails.productCategory}</p>
        <p className="mb-2"><strong><FaTag className="inline mr-2" /> Sales Amount:</strong> ${saleDetails.salesAmount.toFixed(2)}</p>
        <p className="mb-2"><strong><FaTag className="inline mr-2" /> Quantity Sold:</strong> {saleDetails.quantitySold}</p>
        <p className="mb-2"><strong><FaTag className="inline mr-2" /> Product ID:</strong> {saleDetails.productId}</p>
        <p className="mb-2"><strong><FaUser className="inline mr-2" /> Customer Name:</strong> {saleDetails.customerName}</p>
        <p className="mb-2"><strong><FaEnvelope className="inline mr-2" /> Customer Email:</strong> {saleDetails.customerEmail}</p>
        <p className="mb-2"><strong><FaPhone className="inline mr-2" /> Customer Phone:</strong> {saleDetails.customerPhone}</p>
        <p className="mb-2"><strong>Comments:</strong> {saleDetails.comments}</p>
        <p className="mb-2"><strong>Sales Person ID:</strong> {saleDetails.sales_personId}</p>
        <p className="mb-2"><strong><FaCalendar className="inline mr-2" /> Created At:</strong> {new Date(saleDetails?.createdAt)?.toLocaleString()}</p>
        <p><strong><FaCalendar className="inline mr-2" /> Updated At:</strong> {new Date(saleDetails?.updatedAt)?.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default SaleDetails;
