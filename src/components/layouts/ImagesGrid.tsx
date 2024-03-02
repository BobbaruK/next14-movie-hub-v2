"use client";

import { GridImagesType } from "@/types/GridImagesType";
import { ImageDetails } from "@/types/ImageDetails";
import { ImagesResponse } from "@/types/ImagesResponse";
import { MediaType } from "@/types/MediaType";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ImageCard from "../Cards/Image";
import CustomAlert from "../CustomAlert";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  queryKey: string;
  imagesType: GridImagesType;
  imageDetails: ImageDetails;
  titleType: MediaType;
}

const ImagesGrid = ({
  queryKey,
  imagesType,
  imageDetails,
  titleType,
  ...restProps
}: Props) => {
  // const { id } = useParams<{ id: string }>();

  const searchParams = useSearchParams();
  const languageImage = searchParams.get("lang");

  const { data, error, isLoading } = useQuery<ImagesResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Images Grid"}
        description="Loading... Please be patient"
      />
    );

  const imagesFn = () => {
    switch (imagesType) {
      case "backdrops":
        return data?.backdrops;

      case "logos":
        return data?.logos;

      case "posters":
        return data?.posters;

      case "profiles":
        return data?.profiles;

      case "stills":
        return data?.stills;

      default:
        break;
    }
  };

  const images = imagesFn();

  if (!images?.length)
    return (
      <CustomAlert
        variant="destructive"
        title={"Images Grid"}
        description="No Images"
      />
    );

  const hasNull =
    images &&
    images.filter((lng) => lng.iso_639_1 === null).length === 0 &&
    languageImage === null
      ? true
      : false;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images
        ?.filter((image) => {
          if (hasNull) return image.iso_639_1 === "en";

          return image.iso_639_1 === languageImage;
        })
        .map((image, index) => (
          <ImageCard
            key={image.file_path + "" + index}
            image={image}
            imageDetails={imageDetails}
            priority={index === 0 ? true : false}
          />
        ))}
    </div>
  );
};

export default ImagesGrid;
