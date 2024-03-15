import { CollectionTranslationBase } from "../Collection";

export interface TranslationsBase {
  id: number;
  translations:
    | TranslationMovieBase[]
    | TranslationTVShowBase[]
    | TranslationPeopleBase[]
    | CollectionTranslationBase[];
}

export interface TranslationMovieBase {
  iso_3166_1: string;
  iso_639_1: string;
  title: string;
  english_name: string;
  data: TranslationDataMovie;
}

export interface TranslationDataMovie {
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}

export interface TranslationTVShowBase {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TranslationDataTVShow;
}

export interface TranslationDataTVShow {
  name: string;
  overview: string;
  homepage: string;
  tagline: string;
}

export interface TranslationPeopleBase {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TranslationDataPerson;
}

export interface TranslationDataPerson {
  biography: string;
}
