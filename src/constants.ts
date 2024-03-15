// Config
export const RQ_CONFIG_KEY = "config";
export const RQ_CONFIG_ENDPOINT = "/configuration";

// Languages
export const RQ_LANGUAGES_KEY = "languages";
export const RQ_LANGUAGES_ENDPOINT = "/configuration/languages";

// Countries
export const RQ_COUNTRIES_KEY = "countries";
export const RQ_COUNTRIES_ENDPOINT = "/configuration/countries";

// Jobs
export const RQ_POPULAR_JOBS_KEY = "jobs";
export const RQ_POPULAR_JOBS_ENDPOINT = "/configuration/jobs";

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

// Popular Persons
export const RQ_POPULAR_PERSONS_KEY = "popular-persons";
export const RQ_POPULAR_PERSONS_ENDPOINT = "/person/popular";

// Trending
export const RQ_TRENDING_ALL_DAY_KEY = "trending-all-day";
export const RQ_TRENDING_ALL_DAY_ENDPOINT =
  "https://api.themoviedb.org/3/trending/all/day";

export const RQ_TRENDING_ALL_WEEK_KEY = "trending-all-week";
export const RQ_TRENDING_ALL_WEEK_ENDPOINT =
  "https://api.themoviedb.org/3/trending/all/week";

// Main Title
export const RQ_MOVIE_KEY = (id: string) => `movie-${parseInt(id)}`;
export const RQ_MOVIE_ENDPOINT = (id: string) => `movie/${parseInt(id)}`;

export const RQ_TVSHOW_KEY = (id: string) => `tvshow-${parseInt(id)}`;
export const RQ_TVSHOW_ENDPOINT = (id: string) => `tv/${parseInt(id)}`;

export const RQ_PERSON_KEY = (id: string) => `person-${parseInt(id)}`;
export const RQ_PERSON_ENDPOINT = (id: string) => `/person/${parseInt(id)}`;

// Keywords
export const RQ_MOVIE_KEYWORDS_KEY = (id: string) =>
  `movie-${parseInt(id)}-keywords`;
export const RQ_MOVIE_KEYWORDS_ENDPOINT = (id: string) =>
  `/movie/${parseInt(id)}/keywords`;

export const RQ_TVSHOW_KEYWORDS_KEY = (id: string) =>
  `tvshow-${parseInt(id)}-keywords`;
export const RQ_TVSHOW_KEYWORDS_ENDPOINT = (id: string) =>
  `/tv/${parseInt(id)}/keywords`;

// Cast & Crew
export const RQ_MOVIE_CAST_KEY = (id: string) => `movie-${parseInt(id)}-cast`;
export const RQ_MOVIE_CAST_ENDPOINT = (id: string) =>
  `/movie/${parseInt(id)}/credits`;

export const RQ_TVSHOW_CAST_KEY = (id: string) => `tvshow-${parseInt(id)}-cast`;
export const RQ_TVSHOW_CAST_ENDPOINT = (id: string) =>
  `/tv/${parseInt(id)}/credits`;

// Person combined credits
export const RQ_COMBINED_CREDITS_KEY = (id: string) =>
  `person-${parseInt(id)}-combined_credits`;
export const RQ_COMBINED_CREDITS_ENDPOINT = (id: string) =>
  `/person/${parseInt(id)}/combined_credits`;

// Reviews
export const RQ_MOVIE_REVIEWS_KEY = (id: string) =>
  `movie-${parseInt(id)}-reviews`;
export const RQ_MOVIE_REVIEWS_ENDPOINT = (id: string) =>
  `/movie/${parseInt(id)}/reviews`;

export const RQ_TVSHOW_REVIEWS_KEY = (id: string) =>
  `tvshow-${parseInt(id)}-reviews`;
export const RQ_TVSHOW_REVIEWS_ENDPOINT = (id: string) =>
  `/tv/${parseInt(id)}/reviews`;

// Recommendations
export const RQ_MOVIE_RECOMMENDATIONS_KEY = (id: string) =>
  `movie-${parseInt(id)}-recommendations`;
export const RQ_MOVIE_RECOMMENDATIONS_ENDPOINT = (id: string) =>
  `/movie/${parseInt(id)}/recommendations`;

export const RQ_TVSHOW_RECOMMENDATIONS_KEY = (id: string) =>
  `tvshow-${parseInt(id)}-recommendations`;
export const RQ_TVSHOW_RECOMMENDATIONS_ENDPOINT = (id: string) =>
  `/tv/${parseInt(id)}/recommendations`;

// Alternative titles
export const RQ_MOVIE_ALTERNATIVE_TITLES_KEY = (id: string) =>
  `movie-${parseInt(id)}-alternative_titles`;
export const RQ_MOVIE_ALTERNATIVE_TITLES_ENDPOINT = (id: string) =>
  `/movie/${parseInt(id)}/alternative_titles`;

export const RQ_TVSHOW_ALTERNATIVE_TITLES_KEY = (id: string) =>
  `tvshow-${parseInt(id)}-alternative_titles`;
export const RQ_TVSHOW_ALTERNATIVE_TITLES_ENDPOINT = (id: string) =>
  `/tv/${parseInt(id)}/alternative_titles`;

// Translations
export const RQ_MOVIE_TRANSLATIONS_KEY = (id: string) =>
  `movie-${parseInt(id)}-translations`;
export const RQ_MOVIE_TRANSLATIONS_ENDPOINT = (id: string) =>
  `/movie/${parseInt(id)}/translations`;

export const RQ_TVSHOW_TRANSLATIONS_KEY = (id: string) =>
  `tvshow-${parseInt(id)}-translations`;
export const RQ_TVSHOW_TRANSLATIONS_ENDPOINT = (id: string) =>
  `/tv/${parseInt(id)}/translations`;

export const RQ_PERSON_TRANSLATIONS_KEY = (id: string) =>
  `person-${parseInt(id)}-translations`;
export const RQ_PERSON_TRANSLATIONS_ENDPOINT = (id: string) =>
  `/person/${parseInt(id)}/translations`;

// Release dates
export const RQ_MOVIE_RELEASES_KEY = (id: string) =>
  `movie-${parseInt(id)}-releases`;
export const RQ_MOVIE_RELEASES_ENDPOINT = (id: string) =>
  `/movie/${parseInt(id)}/release_dates`;

// Season
export const RQ_TVSHOW_SEASON_KEY = (id: string, seasonNumber: string) =>
  `tvshow-${parseInt(id)}-season-${seasonNumber}`;
export const RQ_TVSHOW_SEASON_ENDPOINT = (id: string, seasonNumber: string) =>
  `/tv/${parseInt(id)}/season/${seasonNumber}`;

// Episode
export const RQ_TVSHOW_EPISODE_KEY = (
  id: string,
  seasonNumber: string,
  episodeNumber: string,
) =>
  `tvshow-${parseInt(id)}-season-${parseInt(seasonNumber)}-episode-${parseInt(episodeNumber)}`;
export const RQ_TVSHOW_EPISODE_ENDPOINT = (
  id: string,
  seasonNumber: string,
  episodeNumber: string,
) => `/tv/${parseInt(id)}/season/${seasonNumber}/episode/${episodeNumber}`;

// Episode Cast
export const RQ_TVSHOW_EPISODE_CAST_KEY = (
  id: string,
  seasonNumber: string,
  episodeNumber: string,
) =>
  `tvshow-${parseInt(id)}-season-${parseInt(seasonNumber)}-episode-${parseInt(episodeNumber)}-cast`;
export const RQ_TVSHOW_EPISODE_CAST_ENDPOINT = (
  id: string,
  seasonNumber: string,
  episodeNumber: string,
) =>
  `/tv/${parseInt(id)}/season/${seasonNumber}/episode/${episodeNumber}/credits`;

// Episode Images
export const RQ_TVSHOW_EPISODE_IMAGES_KEY = (
  id: string,
  seasonNumber: string,
  episodeNumber: string,
) =>
  `tvshow-${parseInt(id)}-season-${parseInt(seasonNumber)}-episode-${parseInt(episodeNumber)}-images`;
export const RQ_TVSHOW_EPISODE_IMAGES_ENDPOINT = (
  id: string,
  seasonNumber: string,
  episodeNumber: string,
) =>
  `/tv/${parseInt(id)}/season/${seasonNumber}/episode/${episodeNumber}/images`;

// External IDs
export const RQ_MOVIE_EXTERNAL_IDS_KEY = (id: string) =>
  `movie-${parseInt(id)}-external`;
export const RQ_MOVIE_EXTERNAL_IDS_ENDPOINT = (id: string) =>
  `/movie/${parseInt(id)}/external_ids`;

export const RQ_TVSHOW_EXTERNAL_IDS_KEY = (id: string) =>
  `tvshow-${parseInt(id)}-external`;
export const RQ_TVSHOW_EXTERNAL_IDS_ENDPOINT = (id: string) =>
  `/tv/${parseInt(id)}/external_ids`;

export const RQ_PERSON_EXTERNAL_IDS_KEY = (id: string) =>
  `person-${parseInt(id)}-external`;
export const RQ_PERSON_EXTERNAL_IDS_ENDPOINT = (id: string) =>
  `/person/${parseInt(id)}/external_ids`;

export const RQ_SEASON_EXTERNAL_IDS_KEY = (
  tvId: string,
  seasonNumber: string,
) => `tvshow-${parseInt(tvId)}-season-${parseInt(seasonNumber)}-external`;
export const RQ_SEASON_EXTERNAL_IDS_ENDPOINT = (
  tvId: string,
  seasonNumber: string,
) => `/tv/${tvId}/season/${seasonNumber}/external_ids`;

export const RQ_TVSHOW_EPISODE_EXTERNAL_IDS_KEY = (
  tvId: string,
  seasonNumber: string,
  episodeNumber: string,
) =>
  `tvshow-${parseInt(tvId)}-season-${parseInt(seasonNumber)}-episode-${parseInt(episodeNumber)}-external`;
export const RQ_TVSHOW_EPISODE_EXTERNAL_IDS_ENDPOINT = (
  tvId: string,
  seasonNumber: string,
  episodeNumber: string,
) =>
  `/tv/${tvId}/season/${seasonNumber}/episode/${parseInt(episodeNumber)}/external_ids`;

// Images
export const RQ_MOVIE_IMAGES_KEY = (id: string) =>
  `movie-${parseInt(id)}-images`;
export const RQ_MOVIE_IMAGES_ENDPOINT = (id: string) =>
  `movie/${parseInt(id)}/images`;

export const RQ_TVSHOWS_IMAGES_KEY = (id: string) =>
  `tv-${parseInt(id)}-images`;
export const RQ_TVSHOWS_IMAGES_ENDPOINT = (id: string) =>
  `tv/${parseInt(id)}/images`;

export const RQ_PERSON_IMAGES_KEY = (id: string) =>
  `person-${parseInt(id)}-images`;
export const RQ_PERSON_IMAGES_ENDPOINT = (id: string) =>
  `person/${parseInt(id)}/images`;

// Videos
export const RQ_MOVIE_VIDEOS_KEY = (id: string) =>
  `movie-${parseInt(id)}-videos`;
export const RQ_MOVIE_VIDEOS_ENDPOINT = (id: string) =>
  `movie/${parseInt(id)}/videos`;

export const RQ_TVSHOW_VIDEOS_KEY = (id: string) =>
  `tvshow-${parseInt(id)}-videos`;
export const RQ_TVSHOW_VIDEOS_ENDPOINT = (id: string) =>
  `tv/${parseInt(id)}/videos`;

// Collection
export const RQ_COLLECTION_KEY = (id: string) => `collection-${id}`;
export const RQ_COLLECTION_ENDPOINT = (id: string) =>
  `https://api.themoviedb.org/3/collection/${id}`;

// Collection Translations
export const RQ_COLLECTION_TRANSLATIONS_KEY = (id: string) =>
  `collection-${id}-translations`;
export const RQ_COLLECTION_TRANSLATIONS_ENDPOINT = (id: string) =>
  `https://api.themoviedb.org/3/collection/${id}/translations`;

// Search All
export const RQ_SEARCH_MULTI_KEY = (query: string) =>
  `search-multi-${query && query.replaceAll(" ", "_")}`;
export const RQ_SEARCH_MULTI_ENDPOINT = `search/multi`;

// Search Movie
export const RQ_SEARCH_MOVIE_KEY = (query: string) =>
  `search-movie-${query && query.replaceAll(" ", "_")}`;
export const RQ_SEARCH_MOVIE_ENDPOINT = `search/movie`;

// Search TV Show
export const RQ_SEARCH_TVSHOW_KEY = (query: string) =>
  `search-tv-${query && query.replaceAll(" ", "_")}`;
export const RQ_SEARCH_TVSHOW_ENDPOINT = `search/tv`;

// Search People
export const RQ_SEARCH_PEOPLE_KEY = (query: string) =>
  `search-person-${query && query.replaceAll(" ", "_")}`;
export const RQ_SEARCH_PEOPLE_ENDPOINT = `search/person`;

// Search Collection
export const RQ_SEARCH_COLLECTION_KEY = (query: string) =>
  `search-collection-${query && query.replaceAll(" ", "_")}`;
export const RQ_SEARCH_COLLECTION_ENDPOINT = `search/collection`;

// Search Company
export const RQ_SEARCH_COMPANY_KEY = (query: string) =>
  `search-company-${query && query.replaceAll(" ", "_")}`;
export const RQ_SEARCH_COMPANY_ENDPOINT = `search/company`;

// Search Keyword
export const RQ_SEARCH_KEYWORD_KEY = (query: string) =>
  `search-keyword-${query && query.replaceAll(" ", "_")}`;
export const RQ_SEARCH_KEYWORD_ENDPOINT = `search/keyword`;

/**
 * Miscellaneous
 */
export const STALE_TIME = 24 * 60 * 60 * 1000; // 24 hours

export const imagesSizesWithSidebar = `
  h-mainCardImageHeight_WithSidebar 
  sm:h-mainCardImageHeight_WithSidebar-sm 
  md:h-mainCardImageHeight_WithSidebar-md 
  lg:h-mainCardImageHeight_WithSidebar-lg 
  xl:h-mainCardImageHeight_WithSidebar-xl`;

export const imagesSizesNoSidebar = `
  h-mainCardImageHeight_NoSidebar 
  sm:h-mainCardImageHeight_NoSidebar-sm 
  md:h-mainCardImageHeight_NoSidebar-md 
  lg:h-mainCardImageHeight_NoSidebar-lg 
  xl:h-mainCardImageHeight_NoSidebar-xl`;

export const recommendationImageHeight = `
  h-recommendationImageHeight 
  sm:h-recommendationImageHeight-sm 
  md:h-recommendationImageHeight-md 
  lg:h-recommendationImageHeight-lg 
  xl:h-recommendationImageHeight-xl`;

export const mainTitleCastImageHeight = `
  h-mainCardCastImageHeight 
  sm:h-mainCardCastImageHeight-sm 
  md:h-mainCardCastImageHeight-md 
  lg:h-mainCardCastImageHeight-lg 
  xl:h-mainCardCastImageHeight-xl`;

export const imagesSizesEpisodeImages = `
  h-backdropsEpisodeImagesHeight 
  sm:h-backdropsEpisodeImagesHeight-sm 
  md:h-backdropsEpisodeImagesHeight-md 
  lg:h-backdropsEpisodeImagesHeight-lg 
  xl:h-backdropsEpisodeImagesHeight-xl`;

export const homeTrendingImageHeight = `
  h-homeTrendingImageHeight 
  sm:h-homeTrendingImageHeight-sm 
  md:h-homeTrendingImageHeight-md 
  lg:h-homeTrendingImageHeight-lg 
  xl:h-homeTrendingImageHeight-xl`;

export const homeTrendingTabHeight = `
  h-homeTrendingTabHeight 
  sm:h-homeTrendingTabHeight-sm 
  md:h-homeTrendingTabHeight-md 
  lg:h-homeTrendingTabHeight-lg 
  xl:h-homeTrendingTabHeight-xl`;

export const searchMovieCardImage = `
  h-searchMovieCardImage 
  sm:h-searchMovieCardImage-sm 
  md:h-searchMovieCardImage-md 
  lg:h-searchMovieCardImage-lg 
  xl:h-searchMovieCardImage-xl`;

export const creditMediaTypeSearchQuery = "credit_media_type";
export const creditDepartmentSearchQuery = "credit_department";
