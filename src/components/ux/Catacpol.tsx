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
            <div className="text-5xl max-sm:text-4xl font-[Railway]">C.A.Tac.Pol</div>
            <div className=" font-[Stencil] pb-4 max-sm:text-2xl text-3xl text-justify">
              Centro de adiestramiento tactico policial
            </div>
          </div>

          <div className="h-1/3"></div>

          <div className="h-1/3 font-[Stencil] text-3xl lema pt-4">

          </div>
        </div>

        <div className="sol z-30  w-[23vmax] h-[23vmax] min-h-[100px] min-w-[100px] max-h-[20vmin] max-w-[20vmin]"></div>

        <div className="shadow w-full h-screen absolute "></div>
      </div>
    </>
  );
}

export default Catacpol;
