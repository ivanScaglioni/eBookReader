
import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: {
    secure_url: string;
  }[];
}

function Gallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goLeft = () => {
    currentIndex === 0
      ? setCurrentIndex(images.length - 1)
      : setCurrentIndex(currentIndex - 1);
  };

  const goRight = () => {
    currentIndex === images.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex(currentIndex + 1);
  };



  return (
    <div className="relative">
      {images.length > 1 &&
        <>
                <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-l"
          onClick={goLeft}
        >
          &lt;
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-r"
          onClick={goRight}
        >
          &gt;
        </button>
      </div>

        </>

      }

      <div className="flex justify-center">
      <Image
                src={`${images[currentIndex].secure_url}`}
                alt="Gallery"
                className="w-96 h-96 object-contain transition-opacity duration-300"
                width={500}
                height={500}
              />
      </div>
    </div>
  );
}

export default Gallery;