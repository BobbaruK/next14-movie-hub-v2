import BackTo from "@/components/BackTo";
import {
  RQ_MOVIE_ENDPOINT,
  RQ_MOVIE_IMAGES_ENDPOINT,
  RQ_MOVIE_IMAGES_KEY,
  RQ_MOVIE_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { ImagesResponse } from "@/types/ImagesResponse";
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

export default async function MovieImagesLayout({
  params: { id },
  children,
}: Props) {
  const queryClient = new QueryClient();

  // Images
  const apiClientImages = new MyAPIClient<ImagesResponse>(
    RQ_MOVIE_IMAGES_ENDPOINT(id),
  );
  
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_IMAGES_KEY(id)],
    queryFn: () => apiClientImages.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BackTo
        queryKey={RQ_MOVIE_KEY(id)}
        endpoint={RQ_MOVIE_ENDPOINT(id)}
        backTo={{ label: "Main", link: `/movie/${id}` }}
      />
      {children}
    </HydrationBoundary>
  );
}
