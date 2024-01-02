export interface TMDB_TranslationsResponse<T> {
  id: number;
  translations: Translation<T>[];
}

export interface Translation<T> {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: T;
}

export interface TranslationMovie {
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}

export interface TranslationTV {
  name: string;
  overview: string;
  homepage: string;
  tagline: string;
}
