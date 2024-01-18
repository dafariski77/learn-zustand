import { create } from "zustand";

export const useAuthStore = create((set) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  return {
    user: storedUser || null,
    login: (data) => {
      const userData = {
        id: data.user.id,
        fullName: data.user.fullName,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
        refreshToken: data.refreshToken,
        createdAt: data.user.createdAt,
      };

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      set(() => ({
        user: userData,
      }));
    },
    logout: () => {
      localStorage.removeItem("user");

      set(() => ({
        user: null,
      }));
    },
  };
});
