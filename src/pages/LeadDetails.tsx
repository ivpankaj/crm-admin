import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaUser, FaClipboardList, FaMoneyBillWave, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';

const api_url = import.meta.env.VITE_API_URL;

interface Lead {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  status: string;
  source: string;
  budget: number;
  address: string;
  notes: string;
  sales_personId: string;
  createdAt: string;
}

const LeadDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await fetch(`${api_url}/api/leads/get/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch lead details');
        const data: Lead = await response.json();
        setLead(data);
        console.log(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchLead();
  }, [id]);

  if (!lead) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Lead Details</h1>
      <div className="bg-white p-6 border rounded shadow">
        <h2 className="text-xl font-semibold flex items-center">
          <FaUser className="mr-2" /> {lead.name}
        </h2>
        <p className="flex items-center"><FaClipboardList className="mr-2" /><strong>Lead ID:</strong> {lead.id}</p>
        <p className="flex items-center"><FaEnvelope className="mr-2" /><strong>Email:</strong> {lead.email}</p>
        <p className="flex items-center"><FaPhone className="mr-2" /><strong>Contact Number:</strong> {lead.contactNumber}</p>
        <p className="flex items-center"><strong>Status:</strong> {lead.status}</p>
        <p className="flex items-center"><strong>Source:</strong> {lead.source}</p>
        <p className="flex items-center"><FaMoneyBillWave className="mr-2" /><strong>Budget:</strong> {lead.budget}</p>
        <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /><strong>Address:</strong> {lead.address}</p>
        <p className="flex items-center"><strong>Notes:</strong> {lead.notes}</p>
        <p className="flex items-center"><strong>Sales Person ID:</strong> {lead.sales_personId}</p>
        <p className="flex items-center"><FaRegClock className="mr-2" /><strong>Created At:</strong> {new Date(lead?.createdAt)?.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default LeadDetails;
