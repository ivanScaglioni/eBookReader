import React, { useEffect, useRef } from 'react';

export default function War() {
  const parentElementRef = useRef<HTMLDivElement>(null);
  const bulletIntervalRef = useRef<number | null>(null);

  const createBullet = (): HTMLDivElement => {
    const parent = parentElementRef.current;
    if (!parent) throw new Error('Parent element not found');

    const bulletElement = document.createElement('div');
    bulletElement.className = 'bullet';
    const max = parent.clientWidth;
    const min = 1;
    const left = Math.floor(Math.random() * (max - min + 1) + min);
    bulletElement.style.left = `${left}px`;
    bulletElement.addEventListener('animationend', () => {
      parent.removeChild(bulletElement);
    });
    return bulletElement;
  };

  const mainFunction = () => {
    console.log('Shot');
    const parent = parentElementRef.current;
    if (!parent) return;

    const newBullet = createBullet();
    parent.appendChild(newBullet);

    for (let index = 0; index < parent.childNodes.length; index++) {
      const bulletElement = parent.childNodes[index];
      console.log(bulletElement)
    }
  };

  const start = () => {
    if (!bulletIntervalRef.current) {
      bulletIntervalRef.current = window.setInterval(mainFunction, 1000);
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
      className="border h-screen w-screen fixed z-0 top-0"
    ></div>
  );
}