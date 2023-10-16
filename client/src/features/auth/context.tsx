import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { AuthService } from '@/services';
import { OperationToast } from '@/components/ui/toasts';
import { useNavigationHistory } from '@/hooks';
import { useToast, ToastRoot } from '@/features/toast';

import { type User } from '@/utils/types/user';

interface AuthContext {
  error: string | null;
  isAuthorizated: boolean;
  isUserLoading: boolean;
  login: (email: string, password: string) => void;
  logout: VoidFunction;
  register: (email: string, password: string) => void;
  user: User | null;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  const [isUserLoading, setUserLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const { isPreviousPageExists } = useNavigationHistory();
  const { isToastOpen, openToast, setToastOpen } = useToast({
    msBeforeClosing: 5000,
  });

  useEffect(() => {
    AuthService.checkSession()
      .then(setUser)
      .finally(() => setUserLoading(false));
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      setUserLoading(true);
      setError(null);

      AuthService.login(email, password)
        .then((user) => {
          setUser(user);
          if (isPreviousPageExists) {
            navigate(-1);
          }
        })
        .catch(setError)
        .finally(() => setUserLoading(false));
    },
    [navigate, isPreviousPageExists]
  );

  const register = useCallback(
    (email: string, password: string) => {
      setUserLoading(true);
      setError(null);

      AuthService.register(email, password)
        .then(() => {
          navigate('/auth/sign-in');
          openToast();
        })
        .catch(setError)
        .finally(() => setUserLoading(false));
    },
    [navigate, openToast]
  );

  const logout = useCallback(() => {
    AuthService.logout()
      .then(() => {
        setUser(null);
        navigate('/auth/sign-in');
      })
      .catch(setError);
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        error,
        isAuthorizated: !!user,
        isUserLoading,
        login,
        logout,
        register,
        user,
      }}
    >
      {children}

      {/* Success registration toast */}
      <ToastRoot open={isToastOpen} onOpenChange={setToastOpen}>
        <OperationToast
          title='You have been registered!'
          message='Now you can sign in'
        />
      </ToastRoot>
    </AuthContext.Provider>
  );
}
