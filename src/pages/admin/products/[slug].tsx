import React from 'react'

import {GetStaticProps } from 'next'


export default function Product() {
  return (


    <div>Product</div>
  
  
  
    )
}






export const getStaticProps:GetStaticProps = async(ctx)=> {

  console.log(ctx)
  return {
    props: {}, // will be passed to the page component as props
  }
}