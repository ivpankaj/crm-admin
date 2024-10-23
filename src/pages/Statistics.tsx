import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';
import EmployeeLeadCount from './model/Model7';

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  contactNumber: string;
  jobTitle: string;
  department: string;
  usertype_name?: string;
  status?: string;
}
interface LeadCountData {
  totalLeads: number;
  count: number;
  details: any[];
  totalLeadsDetails: any[];
}

const api_url = import.meta.env.VITE_API_URL;

const Statistics: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [leadCounts, setLeadCounts] = useState<{
    [key: number]: LeadCountData;
  }>({});
  const [statuses, setStatuses] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [prevStatus, setPrevStatus] = useState<string[]>([]);
  const [prevSource, setPrevSource] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${api_url}/employee/getall`);
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchStatusesAndSources = async () => {
      try {
        const statusResponse = await axios.get(`${api_url}/getallstatuses`);
        setStatuses(statusResponse.data.data);

        const sourceResponse = await axios.get(`${api_url}/getallsources`);
        setSources(sourceResponse.data.data);
      } catch (error) {
        console.error('Error fetching statuses or sources:', error);
      }
    };

    fetchEmployees();
    fetchStatusesAndSources();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (employee.usertype_name &&
          employee.usertype_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())),
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  useEffect(() => {
    if (selectedEmployees) {
      getDataForSelectedEmployee();
    }
  }, [selectedEmployees, selectedStatus, selectedSource, startDate, endDate]);

  const handleEmployeeSelection = (employee: Employee) => {
    setSearchTerm('');
    setIsDropdownOpen(false);
    setSearchTerm(`${employee.name} (${employee.email})`);
    setIsDropdownOpen(false);
    setSelectedEmployees((prevSelected: Employee[]) => {
      if (prevSelected.some((selected) => selected.id === employee.id)) {
        return prevSelected.filter((selected) => selected.id !== employee.id);
      } else {
        return [...prevSelected, employee];
      }
    });
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm('');
    setIsDropdownOpen(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedEmployees(null);
    setIsDropdownOpen(false);
    setLeadCounts({});
  };

  const getDataForSelectedEmployee = async () => {
    if (selectedEmployees.length === 0) return;
    try {
      const response = await axios.post(`${api_url}/leads/employee/leadcount`, {
        employees: selectedEmployees,
        status: selectedStatus,
        source: selectedSource,
        startDate,
        endDate,
      });
      setLeadCounts(response.data);
    } catch (error) {
      console.error('Error fetching lead counts:', error);
    }
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: string,
  ) => {
    const selectedValue = event.target.value;

    if (type === 'status') {
      setPrevStatus([...selectedStatus]);
      if (!selectedStatus.includes(selectedValue)) {
        setSelectedStatus([...selectedStatus, selectedValue]);
      }
    } else if (type === 'source') {
      setPrevSource([...selectedSource]);
      if (!selectedSource.includes(selectedValue)) {
        setSelectedSource([...selectedSource, selectedValue]);
      }
    }
  };
  const removeStatus = (status: string) => {
    setSelectedStatus(selectedStatus.filter((item) => item !== status));
  };

  const removeSource = (source: string) => {
    setSelectedSource(selectedSource.filter((item) => item !== source));
  };
  return (
    <div className="container mx-auto p-4">
      <div className="mt-4 p-4 max-w-full">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-left text-sm sm:text-base">
                Field
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-left text-sm sm:text-base">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300 text-sm sm:text-base">
                <strong>Status</strong>
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-sm sm:text-base">
                {selectedStatus.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedStatus.map((status, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-gray-200 rounded"
                      >
                        {status}
                        <button
                          onClick={() => removeStatus(status)}
                          className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  'None'
                )}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-gray-300 text-sm sm:text-base">
                <strong>Source</strong>
              </td>
              <td className="px-4 py-2 border-b border-gray-300 text-sm sm:text-base">
                {selectedSource.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSource.map((source, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-gray-200 rounded"
                      >
                        {source}
                        <button
                          onClick={() => removeSource(source)}
                          className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  'None'
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col space-y-4 mb-4">
        <div className="relative">
          <div className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
              placeholder="Search employee by name or type"
              className="w-full p-2 border rounded pr-10"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={20} />
              </button>
            )}
          </div>
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded shadow-lg">
              {filteredEmployees.map((employee) => (
                <li
                  key={employee.id}
                  onMouseDown={() => handleEmployeeSelection(employee)} // Use onMouseDown instead of onClick
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {employee.name} ({employee.email}) -{' '}
                  {employee.usertype_name || 'N/A'}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap space-x-2">
          {Array.isArray(selectedEmployees) &&
            selectedEmployees.map((employee: any) => (
              <div
                key={employee.id}
                className="flex items-center bg-gray-200 rounded px-2 py-1 mr-2"
              >
                <span>{employee.name}</span>
                <button
                  onClick={() => handleEmployeeSelection(employee)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
        </div>
        <div className="flex flex-wrap space-x-2 space-y-2">
          <select
            value={selectedStatus}
            onChange={(e) => handleFilterChange(e, 'status')}
            className="flex-1 p-1 border rounded"
          >
            <option value="">--Choose a status--</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={selectedSource}
            onChange={(e) => handleFilterChange(e, 'source')}
            className="flex-1 p-2 border rounded"
          >
            <option value="">--Choose a source--</option>
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
        </div>
      </div>
      <div className="mt-4 p-4">
         <EmployeeLeadCount selectedEmployees={selectedEmployees} leadCounts={leadCounts} />
      </div>
    </div>
  );
};

export default Statistics;
