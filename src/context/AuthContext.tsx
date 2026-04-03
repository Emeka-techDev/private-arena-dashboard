import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  token: null,
  setToken: () => {},
  isAuthenticated: false
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("authToken");
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ email, setEmail, password, setPassword, token, setToken, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);