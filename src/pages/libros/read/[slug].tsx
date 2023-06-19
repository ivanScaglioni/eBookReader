import React from 'react'
import PDFRead from '@/components/book/PDFRead'
import { GetServerSideProps } from 'next'
import Toolbar from '@/components/book/Toolbar'

import { trpc } from '@/utils/trpc'


interface Props{
    slug:string
}


function Book({slug}:Props) {

    const { data, isLoading, isError } = trpc.bookQuerys.getBookUrl.useQuery({slug:slug});
    if (isLoading) if (isError) return <div></div>;
    if (!data) return <div></div>;
  
  return (
    <div className='' >
        <Toolbar />
         <PDFRead url={data}/> 
    </div>
  )
}

export default Book


export const  getServerSideProps:GetServerSideProps = async(ctx)=>{

  


    return{
        props:{
            slug:ctx.params?.slug 
            
        }
    }
}