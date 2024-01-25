"use client";

import MyAPIClient from "@/services/myApiClient";
import { ImagesResponse } from "@/types/ImagesResponse";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import ImageCard from "../Cards/Image";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type ImageType = "backdrops" | "logos" | "posters";

interface Props {
  queryKey: string;
  endpoint: string;
  imagesType: ImageType;
}

const ImagesGrid = ({ queryKey, endpoint, imagesType }: Props) => {
  const apiClientReleases = new MyAPIClient<ImagesResponse>(endpoint);

  const { data, error, isLoading } = useQuery<ImagesResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientReleases.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Loading images...</AlertDescription>
      </Alert>
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
        <ImageCard key={image.file_path + "" + index} image={image} />
      ))}
    </div>
  );
};

export default ImagesGrid;
