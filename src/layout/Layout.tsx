import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import FlagARG from "@/components/ux/FlagARG";
import Head from "next/head";

import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>C.A.Tac.Pol.</title>
        <meta name="description" content="Centro de adiestramineto tactico policial de Mendoza, Argentina" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

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

      {/* 
      <Footer /> */}
    </>
  );
}
