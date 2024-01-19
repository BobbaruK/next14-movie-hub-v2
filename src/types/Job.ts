export interface Job {
  department: Department;
  jobs: string[];
}

export type Department =
  | "Editing"
  | "Art"
  | "Writing"
  | "Camera"
  | "Directing"
  | "Visual Effects"
  | "Actors"
  | "Production"
  | "Costume & Make-Up"
  | "Crew"
  | "Sound"
  | "Lighting";
