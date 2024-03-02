export interface ImagesResponse {
  id: number;
  backdrops: ImageShape[];
  logos: ImageShape[];
  posters: ImageShape[];
  profiles: ImageShape[];
  stills: ImageShape[];
}

export interface PersonImagesResponse {
  id: number;
  profiles: ImageShape[];
}

export interface ImageShape {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export type ImagesType =
  | "backdrop"
  | "logo"
  | "poster"
  | "profile"
  | "still"
  | "other";
