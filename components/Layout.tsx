import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Header from "./Header";
import Footer from "./Footer";

import styles from "@/styles/Layout.module.css";
import Showcase from "@/components/Showcase";
import AuthContext from "@/context/AuthContext";

interface LayoutProps {
  isPrivateRoute?: boolean;
  title?: string;
  keywords?: string;
  description?: string;
  children: React.ReactNode;
}

const Layout = ({
  isPrivateRoute = true,
  title = "Dj Events | Find the hottest parties",
  description = "Find the latest DJ and other musical events",
  keywords = "music, dj, edm, events",
  children,
}: LayoutProps) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (isPrivateRoute && !user) {
      // noinspection JSIgnoredPromiseFromCall
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={"description"} content={description} />
        <meta name={"keywords"} content={keywords} />
      </Head>

      <Header />
      {router.pathname === "/" && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
