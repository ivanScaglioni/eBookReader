import React from "react";

import BookList from "@/components/book/BookList";

import Layout from "@/layout/Layout";

function Libros() {
  console.log("pagina list");
  return (
    <Layout>
      <BookList />
    </Layout>
  );
}

export default Libros;
