import { useState } from 'react';

function Activeuser() {
  // Fake user data
  const users = [
    { id: 1, name: 'John Doe', status: 'present' },
    { id: 2, name: 'Jane Smith', status: 'absent' },
    { id: 3, name: 'Michael Brown', status: 'present' },
    { id: 4, name: 'Lisa Johnson', status: 'absent' },
  ];

  // State to track which users to display (present or absent)
  const [filter, setFilter] = useState('present');

  // Handle button click to set filter
  const handleFilterChange = (status: string) => {
    setFilter(status);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Active Users</h1>
      
      <div className="mb-4">
        <button
          onClick={() => handleFilterChange('present')}
          className={`px-4 py-2 mr-2 rounded ${
            filter === 'present' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Present Users
        </button>
        <button
          onClick={() => handleFilterChange('absent')}
          className={`px-4 py-2 rounded ${
            filter === 'absent' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Absent Users
        </button>
      </div>
      
      <ul>
        {users
          .filter(user => user.status === filter)
          .map(user => (
            <li key={user.id} className="mb-2">
              {user.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Activeuser;
