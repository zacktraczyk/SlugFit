import { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  ReactChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../utils/supabaseClient";

type authState = { session: Session | null; user: User | null };

const initialState: authState = { session: null, user: null };
export const AuthContext = createContext(initialState);

interface signInData {
  email: string;
  password: string;
}

interface AuthProps {
  children: React.ReactElement;
}

export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value: authState = {
    session,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
