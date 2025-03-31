'use client';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

// Define the shape of the authentication state
interface AuthState {
  userId: number | null;
  accessToken: string | null;
}

// Define the context type that will include both state and setter
interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
}

// Create the context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
const AuthProvider = ({
  children,
  initialUserId,
}: {
  children: ReactNode;
  initialUserId: number;
}) => {
  const [auth, setAuth] = useState<AuthState>({
    userId: initialUserId,
    accessToken: null,
  });

  // useEffect(() => {
  //   auth.accessToken
  // }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
