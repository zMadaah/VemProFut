import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthContextData = {

  user: any;
  signed: boolean;

  signIn: (
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => Promise<void>;
}

export const AuthContext =
  createContext({} as AuthContextData);

export function AuthProvider({
  children
}: any) {

  const [user, setUser] = useState(null);

  async function signIn(
    email: string,
    password: string
  ) {

    const response =
      await api.post(
        "/users/login",
        {
          email,
          password
        }
      );

    const { token, user } =
      response.data;

    await AsyncStorage.setItem(
      "@token",
      token
    );

    await AsyncStorage.setItem(
      "@user",
      JSON.stringify(user)
    );

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    setUser(user);
  }

  async function logout() {

    await AsyncStorage.clear();

    setUser(null);
  }

  async function loadStorage() {

    const token =
      await AsyncStorage.getItem("@token");

    const user =
      await AsyncStorage.getItem("@user");

    if (token && user) {

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      setUser(
        JSON.parse(user)
      );
    }
  }

  useEffect(() => {
    loadStorage();
  }, []);

  return (

    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signIn,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}