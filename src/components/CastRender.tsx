"use client";

import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import { ProfileSizes } from "@/types/imageSizes";
import { CastAndCrew, TheCrew } from "@/types/movies/CastAndCrew";
import imageLink from "@/utils/imageLink";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ImageTMDB from "./ImageTMDB";

interface Props {
  queryKey: string;
  endpoint: string;
}

const CastRender = ({ queryKey, endpoint }: Props) => {
  const apiClientMainTitleCast = new MyAPIClient<CastAndCrew>(endpoint);
  const { data, error, isLoading } = useQuery<CastAndCrew>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitleCast.getAll(),
  });

  const apiClientConfig = new MyAPIClient<Image_Configuration>(
    RQ_CONFIG_ENDPOINT,
  );
  const { data: config } = useQuery<Image_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
    queryFn: () => apiClientConfig.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading translations...</div>;

  const cast = data?.cast;
  const crew = data?.crew;

  const groupedKeys = crew?.reduce(
    (group: { [key: string]: TheCrew[] }, item) => {
      if (!group[item.department]) {
        group[item.department] = [];
      }
      group[item.department].push(item);
      return group;
    },
    {},
  );

  const crewSorted = Object.values(groupedKeys!);

  return (
    <div className="appContaier flex flex-col gap-8 lg:flex-row">
      <div className="flex basis-1 flex-col gap-7 lg:basis-2/4">
        {cast?.length ? (
          <>
            <h2 className="flex items-center gap-4">
              Cast
              <div
                className={[
                  "badge",
                  "badge-sm",
                  "badge-primary",
                  "text-primary-content",
                  "gap-2",
                  "p-2",
                ].join(" ")}
              >
                {cast.length}
              </div>
            </h2>
            {cast.map((person) => (
              <div key={person.id} className="flex items-center gap-4">
                <div className="overflow-hidden rounded-md">
                  <Link href={`/person/${person.id}`}>
                    <ImageTMDB
                      type="poster"
                      alt={person.name}
                      src={imageLink<ProfileSizes>(
                        config?.images.secure_base_url!,
                        "w45",
                        person.profile_path,
                      )}
                      width={45}
                      height={68}
                      priority
                    />
                  </Link>
                </div>
                <div>
                  <h3 className="m-0">
                    <Link href={`/person/${person.id}`}>{person.name}</Link>
                  </h3>
                  <p>
                    <Link href={`/person/${person.id}`}>
                      <small>{person.character}</small>
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="alert alert-warning">No results</div>
        )}
      </div>
      <div className="basis-1 lg:basis-2/4">
        {crew?.length ? (
          <div className="flex flex-col gap-8">
            <h2 className="m-0 flex items-center gap-4">
              Crew
              <div
                className={[
                  "badge",
                  "badge-sm",
                  "badge-primary",
                  "text-primary-content",
                  "gap-2",
                  "p-2",
                ].join(" ")}
              >
                {crew.length}
              </div>
            </h2>
            {crewSorted
              .sort((a, b) => {
                if (
                  a.find((target) => target.department)?.department! <
                  b.find((target) => target.department)?.department!
                ) {
                  return -1;
                }
                if (
                  a.find((target) => target.department)?.department! >
                  b.find((target) => target.department)?.department!
                ) {
                  return 1;
                }
                return 0;
              })
              .map((crewDepartment, index) => (
                <div key={`crewDepartment-${index}`}>
                  <h3>{crewDepartment[0].department}</h3>
                  <div className="flex flex-col gap-4">
                    {crewDepartment
                      .sort((a, b) => {
                        if (a.job < b.job) {
                          return -1;
                        }
                        if (a.job > b.job) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((person, ind) => (
                        <div
                          key={`person-${person.id}-${ind}`}
                          className="flex items-center gap-4"
                        >
                          <div className="overflow-hidden rounded-md">
                            <Link href={`/person/${person.id}`}>
                              <ImageTMDB
                                type="poster"
                                alt={person.name}
                                src={imageLink<ProfileSizes>(
                                  config?.images.secure_base_url!,
                                  "w45",
                                  person.profile_path,
                                )}
                                width={45}
                                height={68}
                                priority
                              />
                            </Link>
                          </div>
                          <div>
                            <h4 className="m-0">
                              <Link href={`/person/${person.id}`}>
                                {person.name}
                              </Link>
                            </h4>
                            <p>
                              <Link href={`/person/${person.id}`}>
                                <small>{person.job}</small>
                              </Link>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="alert alert-warning">No results</div>
        )}
      </div>
    </div>
  );
};

export default CastRender;
