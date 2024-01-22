import { ImageShape } from "@/types/ImagesResponse";
import React from "react";

interface Props {
  image: ImageShape;
}

const ImageCard = ({ image }: Props) => {
  return <div className="card bg-base-100 shadow-md shadow-primary">Image</div>;
};

export default ImageCard;
