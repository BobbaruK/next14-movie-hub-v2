import React from "react";

interface Props {
  params: { id: string; image: string };
}

const ImagePage = ({ params: { id, image } }: Props) => {
  return <div>ImagePage: {image} - {id}</div>;
};

export default ImagePage;
