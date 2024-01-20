import { MovieExternalIDs } from "./movies/movie/MovieExternalIDs";
import { EpisodeExternalIDs } from "./movies/tv/EpisodeExternalIDs";
import { SeasonExternalIDs } from "./movies/tv/SeasonExternalIDs";
import { TVShowExternalIDs } from "./movies/tv/TVShowExternalIDs";
import { PeopleExternalIDs } from "./people/PeopleExternalIDs";

export type ExternalIDs = MovieExternalIDs &
  TVShowExternalIDs &
  SeasonExternalIDs &
  EpisodeExternalIDs &
  PeopleExternalIDs;
