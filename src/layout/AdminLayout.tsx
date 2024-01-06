import {ReactNode} from 'react'

import { ToastContainer } from 'react-toastify'

import Head from 'next/head'

import AdminNavbar from './AdminNavBar'

export default function AdminLayout({children}: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>C.A.Tac.Pol.</title>
        <meta name="description" content="Centro de adiestramineto tactico policial de Mendoza, Argentina" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminNavbar/>
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
