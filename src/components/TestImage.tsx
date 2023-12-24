"use client";

import Image from "next/image";

interface ImageLoaderParams {
  src: string;
  width: number;
  quality: number;
}

const imageLoader = ({ src = "", width = 0, quality = 0 }) => {
  // return `https://example.com/${src}?w=${width}&q=${quality || 75}`

  let actualWidth = "";
  if (window.innerWidth > 780) {
    actualWidth = 'original'
    width= 1000
  }
  if (window.innerWidth <= 780) {
    actualWidth = 'w780'
    width = 780
  }
  if (window.innerWidth <= 500) {
    actualWidth = 'w500'
    width = 500
  }

  // "w92",
  // "w154",
  // "w185",
  // "w342",
  // "w500",
  // "w780",
  // "original"

  return `https://image.tmdb.org/t/p/w500/${src}?W=${width}`;
};

const TestImage = () => {
  return (
    <div>
      <Image
        loader={imageLoader}
        src="/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg"
        alt="pula"
        width={500}
        height={750}
      />
    </div>
  );
};

export default TestImage;
