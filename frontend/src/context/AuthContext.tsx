import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Add a loading state to handle async checks
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('accessToken');
      if (token) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/v1/auth/me`,
            { withCredentials: true }
          );
          setUser(response.data);
        } catch (error) {
          setUser(null);
          navigate('/login');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/v1/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      Cookies.set('accessToken', response.data.token, { expires: 1 });
      navigate('/');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('accessToken');
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while checking auth state
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
