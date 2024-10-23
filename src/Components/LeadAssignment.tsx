// // src/components/LeadAssignment.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const LeadAssignment: React.FC = () => {
//     const api_url = import.meta.env.VITE_API_URL;
//     const [leads, setLeads] = useState<any[]>([]);
//     const [employees, setEmployees] = useState<any[]>([]);
//     const [selectedLeadIds, setSelectedLeadIds] = useState<number[]>([]);
//     const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         const fetchLeadsAndEmployees = async () => {
//             try {
//                 const leadResponse = await axios.get(`${api_url}/getAllLead`);
//                 const employeeResponse = await axios.get(`${api_url}/getAllEmployees`); // Adjust endpoint as necessary
//                 setLeads(leadResponse.data);
//                 setEmployees(employeeResponse.data);
//             } catch (error) {
//                 console.error('Failed to fetch leads or employees', error);
//             }
//         };

//         fetchLeadsAndEmployees();
//     }, [api_url]);

//     const toggleLeadSelection = (id: number) => {
//         setSelectedLeadIds(prev =>
//             prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]
//         );
//     };

//     const assignLeads = async () => {
//         if (selectedEmployeeId && selectedLeadIds.length > 0) {
//             try {
//                 await axios.post(`${api_url}/assignLeads`, { leadIds: selectedLeadIds, employeeId: selectedEmployeeId });
//                 alert('Leads assigned successfully!');
//                 setShowModal(false);
//                 setSelectedLeadIds([]);
//                 setSelectedEmployeeId(null);
//             } catch (error) {
//                 console.error('Error assigning leads:', error);
//                 alert('Failed to assign leads');
//             }
//         } else {
//             alert('Please select leads and an employee to assign.');
//         }
//     };

//     return (
//         <div>
//             <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setShowModal(true)}>
//                 Assign Leads
//             </button>
//             {showModal && (
//                 <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded shadow-lg">
//                         <h2 className="text-xl mb-4">Assign Leads to Employee</h2>
//                         <div>
//                             <label className="block mb-2">Select Employee:</label>
//                             <select 
//                                 className="mb-4 border p-2"
//                                 value={selectedEmployeeId || ''}
//                                 onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
//                             >
//                                 <option value="" disabled>Select an employee</option>
//                                 {employees.map(employee => (
//                                     <option key={employee.id} value={employee.id}>{employee.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <h3 className="mb-2">Select Leads:</h3>
//                         {leads.map(lead => (
//                             <div key={lead.id}>
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedLeadIds.includes(lead.id)}
//                                         onChange={() => toggleLeadSelection(lead.id)}
//                                     />
//                                     {lead.name} - {lead.email}
//                                 </label>
//                             </div>
//                         ))}
//                         <div className="mt-4">
//                             <button className="bg-green-500 text-white py-2 px-4 rounded mr-2" onClick={assignLeads}>
//                                 Assign
//                             </button>
//                             <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => setShowModal(false)}>
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LeadAssignment;










// // src/components/LeadAssignment.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const LeadAssignment: React.FC<{ onClose: () => void; isOpen: boolean }> = ({ onClose, isOpen }) => {
//     const api_url = import.meta.env.VITE_API_URL;
//     const [leads, setLeads] = useState<any[]>([]);
//     const [employees, setEmployees] = useState<any[]>([]);
//     const [selectedLeadIds, setSelectedLeadIds] = useState<number[]>([]);
//     const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

//     useEffect(() => {
//         const fetchLeadsAndEmployees = async () => {
//             try {
//                 const leadResponse = await axios.get(`${api_url}/getAllLead`);
//                 const employeeResponse = await axios.get(`${api_url}/employee/getall`);
//                 setLeads(leadResponse.data);
//                 setEmployees(employeeResponse.data);
//             } catch (error) {
//                 console.error('Failed to fetch leads or employees', error);
//             }
//         };

//         fetchLeadsAndEmployees();
//     }, [api_url]);

//     const toggleLeadSelection = (id: number) => {
//         setSelectedLeadIds(prev =>
//             prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]
//         );
//     };

//     const assignLeads = async () => {
//         if (selectedEmployeeId && selectedLeadIds.length > 0) {
//             try {
//                 await axios.post(`${api_url}/assignLeads`, { leadIds: selectedLeadIds, employeeId: selectedEmployeeId });
//                 alert('Leads assigned successfully!');
//                 onClose(); // Close the modal after assignment
//                 setSelectedLeadIds([]);
//                 setSelectedEmployeeId(null);
//             } catch (error) {
//                 console.error('Error assigning leads:', error);
//                 alert('Failed to assign leads');
//             }
//         } else {
//             alert('Please select leads and an employee to assign.');
//         }
//     };

//     if (!isOpen) return null; // Do not render if not open

//     return (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded shadow-lg w-96">
//                 <h2 className="text-xl mb-4">Assign Leads to Employee</h2>
//                 <div>
//                     <label className="block mb-2">Select Employee:</label>
//                     <select 
//                         className="mb-4 border p-2 w-full"
//                         value={selectedEmployeeId || ''}
//                         onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
//                     >
//                         <option value="" disabled>Select an employee</option>
//                         {employees.map(employee => (
//                             <option key={employee.id} value={employee.id}>{employee.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <h3 className="mb-2">Select Leads:</h3>
//                 {leads.map(lead => (
//                     <div key={lead.id} className="flex items-center mb-2">
//                         <input
//                             type="checkbox"
//                             checked={selectedLeadIds.includes(lead.id)}
//                             onChange={() => toggleLeadSelection(lead.id)}
//                             className="mr-2"
//                         />
//                         <label>{lead.name} - {lead.email}</label>
//                     </div>
//                 ))}
//                 <div className="mt-4">
//                     <button className="bg-green-500 text-white py-2 px-4 rounded mr-2" onClick={assignLeads}>
//                         Assign
//                     </button>
//                     <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LeadAssignment;










// src/components/LeadAssignment.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const LeadAssignment: React.FC<{ onClose: () => void; isOpen: boolean }> = ({ onClose, isOpen }) => {
//     const api_url = import.meta.env.VITE_API_URL;
//     const [leads, setLeads] = useState<any[]>([]);
//     const [userTypes, setUserTypes] = useState<string[]>([]);
//     const [employees, setEmployees] = useState<any[]>([]);
//     const [selectedLeadIds, setSelectedLeadIds] = useState<number[]>([]);
//     const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
//     const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchLeadsAndUserTypes = async () => {
//             try {
//                 const leadResponse = await axios.get(`${api_url}/getAllLead`);
//                 const userTypeResponse = await axios.get(`${api_url}/userTypes`); // Fetch user types
//                 setLeads(leadResponse.data);
//                 setUserTypes(userTypeResponse.data.data); // Assuming the response is a list of user types
//             } catch (error) {
//                 console.error('Failed to fetch leads or user types', error);
//             }
//         };

//         fetchLeadsAndUserTypes();
//     }, [api_url]);

//     useEffect(() => {
//         const fetchEmployeesByUserType = async () => {
//             if (selectedUserType) {
//                 try {
//                     const employeeResponse = await axios.get(`${api_url}/employee/getByUserType`, {
//                         params: { userType: selectedUserType } // Send user type to backend
//                     });
//                     setEmployees(employeeResponse.data);
//                 } catch (error) {
//                     console.error('Failed to fetch employees', error);
//                 }
//             }
//         };

//         fetchEmployeesByUserType();
//     }, [selectedUserType, api_url]);

//     const toggleLeadSelection = (id: number) => {
//         setSelectedLeadIds(prev =>
//             prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]
//         );
//     };

//     const assignLeads = async () => {
//         if (selectedEmployeeId && selectedLeadIds.length > 0) {
//             try {
//                 await axios.post(`${api_url}/assignLeads`, { leadIds: selectedLeadIds, employeeId: selectedEmployeeId });
//                 alert('Leads assigned successfully!');
//                 onClose(); // Close the modal after assignment
//                 setSelectedLeadIds([]);
//                 setSelectedEmployeeId(null);
//                 setSelectedUserType(null); // Reset user type
//                 setEmployees([]); // Clear employees
//             } catch (error) {
//                 console.error('Error assigning leads:', error);
//                 alert('Failed to assign leads');
//             }
//         } else {
//             alert('Please select leads and an employee to assign.');
//         }
//     };

//     if (!isOpen) return null; // Do not render if not open

//     return (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded shadow-lg w-96">
//                 <h2 className="text-xl mb-4">Assign Leads to Employee</h2>
//                 <div>
//                     <label className="block mb-2">Select User Type:</label>
//                     <select
//                         className="mb-4 border p-2 w-full"
//                         value={selectedUserType || ''}
//                         onChange={(e) => setSelectedUserType(e.target.value)}
//                     >
//                         <option value="" disabled>Select a user type</option>
//                         {userTypes.map(userType=> (
//                             <option key={userType} value={userType.usertype_name}>{userType.usertype_name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block mb-2">Select Employee:</label>
//                     <select
//                         className="mb-4 border p-2 w-full"
//                         value={selectedEmployeeId || ''}
//                         onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
//                     >
//                         <option value="" disabled>Select an employee</option>
//                         {employees.map(employee => (
//                             <option key={employee.id} value={employee.id}>{employee.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <h3 className="mb-2">Select Leads:</h3>
//                 {leads.map(lead => (
//                     <div key={lead.id} className="flex items-center mb-2">
//                         <input
//                             type="checkbox"
//                             checked={selectedLeadIds.includes(lead.id)}
//                             onChange={() => toggleLeadSelection(lead.id)}
//                             className="mr-2"
//                         />
//                         <label>{lead.name} - {lead.email}</label>
//                     </div>
//                 ))}
//                 <div className="mt-4">
//                     <button className="bg-green-500 text-white py-2 px-4 rounded mr-2" onClick={assignLeads}>
//                         Assign
//                     </button>
//                     <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LeadAssignment;



//pankaj
// src/components/LeadAssignment.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeadAssignment: React.FC<{ onClose: () => void; isOpen: boolean }> = ({ onClose, isOpen }) => {
    const api_url = import.meta.env.VITE_API_URL;
    const [leads, setLeads] = useState<any[]>([]);
    const [userTypes, setUserTypes] = useState<string[]>([]);
    const [employees, setEmployees] = useState<any[]>([]);
    const [selectedLeadIds, setSelectedLeadIds] = useState<number[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
    const [selectAll, setSelectAll] = useState(false); // State for "select all" checkbox

    useEffect(() => {
        const fetchLeadsAndUserTypes = async () => {
            try {
                const leadResponse = await axios.get(`${api_url}/getAllLead`);
                const userTypeResponse = await axios.get(`${api_url}/userTypes`); // Fetch user types
                setLeads(leadResponse.data);
                setUserTypes(userTypeResponse.data.data); // Assuming the response is a list of user types
            } catch (error) {
                console.error('Failed to fetch leads or user types', error);
            }
        };

        fetchLeadsAndUserTypes();
    }, [api_url]);

    useEffect(() => {
        const fetchEmployeesByUserType = async () => {
            if (selectedUserType) {
                try {
                    const employeeResponse = await axios.get(`${api_url}/employee/getByUserType`, {
                        params: { userType: selectedUserType } // Send user type to backend
                    });
                    setEmployees(employeeResponse.data);
                } catch (error) {
                    console.error('Failed to fetch employees', error);
                }
            }
        };

        fetchEmployeesByUserType();
    }, [selectedUserType, api_url]);

    const toggleLeadSelection = (id: number) => {
        setSelectedLeadIds(prev =>
            prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedLeadIds(leads.map(lead => lead.id)); // Select all leads
        } else {
            setSelectedLeadIds([]); // Deselect all leads
        }
    };

    const assignLeads = async () => {
      
        if (selectedEmployeeId && selectedLeadIds.length > 0) {
            try {
                await axios.post(`${api_url}/assignLeads`, { leadIds: selectedLeadIds, employeeId: selectedEmployeeId });
                alert('Leads assigned successfully!');
                onClose(); // Close the modal after assignment
                setSelectedLeadIds([]);
                setSelectedEmployeeId(null);
                setSelectedUserType(null); // Reset user type
                setEmployees([]); // Clear employees
                setSelectAll(false); // Reset select all state
                window.location.reload()
            } catch (error) {
                console.error('Error assigning leads:', error);
                alert('Failed to assign leads');
            }
        } else {
            alert('Please select leads and an employee to assign.');
        }
    };

    if (!isOpen) return null; // Do not render if not open

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl mb-4">Assign Leads to Employee</h2>
                <div>
                    <label className="block mb-2">Select User Type:</label>
                    <select
                        className="mb-4 border p-2 w-full"
                        value={selectedUserType || ''}
                        onChange={(e) => setSelectedUserType(e.target.value)}
                    >
                        <option value="" disabled>Select a user type</option>
                        {userTypes.map(userType=> (
                            <option key={userType} value={userType.usertype_name}>{userType.usertype_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2">Select Employee:</label>
                    <select
                        className="mb-4 border p-2 w-full"
                        value={selectedEmployeeId || ''}
                        onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
                    >
                        <option value="" disabled>Select an employee</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>{employee.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <button className="bg-green-500 text-white py-2 px-4 rounded mr-2" onClick={assignLeads}>
                        Assign
                    </button>
                    <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>
                        Cancel
                    </button>
                </div>
               
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="mr-2"
                    />
                    <label>Select All Leads</label>
                </div>
        
                {/* {leads.map(lead => (
                    <div key={lead.id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={selectedLeadIds.includes(lead.id)}
                            onChange={() => toggleLeadSelection(lead.id)}
                            className="mr-2"
                        />
                        <label>{lead.name} - {lead.email}</label>
                    </div>
                ))} */}





<div className="max-h-40 overflow-y-auto">
  {leads.map(lead => (
    <div key={lead.id} className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={selectedLeadIds.includes(lead.id)}
        onChange={() => toggleLeadSelection(lead.id)}
        className="mr-2"
      />
      <label className="text-gray-800">{lead.name} - {lead.email}</label>
    </div>
  ))}
</div>

           
            </div>
        </div>
    );
};

export default LeadAssignment;
