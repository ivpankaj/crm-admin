import React, { useState } from 'react';

const api_url = import.meta.env.VITE_API_URL;

interface FormData {
  name: string;
  email: string;
  contactNumber: string;
  jobTitle: string;
  department: string;
  hireDate: string;
  salary: string;
  address: string;
  password: string;
  counselorId: string;
  usertype_name: string;
}

const CreateCounselor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contactNumber: '',
    jobTitle: '',
    department: '',
    hireDate: '',
    salary: '',
    address: '',
    password: '',
    counselorId: '',
    usertype_name: 'counselor',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api_url}/api/counselor/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage);
        console.log(errorMessage);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Counselor created:', data);
      alert('Created');
      // Handle successful response (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error creating counselor:', error);
      // Handle error (e.g., show an error message)
      alert('Error creating');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Counselor</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type={key === 'hireDate' ? 'date' : key === 'salary' ? 'number' : key === 'password' ? 'password' : 'text'}
              name={key}
              value={formData[key as keyof FormData]}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Create Counselor
        </button>
      </form>
    </div>
  );
};

export default CreateCounselor;
