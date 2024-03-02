import { TheCast, TheCrew } from "../CastAndCrew";

export interface EpisodeCast {
  cast: TheCast[];
  crew: TheCrew[];
  guest_stars: TheCast[];
}
