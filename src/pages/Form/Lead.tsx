import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const api_url = import.meta.env.VITE_API_URL;

interface FormData {
  leadId: string;
  name: string;
  email: string;
  contactNumber: string;
  status: string;
  source: string;
  budget: string;
  address: string;
  notes: string;
  sales_personId: string;
}

interface SalesPerson {
  id: string;
  name: string;
}

const CreateLeadForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    leadId: '',
    name: '',
    email: '',
    contactNumber: '',
    status: '',
    source: '',
    budget: '',
    address: '',
    notes: '',
    sales_personId: ''
  });

  const [salesPersons, setSalesPersons] = useState<SalesPerson[]>([]);

  useEffect(() => {
    const fetchSalesPersons = async () => {
      try {
        const response = await fetch(`${api_url}/api/sales_person/getall`);
        if (response.ok) {
          const data: SalesPerson[] = await response.json();
          setSalesPersons(data);
        } else {
          console.error('Failed to fetch sales persons');
        }
      } catch (error) {
        console.error('Error fetching sales persons:', error);
      }
    };

    fetchSalesPersons();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api_url}/api/leads/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Lead created successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setFormData({
          leadId: '',
          name: '',
          email: '',
          contactNumber: '',
          status: '',
          source: '',
          budget: '',
          address: '',
          notes: '',
          sales_personId: ''
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create lead',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Create New Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Lead ID */}
          <div>
            <label htmlFor="leadId" className="block text-sm font-medium text-gray-700">
              Lead ID
            </label>
            <input
              type="text"
              name="leadId"
              id="leadId"
              value={formData.leadId}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-black"
              required
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-black"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-black"
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-black"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <input
              type="text"
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-black"
              required
            />
          </div>

          {/* Source */}
          <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-700">
              Source
            </label>
            <input
              type="text"
              name="source"
              id="source"
              value={formData.source}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-black"
              required
            />
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Budget
            </label>
            <input
              type="number"
              name="budget"
              id="budget"
              value={formData.budget}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-black"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-black"
              required
            ></textarea>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              name="notes"
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-black"
            ></textarea>
          </div>

          {/* Sales Person ID Dropdown */}
          <div>
            <label htmlFor="sales_personId" className="block text-sm font-medium text-gray-700">
              Sales Person
            </label>
            <select
              name="sales_personId"
              id="sales_personId"
              value={formData.sales_personId}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select a Sales Person</option>
              {salesPersons.map((salesPerson) => (
                <option key={salesPerson.id} value={salesPerson.id}>
                  {salesPerson.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md shadow-md hover:bg-indigo-700 transition-colors"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadForm;
