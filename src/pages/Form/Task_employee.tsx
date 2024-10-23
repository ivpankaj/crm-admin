import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the back icon
import { useNavigate } from 'react-router-dom'; // For navigating to the previous page

const api_url = import.meta.env.VITE_API_URL;

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('High'); // Changed to match correct priorities
  const [dueDate, setDueDate] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employees, setEmployees] = useState<{ id: string; name: string }[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${api_url}/api/employee/getAll`);
        if (response.ok) {
          const data = await response.json();
          setEmployees(data); // Assuming your API returns an array of employees with `id` and `name`
        } else {
          console.error('Failed to fetch employees');
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      taskName,
      description,
      priority,
      dueDate,
      employeeId,
    };

    try {
      const response = await fetch(`${api_url}/api/tasks/employee/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        alert('Task created successfully!');
        // Reset form
        setTaskName('');
        setDescription('');
        setPriority('High');
        setDueDate('');
        setEmployeeId('');
      } else {
        alert('Error creating task.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating task.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        {/* Back button */}
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => navigate(-1)} // Navigate to the previous page
        >
          <FaArrowLeft className="text-2xl" />
        </button>
        <h2 className="text-2xl font-bold ml-4">Create Task</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-black"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-black"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Employee</label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-black"
            required
          >
            <option value="" disabled>Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.employeeId} value={employee.employeeId}>
                {employee.employeeId}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
