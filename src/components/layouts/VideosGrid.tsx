"use client";

import { MediaType } from "@/types/MediaType";
import {
  VideoType,
  VideoTypeLink,
  VideosResponse,
} from "@/types/VideoResponse";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useParams } from "next/navigation";
import VideoCard from "../Cards/Video";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";

interface Props {
  queryKey: string;
  videoType: VideoType;
  videoTypeLink: VideoTypeLink;
  titleType: MediaType;
}

const VideosGrid = ({
  queryKey,
  videoType,
  videoTypeLink,
  titleType,
}: Props) => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery<VideosResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading) {
    const CARD_COUNT = 5;
    const CARDS = Array.from(Array(CARD_COUNT).keys());

    return (
      <div className="flex flex-col gap-6">
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>Loading videos...</AlertDescription>
        </Alert>
        {CARDS.map((card) => (
          <div
            key={card}
            className="card bg-base-100 flex max-h-56 overflow-hidden shadow-md shadow-primary sm:flex-row"
          >
            <Skeleton className="h-[300px] w-[200px] rounded" />
            <div className="p-3 sm:basis-2/3">
              <Skeleton className="mb-4 h-[20px] w-[200px] rounded" />
              <Skeleton className="h-[10px] w-full rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const videos = data?.results.filter((video) => {
    const theVideoType = video.type.toLowerCase().replace(/\s/g, "-");

    // console.log(theVideoType, videoType, theVideoType === videoType);

    return theVideoType === videoType;
  });

  if (videos?.length === 0)
    return (
      <div className="appContaier">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>No videos found</AlertDescription>
        </Alert>
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      {videos?.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          mainTitleID={id}
          videoTypeLink={videoTypeLink}
          titleType={titleType}
        />
      ))}
    </div>
  );
};

export default VideosGrid;
