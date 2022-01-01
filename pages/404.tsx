import Link from "next/link";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

import styles from "@/styles/404.module.css";
import Layout from "@/components/Layout";

const NotFoundPage = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Sorry, there is noting here</h4>
        <Link href={"/"}>Go Back Home</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
