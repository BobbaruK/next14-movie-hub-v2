import { RQ_TVSHOW_EPISODE_ENDPOINT, RQ_TVSHOW_EPISODE_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { EpisodeResponse } from "@/types/movies/tv/EpisodeResponse";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  params: {
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  };
  children: ReactNode;
}

export default async function NoSidebarLayout({
  params: { id, seasonNumber, episodeNumber },
  children, // will be a page or nested layout
}: Props) {
  const queryClient = new QueryClient();

  // Season
  const apiClientRecommendations = new MyAPIClient<EpisodeResponse>(
    RQ_TVSHOW_EPISODE_ENDPOINT(id, seasonNumber, episodeNumber),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_EPISODE_KEY(id, seasonNumber, episodeNumber)],
    queryFn: () => apiClientRecommendations.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
