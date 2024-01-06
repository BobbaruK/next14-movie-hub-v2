"use client";

import Image, { ImageLoaderProps } from "next/image";

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}`;
};

interface Props {
  type: "backdrop" | "logo" | "poster" | "profile" | "still";
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

const ImageTMDB = ({ type, src, alt, width, height, priority }: Props) => {
  return (
    <>
      <Image
        loader={imageLoader}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        title={alt}
      />
    </>
  );
};

export default ImageTMDB;
