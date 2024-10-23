// import React, { useState } from 'react';

// interface Employee {
//   id: number;
//   name: string;
//   status: string;
//   usertype_name?: string; // Added for user type display
// }

// interface ModalProps {
//   isPopupVisible: boolean;
//   selectedEmployees: Employee[];
//   leadCounts: { [key: number]: number }; // Changed key type to number
//   handleViewLeads: (id: number) => void; // Changed type to number
//   setIsPopupVisible: (visible: boolean) => void;
// }

// const Modal: React.FC<ModalProps> = ({
//   isPopupVisible,
//   selectedEmployees,
//   leadCounts,
//   handleViewLeads,
//   setIsPopupVisible,
// }) => {
//   const [isLeadsModalVisible, setIsLeadsModalVisible] = useState(false);
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

//   if (!isPopupVisible) return null;

//   const openLeadsModal = (id: number) => {
//     setSelectedEmployeeId(id);
//     setIsLeadsModalVisible(true);
//   };

  

//   const closeLeadsModal = () => {
//     setIsLeadsModalVisible(false);
//     setSelectedEmployeeId(null);
//   };

//   return (
//     <div>
//       <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-full overflow-auto">
//           <h2 className="text-xl font-semibold mb-4">Selected Employees</h2>

//           <table className="min-w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 p-2">Name</th>
//                 <th className="border border-gray-300 p-2">Leads Assigned</th>
//                 <th className="border border-gray-300 p-2">Type</th>
//                 <th className="border border-gray-300 p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedEmployees.map((employee) => (
//                 <tr key={employee.id} className="border border-gray-300">
//                   <td className="border border-gray-300 p-2">{employee.name}</td>
//                   <td className="border border-gray-300 p-2">
//                     {leadCounts[employee.id] || 0}
//                   </td>
//                   <td className="border border-gray-300 p-2">{employee.usertype_name || 'N/A'}</td>
//                   <td className="border border-gray-300 p-2">
//                     <button
//                       className="text-blue-500 hover:underline"
//                       onClick={() => openLeadsModal(employee.id)}
//                     >
//                       View Leads
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex justify-end mt-4">
//             <button
//               className="bg-red-500 text-white rounded px-4 py-2"
//               onClick={() => setIsPopupVisible(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Leads Modal */}
//       {isLeadsModalVisible && (
//         <LeadsModal
//           employeeId={selectedEmployeeId}
//           onClose={closeLeadsModal}
//         />
//       )}
//     </div>
//   );
// };

// // Leads Modal Component
// interface LeadsModalProps {
//   employeeId: number | null;
//   onClose: () => void;
// }

// const LeadsModal: React.FC<LeadsModalProps> = ({ employeeId, onClose }) => {
//   // Fetch leads based on employeeId, for demonstration using dummy data
//   const leads = [
//     { id: 1, name: 'Lead 1', status: 'Active' },
//     { id: 2, name: 'Lead 2', status: 'Inactive' },
//   ]; // Replace with actual fetch logic

//   if (employeeId === null) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-full overflow-auto">
//         <h2 className="text-xl font-semibold mb-4">Leads for Employee ID: {employeeId}</h2>
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">Lead Name</th>
//               <th className="border border-gray-300 p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leads.map((lead) => (
//               <tr key={lead.id} className="border border-gray-300">
//                 <td className="border border-gray-300 p-2">{lead.name}</td>
//                 <td className="border border-gray-300 p-2">{lead.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex justify-end mt-4">
//           <button
//             className="bg-red-500 text-white rounded px-4 py-2"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;











// import React, { useState } from 'react';


// interface Employee {
//   id: number;
//   name: string;
//   status: string;
//   usertype_name?: string; // Added for user type display
// }

// interface Lead {
//   id: number;
//   name: string;
//   status: string;
//   // Add more fields as needed
// }

// interface ModalProps {
//   isPopupVisible: boolean;
//   selectedEmployees: Employee[];
//   leadCounts: { [key: string]: { count: number; details: Lead[] } }; // Adjusted key type to string
//   handleViewLeads: (id: number) => void; // Changed type to number
//   setIsPopupVisible: (visible: boolean) => void;
// }

// const Modal: React.FC<ModalProps> = ({
//   isPopupVisible,
//   selectedEmployees,
//   leadCounts,
//   handleViewLeads,
//   setIsPopupVisible,
// }) => {
//   const [isLeadsModalVisible, setIsLeadsModalVisible] = useState(false);
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

//   if (!isPopupVisible) return null;

//   const [showDetails,setShowDetails] = useState(false);

//   const openLeadsModal = (employeeKey: string) => {
//     setSelectedEmployeeId(Number(employeeKey.split('_')[1])); // Extract ID from the key
//     setIsLeadsModalVisible(true);
//   };

//   const closeLeadsModal = () => {
//     setIsLeadsModalVisible(false);
//     setSelectedEmployeeId(null);
//   };

//   return (
//     <div>
//       <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-full overflow-auto">
//           <h2 className="text-xl font-semibold mb-4">Selected Employees</h2>

//           <table className="min-w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 p-2">Name</th>
//                 <th className="border border-gray-300 p-2">Leads Assigned</th>
//                 <th className="border border-gray-300 p-2">Type</th>
//                 <th className="border border-gray-300 p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedEmployees.map((employee) => {
//                 const leadKey = employee.id; // Key should match the structure from backend
//                 return (
//                   <tr key={employee.id} className="border border-gray-300">
//                     <td className="border border-gray-300 p-2">{employee.name}</td>
//                     <td className="border border-gray-300 p-2">
//                       {leadCounts[leadKey]?.count || 0}
//                     </td>
//                     <td className="border border-gray-300 p-2">{employee.usertype_name || 'N/A'}</td>
//                     <td className="border border-gray-300 p-2">
//                       <button
//                         className="text-blue-500 hover:underline"
//                         onClick={() => 
//                           {openLeadsModal(leadKey)
//                             setShowDetails(true);
//                           }}
//                       >
//                         View Leads
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           <div className="flex justify-end mt-4">
//             <button
//               className="bg-red-500 text-white rounded px-4 py-2"
//               onClick={() => setIsPopupVisible(false)}
//             >
//               Close
//             </button>
//           </div> 


//          { showDetails && <table className="min-w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 p-2">Name</th>
//                 <th className="border border-gray-300 p-2">Leads Assigned</th>
//                 <th className="border border-gray-300 p-2">Type</th>
//                 <th className="border border-gray-300 p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedEmployees.map((employee) => {
//                 const leadKey = employee.id; // Key should match the structure from backend
//                 return (
//                   <tr key={employee.id} className="border border-gray-300">
//                     <td className="border border-gray-300 p-2">{employee.name}</td>
//                     <td className="border border-gray-300 p-2">
//                       {leadCounts[leadKey]?.count || 0}
//                     </td>
//                     <td className="border border-gray-300 p-2">{employee.usertype_name || 'N/A'}</td>
//                     <td className="border border-gray-300 p-2">
//                       <button
//                         className="text-blue-500 hover:underline"
//                         onClick={() => openLeadsModal(leadKey)}
//                       >
//                         View Leads
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>}


//         </div>
//       </div>

//       {/* Leads Modal */}
//       {isLeadsModalVisible && (
//         <LeadsModal
//           employeeId={selectedEmployeeId}
//           onClose={closeLeadsModal}
//           leads={leadCounts[`employee_${selectedEmployeeId}`]?.details || []} // Pass details to LeadsModal
//         />
//       )}
//     </div>
//   );
// };

// // Leads Modal Component
// interface LeadsModalProps {
//   employeeId: number | null;
//   onClose: () => void;
//   leads: Lead[]; // Pass leads as a prop
// }

// const LeadsModal: React.FC<LeadsModalProps> = ({ employeeId, onClose, leads }) => {
//   if (employeeId === null) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-full overflow-auto">
//         <h2 className="text-xl font-semibold mb-4">Leads for Employee ID: {employeeId}</h2>
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">Lead Name</th>
//               <th className="border border-gray-300 p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leads.map((lead) => (
//               <tr key={lead.id} className="border border-gray-300">
//                 <td className="border border-gray-300 p-2">{lead.name}</td>
//                 <td className="border border-gray-300 p-2">{lead.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex justify-end mt-4">
//           <button
//             className="bg-red-500 text-white rounded px-4 py-2"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default Modal;








import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  status: string;
  usertype_name?: string;
}

interface Lead {
  id: number;
  name: string;
  status: string;
}

interface ModalProps {
  isPopupVisible: boolean;
  selectedEmployees: Employee[];
  leadCounts: { [key: string]: { count: number; details: Lead[] } }; // Adjusted key type to string
  handleViewLeads: (id: number) => void; // Changed type to number
  setIsPopupVisible: (visible: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  isPopupVisible,
  selectedEmployees,
  leadCounts,
  setIsPopupVisible,
}) => {
  const [isLeadsModalVisible, setIsLeadsModalVisible] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

  if (!isPopupVisible) return null;

  const openLeadsModal = (employeeId: number) => {
    setSelectedEmployeeId(employeeId); // Directly use employee ID
    setIsLeadsModalVisible(true);
  };

  const closeLeadsModal = () => {
    setIsLeadsModalVisible(false);
    setSelectedEmployeeId(null);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-full overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Selected Employees</h2>

          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Total Leads</th>
                <th className="border border-gray-300 p-2">Assigned Filter</th>
                <th className="border border-gray-300 p-2">Type</th>
                <th className="border border-gray-300 p-2">Action</th>
                <th className="border border-gray-300 p-2">View All Leads</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployees.map((employee) => {
                const leadKey = employee.id; // Key should match the structure from backend
                return (
                  <tr key={employee.id} className="border border-gray-300">
                    <td className="border border-gray-300 p-2">{employee.name}</td>
                    <td className="border border-gray-300 p-2">
                      {leadCounts[leadKey]?.totalLeads || 0}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {leadCounts[leadKey]?.count || 0}
                    </td>
                    <td className="border border-gray-300 p-2">{employee.usertype_name || 'N/A'}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => openLeadsModal(leadKey)}
                      >
                        View Leads
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => openLeadsModal(leadKey)}
                      >
                        View Leads
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end mt-4">
            <button
              className="bg-red-500 text-white rounded px-4 py-2"
              onClick={() => setIsPopupVisible(false)}
            >
              Close
            </button>
          </div> 

          {/* Leads Modal */}
          {isLeadsModalVisible && selectedEmployeeId !== null && (
            <LeadsModal
              employeeId={selectedEmployeeId}
              onClose={closeLeadsModal}
              leads={leadCounts[selectedEmployeeId]?.details || []} // Pass leads as an array
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Leads Modal Component
interface LeadsModalProps {
  employeeId: number | null;
  onClose: () => void;
  leads: Lead[];
}

const LeadsModal: React.FC<LeadsModalProps> = ({ employeeId, onClose, leads }) => {
  if (employeeId === null) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg h-96 overflow-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Leads for Employee ID: {employeeId}
      </h2>
      <table className="min-w-full border-collapse border border-gray-300 text-xs sm:text-sm md:text-base">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Lead Name</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border border-gray-300">
              <td className="border border-gray-300 p-2">{lead.name}</td>
              <td className="border border-gray-300 p-2">{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default Modal;
