import SearchFiltering from "@/components/Sidebar/SearchFiltering";
import {
  RQ_SEARCH_COLLECTION_ENDPOINT,
  RQ_SEARCH_COLLECTION_KEY,
  RQ_SEARCH_COMPANY_ENDPOINT,
  RQ_SEARCH_COMPANY_KEY,
  RQ_SEARCH_KEYWORD_ENDPOINT,
  RQ_SEARCH_KEYWORD_KEY,
  RQ_SEARCH_MOVIE_ENDPOINT,
  RQ_SEARCH_MOVIE_KEY,
  RQ_SEARCH_MULTI_ENDPOINT,
  RQ_SEARCH_MULTI_KEY,
  RQ_SEARCH_PEOPLE_ENDPOINT,
  RQ_SEARCH_PEOPLE_KEY,
  RQ_SEARCH_TVSHOW_ENDPOINT,
  RQ_SEARCH_TVSHOW_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { People } from "@/types/people/PeoplesResponse";
import { SearchCollection } from "@/types/search/collections";
import { SearchCompany } from "@/types/search/companies";
import { SearchKeyword } from "@/types/search/keywords";
import { SearchMovieResponse } from "@/types/search/movies";
import { SearchTVShowResponse } from "@/types/search/tvshows";
import { searchFetchConfig } from "@/utils/searchFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import MainTitleSidebarLeft from "../MainTitle/SidebarLeft";

interface Props {
  query: string;
  contentGrid: ReactNode;
  page: number;
}

const SearchPageComponent = async ({ query, contentGrid, page }: Props) => {
  const queryClient = new QueryClient();

  const searchConfig = searchFetchConfig(page, query);

  // Search Movie
  const apiClientSearchMovie = new MyAPIClient<
    MainTitleResponse<SearchMovieResponse>
  >(RQ_SEARCH_MOVIE_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_MOVIE_KEY(query), searchConfig.params],
    queryFn: () => apiClientSearchMovie.getAll(searchConfig),
  });

  // Search TV Show
  const apiClientSearchTVShow = new MyAPIClient<
    MainTitleResponse<SearchTVShowResponse>
  >(RQ_SEARCH_TVSHOW_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_TVSHOW_KEY(query), searchConfig.params],
    queryFn: () => apiClientSearchTVShow.getAll(searchConfig),
  });

  // Search People
  const apiClientSearchPeople = new MyAPIClient<MainTitleResponse<People>>(
    RQ_SEARCH_PEOPLE_ENDPOINT,
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_PEOPLE_KEY(query), searchConfig.params],
    queryFn: () => apiClientSearchPeople.getAll(searchConfig),
  });

  // Search Collection
  const apiClientSearchCollection = new MyAPIClient<
    MainTitleResponse<SearchCollection>
  >(RQ_SEARCH_COLLECTION_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_COLLECTION_KEY(query), searchConfig.params],
    queryFn: () => apiClientSearchCollection.getAll(searchConfig),
  });

  // Search Company
  const apiClientSearchCompany = new MyAPIClient<
    MainTitleResponse<SearchCompany>
  >(RQ_SEARCH_COMPANY_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_COMPANY_KEY(query), searchConfig.params],
    queryFn: () => apiClientSearchCompany.getAll(searchConfig),
  });

  // Search Keywords
  const apiClientSearchKeywords = new MyAPIClient<
    MainTitleResponse<SearchKeyword>
  >(RQ_SEARCH_KEYWORD_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_KEYWORD_KEY(query), searchConfig.params],
    queryFn: () => apiClientSearchKeywords.getAll(searchConfig),
  });

  // Search Multi
  const apiClientSearchMulti = new MyAPIClient<
    SearchMovieResponse | SearchTVShowResponse | People
  >(RQ_SEARCH_MULTI_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_MULTI_KEY(query), searchConfig.params],
    queryFn: () => apiClientSearchMulti.getAll(searchConfig),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainTitleSidebarLeft
        content={contentGrid}
        sidebar={<SearchFiltering />}
      />
    </HydrationBoundary>
  );
};

export default SearchPageComponent;
