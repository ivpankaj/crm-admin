import { FaUsers, FaUserPlus, FaTasks, FaList } from 'react-icons/fa'; // Importing icons
import { Link } from 'react-router-dom';

const Employee = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to='/dashboard/allemployee'>
          <div className="bg-gray-200 text-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-4xl" />
              <div>
                <h2 className="text-xl font-semibold">Available Employees</h2>
                <p className="mt-1 text-gray-600">View all employees</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl text-gray-500">→</span>
          </div>
        </Link>

        <Link to='/dashboard/employeeform'>
          <div className="bg-gray-200 text-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaUserPlus className="text-4xl" />
              <div>
                <h2 className="text-xl font-semibold">Create New Employee</h2>
                <p className="mt-1 text-gray-600">Add a new employee</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl text-gray-500">+</span>
          </div>
        </Link>
        
        <Link to='/dashboard/assigntask_employee'>
          <div className="bg-gray-200 text-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaTasks className="text-4xl" />
              <div>
                <h2 className="text-xl font-semibold">Assign a Task</h2>
                <p className="mt-1 text-gray-600">Assign tasks to counselors</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl text-gray-500">→</span>
          </div>
        </Link>
        
        <Link to='/dashboard/alltasks_employee'>
          <div className="bg-gray-200 text-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaList className="text-4xl" />
              <div>
                <h2 className="text-xl font-semibold">All Tasks</h2>
                <p className="mt-1 text-gray-600">View all tasks</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl text-gray-500">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Employee;
