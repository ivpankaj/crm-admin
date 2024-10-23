
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Lead {
    id: number;
    name: string;
    email: string;
    contactNumber: string;
    source: string;
    assignToSales_personId?: number;
    status: string;
}

interface Employee {
    id: number;
    name: string;
    assignedLeads: Lead[];
}

const userTypes = ['sales_man', 'counselor', 'employee', 'team_lead'];

const LeadManagement: React.FC<{ onClose: () => void; isOpen: boolean }> = ({ onClose, isOpen }) => {
    const api_url = import.meta.env.VITE_API_URL;
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUserType, setSelectedUserType] = useState<string>('sales_man');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term for employees
    const [leadSearchTerm, setLeadSearchTerm] = useState<string>(''); // Search term for leads

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true); // Show loading state during fetch
            setError(null); // Reset error state
            try {
                const response = await axios.get(`${api_url}/employee/getWithAssignedLeads`, {
                    params: { userType_name: selectedUserType },
                });
                setEmployees(response.data);
            } catch (error) {
                setError('Failed to fetch employees');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [api_url, selectedUserType]); // Fetch employees when selectedUserType changes

    const openLeadModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsLeadModalOpen(true);
    };

    const closeLeadModal = () => {
        setIsLeadModalOpen(false);
        setSelectedEmployee(null);
        setLeadSearchTerm(''); // Reset lead search term on closing modal
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Filter employees based on search term

    const filteredLeads = selectedEmployee?.assignedLeads.filter((lead) =>
        lead.name.toLowerCase().includes(leadSearchTerm.toLowerCase())
    ) || []; // Filter leads based on lead search term

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                    <h2 className="text-xl mb-4">Lead Management</h2>

                    <div className="mb-4">
                        <label className="block mb-2">Select User Type:</label>
                        <select
                            value={selectedUserType}
                            onChange={(e) => setSelectedUserType(e.target.value)}
                            className="border p-2 w-full"
                        >
                            {userTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Search Employee:</label>
                        <input
                            type="text"
                            placeholder="Search by employee name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border p-2 w-full"
                        />
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div>
                            <label className="block mb-2">Select Employee:</label>
                            <select
                                value={selectedEmployee?.id || ''}
                                onChange={(e) => {
                                    const employeeId = Number(e.target.value);
                                    const employee = employees.find((emp) => emp.id === employeeId) || null;
                                    openLeadModal(employee!);
                                }}
                                className="border p-2 w-full mb-4"
                            >
                                <option value="" disabled>
                                    Select an employee
                                </option>
                                {filteredEmployees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mt-4">
                        <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {/* Lead details modal */}
            {isLeadModalOpen && selectedEmployee && (
                // <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                //     <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
                //         <h2 className="text-xl font-semibold mb-4">Leads for {selectedEmployee.name}</h2>
                //         <div className="mb-4">
                //             <label className="block mb-2">Search Lead:</label>
                //             <input
                //                 type="text"
                //                 placeholder="Search by lead name"
                //                 value={leadSearchTerm}
                //                 onChange={(e) => setLeadSearchTerm(e.target.value)}
                //                 className="border p-2 w-full"
                //             />
                //         </div>
                //         {filteredLeads.length > 0 ? (
                //             <div className="overflow-x-auto">
                //                 <table className="w-full border-collapse border border-gray-300">
                //                     <thead>
                //                         <tr className="bg-gray-200">
                //                             <th className="border border-gray-300 p-2 text-left">Name</th>
                //                             <th className="border border-gray-300 p-2 text-left">Email</th>
                //                             <th className="border border-gray-300 p-2 text-left">Contact</th>
                //                             <th className="border border-gray-300 p-2 text-left">Source</th>
                //                             <th className="border border-gray-300 p-2 text-left">Status</th>
                //                         </tr>
                //                     </thead>
                //                     <tbody>
                //                         {filteredLeads.map((lead) => (
                //                             <tr key={lead.id} className="border-b hover:bg-gray-100">
                //                                 <td className="border border-gray-300 p-2">{lead.name}</td>
                //                                 <td className="border border-gray-300 p-2">{lead.email}</td>
                //                                 <td className="border border-gray-300 p-2">{lead.contactNumber}</td>
                //                                 <td className="border border-gray-300 p-2">{lead.source}</td>
                //                                 <td className="border border-gray-300 p-2">{lead.status}</td>
                //                             </tr>
                //                         ))}
                //                     </tbody>
                //                 </table>
                //             </div>
                //         ) : (
                //             <p className="text-gray-700">No leads assigned to this employee.</p>
                //         )}
                //         <div className="mt-4">
                //             <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={closeLeadModal}>
                //                 Close
                //             </button>
                //         </div>
                //     </div>
                // </div>


                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Leads for {selectedEmployee.name}</h2>
        <div className="mb-4">
            <label className="block mb-2">Search Lead:</label>
            <input
                type="text"
                placeholder="Search by lead name"
                value={leadSearchTerm}
                onChange={(e) => setLeadSearchTerm(e.target.value)}
                className="border p-2 w-full"
            />
        </div>
        
        {filteredLeads.length > 0 ? (
            <div className="overflow-y-auto max-h-48"> {/* Change max-h to control the height */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2 text-left">id</th>
                            <th className="border border-gray-300 p-2 text-left">Name</th>
                            <th className="border border-gray-300 p-2 text-left">Email</th>
                            <th className="border border-gray-300 p-2 text-left">Contact</th>
                            <th className="border border-gray-300 p-2 text-left">Source</th>
                            <th className="border border-gray-300 p-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.map((lead,index) => ( // Show only the first 3 leads
                            <tr key={lead.id} className="border-b hover:bg-gray-100">
                                  <td className="border border-gray-300 p-2">{index+1}</td>
                                <td className="border border-gray-300 p-2">{lead.name}</td>
                                <td className="border border-gray-300 p-2">{lead.email}</td>
                                <td className="border border-gray-300 p-2">{lead.contactNumber}</td>
                                <td className="border border-gray-300 p-2">{lead.source}</td>
                                <td className="border border-gray-300 p-2">{lead.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <p className="text-gray-700">No leads assigned to this employee.</p>
        )}
        
        <div className="mt-4">
            <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={closeLeadModal}>
                Close
            </button>
        </div>
    </div>
</div>


            )}
        </>
    );
};

export default LeadManagement;



