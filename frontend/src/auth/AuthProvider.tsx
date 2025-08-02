import { createContext, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  getCurrentUserId: () => number | null;
}

interface TokenPayload {
  user_id: number;
  username: string;
  exp: number;
  iat: number;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refresh")
  );

  const login = (newToken: string, refreshToken: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("refresh", refreshToken);
    setToken(newToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setToken(null);
    setRefreshToken(null);
  };

  const getCurrentUserId = (): number | null => {
    if (!token) return null;
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.user_id;
    } catch {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, login, logout, getCurrentUserId }}>
      {children}
    </AuthContext.Provider>
  );
};