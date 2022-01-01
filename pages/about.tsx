import Link from "next/link";
import React from "react";

import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <h1>about</h1>
      <Link href={"/"}>Home</Link>
    </Layout>
  );
};

export default About;
