import React from "react";

import EmbeddedMap from "./EmbeddedMap";

export default function Contact() {
  return (
    <>
      <div className="w-full  overflow-hidden">
        <div className="flex  gap-5 flex-wrap-reverse justify-around">
          <div>
            <EmbeddedMap />
          </div>
          <div className="flex flex-col items-center  w-[300px]">
            <div className="title">Contacto</div>
            <div id="contact" className="text-justify">
              <p>

              Si deseas obtener más información sobre la biblioteca táctica digital escibir a:
              </p>
              <p className="text-sky-400">

               bibliotecadigitalcatacpol@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bullet absolute left-0 blur-md"></div>
        <div className="footer-bullet absolute left-0"></div>
      </div>
    </>
  );
}
