import type { User } from "../api/auth";

type Props = { user: User; onLogout: () => void };

export default function Welcome({ user, onLogout }: Props) {
  return (
    <section className="welcome">
      <h2 className="welcome-title">Welcome, {user.name}</h2>
      <p className="welcome-email">{user.email}</p>
      <button type="button" className="welcome-logout" onClick={onLogout}>
        Log out
      </button>
    </section>
  );
}