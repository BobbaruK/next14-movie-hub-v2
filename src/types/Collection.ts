import { SearchMovieResponse } from "./search/movies";

export interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: SearchMovieResponse[];
}
