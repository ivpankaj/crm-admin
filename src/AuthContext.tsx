// AuthContext.tsx
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Define types for context state
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  api_url: string;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provide the context to the rest of the app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const api_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in cookies
    const savedToken = Cookies.get('admin');
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common['Authorization'] = `${savedToken}`;
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    // Set the default API base URL for axios
    axios.defaults.baseURL = api_url;
  }, [api_url]);

  const handleSetToken = (token: string | null) => {
    if (token) {
      Cookies.set('admin', token);
      axios.defaults.headers.common['Authorization'] = `${token}`;
      setToken(token);
    } else {
      Cookies.remove('admin');
      delete axios.defaults.headers.common['Authorization'];
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken, api_url }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
