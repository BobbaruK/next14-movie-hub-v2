"use client";

import CustomAlert from "@/components/CustomAlert";
import TMDBImages from "@/components/TMDBImages";
import { Badge } from "@/components/ui/badge";
import { CastAndCrew, TheCrew } from "@/types/movies/CastAndCrew";
import idTitleHyphen from "@/utils/idTitleHyphen";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  queryKey: string;
}

const Cast = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<CastAndCrew>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading) {
    return (
      <CustomAlert
        variant="default"
        title={"Cast and crew"}
        description="Loading... Please be patient"
        className="appContaier"
      />
    );
  }
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
              <Badge variant="secondary">{cast.length}</Badge>
            </h2>
            {cast.map((person) => (
              <div key={person.id} className="flex items-center gap-4">
                <Link href={`/person/${idTitleHyphen(person.id, person.name)}`}>
                  <TMDBImages
                    type="profile"
                    alt={person.name}
                    src={person.profile_path}
                    sizes="80px"
                    className="h-32 w-20 rounded-lg"
                  />
                </Link>
                <div>
                  <h3 className="m-0">
                    <Link
                      href={`/person/${idTitleHyphen(person.id, person.name)}`}
                    >
                      {person.name}
                    </Link>
                  </h3>
                  <p>
                    <Link
                      href={`/person/${idTitleHyphen(person.id, person.name)}`}
                    >
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
              <Badge variant="secondary">{crew.length}</Badge>
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
                          <Link
                            href={`/person/${idTitleHyphen(
                              person.id,
                              person.name,
                            )}`}
                          >
                            <TMDBImages
                              type="profile"
                              alt={person.name}
                              src={person.profile_path}
                              sizes="80px"
                              className="h-32 w-20 rounded-lg"
                            />
                          </Link>
                          <div>
                            <h4 className="m-0">
                              <Link
                                href={`/person/${idTitleHyphen(
                                  person.id,
                                  person.name,
                                )}`}
                              >
                                {person.name}
                              </Link>
                            </h4>
                            <p>
                              <Link
                                href={`/person/${idTitleHyphen(
                                  person.id,
                                  person.name,
                                )}`}
                              >
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

export default Cast;
