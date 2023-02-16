import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  type LoginInput,
  type RegisterInput,
} from '~/generated/graphql';
import JwtManager from '~/utils/jwt';

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  onLogin: (loginInput: LoginInput) => Promise<void>;
  onRegister: (registerInput: RegisterInput) => Promise<void>;
  checkAuth: () => void;
  onLogout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  loading: false,
  checkAuth: () => undefined,
  setIsAuthenticated: () => undefined,
  onLogin: () => Promise.resolve(),
  onRegister: () => Promise.resolve(),
  onLogout: () => Promise.resolve(),
});

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const clearAuth = useRef(false);
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === JwtManager.logoutEventName) {
        // To logout user login on other tab
        setIsAuthenticated(false);
        navigate('/user-list');
        localStorage.clear();
      }
    });
  }, [clearAuth, navigate]);

  const checkAuth = useCallback(async () => {
    const token = JwtManager.getToken();

    if (token) {
      setIsAuthenticated(true);
    } else {
      const success = await JwtManager.waitForTokenRefresh();
      if (success) setIsAuthenticated(true);
    }
  }, []);

  const onLogin = useCallback(
    async (loginInput: LoginInput) => {
      try {
        const { data } = await login({
          variables: {
            data: loginInput,
          },
        });
        setLoading(true);
        if (data?.login.accessToken) {
          toast.success('Login successfully');
          setLoading(false);
          JwtManager.setToken(data.login.accessToken);
          setIsAuthenticated(true);
          navigate('user-list');
        }
      } catch (error: any) {
        setLoading(false);
        toast.error(error.message);
      }
    },
    [login, navigate],
  );

  const onRegister = useCallback(
    async (registerInput: RegisterInput) => {
      try {
        const { data } = await register({
          variables: {
            data: registerInput,
          },
        });
        setLoading(true);
        if (data?.register.message === 'success') {
          toast.success('Register successfully');
          setLoading(false);
          navigate('/login');
        }
      } catch (error: any) {
        setLoading(false);
        toast.error(error.message);
      }
    },
    [register, navigate],
  );

  const onLogout = useCallback(async () => {
    try {
      const { data } = await logout();
      if (data?.logout.message === 'success') {
        JwtManager.deleteToken();
        setIsAuthenticated(false);
        clearAuth.current = true;
        navigate('/');
        toast.success('Logout successfully');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [logout, navigate]);

  const authContextData = {
    isAuthenticated,
    setIsAuthenticated,
    checkAuth,
    onLogout,
    onLogin,
    onRegister,
    loading,
  };

  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
