import { TVShowCreatedBy } from "../CreatedBy";
import { Genre } from "../GenreResponse";
import { Language } from "../Language";
import { Network } from "../Network";
import { ProductionCompany } from "../ProductionCompany";
import { ProductionCountry } from "../ProductionCountry";
import { LastEpisodeToAir } from "./LastEpisodeToAir";
import { MainTitleSeason } from "./Season";

export interface TVShowResponse {
  adult: boolean;
  backdrop_path: string;
  created_by: TVShowCreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: MainTitleSeason[];
  spoken_languages: Language[];
  status: string; // check for enums
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
