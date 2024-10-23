import React from 'react';
import { AiOutlineMail, AiOutlineIdcard, AiOutlinePhone, AiOutlineUser, AiOutlineHome, AiOutlineCalendar, AiOutlineDollar } from 'react-icons/ai';
import { FaBriefcase, FaUsers } from 'react-icons/fa';

const EmployeeModal = ({ employee, onClose, onNext, onPrev }) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <h2 className="text-2xl font-semibold mb-4">{employee.name}</h2>

        <div className="space-y-2">
          <div className="flex items-center">
            <AiOutlineMail className="mr-2 text-gray-600" />
            <strong>Email:</strong> <span>{employee.email}</span>
          </div>
          <div className="flex items-center">
            <AiOutlineIdcard className="mr-2 text-gray-600" />
            <strong>Employee ID:</strong> <span>{employee.employeeId}</span>
          </div>
          <div className="flex items-center">
            <AiOutlinePhone className="mr-2 text-gray-600" />
            <strong>Phone:</strong> <span>{employee.contactNumber}</span>
          </div>
          <div className="flex items-center">
            <FaBriefcase className="mr-2 text-gray-600" />
            <strong>Job Title:</strong> <span>{employee.jobTitle}</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="mr-2 text-gray-600" />
            <strong>Department:</strong> <span>{employee.department}</span>
          </div>
          <div className="flex items-center">
            <AiOutlineCalendar className="mr-2 text-gray-600" />
            <strong>Hire Date:</strong> <span>{new Date(employee?.hireDate)?.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <AiOutlineDollar className="mr-2 text-gray-600" />
            <strong>Salary:</strong> <span>${employee?.salary?.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <AiOutlineHome className="mr-2 text-gray-600" />
            <strong>Address:</strong> <span>{employee.address}</span>
          </div>
          <div className="flex items-center">
            <AiOutlineCalendar className="mr-2 text-gray-600" />
            <strong>Date of Birth:</strong> <span>{employee.dateOfBirth || "Not provided"}</span>
          </div>
          <div className="flex items-center">
            <strong>Attendance Count:</strong> <span>{employee.attendanceCount}</span>
          </div>
          <div className="flex items-center">
            <strong>User Type:</strong> <span>{employee.usertype_name}</span>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all duration-300"
          >
            Close
          </button>
          <div className="flex space-x-2">
            <button
              onClick={onPrev}
              className="bg-gray-300 hover:bg-gray-400 p-2 rounded-full focus:outline-none"
              disabled={!onPrev} // Disable if there's no previous employee
            >
              &#8592; {/* Left Arrow */}
            </button>
            <button
              onClick={onNext}
              className="bg-gray-300 hover:bg-gray-400 p-2 rounded-full focus:outline-none"
              disabled={!onNext} // Disable if there's no next employee
            >
              &#8594; {/* Right Arrow */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
