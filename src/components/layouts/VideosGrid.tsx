"use client";

import MyAPIClient from "@/services/myApiClient";
import {
  VideoType,
  VideoTypeLink,
  VideosResponse,
} from "@/types/VideoResponse";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import VideoCard from "../Cards/VideoCard";
import { MediaType } from "@/types/MediaType";

interface Props {
  queryKey: string;
  endpoint: string;
  videoType: VideoType;
  videoTypeLink: VideoTypeLink;
  titleType: MediaType;
}

const VideosGrid = ({
  queryKey,
  endpoint,
  videoType,
  videoTypeLink,
  titleType,
}: Props) => {
  const { id } = useParams<{ id: string }>();

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
