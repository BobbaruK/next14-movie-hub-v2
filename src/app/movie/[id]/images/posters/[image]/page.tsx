import BackToMain from "@/components/BackToMain/BackToMain";
import React from "react";

interface Props {
  params: { id: string; image: string };
}

const ImagePage = ({ params: { id, image } }: Props) => {
  return (
    <>
      <BackToMain />
      ImagePage: {image} - {id} 
    </>
  );
};

export default ImagePage;
