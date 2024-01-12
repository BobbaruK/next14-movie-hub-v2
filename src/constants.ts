export const STALE_TIME = 24 * 60 * 60 * 1000; // 24 hours

// Config
export const RQ_CONFIG_KEY = "config";
export const RQ_CONFIG_ENDPOINT = "/configuration";

// Languages
export const RQ_LANGUAGES_KEY = "languages";
export const RQ_LANGUAGES_ENDPOINT = "/configuration/languages";

// Countries
export const RQ_COUNTRIES_KEY = "countries";
export const RQ_COUNTRIES_ENDPOINT = "/configuration/countries";

// Movies
export const RQ_POPULAR_MOVIES_KEY = "popular-movies";
export const RQ_POPULAR_MOVIES_ENDPOINT = "discover/movie";

export const RQ_NOW_PLAYING_MOVIES_KEY = "now_playing-movies";
export const RQ_NOW_PLAYING_MOVIES_ENDPOINT = "movie/now_playing";

export const RQ_TOP_RATED_MOVIES_KEY = "top_rated-movies";
export const RQ_TOP_RATED_MOVIES_ENDPOINT = "movie/top_rated";

export const RQ_UPCOMING_MOVIES_KEY = "upcoming-movies";
export const RQ_UPCOMING_MOVIES_ENDPOINT = "movie/upcoming";

export const RQ_MOVIES_GENRES_KEY = "genres-movies";
export const RQ_MOVIES_GENRES_ENDPOINT = "genre/movie/list";

export const RQ_MOVIE_EXTERNAL_IDS_KEY = (id: string) => `movie-${id}-external`;
export const RQ_MOVIE_EXTERNAL_IDS_ENDPOINT = (id: string) =>
  `/movie/${id}/external_ids`;

// TV shows
export const RQ_POPULAR_TVSHOWS_KEY = "popular-tvshows";
export const RQ_POPULAR_TVSHOWS_ENDPOINT = "discover/tv";

export const RQ_AIRING_TODAY_TVSHOWS_KEY = "airing_today-tvshows";
export const RQ_AIRING_TODAY_TVSHOWS_ENDPOINT = "tv/airing_today";

export const RQ_ON_THE_AIR_TVSHOW_KEY = "on_the_air-tvshows";
export const RQ_ON_THE_AIR_TVSHOW_ENDPOINT = "tv/on_the_air";

export const RQ_TOP_RATED_TVSHOWS_KEY = "top_rated-tvshows";
export const RQ_TOP_RATED_TVSHOWS_ENDPOINT = "tv/top_rated";

export const RQ_TVSHOWS_GENRES_KEY = "genres-tvshows";
export const RQ_TVSHOWS_GENRES_ENDPOINT = "genre/tv/list";

export const RQ_TVSHOWS_EXTERNAL_IDS_KEY = (id: string) =>
  `tvshow-${id}-external`;
export const RQ_TVSHOWS_EXTERNAL_IDS_ENDPOINT = (id: string) =>
  `/tv/${id}/external_ids`;

// Main Title
export const RQ_MOVIE_KEY = (id: string) => `movie-${id}`;
export const RQ_MOVIE_ENDPOINT = (id: string) => `movie/${id}`;

export const RQ_TVSHOW_KEY = (id: string) => `tvshow-${id}`;
export const RQ_TVSHOW_ENDPOINT = (id: string) => `tv/${id}`;

// Keywords
export const RQ_MOVIE_KEYWORDS_KEY = (id: string) => `movie-${id}-keywords`;
export const RQ_MOVIE_KEYWORDS_ENDPOINT = (id: string) =>
  `/movie/${id}/keywords`;

export const RQ_TVSHOW_KEYWORDS_KEY = (id: string) => `tvshow-${id}-keywords`;
export const RQ_TVSHOW_KEYWORDS_ENDPOINT = (id: string) => `/tv/${id}/keywords`;

// Cast & Crew
export const RQ_MOVIE_CAST_KEY = (id: string) => `movie-${id}-cast`;
export const RQ_MOVIE_CAST_ENDPOINT = (id: string) => `/movie/${id}/credits`;

export const RQ_TVSHOW_CAST_KEY = (id: string) => `tvshow-${id}-cast`;
export const RQ_TVSHOW_CAST_ENDPOINT = (id: string) => `/tv/${id}/credits`;

// Reviews
export const RQ_MOVIE_REVIEWS_KEY = (id: string) => `movie-${id}-reviews`;
export const RQ_MOVIE_REVIEWS_ENDPOINT = (id: string) => `/movie/${id}/reviews`;

export const RQ_TVSHOW_REVIEWS_KEY = (id: string) => `tvshow-${id}-reviews`;
export const RQ_TVSHOW_REVIEWS_ENDPOINT = (id: string) => `/tv/${id}/reviews`;

// Recommendations
export const RQ_MOVIE_RECOMMENDATIONS_KEY = (id: string) =>
  `movie-${id}-recommendations`;
export const RQ_MOVIE_RECOMMENDATIONS_ENDPOINT = (id: string) =>
  `/movie/${id}/recommendations`;

export const RQ_TVSHOW_RECOMMENDATIONS_KEY = (id: string) =>
  `tvshow-${id}-recommendations`;
export const RQ_TVSHOW_RECOMMENDATIONS_ENDPOINT = (id: string) =>
  `/tv/${id}/recommendations`;

// Alternative titles
export const RQ_MOVIE_ALTERNATIVE_TITLES_KEY = (id: string) =>
  `movie-${id}-alternative_titles`;
export const RQ_MOVIE_ALTERNATIVE_TITLES_ENDPOINT = (id: string) =>
  `/movie/${id}/alternative_titles`;

export const RQ_TVSHOW_ALTERNATIVE_TITLES_KEY = (id: string) =>
  `tvshow-${id}-alternative_titles`;
export const RQ_TVSHOW_ALTERNATIVE_TITLES_ENDPOINT = (id: string) =>
  `/tv/${id}/alternative_titles`;

// Translations
export const RQ_MOVIE_TRANSLATIONS_KEY = (id: string) =>
  `movie-${id}-translations`;
export const RQ_MOVIE_TRANSLATIONS_ENDPOINT = (id: string) =>
  `/movie/${id}/translations`;

export const RQ_TVSHOW_TRANSLATIONS_KEY = (id: string) =>
  `tvshow-${id}-translations`;
export const RQ_TVSHOW_TRANSLATIONS_ENDPOINT = (id: string) =>
  `/tv/${id}/translations`;

// Release dates
export const RQ_MOVIE_RELEASES_KEY = (id: string) => `movie-${id}-releases`;
export const RQ_MOVIE_RELEASES_ENDPOINT = (id: string) =>
  `/movie/${id}/release_dates`;

// Season
export const RQ_TVSHOW_SEASON_KEY = (id: string, seasonNumber: string) =>
  `tvshow-${id}-season-${seasonNumber}`;
export const RQ_TVSHOW_SEASON_ENDPOINT = (id: string, seasonNumber: string) =>
  `/tv/${id}/season/${seasonNumber}`;

// Episode
export const RQ_TVSHOW_EPISODE_KEY = (
  id: string,
  seasonNumber: string,
  episodeNumber: string,
) => `tvshow-${id}-season-${seasonNumber}-episode-${episodeNumber}`;
export const RQ_TVSHOW_EPISODE_ENDPOINT = (
  id: string,
  seasonNumber: string,
  episodeNumber: string,
) => `/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`;

// Popular Persons
export const RQ_POPULAR_PERSONS_KEY = "popular-persons";
export const RQ_POPULAR_PERSONS_ENDPOINT = "/person/popular";

// Person
export const RQ_PERSON_KEY = (id: string) => `person-${id}`;
export const RQ_PERSON_ENDPOINT = (id: string) => `/person/${id}`;

// Person combined credits
export const RQ_COMBINED_CREDITS_KEY = (id: string) =>
  `person-${id}-combined_credits`;
export const RQ_COMBINED_CREDITS_ENDPOINT = (id: string) =>
  `/person/${id}/combined_credits`;

/***
 *
 *
 *
 *
 *
 *
 *
 */

// Movie Images
export const RQ_MOVIE_IMAGES_KEY = "images-movie";
export const RQ_MOVIE_IMAGES_ENDPOINT = (id: string) => `movie/${id}/images`;

// TV Shows Images
export const RQ_TVSHOWS_IMAGES_KEY = "images-tvshows";
export const RQ_TVSHOWS_IMAGES_ENDPOINT = (id: string) => `tv/${id}/images`;
