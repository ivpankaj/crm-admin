// src/components/CreateUserType.tsx
import React, { useState } from 'react';
import axios from 'axios';

const userTypes = [
    { id: 1, name: 'sales_man' },
    { id: 2, name: 'counselor' },
    { id: 3, name: 'team_lead' },
    { id: 4, name: 'hr' },
    { id: 5, name: 'accountant' },
];

const CreateUserType: React.FC = () => {
    const api_url = import.meta.env.VITE_API_URL;
    const [selectedUserType, setSelectedUserType] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post(`${api_url}/usertype/create`, {
                usertype_name: selectedUserType,
            });
            if(response.data.data.usertype_name)
            setSuccessMessage(`User type '${response.data.data.usertype_name}' created successfully!`);
            else
            alert(response.data.message)
            setSelectedUserType(''); // Clear the selection
        } catch (error :any) {
            // Check if error has a response from the server
            if (error.response) {
              // Handle specific status codes
              switch (error.response.status) {
                case 400:
                  setError(error.response.data.message || 'Bad Request');
                  break;
                case 500:
                  setError('Internal Server Error: Failed to create user type');
                  break;
                // Add more cases as needed
                default:
                  setError('An unexpected error occurred');
              }
            } else {
              // Handle network errors or other unexpected issues
              setError('Network Error: Please try again later');
            }
            console.error(error);
          } finally {
            setLoading(false);
          }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Create User Type</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usertype_name">
                        Select User Type
                    </label> 
                    <select
                        id="usertype_name"
                        value={selectedUserType}
                        onChange={(e) => setSelectedUserType(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="" disabled>Select a user type</option>
                        {userTypes.map((type) => (
                            <option key={type.id} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create User Type'}
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
    );
};

export default CreateUserType;
