export interface VideosResponse {
  id: number;
  results: TheVideo[];
}

export interface TheVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export type VideoType =
  | "trailer"
  | "teaser"
  | "clip"
  | "behind-the-scenes"
  | "bloopers"
  | "featurette"
  | "opening-credits";

export type VideoTypeLink =
  | "trailers"
  | "teasers"
  | "clips"
  | "behind-the-scenes"
  | "bloopers"
  | "featurettes"
  | "opening-credits";
