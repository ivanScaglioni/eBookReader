import { useRef, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  InformationCircleIcon,
  FlagIcon,
  AtSymbolIcon,
  BookOpenIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";

const solutions = [
  {
    name: "Inicio",
    description: "pagina principal",
    href: "/",
    icon: FlagIcon,
  },
  {
    name: "Nosotros",
    description: "información sobre C.A.Tac.Ṕol ",
    href: "/#about",
    icon: InformationCircleIcon,
  },
  {
    name: "Biblioteca",
    description: "libros",
    href: "/libros",
    icon: BookOpenIcon,
  },
  {
    name: "Contacto",
    description: "puedes enviar tus consultas a esta dirreccion",
    href: "/#contact",
    icon: AtSymbolIcon,
  },
];

export default function NavBar() {
  const menu = useRef<HTMLDivElement | null>(null);

  const handleMenu = () => {
    if (!menu.current) return;

    if (menu.current.className.includes("menu-close")) {
      menu.current.className = menu.current.className.replace(
        "menu-close",
        "menu-open"
      );
    } else if (menu.current.className.includes("menu-open")) {
      menu.current.className = menu.current.className.replace(
        "menu-open",
        "menu-close"
      );
    } else {
      menu.current.className = menu.current.className.replace(
        "menu",
        "menu-open"
      );
    }
    console.log(menu.current.className);
  };

  return (
    <>
      {/* <div className="z-50   fixed">
        <div
          ref={menu}
          className="menu  w-screen fixed flex justify-center flex-col items-center  overflow-hidden top-0 "
        >
          <div className=" h-full w-full  flex flex-col items-center max-w-5xl ">
            <Link href="#hola" ></Link>
            <Link href="#hola" > hola</Link>
            <Link href="#hola" > hola</Link>
            <Link href="#hola" > hola</Link>
  

          </div>
        </div>
        <div className="w-screen  flex justify-center">
          <div className="w-screen  max-w-[1000px] flex justify-end ">
            <div
              className="w-10  h-6 mr-3  z-50 "
              onClick={handleMenu}

              
            >
              <div className="grid  grid-navbar w-full h-full grid-cols-5 grid-rows-3">

                <div className="col-span-5 border  bg-sky-300">
                  
                </div>

                <div className="col-span-2   bg-white-50">
                  
                </div>

                <div className="col-span-1  bg-yellow-400">
                  
                </div>

                <div className="  col-span-2   bg-white-50">
                  
                </div>
                <div className="col-span-5   border bg-sky-300">
                  
                </div>

              </div>

            </div>
          </div>
        </div>
      </div> */}

      <Popover className="fixed z-50 w-full flex navbar justify-center ">
        <Popover.Button className="inline-flex items-center text-sm font-semibold bg-slate-50  text-gray-900">
          <div className="w-10  h-6   z-50 " onClick={handleMenu}>
            <div className="grid border  grid-navbar w-full h-full grid-cols-5 grid-rows-3">
              <div className="col-span-5  bg-sky-300"></div>

              <div className="col-span-2   bg-white-50"></div>

              <div className="col-span-1 rounded-full overflow-hidden  bg-yellow-400"></div>

              <div className="  col-span-2   bg-white-50"></div>
              <div className="col-span-5    bg-sky-300"></div>
            </div>
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 ">
            <div className="popover w-screen mt-6 max-w-md flex-auto overflow-hidden rounded-md bg-white text-sm leading-6 shadow-lg ring-1  ring-gray-900/5">
              <div className="p-4">
                {solutions.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex gap-x-6 rounded-lg p-4  hover:bg-gray-800"
                  >
                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg  group-hover:bg-white">
                      <item.icon
                        className="h-6 w-6 text-white-50 group-hover:text-sky-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <Link
                        href={item.href}
                        className="font-semibold text-white-200"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-slate-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}
