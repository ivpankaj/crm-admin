import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaDollarSign,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowLeft,
} from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";

const api_url = import.meta.env.VITE_API_URL;

interface Employee {
  counselorId: number;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  contactNumber: string;
  salary: string;
  address: string;
  hireDate: string;
  profilePicture: string;
  isActive: boolean;
  attendanceCount: number;
}

const CounselorProfile = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const { counselorId } = useParams<{ counselorId: string }>(); // Get counselorId from the route



  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`${api_url}/counselor/get/${counselorId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data: Employee = await response.json();
          setEmployee(data);
        } else {
          console.error("Failed to fetch employee");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    if (counselorId) {
      fetchEmployee();
    }
  }, [counselorId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Employee not found
      </div>
    );
  }

  const EmployeeInfo = ({ employee }: { employee: Employee }) => (
    <div className="mt-8 p-4 sm:p-6 md:p-8 bg-gray-800 rounded-3xl shadow-lg border border-gray-700">
      <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-200">
        Employee Information
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md sm:text-lg">
        {[
          { label: "Employee Id", value: employee.counselorId, icon: <FaUserTie /> },
          { label: "Full Name", value: employee.name, icon: <FaUserTie /> },
          {
            label: "Email",
            value: employee.email,
            icon: <FaEnvelope />,
            onClick: () => (window.location.href = `mailto:${employee.email}`),
          },
          {
            label: "Phone",
            value: employee.contactNumber,
            icon: <FaPhone />,
            onClick: () => (window.location.href = `tel:${employee.contactNumber}`),
          },
          { label: "Department", value: employee.department, icon: <FaBuilding /> },
          {
            label: "Hire Date",
            value: new Date(employee.hireDate).toLocaleDateString(),
            icon: <FaCalendarAlt />,
          },
          {
            label: "Address",
            value: employee.address,
            icon: <FaMapMarkerAlt />,
            onClick: () => window.open(`https://www.google.com/maps?q=${employee.address}`, "_blank"),
          },
          { label: "Salary", value: `₹${employee.salary}`, icon: <FaDollarSign /> },
          { label: "Attendance Count", value: employee.attendanceCount, icon: <FaCalendarAlt /> },
          {
            label: "Status",
            value: employee.isActive ? "Active" : "Inactive",
            icon: <FaUserTie />,
            className: employee.isActive ? "text-green-500" : "text-red-500",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-3 sm:p-4 rounded-md bg-gray-700 border border-gray-600 hover:bg-gray-600 transition duration-300 cursor-pointer ${item.className}`}
            onClick={item.onClick}
          >
            <span className="mr-3 sm:mr-4 text-gray-400 text-lg sm:text-xl">{item.icon}</span>
            <span className="font-medium text-gray-300 mr-auto">{item.label}:</span>
            <span className="text-gray-100">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileSection = ({ employee }: { employee: Employee }) => (
    <div className="rounded-3xl bg-gray-900 shadow-lg mb-8">
      <div className="px-6 pb-8 text-center border border-black shadow-xl rounded-3xl">
        <div className="relative mx-auto -mt-16 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full border-4 border-gray-700 overflow-hidden">
          {employee.profilePicture ? (
            <img
              src={`${api_url}${employee.profilePicture}`}
              alt="profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <FaUserTie className="h-full w-full text-gray-400" />
          )}
          <label
            htmlFor={`profile-${employee.counselorId}`}
            className="absolute bottom-0 right-0 flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300"
          >
            <input
              type="file"
              id={`profile-${employee.counselorId}`}
              className="sr-only"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 4.232a2 2 0 112.828 2.828l-8.5 8.5a2 2 0 01-1.297.569l-3.01.376a1 1 0 01-1.107-1.107l.376-3.01a2 2 0 01.569-1.297l8.5-8.5z"
              />
            </svg>
          </label>
        </div>
        <div className="mt-4 md:mt-6">
          <h3 className="mb-1 sm:mb-2 text-2xl sm:text-3xl font-bold text-gray-200">
            {employee.name}
          </h3>
          <p className="text-md sm:text-lg font-medium text-gray-400">
            {employee.jobTitle}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-900">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </div>
        <ProfileSection employee={employee} />
        <EmployeeInfo employee={employee} />
      </div>
    </>
  );
};

export default CounselorProfile;
