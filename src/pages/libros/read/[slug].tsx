import React from "react";
import PDFRead from "@/components/book/PDFRead";

import Toolbar from "@/components/book/Toolbar";

import Layout from "@/layout/Layout";



function Book() {
  return (
    <Layout>
      <div>
        <Toolbar />
        <PDFRead />
      </div>
    </Layout>
  );
}

export default Book;
