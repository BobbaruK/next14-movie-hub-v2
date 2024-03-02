import BackTo from "@/components/BackTo";
import {
  RQ_TVSHOW_EPISODE_ENDPOINT,
  RQ_TVSHOW_EPISODE_EXTERNAL_IDS_ENDPOINT,
  RQ_TVSHOW_EPISODE_EXTERNAL_IDS_KEY,
  RQ_TVSHOW_EPISODE_IMAGES_ENDPOINT,
  RQ_TVSHOW_EPISODE_IMAGES_KEY,
  RQ_TVSHOW_EPISODE_KEY,
  RQ_TVSHOW_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { ExternalIDs } from "@/types/ExternalIDs";
import { ImagesResponse } from "@/types/ImagesResponse";
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

  // Episode External IDs
  const apiClientSeasonExternalIDs = new MyAPIClient<ExternalIDs>(
    RQ_TVSHOW_EPISODE_EXTERNAL_IDS_ENDPOINT(id, seasonNumber, episodeNumber),
  );
  await queryClient.prefetchQuery({
    queryKey: [
      RQ_TVSHOW_EPISODE_EXTERNAL_IDS_KEY(id, seasonNumber, episodeNumber),
    ],
    queryFn: () => apiClientSeasonExternalIDs.getAll(),
  });

  // Episode Images
  const apiClientImages = new MyAPIClient<ImagesResponse>(
    RQ_TVSHOW_EPISODE_IMAGES_ENDPOINT(id, seasonNumber, episodeNumber),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_EPISODE_IMAGES_KEY(id, seasonNumber, episodeNumber)],
    queryFn: () => apiClientImages.getAll(),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </>
  );
}
