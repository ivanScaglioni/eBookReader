import React, { useEffect } from "react";
import Layout from "@/layout/Layout";
import { appRouter } from '@/server/routers/_app';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import superjson from 'superjson';
import {GetServerSideProps } from 'next'
import { trpc } from '@/utils/trpc';
import ProductCard from '@/components/product/ProductCard'

export default function Poduct(props: InferGetServerSidePropsType<typeof getServerSideProps>,) {
  

  const { slug } = props
  const {data , isLoading, isError} = trpc.product.getProductBySlug.useQuery({slug});

  
  

  if (isLoading) 
  if (isError)return <div>error</div>
  if (!data) return <div>No data found</div>;
  

  const product = JSON.parse(data)


  return (
    
    <Layout>

    
    <div>hola</div>

    {data &&

        <ProductCard product={product} />

    }





    </Layout>
  );
}



export const getServerSideProps = async(ctx:GetServerSidePropsContext<{slug:string}>)=> {

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });


  const slug = ctx.params?.slug as string;
  // check if post exists - `prefetch` doesn't change its behavior
  // based on the result of the query (including throws), so if we
  // want to change the logic here in gSSP, we need to use `fetch`.

  await helpers.product.getProductBySlug.prefetch({slug});
  

  return {
    props: {
      trpcState: helpers.dehydrate(),
      slug,
    },
  };

}