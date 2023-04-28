import { useState } from "react";

import {  MoonIcon } from "@heroicons/react/24/solid";

import {SunIcon  } from "@heroicons/react/24/outline";

export default function ThemeSwitch() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    handleTheme();
  };

  const handleTheme = () => {
    if (!document) return;
    if (localStorage.theme == "light") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return (
    <>
      <button
        className="m-1 rounded-full focus:outline-none relative flex items-center justify-center"
        onClick={handleToggle}
      >
        <MoonIcon className={`w-7 dark:z-30  dark:text-[#ffffff] text-sky-400 ${isToggled && "opacity-50"}`} />

        <SunIcon  className={`w-6  text-black-900  dark:text-[#ffffff] absolute ${!isToggled && "opacity-50"}`} />
      </button>
    </>
  );
}
