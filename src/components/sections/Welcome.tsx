import React from "react";

export default function Welcome() {
  return (
    <>
      <div id="about" className="h-[300px] w-full">
        <div className="welcome h-[300px]  blur-2xl"></div>
        <div className="move">
          <div className="welcome rounded-sm flex items-center justify-center max-sm:text-4xl  text-5xl h-[300px]">
            <div className="welcome-text text-center p-4 font-[Stencil] rounded-sm">
              Bienvenidos al
              <span className=" p-2   text-sky-400">
                Centro de Adiestramiento Táctico Policial
              </span>
              de Mendoza, Argentina
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
