"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * Lightweight client auth state with a DEV BYPASS.
 *
 * In production with real OAuth, next-auth's useSession() becomes the source
 * of truth; this context still handles the email/phone signup paths (which
 * are lead-capture first, auth second) and remembers the user locally so the
 * gate doesn't re-appear.
 */

export interface LocalUser {
  name?: string;
  email?: string;
  phone?: string;
  method: "google" | "email" | "phone" | "dev-bypass";
}

interface AuthState {
  user: LocalUser | null;
  signIn: (user: LocalUser) => void;
  signOut: () => void;
  ready: boolean;
}

const AuthContext = createContext<AuthState>({
  user: null,
  signIn: () => {},
  signOut: () => {},
  ready: false,
});

const STORAGE_KEY = "lls-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* corrupt/blocked storage — treat as signed out */
    }
    setReady(true);
  }, []);

  const signIn = useCallback((u: LocalUser) => {
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      /* private mode — session-only auth is fine */
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return <AuthContext.Provider value={{ user, signIn, signOut, ready }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
