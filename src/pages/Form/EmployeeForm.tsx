
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const api_url = import.meta.env.VITE_API_URL;

// const CreateEmployeeForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contactNumber: '',
//     jobTitle: '',
//     department: '',
//     hireDate: '',
//     salary: '',
//     address: '',
//     employeeId: '',
//     password: '',
//     usertype_name: '', // Default user type
//   });

//   const [userTypes, setUserTypes] = useState<{ id: number; usertype_name: string }[]>([]);

//   useEffect(() => {
//     const fetchUserTypes = async () => {
//       try {
//         const userTypeResponse = await axios.get(`/userTypes`);
//         setUserTypes(userTypeResponse.data.data);
//       } catch (error) {
//         console.error('Error fetching user types:', error);
//       }
//     };

//     fetchUserTypes();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${api_url}/employee/create`, formData);
//       if (response.status === 200) {
//         alert('Employee created successfully!');
//         // Optionally, reset the form or redirect
//       }
//     } catch (error: any) {
//       console.error('Error creating employee:', error);
//       alert('Error creating employee');
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Employee</h1>
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6">
//         {/* User Type Selection */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usertype_name">
//             User Type
//           </label>
//           <select
//             name="usertype_name"
//             value={formData.usertype_name}
//             onChange={handleChange}
//             required
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           >
//             {userTypes.map(({ id, usertype_name }) => (
//               <option key={id} value={usertype_name}>
//                 {usertype_name.charAt(0).toUpperCase() + usertype_name.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Other Form Fields */}
//         {Object.keys(formData).filter(key => key !== 'usertype_name').map((key) => (
//           <div key={key} className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
//               {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
//             </label>
//             <input
//               type={key === 'salary' ? 'number' : 'text'}
//               name={key}
//               value={formData[key as keyof typeof formData]}
//               onChange={handleChange}
//               required
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//         ))}
        
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Create Employee
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEmployeeForm;












// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const api_url = import.meta.env.VITE_API_URL;

// const CreateEmployeeForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     contactNumber: '',
//     jobTitle: '',
//     department: '',
//     hireDate: '',
//     salary: '',
//     address: '',
//     employeeId: '',
//     password: '',
//     usertype_name: '', // Default user type
//   });

//   const [userTypes, setUserTypes] = useState<{ id: number; usertype_name: string }[]>([]);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     const fetchUserTypes = async () => {
//       try {
//         const userTypeResponse = await axios.get(`${api_url}/userTypes`);
//         setUserTypes(userTypeResponse.data.data);
//       } catch (error) {
//         console.error('Error fetching user types:', error);
//       }
//     };

//     fetchUserTypes();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: '' }); // Clear errors on change
//   };

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};
//     const currentYear = new Date().getFullYear();
//     const birthDate = new Date(formData.hireDate);
    
//     // Password validation
//     if (formData.password.length < 7) {
//       newErrors.password = 'Password must be at least 7 characters long.';
//     }
    
//     // Date of birth validation (age 18 years and above)
//     if (formData.hireDate && (currentYear - birthDate.getFullYear() < 18)) {
//       newErrors.hireDate = 'Employee must be at least 18 years old.';
//     }
    
//     // User type selection validation
//     if (!formData.usertype_name) {
//       newErrors.usertype_name = 'User type must be selected.';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       return; // Stop submission if validation fails
//     }

//     try {
//       const response = await axios.post(`${api_url}/employee/create`, formData);
//       if (response.status === 200) {
//         alert('Employee created successfully!');
//         // Optionally, reset the form or redirect
//       }
//     } catch (error: any) {
//       console.error('Error creating employee:', error);
//       alert('Error creating employee');
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Employee</h1>
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6">
//         {/* User Type Selection */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usertype_name">
//             User Type
//           </label>
//           <select
//             name="usertype_name"
//             value={formData.usertype_name}
//             onChange={handleChange}
//             required
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           >
//             <option value="" disabled>Select a user type</option>
//             {userTypes.map(({ id, usertype_name }) => (
//               <option key={id} value={usertype_name}>
//                 {usertype_name.charAt(0).toUpperCase() + usertype_name.slice(1)}
//               </option>
//             ))}
//           </select>
//           {errors.usertype_name && <p className="text-red-500 text-xs italic">{errors.usertype_name}</p>}
//         </div>

//         {/* Other Form Fields */}
//         {Object.keys(formData).filter(key => key !== 'usertype_name').map((key) => (
//           <div key={key} className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
//               {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
//             </label>
//             <input
//               type={key === 'salary' ? 'number' : key === 'hireDate' ? 'date' : 'text'}
//               name={key}
//               value={formData[key as keyof typeof formData]}
//               onChange={handleChange}
//               required
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//             {errors[key] && <p className="text-red-500 text-xs italic">{errors[key]}</p>}
//           </div>
//         ))}
        
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Create Employee
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEmployeeForm;












import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_url = import.meta.env.VITE_API_URL;

const CreateEmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    jobTitle: '',
    department: '',
    hireDate: '',
    salary: '',
    address: '',
    employeeId: '',
    password: '',
    usertype_name: '', // Default user type
  });

  const [userTypes, setUserTypes] = useState<{ id: number; usertype_name: string }[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const userTypeResponse = await axios.get(`${api_url}/userTypes/getall`);
        setUserTypes(userTypeResponse.data.data);
      } catch (error) {
        console.error('Error fetching user types:', error);
      }
    };

    fetchUserTypes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear errors on change
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

      // Mobile validation
    // Mobile validation
    const mobilePattern = /^(6[6-9]\d{8}|65\d{8}|6[6-9]\d{8}|7\d{8}|8\d{8}|9\d{8})$/;
    if (mobilePattern.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Mobile number must be 10 digits long and start with 65';
    }

    

    // Password validation
    if (formData.password.length < 7) {
      newErrors.password = 'Password must be at least 7 characters long.';
    }

    // User type selection validation
    if (!formData.usertype_name) {
      newErrors.usertype_name = 'User type must be selected.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.post(`${api_url}/employee/create`, formData);
      if (response.data.status === 200) {
        alert('Employee created successfully!');
        // Optionally, reset the form or redirect
      }
    }  catch (error: any) {
      console.error('Error creating employee:', error);
    
      // Check if the error has a response and show the error message
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error creating employee: ${error.response.data.message}`);
      } else {
        alert('Error creating employee');
      }
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Employee</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6">
        {/* User Type Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usertype_name">
            User Type
          </label>
          <select
            name="usertype_name"
            value={formData.usertype_name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select a user type</option>
            {userTypes.map(({ id, usertype_name }) => (
              <option key={id} value={usertype_name}>
                {/* {usertype_name.charAt(0).toUpperCase() + usertype_name.slice(1)} */}
                {usertype_name}
              </option>
            ))}
          </select>
          {errors.usertype_name && <p className="text-red-500 text-xs italic">{errors.usertype_name}</p>}
        </div>

        {/* Other Form Fields */}
        {Object.keys(formData).filter(key => key !== 'usertype_name').map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={key === 'salary' ? 'number' : key === 'hireDate' ? 'date' : 'text'}
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors[key] && <p className="text-red-500 text-xs italic">{errors[key]}</p>}
          </div>
        ))}
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
