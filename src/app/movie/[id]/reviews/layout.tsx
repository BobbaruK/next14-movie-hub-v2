import { RQ_MOVIE_REVIEWS_ENDPOINT, RQ_MOVIE_REVIEWS_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { Review } from "@/types/movies/Reviews";
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

const MovieReviewsLayout = async ({ params: { id }, children }: Props) => {
  const queryClient = new QueryClient();

  // Alternative Titles
  const apiClientReviews = new MyAPIClient<MainTitleResponse<Review>>(
    RQ_MOVIE_REVIEWS_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_REVIEWS_KEY(id)],
    queryFn: () => apiClientReviews.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      sda
      {children}
    </HydrationBoundary>
  );
};

export default MovieReviewsLayout;
