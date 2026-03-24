import * as SecureStore from "expo-secure-store";
import React, { createContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    // Aqui depois vamos conectar com a API
    const fakeUser = {
      id: "1",
      name: "Joao",
      email,
    };

    await SecureStore.setItemAsync("token", "fake-token");

    setUser(fakeUser);
  }

  async function logout() {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}