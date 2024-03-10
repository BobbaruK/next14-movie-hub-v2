"use client";

import {
  RQ_SEARCH_COLLECTION_KEY,
  RQ_SEARCH_COMPANY_KEY,
  RQ_SEARCH_KEYWORD_KEY,
  RQ_SEARCH_MOVIE_KEY,
  RQ_SEARCH_PEOPLE_KEY,
  RQ_SEARCH_TVSHOW_KEY,
} from "@/constants";
import { MainTitleResponse } from "@/types/MainTitleResponse";
import { People } from "@/types/people/PeoplesResponse";
import { SearchCollection } from "@/types/search/collections";
import { SearchCompany } from "@/types/search/companies";
import { SearchKeyword } from "@/types/search/keywords";
import { SearchMovieResponse } from "@/types/search/movies";
import { SearchTVShowResponse } from "@/types/search/tvshows";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const SearchFiltering = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  // Search Movie
  const { data: searchedMovies } = useQuery<
    MainTitleResponse<SearchMovieResponse>
  >({
    queryKey: [RQ_SEARCH_MOVIE_KEY(searchQuery || "")],
  });

  // Search TV Show
  const { data: searchedTVShows } = useQuery<
    MainTitleResponse<SearchTVShowResponse>
  >({
    queryKey: [RQ_SEARCH_TVSHOW_KEY(searchQuery || "")],
  });

  // Search People
  const { data: searchedPeople } = useQuery<MainTitleResponse<People>>({
    queryKey: [RQ_SEARCH_PEOPLE_KEY(searchQuery || "")],
  });

  // Search Collection
  const { data: searchedCollection } = useQuery<
    MainTitleResponse<SearchCollection>
  >({
    queryKey: [RQ_SEARCH_COLLECTION_KEY(searchQuery || "")],
  });

  // Search Company
  const { data: searchedCompany } = useQuery<MainTitleResponse<SearchCompany>>({
    queryKey: [RQ_SEARCH_COMPANY_KEY(searchQuery || "")],
  });

  // Search Keyword
  const { data: searchedKeyword } = useQuery<MainTitleResponse<SearchKeyword>>({
    queryKey: [RQ_SEARCH_KEYWORD_KEY(searchQuery || "")],
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const searchFilters = [
    {
      label: "Movies",
      key: "movies",
      href: `/search/movie?${createQueryString("query", searchQuery || "")}`,
      count: searchedMovies?.total_results || 0,
    },
    {
      label: "TV Shows",
      key: "tvshows",
      href: `/search/tv?${createQueryString("query", searchQuery || "")}`,
      count: searchedTVShows?.total_results || 0,
    },
    {
      label: "People",
      key: "people",
      href: `/search/person?${createQueryString("query", searchQuery || "")}`,
      count: searchedPeople?.total_results || 0,
    },
    {
      label: "Collections",
      key: "collections",
      href: `/search/collection?${createQueryString("query", searchQuery || "")}`,
      count: searchedCollection?.total_results || 0,
    },
    {
      label: "Companies",
      key: "companies",
      href: `/search/company?${createQueryString("query", searchQuery || "")}`,
      count: searchedCompany?.total_results || 0,
    },
    {
      label: "Keywords",
      key: "keywords",
      href: `/search/keyword?${createQueryString("query", searchQuery || "")}`,
      count: searchedKeyword?.total_results || 0,
    },
    // {
    //   label: "Networks",
    //   key: "networks",
    //   href: "/search/?networks",
    //   count: 0,
    // },
  ];

  return (
    <Card className="overflow-hidden">
      <h2 className="m-0 flex items-center justify-between bg-primary px-2 py-4 text-primary-foreground">
        Search Results
      </h2>
      <CardContent className="p-0">
        <ul className="flex flex-col gap-1 py-2">
          {searchFilters.map((li) => {
            const [path] = li.href.split("?");
            const isActive = pathname === path;

            return (
              <li
                key={li.key}
                className={`p-2 hover:bg-secondary hover:text-secondary-foreground ${isActive ? "text-accent-content bg-primary-foreground text-primary" : "hover:bg-secondary hover:text-secondary-foreground"}`}
              >
                <Link
                  href={li.href}
                  className={[
                    "flex",
                    "items-center",
                    "justify-between",
                    "w-full",
                  ].join(" ")}
                >
                  {li.label}
                  <Badge>{li.count}</Badge>
                </Link>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SearchFiltering;
