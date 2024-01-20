"use client";

import Image, { ImageLoaderProps } from "next/image";

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}`;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // type: "backdrop" | "logo" | "poster" | "profile" | "still";
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

const ImageTMDB = ({
  src,
  alt,
  width,
  height,
  priority,
  ...restProps
}: Props) => {
  return (
    <>
      <Image
        {...restProps}
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
