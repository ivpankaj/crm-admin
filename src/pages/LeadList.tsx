import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import LeadAssignment from '../Components/LeadAssignment';
import LeadManagement from '../Components/LeadManagement';
import { FiTrash2 } from 'react-icons/fi';
import { BiLoaderCircle } from 'react-icons/bi';
import AllNotesModal from './model/Model1';
import AddNotesModal from './model/Model2';
import EditLeadModal from './model/Model3';
import LeadDetailsModal from './model/Model4';

interface Lead {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  source: string;
  status: string;
  notes: string;
  teamLeadName:string;
  salesPersonName:string;
}

const LeadList: React.FC = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sourceFilter, setSourceFilter] = useState<string>('');
  const [leadType, setLeadType] = useState<string>('');
  const [token, setToken] = useState<string | null>(Cookies.get('admin'));

  axios.defaults.headers.common['Authorization'] = `${token}`;
  axios.defaults.baseURL = api_url;

  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAddNotesModalOpen, setIsAddNotesModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] =
    useState<boolean>(false);
  const [isManagementModalOpen, setIsManagementModalOpen] =
    useState<boolean>(false);
  const [selectedLeadIndex, setSelectedLeadIndex] = useState<number | null>(
    null,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [leadStatus, setLeadStatus] = useState<string>('');
  const [leadNotes, setLeadNotes] = useState<string>('');
  const [allNotes, setAllNotes] = useState<string>('');
  const [isallnotesopen, setallnotesopen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [statuses, setStatuses] = useState<string[]>([]);
  const handleallnotes = () => {
    setallnotesopen(!isallnotesopen);
  };
  useEffect(() => {
    console.log('Fetching leads with:', {
      dateFrom,
      dateTo,
      statusFilter,
      sourceFilter,
    });
    fetchLeads();
  }, [api_url, dateFrom, dateTo, statusFilter, sourceFilter,leadType]);
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch(`${api_url}/getallstatuses`);
        const result = await response.json();

        if (result.success) {
          setStatuses(result.data);
        }
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, []);
  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${api_url}/leads/getall`, {
        params: {
          dateFrom: dateFrom,
          dateTo: dateTo,
          status: statusFilter,
          source: sourceFilter,
          leadType : leadType,
        },
      });
      setLeads(response.data.data);
      setError(null);
    } catch (error) {
      setError('No leads found');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddNotes = async () => {
    // Handle the logic for saving notes here
    console.log('Notes added:', leadNotes);
    try {
      await axios.post(`${api_url}/create/notes`, {
        leadId: leads[selectedLeadIndex].id,
        note: leadNotes,
      });
      alert('Success');
    } catch (error) {
      console.error(error);
      alert('Failed to create');
    }

    // Optionally clear the notes and close the modal
    setLeadNotes('');
    setIsAddNotesModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await axios.delete(`${api_url}/leads/${id}`);
        setLeads(leads.filter((lead) => lead.id !== id));
      } catch (error) {
        setError('Failed to delete lead');
        console.error(error);
      }
    }
  };
  const [selectedLeadId, SetselectedLeadId] = useState();
  const handleViewLead = (index: number, leadid: any) => {
    setSelectedLeadIndex(index);
    SetselectedLeadId(leadid);
  };

  const handleNextLead = () => {
    if (selectedLeadIndex !== null && selectedLeadIndex < leads.length - 1) {
      setSelectedLeadIndex(selectedLeadIndex + 1);
    }
  };

  const handlePreviousLead = () => {
    if (selectedLeadIndex !== null && selectedLeadIndex > 0) {
      setSelectedLeadIndex(selectedLeadIndex - 1);
    }
  };

  const closeLeadModal = () => {
    setSelectedLeadIndex(null);
  };

  const handleSaveChanges = async () => {
    if (selectedLeadIndex !== null) {
      try {
        const updatedLead = {
          ...leads[selectedLeadIndex],
          status: leadStatus,
          notes: leadNotes,
        };
        await axios.put(`${api_url}/leads/${updatedLead.id}`, updatedLead);
        setLeads(
          leads.map((lead, idx) =>
            idx === selectedLeadIndex ? updatedLead : lead,
          ),
        );
        setIsEditModalOpen(false);
      } catch (error) {
        console.error('Failed to update lead', error);
      }
    }
  };

  const handleStatusChange = async (status: string, id: number) => {
    // Ensure the selected lead is valid
    if (selectedLeadIndex < 0 || selectedLeadIndex >= leads.length) {
      alert('Lead not found.');
      return;
    }

    try {
      const response = await axios.put(`/leads/update`, {
        Leadid: selectedLeadId, // Assuming `leadId` is passed as a prop
        status: status,
      });

      // Handle different response statuses
      if (response.status === 200 || response.status === 204) {
        alert('Success');
        console.log('Status updated successfully:', response.data);
      } else {
        console.error('Failed to update status:', response.data);
      }
    } catch (error:any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        alert('Error: ' + error.response?.data?.message || error.message);
      } else {
        console.error('Unexpected error:', error);
        alert('Error: ' + error.message);
      }
    }

    // Close the dropdown after selecting a status
    setIsDropdownOpen(false);
  };

  const showAllNotes = async (leadId: number) => {
    try {
      const response = await axios.get(`${api_url}/get/notes/${leadId}`);
      setAllNotes(response.data);
    } catch (error) {
      console.error('Failed to retrieve notes', error);
      alert('Failed to retrieve notes');
    }
  };

  return (
<div className="container mx-auto p-4">
  <div className="filters">
    <input
      type="date"
      value={dateFrom}
      onChange={(e) => setDateFrom(e.target.value)}
      placeholder="Date From"
    />
    <input
      type="date"
      value={dateTo}
      onChange={(e) => setDateTo(e.target.value)}
      placeholder="Date To"
    />
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="">All Statuses</option>
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
    <select
      value={sourceFilter}
      onChange={(e) => setSourceFilter(e.target.value)}
    >
      <option value="">All Sources</option>
      <option value="facebook">facebook</option>
      <option value="instagram">instagram</option>
      <option value="skillontime website">skillontime website</option>
      {/* Add more options as needed */}
    </select>
    <select
      value={leadType}
      onChange={(e) => setLeadType(e.target.value)}
    >
      <option value="All Unassigned">All Unassigned</option>
      <option value="all team Lead assigned">Only Assigned to TeamLead</option>
      <option value="all sales man assigned">Only Assigned SalesPerson</option>
      <option value="Both Assigned">Both Assigned</option>
      {/* Add more options as needed */}
    </select>
  </div>
  <h1 className="text-2xl font-bold mb-4 text-center">Lead List</h1>
  <div className="flex justify-center gap-4 mb-4">
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition-colors"
      onClick={() => setIsAssignmentModalOpen(true)}
    >
      Assign Leads
    </button>
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition-colors"
      onClick={() => setIsManagementModalOpen(true)}
    >
      Lead Management
    </button>
  </div>

  {loading ? (
    <div className="flex justify-center items-center h-64">
      <BiLoaderCircle className="text-6xl text-gray-500 animate-spin" />
    </div>
  ) : error ? (
    <p className="text-red-500 text-center">{error}</p>
  ) : (
    <div style={{ overflowY: "auto", maxHeight: "340px", border: "1px solid #e5e7eb" }}>
      <table className="min-w-full bg-white text-black border border-gray-200 rounded-lg shadow-sm">
        <thead style={{ position: "sticky", top: 0, backgroundColor: "#f7fafc", zIndex: 1 }}>
          <tr className="text-left text-gray-600">
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Contact Number</th>
            <th className="py-2 px-4 border-b">Source</th>
            <th className="py-2 px-4 border-b">salesPersonName</th> 
            <th className="py-2 px-4 border-b">teamLeadName</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          { leads.length>0 ? leads.map((lead, index) => (
            <tr
              key={lead.id}
              className="hover:bg-gray-50 cursor-pointer transition"
              onClick={() => handleViewLead(index, lead.id)}
            > <td className="py-2 px-4 border-b">{index+1}</td>
              <td className="py-2 px-4 border-b">{lead.name}</td>
              <td className="py-2 px-4 border-b">{lead.email}</td>
              {/* <td className="py-2 px-4 border-b">{lead.salesPersonName}</td> */}
              {/* <td className="py-2 px-4 border-b">{lead.teamLeadName}</td> */}
              <td className="py-2 px-4 border-b">{lead.contactNumber}</td>
              <td className="py-2 px-4 border-b">{lead.source}</td>
              <td className="py-2 px-4 border-b font-bold bg-yellow-200">{lead.salesPersonName}</td>
<td className="py-2 px-4 border-b font-bold bg-green-200">{lead.teamLeadName}</td>

              <td className="py-2 px-4 border-b">{lead.status}</td>
              <td className="py-2 border-b text-center">
                <div className="flex justify-center">
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(lead.id);
                    }}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          )) :( <div>no leads found</div>)}
        </tbody>
      </table>
    </div>
  )}



  {/* Modal components remain unchanged */}

  <LeadDetailsModal
        leads={leads}
        selectedLeadIndex={selectedLeadIndex}
        isEditModalOpen={isEditModalOpen}
        closeLeadModal={closeLeadModal}
        handlePreviousLead={handlePreviousLead}
        handleNextLead={handleNextLead}
        handleStatusChange={handleStatusChange}
        showAllNotes={showAllNotes}
        handleallnotes={handleallnotes}
        setIsAddNotesModalOpen={setIsAddNotesModalOpen}
        setLeadNotes={setLeadNotes}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
      <AllNotesModal
        isOpen={isallnotesopen}
        onClose={() => setallnotesopen(false)}
        allNotes={allNotes}
      />
      <AddNotesModal
        isOpen={isAddNotesModalOpen}
        onClose={() => setIsAddNotesModalOpen(false)}
        leadNotes={leadNotes}
        setLeadNotes={setLeadNotes}
        handleAddNotes={handleAddNotes}
      />
      <EditLeadModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        leadStatus={leadStatus}
        setLeadStatus={setLeadStatus}
        leadNotes={leadNotes}
        setLeadNotes={setLeadNotes}
        handleSaveChanges={handleSaveChanges}
      />
      <LeadAssignment
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
      />
      <LeadManagement
        isOpen={isManagementModalOpen}
        onClose={() => setIsManagementModalOpen(false)}
      />

</div>

  );
};

export default LeadList;
