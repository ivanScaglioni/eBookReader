import React from 'react'
import PDFRead from '@/components/book/PDFRead'
import { GetServerSideProps } from 'next'
import Toolbar from '@/components/book/Toolbar'

interface Props{
    pdf:string
}


function Book({pdf}:Props) {

    
  return (
    <div className='' >
        <Toolbar />
        <PDFRead url={pdf}/>
    </div>
  )
}

export default Book


export const  getServerSideProps:GetServerSideProps = async(ctx)=>{

    return{
        props:{
            pdf:'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
            
        }
    }
}