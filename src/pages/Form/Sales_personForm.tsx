import axios from 'axios';
import React, { useState } from 'react';
const api_url = import.meta.env.VITE_API_URL;
interface SalesPersonFormData {
  name: string;
  email: string;
  contactNumber: string;
  jobTitle: string;
  department: string;
  hireDate: string;
  salary: string;
  address: string;
  password: string;
  sales_personId: string;
  usertype_name: string;
}

const SalesPersonForm: React.FC = () => {
  const [formData, setFormData] = useState<SalesPersonFormData>({
    name: '',
    email: '',
    contactNumber: '',
    jobTitle: '',
    department: '',
    hireDate: '',
    salary: '',
    address: '',
    password: '',
    sales_personId: '',
    usertype_name: 'sales_person',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'contactNumber' || name === 'salary' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${api_url}/sales_person/create`,formData);

      if (response.data) {
        console.log('Salesperson created successfully!');
        // Handle success caseale
        alert('Salesperson created successfully!');
      } else {
        console.error('Error creating salesperson');
      }
    } catch (error:any) {
      console.error('Error:', error);
     
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Salesperson</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Contact Number', name: 'contactNumber', type: 'number' },
          { label: 'Job Title', name: 'jobTitle', type: 'text' },
          { label: 'Department', name: 'department', type: 'text' },
          { label: 'Hire Date', name: 'hireDate', type: 'text' },
          { label: 'Salary', name: 'salary', type: 'number' },
          { label: 'Address', name: 'address', type: 'text' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Salesperson ID', name: 'sales_personId', type: 'text' },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1" htmlFor={name}>
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        ))}

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Create Salesperson
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalesPersonForm;
