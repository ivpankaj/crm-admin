import { FaUsers, FaUserPlus, FaTasks, FaList } from 'react-icons/fa'; // Importing icons
import { Link } from 'react-router-dom';

const Counselor = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Available Counselors Card */}
        <Link to='/dashboard/allcounselor'>
          <div className="bg-gray-200 text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-xl font-semibold">Available Counselors</h2>
                <p className="mt-1 text-gray-600 text-sm">View all counselors</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl md:text-4xl text-gray-500">→</span>
          </div>
        </Link>

        {/* Create New Counselor Card */}
        <Link to='/dashboard/counselorform'>
          <div className="bg-gray-200 text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaUserPlus className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-xl font-semibold">Create New Counselor</h2>
                <p className="mt-1 text-gray-600 text-sm">Add a new counselor</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl md:text-4xl text-gray-500">+</span>
          </div>
        </Link>

        {/* Assign a Task Card */}
        <Link to='/dashboard/assigntask_counselor'>
          <div className="bg-gray-200 text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaTasks className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-xl font-semibold">Assign a Task</h2>
                <p className="mt-1 text-gray-600 text-sm">Assign tasks to counselors</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl md:text-4xl text-gray-500">→</span>
          </div>
        </Link>

        {/* All Tasks Card */}
        <Link to='/dashboard/alltasks_counselor'>
          <div className="bg-gray-200 text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaList className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-xl font-semibold">All Tasks</h2>
                <p className="mt-1 text-gray-600 text-sm">View all tasks</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl md:text-4xl text-gray-500">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Counselor;
