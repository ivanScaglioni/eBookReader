import React from 'react'

function Page({children}:{children : React.ReactNode}) {
  return (
    <div className='flex w-full justify-center items-center flex-col'>
        {children}

        
    </div>
  )
}

export default Page