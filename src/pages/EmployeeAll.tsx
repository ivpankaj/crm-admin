// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaUserTie, FaEnvelope } from "react-icons/fa";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// const api_url = import.meta.env.VITE_API_URL;

// type Counselor = {
//   employeeId: number;
//   name: string;
//   email: string;
// };

// type ProfilePics = {
//   [key: number]: string;
// };

// const EmployeeAll = () => {
//   const [alldata, setData] = useState<Counselor[]>([]);
//   const [profilePics, setProfilePics] = useState<ProfilePics>({});
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`/employee/getAll`,);
//         if (response.data) {
//           const data: Counselor[] =  response.data;
//           setData(data);
//           await fetchProfilePictures(data);
//         } else {
//           console.error("Failed to fetch counselor data");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const fetchProfilePictures = async (counselors: Counselor[]) => {
//     try {
//       const profilePicPromises = counselors.map(async (counselor) => {
//         const response = await axios.get(`/employee/get/profilepic/${counselor.employeeId}`);
//         if (response.data) {
//           const { profilePicture } = await response.data;
//           return {
//             employeeId: counselor.employeeId,
//             profilePicture: `${api_url}${profilePicture}`,
//           };
//         } else {
//           console.error(
//             `Failed to fetch profile picture for counselor ${counselor.employeeId}`
//           );
//           return { employeeId: counselor.employeeId, profilePicture: "" };
//         }
//       });

//       const results = await Promise.all(profilePicPromises);
//       const newProfilePics: ProfilePics = results.reduce(
//         (acc, { employeeId, profilePicture }) => {
//           acc[employeeId] = profilePicture;
//           return acc;
//         },
//         {} as ProfilePics
//       );

//       setProfilePics(newProfilePics);
//     } catch (error) {
//       console.error("Error fetching profile pictures:", error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-900 transition-all duration-300 flex items-center"
//       >
//         <IoMdArrowRoundBack className="mr-2" /> Back
//       </button>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-600"></div>
//         </div>
//       ) : alldata.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
//           {alldata.map((counselor) => (
//          <div
//          key={counselor.employeeId}
//          className="shadow-md rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-lg dark:border dark:border-white border border-black flex flex-col justify-between h-full"
//        >
//          <div className="flex flex-col items-center p-4">
//            {profilePics[counselor.employeeId] ? (
//              <img
//                src={profilePics[counselor.employeeId]}
//                alt={`${counselor.name}'s profile`}
//                className="w-20 h-20 rounded-full object-cover mb-4"
//              />
//            ) : (
//              <FaUserTie className="text-8xl text-gray-400" />
//            )}
       
//            <h3 className="text-xl font-semibold text-gray-900">
//              {counselor.name}
//            </h3>
//            <p className="text-sm text-gray-500 mb-4">{counselor.employeeId}</p>
//          </div>
       
//          <div className="p-2 mt-auto">
//            <button
//              onClick={() =>
//                navigate(`/dashboard/employeeprofile/${counselor.employeeId}`)
//              }
//              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-black hover:text-white transition-all duration-300 w-full"
//            >
//              View Details
//            </button>
//          </div>
//        </div>
       
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No counselors found.</p>
//       )}
//     </div>
//   );
// };

// export default EmployeeAll;




// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaUserTie } from "react-icons/fa";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import EmployeeModal from './EmployeeModal'; // Modal for viewing employee details
// import UpdateEmployeeModal from './EmployeeUpdate'; // Modal for updating employee

// const api_url = import.meta.env.VITE_API_URL;

// type Counselor = {
//   employeeId: number;
//   name: string;
//   email: string;
//   contactNumber: string;
//   usertype_name: string;
// };

// const EmployeeAll = () => {
//   const [alldata, setData] = useState<Counselor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [updateModalOpen, setUpdateModalOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState<Counselor | null>(null);
//   const [filter, setFilter] = useState({ usertype_name: '', search: '' });
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, [filter]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`/employee/getAll`, { params: filter });
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewDetails = (employee: Counselor) => {
//     setSelectedEmployee(employee);
//     setViewModalOpen(true);
//   };

//   const handleUpdateEmployee = (employee: Counselor) => {
//     setSelectedEmployee(employee);
//     setUpdateModalOpen(true);
//   };

//   const handleDeleteEmployee = async (employeeId: number) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       try {
//         await axios.delete(`/employee/delete/${employeeId}`);
//         fetchData(); // Refresh the list after deletion
//       } catch (error) {
//         console.error("Error deleting employee:", error);
//       }
//     }
//   };







//   const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(null);

//   const handleOpenModal = (index) => {
//     setSelectedEmployeeIndex(index);
//   };

//   const handleCloseModal = () => {
//     setSelectedEmployeeIndex(null);
//   };

//   const handleNext = () => {
//     setSelectedEmployeeIndex((prev) =>
//       prev === null || prev + 1 >= employees.length ? prev : prev + 1
//     );
//   };

//   const handlePrev = () => {
//     setSelectedEmployeeIndex((prev) =>
//       prev === null || prev - 1 < 0 ? prev : prev - 1
//     );
//   };


//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="mb-4 flex space-x-4">
//         <input
//           type="text"
//           placeholder="Search by name, email, or phone"
//           value={filter.search}
//           onChange={(e) => setFilter({ ...filter, search: e.target.value })}
//           className="p-2 border rounded"
//         />
//         <select
//           value={filter.usertype_name}
//           onChange={(e) => setFilter({ ...filter, usertype_name: e.target.value })}
//           className="p-2 border rounded"
//         >
//           <option value="">All User Types</option>
//           <option value="sales_man">Sales Man</option>
//           <option value="team_lead">Team Lead</option>
//           <option value="counselor">Counselor</option>
//         </select>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-600"></div>
//         </div>
//       ) : alldata.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {alldata.map((counselor) => (
//             <div
//               key={counselor.employeeId}
//               className="shadow-md rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-lg dark:border dark:border-white border border-black flex flex-col justify-between h-full"
//             >
//               <div className="flex flex-col items-center p-4">
//                 <FaUserTie className="text-8xl text-gray-400" />
//                 <h3 className="text-xl font-semibold text-gray-900">{counselor.name}</h3>
//                 <p className="text-sm text-gray-500 mb-4">{counselor.employeeId}</p>
//               </div>
//               <div className="p-2 mt-auto flex justify-around">
//                 <button
//                   onClick={() => handleViewDetails(counselor)}
//                   className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-black hover:text-white transition-all duration-300"
//                 >
//                   View Details
//                 </button>
//                 <button
//                   onClick={() => handleUpdateEmployee(counselor)}
//                   className="px-4 py-2 rounded-lg bg-blue-200 hover:bg-blue-500 hover:text-white transition-all duration-300"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => handleDeleteEmployee(counselor.employeeId)}
//                   className="px-4 py-2 rounded-lg bg-red-200 hover:bg-red-500 hover:text-white transition-all duration-300"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No counselors found.</p>
//       )}

//       {/* {viewModalOpen && (
//         <EmployeeModal employee={selectedEmployee} onClose={() => setViewModalOpen(false)} />
//       )} */}


//         {/* Employee Modal */}
//         { viewModalOpen && selectedEmployeeIndex !== null && (
//         <EmployeeModal
//           employee={employees[selectedEmployeeIndex]}
//           onClose={handleCloseModal}
//           onNext={handleNext}
//           onPrev={handlePrev}
//         />
//       )}

//       {updateModalOpen && (
//         <UpdateEmployeeModal employee={selectedEmployee} onClose={() => setUpdateModalOpen(false)} />
//       )}
//     </div>
//   );
// };

// export default EmployeeAll;





















import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaSearch, FaTrashAlt, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EmployeeModal from './EmployeeModal'; // Modal for viewing employee details
import UpdateEmployeeModal from './EmployeeUpdate'; // Modal for updating employee

const api_url = import.meta.env.VITE_API_URL;

type Counselor = {
  employeeId: number;
  name: string;
  email: string;
  contactNumber: string;
  usertype_name: string;
};

const EmployeeAll = () => {
  const [alldata, setData] = useState<Counselor[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Counselor | null>(null);
  const [filter, setFilter] = useState({ usertype_name: '', search: '' });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/employee/getAll`, { params: filter });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally handle the error for user feedback
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (employee: Counselor) => {
    setSelectedEmployee(employee);
    setViewModalOpen(true);
  };

  const handleUpdateEmployee = (employee: Counselor) => {
    setSelectedEmployee(employee);
    setUpdateModalOpen(true);
  };

  const handleDeleteEmployee = async (employeeId: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`/employee/delete/${employeeId}`);
        fetchData(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting employee:", error);
        // Optionally handle the error for user feedback
      }
    }
  };

  // Function to handle viewing next employee
  const handleNextEmployee = () => {
    if (selectedEmployee) {
      const currentIndex = alldata.findIndex(emp => emp.employeeId === selectedEmployee.employeeId);
      const nextIndex = (currentIndex + 1) % alldata.length; // Loop back to the start
      setSelectedEmployee(alldata[nextIndex]);
    }
  };

  // Function to handle viewing previous employee
  const handlePreviousEmployee = () => {
    if (selectedEmployee) {
      const currentIndex = alldata.findIndex(emp => emp.employeeId === selectedEmployee.employeeId);
      const previousIndex = (currentIndex - 1 + alldata.length) % alldata.length; // Loop back to the end
      setSelectedEmployee(alldata[previousIndex]);
    }
  };

  return (
    
<div className="p-6 max-w-7xl mx-auto">
  <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
    <div className="relative w-full md:w-auto">
      <input
        type="text"
        placeholder="Search by name, email, or phone"
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        className="p-2 border rounded pl-10 w-full" // Added w-full for full width on small screens
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
    <select
      value={filter.usertype_name}
      onChange={(e) => setFilter({ ...filter, usertype_name: e.target.value })}
      className="p-2 border rounded mt-2 md:mt-0 md:w-auto" // Added mt-2 for spacing on small screens
    >
      <option value="">All User Types</option>
      <option value="sales_man">Sales Man</option>
      <option value="team_lead">Team Lead</option>
      <option value="counselor">Counselor</option>
    </select>
  </div>

  {loading ? (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-600"></div>
    </div>
  ) : alldata.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {alldata.map((counselor) => (
        <div
          key={counselor.employeeId}
          className="shadow-md rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-lg border border-black flex flex-col justify-between h-full"
        >
          <div className="flex flex-col items-center p-4">
            <FaUserTie className="text-8xl text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900">{counselor.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{counselor.employeeId}</p>
          </div>
          <div className="p-2 mt-auto flex justify-around flex-wrap"> {/* Added flex-wrap for better layout */}
            <button
              onClick={() => handleViewDetails(counselor)}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-black hover:text-white transition-all duration-300 flex items-center space-x-1 mb-2 md:mb-0"
            >
              <FaEye />
              <span>View Details</span>
            </button>
            <button
              onClick={() => handleUpdateEmployee(counselor)}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-1 mb-2 md:mb-0"
            >
              <FaEdit />
              <span>Update</span>
            </button>
            <button
              onClick={() => handleDeleteEmployee(counselor.employeeId)}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-red-300 transition-all duration-300 flex items-center space-x-1 mb-2 md:mb-0"
            >
              <FaTrashAlt />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">No counselors found.</p>
  )}

  {/* Employee Modal for Viewing Details */}
  {viewModalOpen && selectedEmployee && (
    <EmployeeModal
      employee={selectedEmployee}
      onClose={() => setViewModalOpen(false)}
      onNext={handleNextEmployee} // Pass the next handler
      onPrev={handlePreviousEmployee} // Correctly pass the previous handler
    />
  )}

  {/* Employee Modal for Updating Details */}
  {updateModalOpen && selectedEmployee && (
    <UpdateEmployeeModal
      employee={selectedEmployee}
      onClose={() => setUpdateModalOpen(false)}
    />
  )}
</div>

  );
};

export default EmployeeAll;
