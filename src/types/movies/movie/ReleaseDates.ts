export interface ReleaseDates {
  id: number;
  results: [];
}

export interface ReleaseDateResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDate {
  certification: string;
  descriptors: [];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

/**
 *	Release date types:
 *	1 - Premiere
 *	2 - Theatrical (limited)
 *	3 - Theatrical
 *	4 - Digital
 *	5 - Physical
 *	6 - TV
 */
