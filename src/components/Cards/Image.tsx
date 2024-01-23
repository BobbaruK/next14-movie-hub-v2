import { ImageShape } from "@/types/ImagesResponse";
import React from "react";
import ImageTMDB from "../ImageTMDB";
import imageLink from "@/utils/imageLink";
import { BackdropSizes } from "@/types/imageSizes";

interface Props {
  image: ImageShape;
}

const ImageCard = ({ image }: Props) => {
  return (
    <div className="card overflow-hidden bg-base-100 shadow-md shadow-primary">
      {/* TODO: chiar tre sa facem ceva cu img */}
      <ImageTMDB
        alt={image.file_path}
        src={imageLink<BackdropSizes>(
          "https://image.tmdb.org/t/p/",
          "w300",
          image.file_path,
        )}
        width={image.width}
        height={image.height}
      />
      <div className="flex flex-col items-start gap-4 p-3 ">
        <p>Aspect Ratio: {image.aspect_ratio}</p>
        <p>Width: {image.width}</p>
        <p>Height: {image.height}</p>
        <p>Average vote: {image.vote_average}</p>
      </div>
    </div>
  );
};

export default ImageCard;
