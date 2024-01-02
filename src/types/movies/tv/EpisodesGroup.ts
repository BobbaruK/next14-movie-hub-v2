import { Network } from "../Network";

export interface TMDB_EpisodesGroups {
  id: number;
  results: EpisodeGroup[];
}

export interface EpisodeGroup {
  description: string;
  episode_count: number;
  group_count: number;
  id: string;
  name: string;
  network: Network | null;
  type: number;
}
