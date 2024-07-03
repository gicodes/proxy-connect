import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
}

type Action =
  | { type: 'LOGIN'; payload: any }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      dispatch({ type: 'LOGIN', payload: session.user });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
