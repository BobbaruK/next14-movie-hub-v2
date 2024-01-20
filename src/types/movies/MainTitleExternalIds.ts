export interface movieEID {
  id: number;
  imdb_id: string | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

export interface TvEID {
  id: number;
  imdb_id: string | null;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvdb_id: number;
  tvrage_id: number;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

export interface seasonEID {
  id: number;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvdb_id: number;
  tvrage_id: string | null;
  wikidata_id: string | null;
}

export interface episodeEID {
  id: number;
  imdb_id: string | null;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvdb_id: number;
  tvrage_id: number;
  wikidata_id: string | null;
}

export interface personEID {
  id: number;
  freebase_mid: string | null;
  freebase_id: string | null;
  imdb_id: string | null;
  tvrage_id: string | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  tiktok_id: string | null;
  twitter_id: string | null;
  youtube_id: string | null;
}

export type ExternalIDs = movieEID & TvEID & seasonEID & episodeEID & personEID;
