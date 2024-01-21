"use client";

import MyAPIClient from "@/services/myApiClient";
import { VideosResponse } from "@/types/VideoResponse";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "../Cards/VideoCard";
import { useSearchParams } from "next/navigation";

interface Props {
  queryKey: string;
  endpoint: string;
  videoType:
    | "trailer"
    | "teaser"
    | "clip"
    | "behind-the-scenes"
    | "bloopers"
    | "featurette"
    | "opening-credits";
}

const VideosGrid = ({ queryKey, endpoint, videoType }: Props) => {
  const apiClientVideos = new MyAPIClient<VideosResponse>(endpoint);

  const { data, error, isLoading } = useQuery<VideosResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClientVideos.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading videos...</div>;

  if (!data?.results.length)
    return (
      <div className="appContaier">
        <div className="alert alert-warning">No videos</div>
      </div>
    );

  const videos = data.results.filter((video) => {
    const theVideoType = video.type.toLowerCase().replace(/\s/g, "-");

    // console.log(theVideoType, videoType, theVideoType === videoType);

    return theVideoType === videoType;
  });

  if (videos.length === 0)
    return <div className="alert alert-warning">No videos</div>;

  return (
    <div className="flex flex-col gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideosGrid;
