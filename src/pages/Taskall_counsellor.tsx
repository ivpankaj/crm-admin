// src/components/TasksPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const api_url = import.meta.env.VITE_API_URL;
interface Task {
    id: number;
    taskName: string;
    description: string;
    priority: string;
    dueDate: string;
    counselorId: string;
    createdAt: string;
    updatedAt: string;
}

const Taskall_employee: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${api_url}/api/tasks/counselor/getall`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError('Failed to load tasks.');
            }
        };

        fetchTasks();
    }, []);
const navigate = useNavigate();
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Counselor Tasks</h1>
            <button 
                onClick={() => navigate(-1)} // Navigate back
                className="mb-4 p-2  text-white rounded hover:bg-blue-600"
            >
                Back
            </button>
            {error ? (
                <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
                    {error}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <div key={task.id} className="dark:border dark:border-white border border-black p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">{task.taskName}</h2>
                            <p className="text-gray-700 mb-2">{task.description}</p>
                            <p className="text-gray-500 mb-2">
                                Priority: <span className="font-medium">{task.priority}</span>
                            </p>
                            <p className="text-gray-500 mb-2">
                                EmployeeID: <span className="font-medium">{task.counselorId}</span>
                            </p>
                            <p className="text-gray-500 mb-4">
                                Due Date: <span className="font-medium">{task.dueDate}</span>
                            </p>
                            <div className="text-gray-400 text-sm">
                                Created At: {new Date(task.createdAt).toLocaleDateString()}<br />
                                Updated At: {new Date(task.updatedAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Taskall_employee;
