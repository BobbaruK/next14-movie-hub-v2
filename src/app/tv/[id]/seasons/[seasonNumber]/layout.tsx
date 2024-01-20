import {
  RQ_SEASON_EXTERNAL_IDS_ENDPOINT,
  RQ_SEASON_EXTERNAL_IDS_KEY,
  RQ_TVSHOW_SEASON_ENDPOINT,
  RQ_TVSHOW_SEASON_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { ExternalIDs } from "@/types/ExternalIDs";
import { SeasonResponse } from "@/types/movies/tv/SeasonResponse";
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
  };
  children: ReactNode;
}

export default async function NoSidebarLayout({
  params: { id, seasonNumber },
  children, // will be a page or nested layout
}: Props) {
  const queryClient = new QueryClient();

  // Season
  const apiClientRecommendations = new MyAPIClient<SeasonResponse>(
    RQ_TVSHOW_SEASON_ENDPOINT(id, seasonNumber),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_SEASON_KEY(id, seasonNumber)],
    queryFn: () => apiClientRecommendations.getAll(),
  });

  // Season External IDs
  const apiClientSeasonExternalIDs = new MyAPIClient<ExternalIDs>(
    RQ_SEASON_EXTERNAL_IDS_ENDPOINT(id, seasonNumber),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEASON_EXTERNAL_IDS_KEY(id, seasonNumber)],
    queryFn: () => apiClientSeasonExternalIDs.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
