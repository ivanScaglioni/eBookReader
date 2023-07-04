import React, { useEffect, useRef } from "react";

const bulletStats = {
  size: {
    max: 150,
    min: 50,
  },
  delay: {
    max: 5,
    min: 0,
  },
  duration: {
    max: 5,
    min: 2,
  },
};

export default function War() {
  const parentElementRef = useRef<HTMLDivElement>(null);
  const bulletIntervalRef = useRef<number | null>(null);

  const createBullet = (): HTMLDivElement => {
    const parent = parentElementRef.current;
    if (!parent) throw new Error("Parent element not found");

    const bulletElement = document.createElement("div");
    bulletElement.className = "bullet";
    const max = parent.clientWidth;
    const min = 1;
    const left = Math.floor(Math.random() * (max - min + 1) + min);
    bulletElement.style.left = `${left}px`;
    bulletElement.style.animationDelay = `${Math.floor(
      Math.random() * (bulletStats.delay.max - bulletStats.delay.min + 1) +
        bulletStats.delay.min
    )}s`;
    bulletElement.style.width = `${Math.floor(
      Math.random() * (bulletStats.size.max - bulletStats.size.min + 1) +
        bulletStats.size.min
    )}px`;
    bulletElement.style.height = `${Math.floor(
      Math.random() * (bulletStats.size.max - bulletStats.size.min + 1) +
        bulletStats.size.min
    )}px`;
    bulletElement.style.animationDuration = `${Math.floor(
      Math.random() *
        (bulletStats.duration.max - bulletStats.duration.min + 1) +
        bulletStats.duration.min
    )}s`;
    bulletElement.addEventListener("animationend", () => {
      parent.removeChild(bulletElement);
    });
    return bulletElement;
  };

  const mainFunction = () => {
    //console.log('Shot');
    const parent = parentElementRef.current;
    if (!parent) return;

    const newBullet = createBullet();
    parent.appendChild(newBullet);

    for (let index = 0; index < parent.childNodes.length; index++) {
      const bulletElement = parent.childNodes[index];
      //console.log(bulletElement)
    }
  };

  const start = () => {
    if (!bulletIntervalRef.current) {
      bulletIntervalRef.current = window.setInterval(mainFunction, 3000);
    }
  };

  useEffect(() => {
    start();

    return () => {
      if (bulletIntervalRef.current) {
        window.clearInterval(bulletIntervalRef.current);
        bulletIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="war"
      ref={parentElementRef}
      className="h-screen w-screen fixed z-0 top-0"
    ></div>
  );
}
