import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL;

type Counselor = {
  counselorId: number;
  name: string;
  email: string;
};

type ProfilePics = {
  [key: number]: string;
};

const CounselorAll = () => {
  const [alldata, setData] = useState<Counselor[]>([]);
  const [profilePics, setProfilePics] = useState<ProfilePics>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchData = async () => {
      try {

        const response = await fetch(`${api_url}/counselor/getAll`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data: Counselor[] = await response.json();
          setData(data);
          await fetchProfilePictures(data);
        } else {
          console.error("Failed to fetch counselor data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProfilePictures = async (counselors: Counselor[]) => {
    try {
      const profilePicPromises = counselors.map(async (counselor) => {
        const response = await axios(
          `/counselor/get/profilepic/${counselor.counselorId}`
        );
        if (response.data) {
          const { profilePicture } = await response.data
          return {
            counselorId: counselor.counselorId,
            profilePicture: `${api_url}${profilePicture}`,
          };
        } else {
          console.error(
            `Failed to fetch profile picture for counselor ${counselor.counselorId}`
          );
          return { counselorId: counselor.counselorId, profilePicture: "" };
        }
      });

      const results = await Promise.all(profilePicPromises);
      const newProfilePics: ProfilePics = results.reduce(
        (acc, { counselorId, profilePicture }) => {
          acc[counselorId] = profilePicture;
          return acc;
        },
        {} as ProfilePics
      );

      setProfilePics(newProfilePics);
    } catch (error) {
      console.error("Error fetching profile pictures:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-900 transition-all duration-300 flex items-center"
      >
        <IoMdArrowRoundBack className="mr-2" /> Back
      </button>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-600"></div>
        </div>
      ) : alldata.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {alldata.map((counselor) => (
         <div
         key={counselor.counselorId}
         className="shadow-md rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-lg dark:border dark:border-white border border-black flex flex-col justify-between h-full"
       >
         <div className="flex flex-col items-center p-4">
           {profilePics[counselor.counselorId] ? (
             <img
               src={profilePics[counselor.counselorId]}
               alt={`${counselor.name}'s profile`}
               className="w-20 h-20 rounded-full object-cover mb-4"
             />
           ) : (
             <FaUserTie className="text-8xl text-gray-400" />
           )}
       
           <h3 className="text-xl font-semibold text-gray-900">
             {counselor.name}
           </h3>
           <p className="text-sm text-gray-500 mb-4">{counselor.counselorId}</p>
         </div>
       
         <div className="p-2 mt-auto">
           <button
             onClick={() =>
               navigate(`/dashboard/counselorprofile/${counselor.counselorId}`)
             }
             className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-black hover:text-white transition-all duration-300 w-full"
           >
             View Details
           </button>
         </div>
       </div>
       
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No counselors found.</p>
      )}
    </div>
  );
};

export default CounselorAll;
