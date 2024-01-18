import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../../stores/auth-store";

export default function Home() {
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  return (
    <div>
      <ul>
        <li>{user.id}</li>
        <li>{user.fullName}</li>
        <li>{user.email}</li>
        <li>{user.role.name}</li>
        <li>{user.token}</li>
        <li>{user.refreshToken}</li>
        <li>{user.createdAt}</li>
      </ul>
    </div>
  );
}
