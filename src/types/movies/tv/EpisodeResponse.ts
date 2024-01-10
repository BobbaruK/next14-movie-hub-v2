import { TheCrew } from "../CastAndCrew";

export interface EpisodeResponse {
  air_date: string;
  crew: TheCrew[];
  episode_number: number;
  guest_stars: EpisodeGuestStars[];
  name: string;
  overview: string;
  id: number;
  production_code: string;
  runtime: number;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface EpisodeGuestStars {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}
