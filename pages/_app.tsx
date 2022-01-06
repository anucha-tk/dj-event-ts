// noinspection JSUnusedGlobalSymbols

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import React from "react";

import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
