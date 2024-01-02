import { Genre } from "../GenreResponse";
import { Language } from "../Language";
import { ProductionCompany } from "../ProductionCompany";
import { ProductionCountry } from "../ProductionCountry";

export interface MovieResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null; // TODO: check collection to create a type - 155 (The Dark Knight) has a colection
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string; // check for enums
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
