import NewBookForm from "@/components/book/forms/NewBookForm";
import React from "react";
import Layout from "@/layout/Layout";
import AdminLayout from "@/layout/AdminLayout";

export default function New() {
  return (
    <div>
      <AdminLayout>
        <NewBookForm />
      </AdminLayout>
    </div>
  );
}
