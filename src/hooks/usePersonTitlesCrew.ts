import { Department } from "@/types/Job";
import {
  CombinedCreditsMovieCrew,
  CombinedCreditsTVCrew,
} from "@/types/people/CombinedCredits";
import ReleaseDateUI from "@/utils/releaseDateUI";

const usePersonTitlesCrew = (
  crewArr: CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[],
) => {
  const output = [] as (CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[])[];

  // Editing
  const editing = "Editing" as Department;

  const departmentEditing = crewArr.filter(
    (crewItem) => crewItem.department === editing,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentEditing.length > 0) {
    for (let i = 0; i < departmentEditing.length; i++) {
      const t = departmentEditing[i];
      departmentEditing[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentEditing);
  }

  // Art
  const art = "Art" as Department;

  const departmentArt = crewArr.filter(
    (crewItem) => crewItem.department === art,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentArt.length > 0) {
    for (let i = 0; i < departmentArt.length; i++) {
      const t = departmentArt[i];
      departmentArt[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentArt);
  }

  // Writing
  const writing = "Writing" as Department;

  const departmentWriting = crewArr.filter(
    (crewItem) => crewItem.department === writing,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentWriting.length > 0) {
    for (let i = 0; i < departmentWriting.length; i++) {
      const t = departmentWriting[i];
      departmentWriting[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentWriting);
  }

  // Camera
  const camera = "Camera" as Department;

  const departmentCamera = crewArr.filter(
    (crewItem) => crewItem.department === camera,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentCamera.length > 0) {
    for (let i = 0; i < departmentCamera.length; i++) {
      const t = departmentCamera[i];
      departmentCamera[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentCamera);
  }

  // Directing
  const directing = "Directing" as Department;

  const departmentDirecting = crewArr.filter(
    (crewItem) => crewItem.department === directing,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentDirecting.length > 0) {
    for (let i = 0; i < departmentDirecting.length; i++) {
      const t = departmentDirecting[i];
      departmentDirecting[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentDirecting);
  }

  // Visual Effects
  const visualEffects = "Visual Effects" as Department;

  const departmentVisualEffects = crewArr.filter(
    (crewItem) => crewItem.department === visualEffects,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentVisualEffects.length > 0) {
    for (let i = 0; i < departmentVisualEffects.length; i++) {
      const t = departmentVisualEffects[i];
      departmentVisualEffects[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentVisualEffects);
  }

  // Actors
  const actors = "Actors" as Department;

  const departmentActors = crewArr.filter(
    (crewItem) => crewItem.department === actors,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentActors.length > 0) {
    for (let i = 0; i < departmentActors.length; i++) {
      const t = departmentActors[i];
      departmentActors[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentActors);
  }

  // Production
  const production = "Production" as Department;

  const departmentProduction = crewArr.filter(
    (crewItem) => crewItem.department === production,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentProduction.length > 0) {
    for (let i = 0; i < departmentProduction.length; i++) {
      const t = departmentProduction[i];
      departmentProduction[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentProduction);
  }

  // Costume & Make-Up
  const costumeAndMakeUp = "Costume & Make-Up" as Department;

  const departmentCostumeAndMakeUp = crewArr.filter(
    (crewItem) => crewItem.department === costumeAndMakeUp,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentCostumeAndMakeUp.length > 0) {
    for (let i = 0; i < departmentCostumeAndMakeUp.length; i++) {
      const t = departmentCostumeAndMakeUp[i];
      departmentCostumeAndMakeUp[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentCostumeAndMakeUp);
  }

  // Crew
  const crew = "Crew" as Department;

  const departmentCrew = crewArr.filter(
    (crewItem) => crewItem.department === crew,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentCrew.length > 0) {
    for (let i = 0; i < departmentCrew.length; i++) {
      const t = departmentCrew[i];
      departmentCrew[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentCrew);
  }

  // Sound
  const sound = "Sound" as Department;

  const departmentSound = crewArr.filter(
    (crewItem) => crewItem.department === sound,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentSound.length > 0) {
    for (let i = 0; i < departmentSound.length; i++) {
      const t = departmentSound[i];
      departmentSound[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentSound);
  }

  // Lighting
  const lightning = "Lighting" as Department;

  const departmentLighting = crewArr.filter(
    (crewItem) => crewItem.department === lightning,
  ) as CombinedCreditsMovieCrew[] | CombinedCreditsTVCrew[];

  if (departmentLighting.length > 0) {
    for (let i = 0; i < departmentLighting.length; i++) {
      const t = departmentLighting[i];
      departmentLighting[i].year = ReleaseDateUI(
        "title" in t ? t.release_date : t.first_air_date,
      ).year!;
    }

    output.push(departmentLighting);
  }

  return output;
};

export default usePersonTitlesCrew;
