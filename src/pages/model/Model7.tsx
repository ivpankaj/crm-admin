import React from 'react';

interface EmployeeLeadCountProps {
  selectedEmployees: { id: number; name: string }[] | null;
  leadCounts: Record<number, { totalLeads: number; count: number }> | null;
}

const EmployeeLeadCount: React.FC<EmployeeLeadCountProps> = ({ selectedEmployees, leadCounts }) => {
  return (
    <>
      {selectedEmployees && selectedEmployees.length > 0 ? (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">
            Lead Count for Selected Employees
          </h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Employee Name</th>
                <th className="border border-gray-300 px-4 py-2">Total Leads</th>
                <th className="border border-gray-300 px-4 py-2">Filter Detail Count</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {leadCounts?.[employee.id]?.totalLeads || 0}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {leadCounts?.[employee.id]?.count || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No employee selected.</p>
      )}
    </>
  );
};

export default EmployeeLeadCount;
