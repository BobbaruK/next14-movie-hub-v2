import { KnwonFor } from "../people/PeoplesResponse";

export interface SearchPeopleResponse {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: KnwonFor[];
  media_type: "person";
}
