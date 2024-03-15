import { SearchMovieResponse } from "./search/movies";

export interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: SearchMovieResponse[];
}

export interface CollectionTranslationBase {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: CollectionTranslation;
}

export interface CollectionTranslation {
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}
