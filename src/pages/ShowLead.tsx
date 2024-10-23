import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;

interface Lead {
  id: number;
  name: string;
  leadId: string;
  sales_personId: string;
}

interface SalesPerson {
  id: number;
  sales_personId: string;
  name: string;
}

const LeadsList = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [salesPersons, setSalesPersons] = useState<SalesPerson[]>([]);
  const [editingLeadId, setEditingLeadId] = useState<number | null>(null);
  const [newSalesPersonId, setNewSalesPersonId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(`${api_url}/getAllLead`);
        if (!response) throw new Error('Failed to fetch leads');
        const data = await response.data;
        setLeads(data);
      } catch (error:any) {
        console.error(error.message);
      }
    };

    const fetchSalesPersons = async () => {
      try {
        const response = await fetch(`${api_url}/sales_person/getall`);
        if (!response.ok) throw new Error('Failed to fetch sales persons');
        const data = await response.json();
        setSalesPersons(data);
      } catch (error:any) {
        console.error('Error fetching sales persons:', error.message);
      }
    };

    fetchLeads();
    fetchSalesPersons();
  }, []);

  const handleViewDetails = (id: number) => {
    navigate(`/dashboard/leadsdetail/${id}`);
  };

  const handleUpdateClick = (id: number) => {
    setEditingLeadId(id);
    setNewSalesPersonId('');
  };

  const handleAssignSalesPerson = async (leadId: number) => {
    try {
      const response = await fetch(`${api_url}/api/leads/assign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadId: leadId.toString(),
          newSalesPersonId,
        }),
      });
      if (!response.ok) throw new Error('Failed to assign sales person');

      const updatedLeads = leads.map((lead) =>
        lead.id === leadId ? { ...lead, sales_personId: newSalesPersonId } : lead
      );
      setLeads(updatedLeads);
      setEditingLeadId(null);
      setNewSalesPersonId('');
    } catch (error:any) {
      console.error('Error updating sales person:', error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingLeadId(null);
    setNewSalesPersonId('');
  };

  const filteredSalesPersons = salesPersons.filter((sp) =>
    sp.name.toLowerCase().includes(searchInput.toLowerCase()) || sp.sales_personId.includes(searchInput)
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Leads List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white p-6 border rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-xl font-semibold mb-2">{lead.name}</h2>
            <p className="text-gray-700"><strong>Lead ID:</strong> {lead.leadId}</p>
            <p className="text-gray-700"><strong>Sales Person ID:</strong> {lead.sales_personId}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleViewDetails(lead.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                View Details
              </button>

              <button
                onClick={() => handleUpdateClick(lead.id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 ml-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition flex items-center"
              >
                <FaEdit className="mr-2" /> Assign to
              </button>
            </div>

            {editingLeadId === lead.id && (
              <div className="mt-4">
                <label className="block mb-2 font-semibold">Assign Sales Person:</label>

                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by name or ID"
                  className="border rounded px-4 py-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <select
                  value={newSalesPersonId}
                  onChange={(e) => setNewSalesPersonId(e.target.value)}
                  className="border rounded px-4 py-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Sales Person</option>
                  {filteredSalesPersons.map((sp) => (
                    <option key={sp.id} value={sp.sales_personId}>
                      {sp.name} (ID: {sp.sales_personId})
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAssignSalesPerson(lead.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsList;
