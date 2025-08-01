import { createContext, useState, type ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
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

  return (
    <AuthContext.Provider value={{ token, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};