import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <button
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:text-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <span
            className={`absolute -top-1 right-0 z-10 h-2 w-2 rounded-full bg-blue-500 ${!notifying && 'hidden'}`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
          </span>

          {/* Placeholder for icon or content */}
          <span className="text-gray-800 dark:text-white">🔔</span>
        </button>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 flex w-64 flex-col rounded-md border border-gray-300 shadow-lg dark:border-gray-600 dark:bg-gray-800"
          >
            <div className="px-4 py-2">
              <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">Notification</h5>
            </div>

            <ul className="flex flex-col overflow-y-auto max-h-40">
              <li>
                <Link to='/dashboard/viewnotification'>
                  <button
                    className="flex w-full justify-center py-2 text-sm font-medium text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-700"
                  >
                    View All Notifications
                  </button>
                </Link>
              </li>
              <li>
                <Link to='/dashboard/notification'>
                  <button
                    className="flex w-full justify-center py-2 text-sm font-medium text-green-600 hover:bg-gray-100 dark:text-green-400 dark:hover:bg-gray-700"
                  >
                    Create Notification
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
