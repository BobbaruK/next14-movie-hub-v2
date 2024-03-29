import MovieNavigation from "@/components/MovieNavigation";
import {
  RQ_LANGUAGES_ENDPOINT,
  RQ_LANGUAGES_KEY,
  RQ_MOVIE_CAST_ENDPOINT,
  RQ_MOVIE_CAST_KEY,
  RQ_MOVIE_ENDPOINT,
  RQ_MOVIE_EXTERNAL_IDS_ENDPOINT,
  RQ_MOVIE_EXTERNAL_IDS_KEY,
  RQ_MOVIE_KEY,
  RQ_MOVIE_KEYWORDS_ENDPOINT,
  RQ_MOVIE_KEYWORDS_KEY,
  RQ_MOVIE_RECOMMENDATIONS_ENDPOINT,
  RQ_MOVIE_RECOMMENDATIONS_KEY,
  RQ_MOVIE_REVIEWS_ENDPOINT,
  RQ_MOVIE_REVIEWS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { ExternalIDs } from "@/types/ExternalIDs";
import { CastAndCrew } from "@/types/movies/CastAndCrew";
import { Language } from "@/types/movies/Language";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import { RecommendationsResponse } from "@/types/movies/Recommendations";
import { ReviewsResponse } from "@/types/movies/Reviews";
import { MovieKeywords } from "@/types/movies/movie/MovieKeywords";
import { MovieRecommendation } from "@/types/movies/movie/MovieRecommendations";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import movieMetadataTitle from "@/utils/movieMetadataTitle";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { ReactNode } from "react";

interface Props {
  params: {
    id: string;
  };
  children: ReactNode;
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const movie: MovieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
  ).then((res) => res.json());

  if (movie.tagline)
    return {
      title: movieMetadataTitle(movie.title, movie.release_date),
      description: movie.tagline,
    };

  return {
    title: movieMetadataTitle(movie.title, movie.release_date),
  };
}

export default async function MainTitleNavigationLayout({
  children, // will be a page or nested layout
  params: { id },
}: Props) {
  const queryClient = new QueryClient();

  const mainMovieMenu: MainTitleMenuItem[] = [
    {
      label: "Overview",
      children: [
        {
          label: "Main",
          href: `/movie/${id}`,
        },
        {
          label: "Alternative Titles",
          href: `/movie/${id}/titles`,
        },
        {
          label: "Cast & Crew",
          href: `/movie/${id}/cast`,
        },
        {
          label: "Release Dates",
          href: `/movie/${id}/releases`,
        },
        {
          label: "Translations",
          href: `/movie/${id}/translations`,
        },
      ],
    },
    {
      label: "Images",
      children: [
        {
          label: "Backdrops",
          href: `/movie/${id}/images/backdrops`,
        },
        {
          label: "Logos",
          href: `/movie/${id}/images/logos`,
        },
        {
          label: "Posters",
          href: `/movie/${id}/images/posters`,
        },
      ],
    },
    {
      label: "Videos",
      href: `/movie/${id}/videos/trailers`,
    },
    {
      label: "Reviews",
      href: `/movie/${id}/reviews`,
    },
  ];

  // Movie
  const apiClientMovie = new MyAPIClient<MovieResponse>(RQ_MOVIE_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_KEY(id)],
    queryFn: () => apiClientMovie.getAll(),
  });

  // Languages
  const apiClientLanguages = new MyAPIClient<Language[]>(RQ_LANGUAGES_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_LANGUAGES_KEY],
    queryFn: () => apiClientLanguages.getAll(),
  });

  // Keywords
  const apiClientKeywords = new MyAPIClient<MovieKeywords>(
    RQ_MOVIE_KEYWORDS_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_KEYWORDS_KEY(id)],
    queryFn: () => apiClientKeywords.getAll(),
  });

  // Cast and crew
  const apiClientCast = new MyAPIClient<CastAndCrew>(
    RQ_MOVIE_CAST_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_CAST_KEY(id)],
    queryFn: () => apiClientCast.getAll(),
  });

  // Reviews
  const apiClientReviews = new MyAPIClient<
    RecommendationsResponse<ReviewsResponse>
  >(RQ_MOVIE_REVIEWS_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_REVIEWS_KEY(id)],
    queryFn: () => apiClientReviews.getAll(),
  });

  // Recommendations
  const apiClientRecommendations = new MyAPIClient<
    RecommendationsResponse<MovieRecommendation>
  >(RQ_MOVIE_RECOMMENDATIONS_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_RECOMMENDATIONS_KEY(id)],
    queryFn: () => apiClientRecommendations.getAll(),
  });

  // Movie External ID's
  const apiClientExternalIds = new MyAPIClient<
    RecommendationsResponse<ExternalIDs>
  >(RQ_MOVIE_EXTERNAL_IDS_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_EXTERNAL_IDS_KEY(id)],
    queryFn: () => apiClientExternalIds.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieNavigation menu={mainMovieMenu} />
        {children}
      </HydrationBoundary>
    </>
  );
}
