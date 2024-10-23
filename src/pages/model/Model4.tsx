// // LeadDetailsModal.tsx
// import React from 'react';
// import { FiX } from 'react-icons/fi';
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

// interface Lead {
//   id: string;
//   name: string;
//   email: string;
//   contactNumber: string;
//   source: string;
//   notes?: string;
// }

// interface LeadDetailsModalProps {
//   leads: Lead[];
//   selectedLeadIndex: number | null;
//   isEditModalOpen: boolean;
//   closeLeadModal: () => void;
//   handlePreviousLead: () => void;
//   handleNextLead: () => void;
//   handleStatusChange: (status: string, id: string) => void;
//   showAllNotes: (id: string) => void;
//   handleallnotes: () => void;
//   setIsAddNotesModalOpen: (isOpen: boolean) => void;
//   setLeadNotes: (notes: string) => void;
//   isDropdownOpen: boolean;
//   setIsDropdownOpen: (isOpen: boolean) => void;
// }

// const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
//   leads,
//   selectedLeadIndex,
//   isEditModalOpen,
//   closeLeadModal,
//   handlePreviousLead,
//   handleNextLead,
//   handleStatusChange,
//   showAllNotes,
//   handleallnotes,
//   setIsAddNotesModalOpen,
//   setLeadNotes,
//   isDropdownOpen,
//   setIsDropdownOpen,
// }) => {
//   if (selectedLeadIndex === null || isEditModalOpen) {
//     return null; // Don't render if no lead is selected or if the edit modal is open
//   }
//   const statusOptions = [
   
//     'New',
//     'Did Not Pick',
//     'Not Reachable',
//     'Switch Off',
//     'DNP',
//     'DNP-1',
//     'DNP-2',
//     'DNP-3',
//     'DNP-4',
//     'DNP-5',
//     'DNP-6',
//     'Busy',
//     'Incoming Not Available',
//     'Not Interested',
//     'Follow Up - Product Pitched',
//     'Follow-Up Negotiation',
//     'Already Enrolled Somewhere',
//     'Promise to Pay',
//     'Already Enrolled',
//     'Junk',
//     'Wrong Number',
//     'Engaged',
//     'Call Back Later',
//     'Negotiation Delay',
//   ];
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
//       <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Lead Details</h2>
//           <button onClick={closeLeadModal}>
//             <FiX
//               size={24}
//               className="text-gray-500 hover:text-gray-600 transition"
//             />
//           </button>
//         </div>
//         <p>
//           <strong>Name:</strong> {leads[selectedLeadIndex].name}
//         </p>
//         <p>
//           <strong>Email:</strong> {leads[selectedLeadIndex].email}
//         </p>
//         <p>
//           <strong>Contact Number:</strong>{' '}
//           {leads[selectedLeadIndex].contactNumber}
//         </p>
//         <p>
//           <strong>Source:</strong> {leads[selectedLeadIndex].source}
//         </p>
//         <p>
//           <strong>Status:</strong> {leads[selectedLeadIndex].status}
//         </p>
//         <div className="flex flex-wrap justify-between mt-6 gap-4">
//           <button
//             className="flex items-center gap-2 py-2 px-4 border border-red-500 rounded hover:bg-gray-100 transition"
//             onClick={handlePreviousLead}
//             disabled={selectedLeadIndex === 0}
//           >
//             <AiOutlineArrowLeft /> Previous
//           </button>

//           <button
//             className="border border-blue-500 py-2 px-4 rounded hover:bg-gray-100 transition"
//             onClick={() => {
//               handleallnotes();
//               showAllNotes(leads[selectedLeadIndex].id);
//             }}
//           >
//             Show all notes
//           </button>

//           <button
//             className="border border-green-500 py-2 px-4 rounded hover:bg-gray-100 transition"
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent row click event
//               setLeadNotes(leads[selectedLeadIndex].notes || ''); // Set existing notes if any
//               setIsAddNotesModalOpen(true);
//             }}
//           >
//             Add Notes
//           </button>

//           <button
//             className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded hover:bg-gray-100 transition"
//             onClick={handleNextLead}
//             disabled={selectedLeadIndex === leads.length - 1}
//           >
//             Next <AiOutlineArrowRight />
//           </button>

//           {/* Dropdown for editing status */}
//           <div className="relative">
//             <button
//               className="py-2 px-4 border border-purple-500 rounded hover:bg-gray-100 transition"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               Edit Status
//             </button>
//             {isDropdownOpen && (
//   <div className="absolute mt-2 bg-white text-black border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto w-full sm:w-40 md:w-48 lg:w-56 inset-x-0 sm:right-auto sm:left-auto">
//     <ul className="py-2">
//       {statusOptions.map((status) => (
//         <li
//           key={status}
//           className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//           onClick={() => handleStatusChange(status, leads[selectedLeadIndex].id)}
//         >
//           {status}
//         </li>
//       ))}
//     </ul>
//   </div>
// )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadDetailsModal;










// LeadDetailsModal.tsx
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

interface Lead {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  source: string;
  status: string; // Added status to Lead interface
  notes?: string;
}

interface LeadDetailsModalProps {
  leads: Lead[];
  selectedLeadIndex: number | null;
  isEditModalOpen: boolean;
  closeLeadModal: () => void;
  handlePreviousLead: () => void;
  handleNextLead: () => void;
  handleStatusChange: (status: string, id: string) => void;
  showAllNotes: (id: string) => void;
  handleallnotes: () => void;
  setIsAddNotesModalOpen: (isOpen: boolean) => void;
  setLeadNotes: (notes: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
}

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
  leads,
  selectedLeadIndex,
  isEditModalOpen,
  closeLeadModal,
  handlePreviousLead,
  handleNextLead,
  handleStatusChange,
  showAllNotes,
  handleallnotes,
  setIsAddNotesModalOpen,
  setLeadNotes,
  isDropdownOpen,
  setIsDropdownOpen,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  if (selectedLeadIndex === null || isEditModalOpen) {
    return null; // Don't render if no lead is selected or if the edit modal is open
  }

  const statusOptions = [
    'New',
    'Did Not Pick',
    'Not Reachable',
    'Switch Off',
    'DNP',
    'DNP-1',
    'DNP-2',
    'DNP-3',
    'DNP-4',
    'DNP-5',
    'DNP-6',
    'Busy',
    'Incoming Not Available',
    'Not Interested',
    'Follow Up - Product Pitched',
    'Follow-Up Negotiation',
    'Already Enrolled Somewhere',
    'Promise to Pay',
    'Already Enrolled',
    'Junk',
    'Wrong Number',
    'Engaged',
    'Call Back Later',
    'Negotiation Delay',
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lead Details</h2>
          <button onClick={closeLeadModal}>
            <FiX size={24} className="text-gray-500 hover:text-gray-600 transition" />
          </button>
        </div>
        <p>
          <strong>Name:</strong> {leads[selectedLeadIndex].name}
        </p>
        <p>
          <strong>Email:</strong> {leads[selectedLeadIndex].email}
        </p>
        <p>
          <strong>Contact Number:</strong> {leads[selectedLeadIndex].contactNumber}
        </p>
        <p>
          <strong>Source:</strong> {leads[selectedLeadIndex].source}
        </p>
        <p>
          <strong>Status:</strong> {leads[selectedLeadIndex].status}
        </p>
        <div className="flex flex-wrap justify-between mt-6 gap-4">
          <button
            className="flex items-center gap-2 py-2 px-4 border border-red-500 rounded hover:bg-gray-100 transition"
            onClick={handlePreviousLead}
            disabled={selectedLeadIndex === 0}
          >
            <AiOutlineArrowLeft /> Previous
          </button>

          <button
            className="border border-blue-500 py-2 px-4 rounded hover:bg-gray-100 transition"
            onClick={() => {
              handleallnotes();
              showAllNotes(leads[selectedLeadIndex].id);
            }}
          >
            Show all notes
          </button>

          <button
            className="border border-green-500 py-2 px-4 rounded hover:bg-gray-100 transition"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click event
              setLeadNotes(leads[selectedLeadIndex].notes || ''); // Set existing notes if any
              setIsAddNotesModalOpen(true);
            }}
          >
            Add Notes
          </button>

          <button
            className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded hover:bg-gray-100 transition"
            onClick={handleNextLead}
            disabled={selectedLeadIndex === leads.length - 1}
          >
            Next <AiOutlineArrowRight />
          </button>

          {/* Dropdown for editing status */}
          <button
            className="py-2 px-4 border border-purple-500 rounded hover:bg-gray-100 transition"
            onClick={() => setIsStatusModalOpen(true)}
          >
            Edit Status
          </button>
        </div>
      </div>

      {/* Status Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Select Status</h2>
              <button onClick={() => setIsStatusModalOpen(false)}>
                <FiX size={24} className="text-gray-500 hover:text-gray-600 transition" />
              </button>
            </div>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <ul className="py-2">
                {statusOptions.map((status) => (
                  <li
                    key={status}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleStatusChange(status, leads[selectedLeadIndex].id);
                      setIsStatusModalOpen(false);
                    }}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadDetailsModal;
