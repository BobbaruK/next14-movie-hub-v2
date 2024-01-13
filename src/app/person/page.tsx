import CardsGridSection from "@/components/CardsGridSection";
import {
  RQ_POPULAR_PERSONS_ENDPOINT,
  RQ_POPULAR_PERSONS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { MovieFilterParams } from "@/types/QueryParams";
import { People } from "@/types/people/PeoplesResponse";
import moviesFetchConfig from "@/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

interface Props {
  searchParams: MovieFilterParams;
}

export default async function Persons({
  searchParams: { page, with_genres, sort_by, with_original_language },
}: Props) {
  const pageNumber = parseInt(page);

  const queryClient = new QueryClient();

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_genres,
    with_original_language,
    sort_by,
  );

  // Recommendations
  const apiClientPeoples = new MyAPIClient<MainTitleResponse<People>>(
    RQ_POPULAR_PERSONS_ENDPOINT,
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_POPULAR_PERSONS_KEY, moviesConfig.params],
    queryFn: () => apiClientPeoples.getAll(moviesConfig),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="appContaier">
        <CardsGridSection
          page={pageNumber}
          with_genres={with_genres}
          sort_by={sort_by}
          with_original_language={with_original_language}
          queryKey={RQ_POPULAR_PERSONS_KEY}
          endpoint={RQ_POPULAR_PERSONS_ENDPOINT}
        />
      </div>
    </HydrationBoundary>
  );
}
