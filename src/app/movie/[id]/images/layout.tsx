import { RQ_MOVIE_IMAGES_ENDPOINT, RQ_MOVIE_IMAGES_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MovieAlternativeTitles } from "@/types/movies/movie/MovieAlternativeTitles";
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
  modal: ReactNode;
}

export default async function MovieImagesLayout({
  params: { id },
  children,
  modal,
}: Props) {
  const queryClient = new QueryClient();

  // Alternative Titles
  const apiClientImages = new MyAPIClient<MovieAlternativeTitles>(
    RQ_MOVIE_IMAGES_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_IMAGES_KEY(id)],
    queryFn: () => apiClientImages.getAll(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {modal}
      <div>{children}</div>
    </HydrationBoundary>
  );
}
