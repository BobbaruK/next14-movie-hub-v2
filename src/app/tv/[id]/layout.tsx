import MainTitleNavigation from "@/components/MainTitle/Navigation";
import {
  RQ_LANGUAGES_ENDPOINT,
  RQ_LANGUAGES_KEY,
  RQ_TVSHOWS_EXTERNAL_IDS_ENDPOINT,
  RQ_TVSHOWS_EXTERNAL_IDS_KEY,
  RQ_TVSHOW_CAST_ENDPOINT,
  RQ_TVSHOW_CAST_KEY,
  RQ_TVSHOW_ENDPOINT,
  RQ_TVSHOW_KEY,
  RQ_TVSHOW_KEYWORDS_ENDPOINT,
  RQ_TVSHOW_KEYWORDS_KEY,
  RQ_TVSHOW_RECOMMENDATIONS_ENDPOINT,
  RQ_TVSHOW_RECOMMENDATIONS_KEY,
  RQ_TVSHOW_REVIEWS_ENDPOINT,
  RQ_TVSHOW_REVIEWS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { CastAndCrew } from "@/types/movies/CastAndCrew";
import { Language } from "@/types/movies/Language";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import { MainTitleExternalIds } from "@/types/movies/MainTitleExternalIds";
import { RecommendationsResponse } from "@/types/movies/Recommendations";
import { ReviewsResponse } from "@/types/movies/Reviews";
import { MovieKeywords } from "@/types/movies/movie/MovieKeywords";
import { MovieRecommendation } from "@/types/movies/movie/MovieRecommendations";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
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
  const movie: TVShowResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`,
  ).then((res) => res.json());

  if (movie.tagline)
    return {
      title: movieMetadataTitle(movie.name, movie.first_air_date),
      description: movie.tagline,
    };

  return {
    title: movieMetadataTitle(movie.name, movie.first_air_date),
  };
}

export default async function MainTVTitleNavigationLayout({
  children, // will be a page or nested layout
  params: { id },
}: Props) {
  const queryClient = new QueryClient();

  const mainTVShowMenu: MainTitleMenuItem[] = [
    {
      label: "Overview",
      href: `/tv/${id}/`,
      children: [
        {
          label: "Main",
          href: `/tv/${id}`,
        },
        {
          label: "Alternative Titles",
          href: `/tv/${id}/titles`,
        },
        {
          label: "Cast & Crew",
          href: `/tv/${id}/cast`,
        },
        {
          label: "Seasons",
          href: `/tv/${id}/seasons`,
        },
        {
          label: "Translations",
          href: `/tv/${id}/translations`,
        },
      ],
    },
    {
      label: "Images",
      href: "",
      children: [
        {
          label: "Backdrops",
          href: `/tv/${id}/images/backdrops`,
        },
        {
          label: "Logos",
          href: `/tv/${id}/images/logos`,
        },
        {
          label: "Posters",
          href: `/tv/${id}/images/posters`,
        },
      ],
    },
    {
      label: "Videos",
      href: `/tv/${id}/videos`,
    },
    {
      label: "Reviews",
      href: `/tv/${id}/reviews`,
    },
  ];

  // Movie
  const apiClientMovie = new MyAPIClient<TVShowResponse>(
    RQ_TVSHOW_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_KEY(id)],
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
    RQ_TVSHOW_KEYWORDS_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_KEYWORDS_KEY(id)],
    queryFn: () => apiClientKeywords.getAll(),
  });

  // Cast and crew
  const apiClientCast = new MyAPIClient<CastAndCrew>(
    RQ_TVSHOW_CAST_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_CAST_KEY(id)],
    queryFn: () => apiClientCast.getAll(),
  });

  // Reviews
  const apiClientReviews = new MyAPIClient<
    RecommendationsResponse<ReviewsResponse>
  >(RQ_TVSHOW_REVIEWS_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_REVIEWS_KEY(id)],
    queryFn: () => apiClientReviews.getAll(),
  });

  // Recommendations
  const apiClientRecommendations = new MyAPIClient<
    RecommendationsResponse<MovieRecommendation>
  >(RQ_TVSHOW_RECOMMENDATIONS_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_RECOMMENDATIONS_KEY(id)],
    queryFn: () => apiClientRecommendations.getAll(),
  });

  // TVShow External IDs
  const apiClientExternalIds = new MyAPIClient<
    RecommendationsResponse<MainTitleExternalIds>
  >(RQ_TVSHOWS_EXTERNAL_IDS_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOWS_EXTERNAL_IDS_KEY(id)],
    queryFn: () => apiClientExternalIds.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainTitleNavigation mainTitleMenu={mainTVShowMenu} />
        {children}
      </HydrationBoundary>
    </>
  );
}
