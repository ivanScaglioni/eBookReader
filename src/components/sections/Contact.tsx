import React from "react";

import EmbeddedMap from "./EmbeddedMap";

export default function Contact() {
  return (
    <>
      <div className="w-full  overflow-hidden">
        <div className="flex flex-wrap-reverse justify-around">
          <div>
            <EmbeddedMap />
          </div>
          <div className="flex flex-col items-center  w-[300px]">
            <div className="title">Contacto</div>
            <div id="contact" className="text-justify">
              Si deseas obtener más información sobre nuestros cursos, adquirir
              nuestros libros especializados o simplemente tienes alguna
              pregunta, no dudes en ponerte en contacto con nosotros. Nuestro
              equipo de profesionales capacitados está listo para brindarte toda
              la información que necesites. Puedes comunicarte con nosotros a
              través de los siguientes medios: Dirección: Calle Principal,
              Ciudad de Mendoza, Argentina Teléfono: +54 123456789 Correo
              electrónico: info@catacpolmendoza.com
            </div>
          </div>
        </div>
        <div className="footer-bullet absolute left-0 blur-md"></div>
        <div className="footer-bullet absolute left-0"></div>
      </div>
    </>
  );
}
