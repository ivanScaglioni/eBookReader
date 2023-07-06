import React, { TouchEventHandler, useEffect, useRef, useState } from "react";

import pol5 from "../../../public/assests/pol/pol5.jpg";

import pol1 from "../../../public/assests/pol/pol-1.jpg";
import pol4 from "../../../public/assests/pol/pol-0.jpg";

import Link from "next/link";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

const points = [
  <div key={1} className="flex flex-col w-full items-center">
    <div className=" h-[700px] min-w-[400px]  animation animation-1 rounded-md overflow-hidden">
      <img className="h-full object-cover" src={pol5.src} alt="" />
    </div>
    <div className=" max-w-[400px] font-semibold w-[100vw] point animation animation-2 text-justify   -translate-y-[150%] p-10 py-20 max-sm:-translate-x-0  -translate-x-20">
      Nuestros principales objetivos son proporcionar a los funcionarios
      policiales las técnicas y tácticas operativas necesarias para el
      cumplimiento efectivo de sus funciones, mejorar su capacidad de respuesta
      ante situaciones críticas y fomentar un enfoque proactivo hacia la
      seguridad y la prevención del delito
    </div>
  </div>,
  <div key={2} className="flex flex-col  items-center">
    <div className="max-h-[700px] w-[500px] animation  animation-4 ">
      <img
        className="max-h-[700px] min-h-[700px] w-[400px] rounded-md overflow-hidden object-cover"
        src={pol4.src}
        alt=""
      />
    </div>
    <div className=" -translate-y-[125%] font-semibold max-w-[400px] point animation text-justify animation-3 z-10 p-10 py-20 translate-x-20 max-sm:-translate-x-0">
      Nuestros programas de capacitación táctica están diseñados para
      proporcionar a los funcionarios policiales las habilidades prácticas y
      tácticas necesarias para responder de manera efectiva, minimizar riesgos y
      proteger vidas. La capacitación constante y la mejora de las capacidades
      profesionales son esenciales para enfrentar los desafíos en un entorno en
      constante evolución y asegurar un servicio policial de calidad.
    </div>
  </div>,

  <div key={3} className="flex flex-col  items-center">
    <div className="max-h-[700px] min-h-[700px] w-[400px]  animation animation-5">
      <img
        className="max-h-[700px] min-h-[700px] object-cover rounded-md overflow-hidden "
        src={pol1.src}
        alt=""
      />
    </div>
    <div className="-translate-y-[185%] font-semibold max-w-[400px] point text-center  animation animation-6 z-10 p-10 py-20 -translate-x-20 max-sm:-translate-x-0">
      En C.A.Tac.Pol, nos regimos por los valores fundamentales de
      profesionalismo, ética, integridad, respeto y compromiso con el servicio
      público.
    </div>
  </div>,
];

const lengthPoints = points.length;

function About() {
  const [i, setI] = useState(0);
  let startX = 0;

  const handlePoint = (n: number) => {
    setI((prevIndex) => {
      let nextIndex = prevIndex + n;
      if (nextIndex < 0) {
        nextIndex = lengthPoints - 1;
      } else if (nextIndex >= lengthPoints) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => handlePoint(1), 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function handleTouchStart(event: any) {
    startX = event.changedTouches[0].clientX;
  }

  function handleTouchEnd(e: any) {
    const endX = e.changedTouches[0].clientX;

    const deltaX = endX - startX;

    if (deltaX > 50) {
      handlePoint(-1);
    } else if (deltaX < -50) {
      handlePoint(1);
    }
  }

  return (
    <div className="max-sm:mx-5 my-8">
      <div className="flex  justify-center">
        <div className="flex flex-col items-center gap-14 max-w-[800px] w-[100vw]">
          <div className=" flex flex-col justify-center  max-sm:p-5 max-w-[100vw]">
            <div className="title self-center">Inicio</div>
            <div className="text-justify max-sm:text-sm">
              Fundado el 19 de mayo de 1999, nuestro centro se dedica a brindar
              a los funcionarios policiales las técnicas y tácticas operativas
              necesarias para el mejor cumplimiento de sus funciones. En
              C.A.Tac.Pol, creemos firmemente que la capacitación adecuada es
              fundamental para salvar vidas. &#34;La victoria favorece a los que
              se preparan&#34;, resume nuestra filosofía de preparar a los
              policías para responder de manera efectiva ante situaciones
              críticas y garantizar la seguridad de la comunidad que servimos.
              Nació con la visión de mejorar la preparación de los funcionarios
              policiales en el desempeño de sus funciones con acciones
              permanentes desde el año 1999 hasta la actualidad
            </div>
          </div>
          <div className="flex flex-col">
            <div className="title self-center">Misión</div>
            <div className="flex w-full items-center">
              <div
                className="flex items-center w-10 max-sm:hidden h-full z-40"
                onClick={() => handlePoint(-1)}
              >
                <ChevronDoubleLeftIcon
                  className="mx-auto w-[250px] text-gray-300 dark:text-black-50 "
                  aria-hidden="true"
                />
              </div>
              <div
                className="flex w-[100vw] max-w-[800px] overflow-hidden  justify-center min-h-[700px] max-h-[700px]"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className=" w-full ">{points[i]}</div>
              </div>
              <div
                className="flex items-center w-10 max-sm:hidden h-full z-40"
                onClick={() => handlePoint(1)}
              >
                <ChevronDoubleRightIcon
                  className="mx-auto w-[250px] text-gray-300 dark:text-black-50 "
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10 my-14">
        <div className="flex flex-col  items-center">
          <div className="title">Recursos</div>

          <div className="text-justify max-sm:text-sm">
            En C.A.Tac.Pol Valoramos la importancia de compartir el conocimiento
            y estamos comprometidos en proporcionar recursos que impulsen el
            crecimiento profesional de nuestros policías. La primer biblioteca
            táctica virtual: Nuestra biblioteca cuenta con una variedad de
            títulos escritos por expertos en el campo de la seguridad y la
            aplicación de la ley. Estos libros abarcan una amplia gama de temas
            como: tácticas y técnicas policiales, estrategias de combate,
            mantenimiento y cuidado de equipamiento. Cada obra ha sido
            cuidadosamente seleccionada para proporcionar a los agentes de
            seguridad un recurso confiable y de calidad.
          </div>

          <div className="mt-6 text-xl text-center max-sm:text-base text-sky-400">
            <Link href={"/libros"}>
              Ir a la bibliocteca virtual de C.A.Tac.Pol.
            </Link>
          </div>
        </div>

        <div className="body max-sm:hidden"></div>
      </div>
    </div>
  );
}

export default About;
