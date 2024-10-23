// // components/AssignTeamLead.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Employee {
//   id: number;
//   name: string;
//   email: string;
// }

// const AssignTeamLead: React.FC = () => {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
//   const [teamLeadId, setTeamLeadId] = useState<number | null>(null);
//   const apiUrl = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/employee/getall-counselor-sales-man`); // Adjust the endpoint
//         setEmployees(response.data);
//       } catch (error) {
//         console.error('Error fetching employees:', error);
//       }
//     };

//     fetchEmployees();
//   }, [apiUrl]);

//   const handleCheckboxChange = (id: number) => {
//     setSelectedEmployees(prev =>
//       prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
//     );
//   };

//   const handleAssign = async () => {
//     if (teamLeadId) {
//       try {
//         await axios.post(`${apiUrl}/assign-employees`, {
//           employeeIds: selectedEmployees,
//           teamLeadId,
//         });
//         alert('Employees assigned successfully!');
//         setSelectedEmployees([]); // Reset selected employees
//       } catch (error) {
//         console.error('Error assigning employees:', error);
//       }
//     } else {
//       alert('Please select a team lead.');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Assign Employees to Team Lead</h1>
//       <select
//         className="mb-4 p-2 border"
//         onChange={(e) => setTeamLeadId(Number(e.target.value))}
//         defaultValue=""
//       >
//         <option value="" disabled>Select Team Lead</option>
//         {/* Replace with actual team lead options */}
//         <option value="1">Team Lead 1</option>
//         <option value="2">Team Lead 2</option>
//       </select>

//       <ul>
//         {employees.map(employee => (
//           <li key={employee.id} className="flex items-center mb-2">
//             <input
//               type="checkbox"
//               checked={selectedEmployees.includes(employee.id)}
//               onChange={() => handleCheckboxChange(employee.id)}
//             />
//             <span className="ml-2">{employee.name} - {employee.email}</span>
//           </li>
//         ))}
//       </ul>

//       <button
//         onClick={handleAssign}
//         className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
//       >
//         Assign Selected Employees
//       </button>
//     </div>
//   );
// };

// export default AssignTeamLead;









import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Employee {
  id: number;
  name: string;
  email: string;
}

interface TeamLead {
  id: number;
  name: string;
}

const AssignTeamLead: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [teamLeads, setTeamLeads] = useState<TeamLead[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [teamLeadId, setTeamLeadId] = useState<number | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${apiUrl}/employee/getall-counselor-sales-man`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchTeamLeads = async () => {
      try {
        const response = await axios.get(`${apiUrl}/employee/teamlead/getall`); // Adjust this endpoint
        setTeamLeads(response.data);
      } catch (error) {
        console.error('Error fetching team leads:', error);
      }
    };

    fetchEmployees();
    fetchTeamLeads();
  }, [apiUrl]);

  const handleCheckboxChange = (id: number) => {
    setSelectedEmployees(prev =>
      prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (teamLeadId) {
      try {
        await axios.post(`${apiUrl}/assign-employees`, {
          employeeIds: selectedEmployees,
          teamLeadId,
        });
        alert('Employees assigned successfully!');
        setSelectedEmployees([]); // Reset selected employees
      } catch (error) {
        console.error('Error assigning employees:', error);
      }
    } else {
      alert('Please select a team lead.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Assign Employees to Team Lead</h1>
      <select
        className="mb-4 p-2 border"
        onChange={(e) => setTeamLeadId(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>Select Team Lead</option>
        {teamLeads.map(lead => (
          <option key={lead.id} value={lead.id}>{lead.name}</option>
        ))}
      </select>

      <ul>
        {employees.map(employee => (
          <li key={employee.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedEmployees.includes(employee.id)}
              onChange={() => handleCheckboxChange(employee.id)}
            />
            <span className="ml-2">{employee.name} - {employee.email}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleAssign}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Assign Selected Employees
      </button>
    </div>
  );
};

export default AssignTeamLead;
