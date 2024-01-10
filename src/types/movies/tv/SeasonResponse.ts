import { TheCrew } from "../CastAndCrew";

export interface SeasonResponse {
  _id: string;
  air_date: string;
  episodes: SeasonEpisode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface SeasonEpisode {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: "";
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: TheCrew[];
  guest_stars: any[]; // TODO: further check with this any bs
}
