import { FaUsers, FaUserPlus, FaTasks, FaList } from 'react-icons/fa'; // Importing icons
import { Link } from 'react-router-dom';

const Sales_person = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Available Sales Persons Card */}
        <Link to='/dashboard/allsales_person'>
          <div className="bg-gray-200 text-gray-800 p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-2xl font-semibold">Available Sales Persons</h2>
                <p className="mt-1 text-gray-600 text-sm md:text-base">View all sales persons</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl md:text-4xl text-gray-500">→</span>
          </div>
        </Link>

        {/* Create New Sales Person Card */}
        <Link to='/dashboard/sales_personForm'>
          <div className="bg-gray-200 text-gray-800 p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaUserPlus className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-2xl font-semibold">Create New Sales Person</h2>
                <p className="mt-1 text-gray-600 text-sm md:text-base">Add a new sales person</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl md:text-4xl text-gray-500">+</span>
          </div>
        </Link>

        {/* Assign a Task Card */}
        <Link to='/dashboard/assigntask_sales_person'>
          <div className="bg-gray-200 text-gray-800 p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaTasks className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-2xl font-semibold">Assign a Task</h2>
                <p className="mt-1 text-gray-600 text-sm md:text-base">Assign tasks to sales persons</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl md:text-4xl text-gray-500">→</span>
          </div>
        </Link>

        {/* All Tasks Card */}
        <Link to='/dashboard/alltasks_sales_person'>
          <div className="bg-gray-200 text-gray-800 p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaList className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-2xl font-semibold">All Tasks</h2>
                <p className="mt-1 text-gray-600 text-sm md:text-base">View all tasks</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl md:text-4xl text-gray-500">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sales_person;
