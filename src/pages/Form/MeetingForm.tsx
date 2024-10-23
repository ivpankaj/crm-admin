import { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const api_url = import.meta.env.VITE_API_URL;

const MeetingForm = () => {
  const [formData, setFormData] = useState({
    meetingId: '',
    topic: '',
    meetingDate: '',
    startTime: '',
    endTime: '',
    isOnline: false,
    location: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api_url}/api/meetings/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Meeting created:', data);
      
      // Show success alert
      alert('Meeting created successfully!');
  
      // Add more logic here (e.g., redirect)
      // navigate('/some-path'); // Uncomment to navigate after creating the meeting
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('Error creating meeting. Please try again.'); // Show error alert
    }
  };
  
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6  shadow-lg rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition duration-300 flex items-center"
      >
        <IoMdArrowRoundBack className="mr-2" />
        Back
      </button>
      <h2 className="text-3xl font-semibold mb-4">Create a Meeting</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Meeting ID</label>
          <input
            type="text"
            name="meetingId"
            value={formData.meetingId}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 bg-gray-800 rounded-md shadow-sm py-3 px-4 text-lg focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 bg-gray-800 rounded-md shadow-sm py-3 px-4 text-lg focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-black"
            required
          />
        </div>
        <div className="flex items-center">
          <FaRegCalendarAlt className="text-gray-400 mr-2" />
          <div className="flex-1">
            <label className="block text-sm font-medium">Meeting Date</label>
            <input
              type="date"
              name="meetingDate"
              value={formData.meetingDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-600 bg-gray-800 rounded-md shadow-sm py-3 px-4 text-lg focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-black"
              required
            />
          </div>
        </div>
        <div className="flex items-center">
          <FaRegClock className="text-gray-400 mr-2" />
          <div className="flex-1">
            <label className="block text-sm font-medium">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-600 bg-gray-800 rounded-md shadow-sm py-3 px-4 text-lg focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-black"
              required
            />
          </div>
        </div>
        <div className="flex items-center">
          <FaRegClock className="text-gray-400 mr-2" />
          <div className="flex-1">
            <label className="block text-sm font-medium">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-600 bg-gray-800 rounded-md shadow-sm py-3 px-4 text-lg focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-black"
              required
            />
          </div>
        </div>
        <div>
          <label className="flex items-center text-sm font-medium">
            <input
              type="checkbox"
              name="isOnline"
              checked={formData.isOnline}
              onChange={handleChange}
              className="mr-2"
            />
            Is Online?
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 bg-gray-800 rounded-md shadow-sm py-3 px-4 text-lg focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-black"
            required={!formData.isOnline}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 text-lg text-white"
        >
          Create Meeting
        </button>
      </form>
    </div>
  );
};

export default MeetingForm;
