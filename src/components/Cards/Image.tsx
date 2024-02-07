import { ImageShape } from "@/types/ImagesResponse";
import TMDBImages from "../TMDBImages";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { ImageDetails } from "@/types/ImageDetails";

interface Props {
  image: ImageShape;
  imageDetails: ImageDetails;
}

const ImageCard = ({ image, imageDetails }: Props) => {
  return (
    <>
      <Card className="overflow-hidden">
        <TMDBImages
          type={imageDetails.type}
          alt={image.file_path}
          src={image.file_path}
          // sizes="238px"
          sizes={imageDetails.sizes}
          className={cn(`w-full  ${imageDetails.classes || ""}`)}
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
