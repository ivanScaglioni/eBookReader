import React from "react";

function Catacpol() {
  return (
    <>
      <div
        id="catacpol"
        className="css-flag w-full h-screen  flex justify-center   items-center"
      >
        <div className="flex h-screen items-center flex-col z-30  text-sky-200">
          <div className="flex  items-center justify-end gap-4 h-1/3 flex-col catacpol ">
            <div className="text-5xl max-sm:text-4xl mb-4 font-[Railway]">
              C.A.Tac.Pol
            </div>
          </div>

          <div className="h-1/3"></div>

          <div className="h-1/3 font-[Stencil] text-4xl text-center max-sm:text-3xl lema pt-4">
            Centro de Adiestramiento Táctico Policial
          </div>
        </div>

        <div className="sol z-30  w-[25vh] h-[25vh]   "></div>

        <div className="shadow w-full h-screen absolute"></div>
      </div>
    </>
  );
}

export default Catacpol;
