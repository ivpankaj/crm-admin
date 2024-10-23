import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateEmployeeModal = ({ employee, onClose }) => {
  const [formData, setFormData] = useState(employee);

  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/employee/update/${employee.employeeId}`, formData);
      onClose(); // Close the modal after updating
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Update Employee</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded mb-2"
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded mb-2"
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="p-2 border rounded mb-2"
          placeholder="Contact Number"
          required
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
        <button onClick={onClose} className="mt-2 bg-gray-300 px-4 py-2 rounded">
          Close
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployeeModal;
