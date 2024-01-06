import React from "react";

import EmbeddedMap from "./EmbeddedMap";

export default function Contact() {
  return (
    <>
      <div className="w-full  overflow-hidden">
        <div className="flex  gap-5 flex-wrap-reverse justify-center">
          <div>
            <EmbeddedMap />
          </div>
          <div className="flex flex-col items-center  w-[300px]  max-sm:w-[100%] max-sm:px-5">
            <div className="title">Contacto</div>
            <div id="contact" className="text-justify max-sm:text-sm">
              <p>
                Si deseas obtener más información sobre la biblioteca táctica
                digital escribir a:
              </p>
              <p className="text-sky-400  text-center mt-3">
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
