import { RQ_MOVIE_VIDEOS_ENDPOINT, RQ_MOVIE_VIDEOS_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { VideosResponse } from "@/types/VideoResponse";
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

const MovieVideoLayout = async ({ params: { id }, children, modal }: Props) => {
  const queryClient = new QueryClient();

  // Translations
  const apiClientMovieViedeos = new MyAPIClient<VideosResponse>(
    RQ_MOVIE_VIDEOS_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_VIDEOS_KEY(id)],
    queryFn: () => apiClientMovieViedeos.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {modal}
      {children}
    </HydrationBoundary>
  );
};

export default MovieVideoLayout;
