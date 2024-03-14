import CardsGrid from "@/components/layouts/CardsGrid";
import {
  RQ_POPULAR_PERSONS_ENDPOINT,
  RQ_POPULAR_PERSONS_KEY,
  imagesSizesNoSidebar,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { MovieFilterParams } from "@/types/QueryParams";
import { PeopleResponse } from "@/types/people/PeopleResponse";
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
  const apiClientPeoples = new MyAPIClient<MainTitleResponse<PeopleResponse>>(
    RQ_POPULAR_PERSONS_ENDPOINT,
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_POPULAR_PERSONS_KEY, moviesConfig.params],
    queryFn: () => apiClientPeoples.getAll(moviesConfig),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container">
        <CardsGrid
          queryKey={RQ_POPULAR_PERSONS_KEY}
          imageDetails={{
            classes: imagesSizesNoSidebar,
            sizes: `
                (max-width: 320px) 125px,
                (max-width: 639px) 283px,
                (max-width: 767px) 226px,
                (max-width: 1023px) 230px,
                (max-width: 1279px) 294px,
                260px
              `,
            type: "profile",
          }}
        />
      </div>
    </HydrationBoundary>
  );
}
