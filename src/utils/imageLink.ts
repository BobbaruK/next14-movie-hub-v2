import noImage from "../../public/noimage.svg";

const imageLink = <T>(
  secureURL: string,
  imageSize: T,
  posterPath: string | null,
): string => {
  if (!posterPath) return noImage;

  return secureURL + imageSize + posterPath;
};

export default imageLink;
