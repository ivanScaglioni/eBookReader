import React from "react";

function FlagARG({ sun }: { sun: Boolean }) {
  return (
    <>
      <div className="w-full fixed  h-screen -z-50 css-flag flex  justify-start items-center">
        {sun && (
          <div className="w-[23vmax] h-[23vmax] min-h-[100px] min-w-[100px] max-h-[20vmin] max-w-[20vmin]  sol z-50"></div>
        )}
      </div>
      <div className="w-full fixed  h-screen -z-40 flex texture"></div>
    </>
  );
}

export default FlagARG;
