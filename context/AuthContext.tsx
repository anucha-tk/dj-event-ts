import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { StrapiLoginResponse } from "../pages/events/event.types";

import { NEXT_API } from "@/config/index";

// eslint-disable-next-line
const AuthContext = createContext({} as any); // todo change any

// todo change AuthProvider type provide
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<object | null>(null);
  const router = useRouter();

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    checkUserLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await axios.post<StrapiLoginResponse>(`${NEXT_API}/api/register`, {
        username,
        email,
        password,
      });
      setUser(data.user);
      toast.success("Register Successful");
      // noinspection ES6MissingAwait
      router.push("/account/dashboard");
    } catch (e) {
      let error = "Something went wrong";
      if (axios.isAxiosError(e)) {
        if (e.response) error = e.response.data.message;
      }
      toast.error(`${error}`);
    }
  };

  const login = async ({ email: identifier, password }: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<StrapiLoginResponse>(`${NEXT_API}/api/login`, {
        identifier,
        password,
      });
      setUser(data.user);
      toast.success("Login Successful");
      // noinspection ES6MissingAwait
      router.push("/account/dashboard");
    } catch (e) {
      let error = "Something went wrong";
      if (axios.isAxiosError(e)) {
        if (e.response) error = e.response.data.message;
      }
      toast.error(`${error}`);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${NEXT_API}/api/logout`);
      setUser(null);
      toast.success(`Logout Successful`);
      // noinspection ES6MissingAwait
      router.push("/");
    } catch (e) {
      toast.error(`Something went wrong!`);
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const { data: user } = await axios.get(`${NEXT_API}/api/user`);
      setUser(user);
    } catch (e) {
      // noinspection ES6MissingAwait
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
