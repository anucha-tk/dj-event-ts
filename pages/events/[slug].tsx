import React from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";

const Slug = () => {
  const router = useRouter();

  return (
    <Layout>
      <h1>Slug My event</h1>
      {router.query.slug}
    </Layout>
  );
};

export default Slug;
