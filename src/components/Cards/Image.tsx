import { ImageShape } from "@/types/ImagesResponse";
import TMDBImages from "../TMDBImages";

interface Props {
  image: ImageShape;
}

const ImageCard = ({ image }: Props) => {
  return (
    <div className="card overflow-hidden bg-base-100 shadow-md shadow-primary">
      <TMDBImages
        type={{ type: "backdrop", size: "w300" }}
        alt={image.file_path}
        src={image.file_path}
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
