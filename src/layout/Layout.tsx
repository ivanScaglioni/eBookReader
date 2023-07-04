import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import FlagARG from "@/components/ux/FlagARG";

import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
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
