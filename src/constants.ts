export const STALE_TIME = 24 * 60 * 60 * 1000; // 24 hours

// Config
export const RQ_CONFIG_KEY = "config";
export const RQ_CONFIG_ENDPOINT = "/configuration";

// Languages
export const RQ_LANGUAGES_KEY = "languages";
export const RQ_LANGUAGES_ENDPOINT = "/configuration/languages";

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

// Movie Translations
export const RQ_MOVIE_TRANSLATIONS_KEY = "translations-movie";
export const RQ_MOVIE_TRANSLATIONS_ENDPOINT = (id: string) =>
  `movie/${id}/translations`;

// TV Shows Translations
export const RQ_TV_SHOWS_TRANSLATIONS_KEY = "translations-tvshows";
export const RQ_TV_SHOWS_TRANSLATIONS_ENDPOINT = (id: string) =>
  `tv/${id}/translations`;
