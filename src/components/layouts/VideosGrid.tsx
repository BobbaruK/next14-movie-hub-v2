"use client";

import MyAPIClient from "@/services/myApiClient";
import { VideosResponse } from "@/types/VideoResponse";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "../Cards/VideoCard";
import { useSearchParams } from "next/navigation";

interface Props {
  queryKey: string;
  endpoint: string;
}

const VideosGrid = ({ queryKey, endpoint }: Props) => {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  const filter = filterParam ? filterParam : "trailer";

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
    const videoType = video.type.toLowerCase().replace(/\s/g, "-");
    const filterType = filter.toLowerCase();

    return videoType === filterType;
  });

	if (videos.length === 0) return <div>No Results</div>

  return (
    <div className="flex flex-col gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideosGrid;
