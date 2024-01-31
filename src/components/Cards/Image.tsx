import { ImageShape } from "@/types/ImagesResponse";
import TMDBImages from "../TMDBImages";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  image: ImageShape;
}

const ImageCard = ({ image, ...restProps }: Props) => {
  return (
    <>
      <Card>
        <TMDBImages
          type={{ type: "backdrop", size: "w300" }}
          alt={image.file_path}
          src={image.file_path}
          sizes="238px"
          className={cn(`w-full rounded-b-none ${restProps.className || ""}`)}
        />
        <CardHeader>
          <CardDescription>
            <p>Width: {image.width}</p>
            <p>Height: {image.height}</p>
            <p>Aspect Ratio: {image.aspect_ratio}</p>
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <p>Average vote: {image.vote_average}</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default ImageCard;
