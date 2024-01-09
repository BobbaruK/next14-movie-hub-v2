interface Props {
  params: { id: string; image: string };
}

const ImagePage = ({ params: { id, image } }: Props) => {
  return (
    <>
      ImagePage: {image} - {id}
    </>
  );
};

export default ImagePage;
