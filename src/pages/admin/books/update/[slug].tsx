import React, { useEffect, useState } from "react";

import AdminLayout from "@/layout/AdminLayout";
import { trpc } from "@/utils/trpc";

import UpdateBookForm from "@/components/book/forms/UpdateBook";

import Loading from "@/components/ux/Loading";
import Error from "@/components/ux/Error";




function Book() {

  const [slug, setSlug] = useState<string>("");
  
  
  const { data, isLoading, isError } = trpc.bookQuerys.getCompleteBook.useQuery({
    slug: slug,
  });
  



  useEffect(() => {
    const asPath = window.location.href;
    const params = asPath.split("/");
    const lastParam = params[params.length - 1];
    setSlug(lastParam);
    
  }, []);

  if (isLoading) return <Loading/>
  if (isError) return <Error/>
  if(!data || typeof(data) === "string") return <></>
  

  return (
    <AdminLayout>


      <UpdateBookForm myBook={data.mybook} url={data.myurl}  />
    </AdminLayout>
  );
}

export default Book;