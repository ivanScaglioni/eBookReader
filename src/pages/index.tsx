import Head from "next/head";
import Layout from "@/layout/Layout";
import { trpc } from "../utils/trpc";
import Link from "next/link";

import Catacpol from "@/components/ux/Catacpol";
import Welcome from "@/components/sections/Welcome";
import Contact from "@/components/sections/Contact";
import About from "@/components/sections/About";
import War from "@/components/ux/War";
import Loading from "@/components/ux/Loading";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <>

      <Layout>
        <main>
          <div className="flex  z-50">
            <div className=" w-screen z-30">
              <Catacpol />
            </div>
          </div>

          <div className="mt-20  z-30 justify-center  flex gap-6  ">
            <div className="max-w-[900px] w-[100vw] z-30 flex flex-col  gap-6">
              <Welcome />
              <About />
              <Contact />
            </div>
          </div>

          <War />
        </main>
      </Layout>
    </>
  );
}
