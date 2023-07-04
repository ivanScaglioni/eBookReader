import NewBookForm from "@/components/book/forms/NewBookForm";
import React from "react";
import Layout from "@/layout/Layout";

export default function New() {
  return (
    <div>
      <Layout>
        <NewBookForm />
      </Layout>
    </div>
  );
}
