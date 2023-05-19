import { useEffect, useState } from "react";

import { MoonIcon } from "@heroicons/react/24/solid";

import { SunIcon } from "@heroicons/react/24/outline";

import { LightBulbIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitch() {
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    if (document) {
      if (document.documentElement.className.includes('dark')) {
        setIsToggled(true);
      } else {
        setIsToggled(false);
      }
    }
    
  }, []);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    handleTheme();
  };

  const handleTheme = () => {
    if (!document) return;
    if (document.documentElement.className.includes('dark')) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }

  };

  return (
    <>
      <button
        onClick={handleToggle}
        className={`relative w-8 h-4 rounded-full ${
          isToggled ? "bg-green-500" : "bg-gray-400"
        } focus:outline-none`}
      >
        <span
          className={`absolute inset-0 w-4 h-4 bg-white-50 rounded-full shadow transform transition ${
            isToggled ? "translate-x-full" : "translate-x-0"
          }`}
        ></span>
      </button>
    </>
  );
}
