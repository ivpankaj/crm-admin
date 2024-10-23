import { useEffect, useState } from "react";
const api_url = import.meta.env.VITE_API_URL;
interface Notification {
  id: number;
  title: string;
  message: string;
  notificationType: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${api_url}/api/notifications/getall`);
        const data = await response.json();
        setNotifications(data);
      } catch (error:any) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Notifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className=" p-6 rounded-lg shadow-lg border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-600">{notification.title}</h2>
            <p className="text-gray-700 mb-4">{notification.message}</p>
            <div className="text-sm text-gray-500">
              <span className="block">Type: {notification.notificationType}</span>
              <span>Created at: {new Date(notification?.createdAt)?.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
