// export interface TranslationsResponse<T> {
//   id: number;
//   translations: Translation<T>[];
// }

// export interface Translation<T> {
//   iso_3166_1: string;
//   iso_639_1: string;
//   name: string;
//   english_name: string;
//   data: T;
// }

// export interface TranslationMovie {
//   homepage: string;
//   overview: string;
//   runtime: number;
//   tagline: string;
//   title: string;
// }

// export interface TranslationTV {
//   name: string;
//   overview: string;
//   homepage: string;
//   tagline: string;
// }

// export type TranslationsMovie = TranslationsResponse<TranslationMovie>;
// export type TranslationsTV = TranslationsResponse<TranslationTV>;

/**
 *
 *
 *
 *
 *
 *
 */
export interface TranslationsMovie {
  id: number;
  translations: TranslationMovie[];
}

export interface TranslationMovie {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: {
    homepage: string;
    overview: string;
    runtime: number;
    tagline: string;
    title: string;
  };
}
export interface TranslationsTV {
  id: number;
  translations: TranslationTV[];
}

export interface TranslationTV {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: {
    name: string;
    overview: string;
    homepage: string;
    tagline: string;
  };
}
