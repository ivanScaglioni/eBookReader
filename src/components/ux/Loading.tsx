import React from "react";

export default function Loading() {
  return (
    <div className="flex w-full h-screen max-h-full justify-center items-center">
      <div className="flex flex-col items-center gap-2 justify-center">
        <div id="loading"></div>
        <div>cargando...</div>
      </div>
    </div>
  );
}
