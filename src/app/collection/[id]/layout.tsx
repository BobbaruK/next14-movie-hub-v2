import MovieNavigation from "@/components/MovieNavigation";
import { RQ_COLLECTION_ENDPOINT, RQ_COLLECTION_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Collection } from "@/types/Collection";
import { ExternalIDs } from "@/types/ExternalIDs";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import { RecommendationsResponse } from "@/types/movies/Recommendations";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  params: {
    id: string;
  };
  children: ReactNode;
}

export default async function CollectionLayout({
  children, // will be a page or nested layout
  params: { id },
}: Props) {
  const queryClient = new QueryClient();

  // Movie External ID's
  const apiClientExternalIds = new MyAPIClient<Collection>(
    RQ_COLLECTION_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_COLLECTION_KEY(id)],
    queryFn: () => apiClientExternalIds.getAll(),
  });

  const collectionMenu: MainTitleMenuItem[] = [
    {
      label: "Overview",
      children: [
        {
          label: "Main",
          href: `/collection/${id}`,
        },
        {
          label: "Translations",
          href: `/collection/${id}/translations`,
        },
      ],
    },
    {
      label: "Images",
      children: [
        {
          label: "Backdrops",
          href: `/collection/${id}/images/backdrops`,
        },
        {
          label: "Posters",
          href: `/collection/${id}/images/posters`,
        },
      ],
    },
  ];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieNavigation menu={collectionMenu} />
      {children}
    </HydrationBoundary>
  );
}
