const API_URL = import.meta.env.VITE_API_URL;

export type User = { id: number; name: string; email: string };

export async function login(
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error("NETWORK");
  }
  if (res.ok) return res.json();
  if (res.status === 400 || res.status === 401) throw new Error("INVALID");
  throw new Error("SERVER");
}

export async function getMe(token: string): Promise<User> {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("UNAUTHORIZED");
  return res.json();
}