import React from 'react'
import { trpc } from '@/utils/trpc';


export default function index() {
  const {data, isLoading, isError } =  trpc.product.get.useQuery();

  return (
    <div>



    </div>
  )
}
