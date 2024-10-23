import React, { useState } from "react";

const api_url = import.meta.env.VITE_API_URL;

interface FormData {
  productName: string;
  productCategory: string;
  salesAmount: string;
  salesDate: string;
  quantitySold: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  isCompleted: boolean;
  comments: string;
  productId: number; // Assuming productId is a fixed value or fetched dynamically
}

const CreateSalesForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    productCategory: "",
    salesAmount: "",
    salesDate: "",
    quantitySold: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    isCompleted: false,
    comments: "",
    productId: 1, // Assuming productId is a fixed value or fetched dynamically
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
  
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement; // Type assertion for checkbox
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      const { value } = e.target as HTMLInputElement | HTMLTextAreaElement; // Type assertion for text inputs
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api_url}/api/sales/create/633`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Sale created successfully!");
      } else {
        alert("Error creating sale.");
      }
    } catch (error) {
      alert("Network error creating sale.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-xl w-full"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Create a Sale</h2>

        {/* Input fields for the form data */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">Product Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            id="productName"
            name="productName"
            type="text"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCategory">Product Category</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            id="productCategory"
            name="productCategory"
            type="text"
            placeholder="Product Category"
            value={formData.productCategory}
            onChange={handleChange}
            required
          />
        </div>

        {/* More input fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salesAmount">Sales Amount</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            id="salesAmount"
            name="salesAmount"
            type="number"
            placeholder="Sales Amount"
            value={formData.salesAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salesDate">Sales Date</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            id="salesDate"
            name="salesDate"
            type="date"
            value={formData.salesDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantitySold">Quantity Sold</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            id="quantitySold"
            name="quantitySold"
            type="number"
            value={formData.quantitySold}
            onChange={handleChange}
            required
          />
        </div>

        {/* Customer information */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">Customer Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            id="customerName"
            name="customerName"
            type="text"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerEmail">Customer Email</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            id="customerEmail"
            name="customerEmail"
            type="email"
            placeholder="Customer Email"
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerPhone">Customer Phone</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            id="customerPhone"
            name="customerPhone"
            type="tel"
            placeholder="Customer Phone"
            value={formData.customerPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">Comments</label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            id="comments"
            name="comments"
            placeholder="Add any comments"
            value={formData.comments}
            onChange={handleChange}
            required
          />
        </div>

        {/* Checkbox for completion status */}
        <div className="mb-4 flex items-center">
          <input
            className="mr-2 leading-tight"
            id="isCompleted"
            name="isCompleted"
            type="checkbox"
            checked={formData.isCompleted}
            onChange={handleChange}
          />
          <label className="block text-gray-700 text-sm font-bold" htmlFor="isCompleted">Is Completed?</label>
        </div>

        {/* Product ID */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productId">Product ID</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-black"
            id="productId"
            name="productId"
            type="number"
            value={formData.productId}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-black"
            type="submit"
          >
            Create Sale
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSalesForm;
