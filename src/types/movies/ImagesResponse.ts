export interface TMDB_ImagesResponse {
  id: number;
  backdrops: ImageShape[];
  logos: ImageShape[];
  posters: ImageShape[];
}

export interface MyImagesResponse {
  sizes: string[];
  images: ImageShape[];
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

export type ImageType = "backdrops" | "logos" | "posters";
