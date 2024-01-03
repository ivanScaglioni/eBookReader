import {ReactNode} from 'react'

import { ToastContainer } from 'react-toastify'

export default function AdminLayout({children}: { children: ReactNode }) {
  return (
    <>
      
      <main>
              {children}
          
          <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
          
          </main>
    </>
  )
}
