import { useEffect, useState } from "react";

export type AuthUser = { id: string; name?: string } | null;

export function useAuth() {
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = (mock: AuthUser) => {
    if (mock) localStorage.setItem("auth_user", JSON.stringify(mock));
    setUser(mock);
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return { user, isLoggedIn: !!user, login, logout };
}
