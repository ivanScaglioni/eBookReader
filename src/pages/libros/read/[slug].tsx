import React, { useEffect } from "react";
import PDFRead from "@/components/book/PDFRead";

import Toolbar from "@/components/book/Toolbar";

import Layout from "@/layout/Layout";

import { useRouter } from "next/router";

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
