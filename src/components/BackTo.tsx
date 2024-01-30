"use client";

import MyAPIClient from "@/services/myApiClient";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import CustomAlert from "./CustomAlert";
import TMDBImages from "./TMDBImages";

interface BackTo {
  label: string;
  link: string;
}

interface Props {
  queryKey: string;
  endpoint: string;
  backTo: BackTo;
}

const BackTo = ({ queryKey, endpoint, backTo }: Props) => {
  const apiClient = new MyAPIClient<
    MovieResponse | TVShowResponse | PeopleResponse
  >(endpoint);
  const { data, error, isLoading } = useQuery<
    MovieResponse | TVShowResponse | PeopleResponse
  >({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant={"default"}
        title={"Back to"}
        description="Loading... Please be patient"
        className="appContaier"
      />
    );

  if (!data) return;

  const movie = "title" in data && data;
  const tv = "seasons" in data && data;
  const person = "biography" in data && data;

  const title = () => {
    if (movie) return movie.title;
    if (tv) return tv.name;
    if (person) return person.name;
    return "";
  };

  const year = () => {
    if (movie) return ReleaseDateUI(movie.release_date).year;
    if (tv) return ReleaseDateUI(tv.first_air_date).year;
    if (person) return "";
    return "";
  };

  return (
    <div className="to-neutral text-secondary-content mb-10 bg-gradient-to-r from-secondary via-primary py-4">
      <div className="appContaier">
        <div className="flex gap-5">
          <div className="w-full basis-28 overflow-hidden rounded-md">
            <Link href={backTo.link}>
              {(movie || tv) && (
                <TMDBImages
                  type={{ type: "poster", size: "w92" }}
                  alt={title()}
                  src={data.poster_path}
                  priority
                  className="h-36 w-full"
                  sizes="102px"
                />
              )}
              {person && (
                <TMDBImages
                  type={{ type: "profile", size: "w185" }}
                  alt={title()}
                  src={data.profile_path}
                  priority
                  className="h-36 w-full"
                  sizes="102px"
                />
              )}
            </Link>
          </div>
          <div className="flex basis-full flex-col items-start justify-center gap-4">
            <h1 className="m-0">
              <Link href={backTo.link}>
                {`${title()}${year() && ` (${year()})`}`}
              </Link>
            </h1>
            <Link href={backTo.link} className="flex items-center gap-4">
              <BsFillArrowLeftCircleFill /> Back to {backTo.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackTo;
