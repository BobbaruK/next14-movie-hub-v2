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
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import MainTitleSidebarLeft from "../MainTitle/SidebarLeft";
import page from "@/app/tv/[id]/seasons/[seasonNumber]/[episodeNumber]/cast/page";

interface Props {
  query: string;
  contentGrid: ReactNode;
  page: number;
}

const SearchPageComponent = async ({ query, contentGrid, page }: Props) => {
  console.log(page);
  const queryClient = new QueryClient();

  // Search Movie
  const apiClientSearchMovie = new MyAPIClient<
    MainTitleResponse<SearchMovieResponse>
  >(RQ_SEARCH_MOVIE_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_MOVIE_KEY(query)],
    queryFn: () =>
      apiClientSearchMovie.getAll({
        params: {
          query: query,
          page: page || 1,
        },
      }),
  });

  // Search TV Show
  const apiClientSearchTVShow = new MyAPIClient<
    MainTitleResponse<SearchTVShowResponse>
  >(RQ_SEARCH_TVSHOW_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_TVSHOW_KEY(query)],
    queryFn: () =>
      apiClientSearchTVShow.getAll({
        params: {
          query: query,
          page: page || 1,
        },
      }),
  });

  // Search People
  const apiClientSearchPeople = new MyAPIClient<MainTitleResponse<People>>(
    RQ_SEARCH_PEOPLE_ENDPOINT,
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_PEOPLE_KEY(query)],
    queryFn: () =>
      apiClientSearchPeople.getAll({
        params: {
          query: query,
          page: page || 1,
        },
      }),
  });

  // Search Collection
  const apiClientSearchCollection = new MyAPIClient<
    MainTitleResponse<SearchCollection>
  >(RQ_SEARCH_COLLECTION_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_COLLECTION_KEY(query)],
    queryFn: () =>
      apiClientSearchCollection.getAll({
        params: {
          query: query,
          page: page || 1,
        },
      }),
  });

  // Search Company
  const apiClientSearchCompany = new MyAPIClient<
    MainTitleResponse<SearchCompany>
  >(RQ_SEARCH_COMPANY_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_COMPANY_KEY(query)],
    queryFn: () =>
      apiClientSearchCompany.getAll({
        params: {
          query: query,
          page: page || 1,
        },
      }),
  });

  // Search Keywords
  const apiClientSearchKeywords = new MyAPIClient<
    MainTitleResponse<SearchKeyword>
  >(RQ_SEARCH_KEYWORD_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_KEYWORD_KEY(query)],
    queryFn: () =>
      apiClientSearchKeywords.getAll({
        params: {
          query: query,
          page: page || 1,
        },
      }),
  });

  // Search Multi
  const apiClientSearchMulti = new MyAPIClient<
    SearchMovieResponse | SearchTVShowResponse | People
  >(RQ_SEARCH_MULTI_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_SEARCH_MULTI_KEY(query)],
    queryFn: () =>
      apiClientSearchMulti.getAll({
        params: {
          query: query,
          page: page || 1,
        },
      }),
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
