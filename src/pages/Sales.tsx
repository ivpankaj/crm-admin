import { Link } from "react-router-dom";

const Sales = () => {
  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Sales Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-3xl-lg p-4 shadow-xl">
          <h2 className="text-lg font-semibold mb-2">Create a Sale</h2>
       <Link to='/dashboard/create_salesform'>
       <button className="mt-2 px-4 py-2  dark:border dark:border-white border border-black rounded-3xl transition duration-300 hover:bg-gray-300">
            Create Sale
          </button></Link>
        </div>
        <div className="bg-gray-800 rounded-3xl-lg p-4 shadow-xl">
          <h2 className="text-lg font-semibold mb-2">View All Sales</h2>
        <Link to='/dashboard/totalsales'>
        <button className="mt-2 px-4 py-2  dark:border dark:border-white border border-black rounded-3xl transition duration-300 hover:bg-gray-300">
            View All Sales
          </button></Link>
        </div>
        <div className="bg-gray-800 rounded-3xl-lg p-4 shadow-xl">
          <h2 className="text-lg font-semibold mb-2">View Total Sales</h2>
          <button className="mt-2 px-4 py-2  dark:border dark:border-white border border-black rounded-3xl transition duration-300 hover:bg-gray-300">
            View Total Sales
          </button>
        </div>
        <div className="bg-gray-800 rounded-3xl-lg p-4 shadow-xl">
          <h2 className="text-lg font-semibold mb-2">Create a Lead</h2>
         <Link to='/dashboard/create_leadform'>
         <button className="mt-2 px-4 py-2  dark:border dark:border-white border border-black rounded-3xl transition duration-300 hover:bg-gray-300">
            Create Lead
          </button></Link>
        </div>
        <div className="bg-gray-800 rounded-3xl-lg p-4 shadow-xl">
          <h2 className="text-lg font-semibold mb-2">View All Leads</h2>
       <Link to='/dashboard/allead'>   <button className="mt-2 px-4 py-2  dark:border dark:border-white border border-black rounded-3xl transition duration-300 hover:bg-gray-300">
            View All Leads
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default Sales;
