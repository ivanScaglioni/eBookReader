import { useRef, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";

import Link from "next/link";

export default function NavBar() {
  const menu = useRef< HTMLDivElement |null>(null)

  const handleMenu = () => {
    if(!menu.current) return

    if(menu.current.className.includes('menu-close')){

      menu.current.className = menu.current.className.replace('menu-close','menu-open')
    }else{

      menu.current.className = menu.current.className.replace('menu-open','menu-close')
    }
  };

  return (
    <>

      <div className="">
        <div ref={menu} className="menu menu-close w-screen fixed flex justify-center flex-col items-center  overflow-hidden top-0 fn-fal">
        
        <Link href="http://localhost:3000/"> hola</Link>
        <Link href="http://localhost:3000/"> hola</Link>
        <Link href="http://localhost:3000/"> hola</Link>
        <Link href="http://localhost:3000/"> hola</Link>

        </div>
        <div className="w-screen flex justify-center">
          <div className="w-screen  max-w-[1000px] flex justify-start ">
            <div
              className="w-12  h-12 ml-1 bg-gray-950 fn-fal-logo border"
              onClick={handleMenu}
            ></div>
          </div>
        </div>
      </div>

    </>
  );
}
