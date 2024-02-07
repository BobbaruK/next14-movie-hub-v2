"use client";

import { ImageDetails } from "@/types/ImageDetails";
import { ImagesResponse } from "@/types/ImagesResponse";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import ImageCard from "../Cards/Image";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import CustomAlert from "../CustomAlert";
import Link from "next/link";

type GridImagesType = "backdrops" | "logos" | "posters";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  queryKey: string;
  endpoint: string;
  imagesType: GridImagesType;
  imageDetails: ImageDetails;
}

const ImagesGrid = ({
  queryKey,
  endpoint,
  imagesType,
  imageDetails,
  ...restProps
}: Props) => {
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

  const images = () => {
    switch (imagesType) {
      case "backdrops":
        return data?.backdrops;

      case "logos":
        return data?.logos;

      case "posters":
        return data?.posters;

      default:
        break;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images()?.map((image, index) => (
        <ImageCard
          key={image.file_path + "" + index}
          image={image}
          imageDetails={imageDetails}
        />
      ))}
    </div>
  );
};

export default ImagesGrid;
