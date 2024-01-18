import { createContext } from "react";
import { useAuthStore } from "./stores/auth-store";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const { user, login, logout } = useAuthStore();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
