
import  { ReactNode}from "react"


import Footer from "./Footer"
import NavBar from "./NavBar"

export default function Layout({children}: { children: ReactNode }) {
  return (
    <>
        <NavBar/>

        <main>
            {children}
        </main>

        <Footer />
      
    </>

  )
}
