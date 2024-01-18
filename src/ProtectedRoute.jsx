import { Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/auth-store";
import { useShallow } from "zustand/react/shallow";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }

  return children;
};
