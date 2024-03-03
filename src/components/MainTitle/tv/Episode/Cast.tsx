import TMDBImages from "@/components/TMDBImages";
import { Badge } from "@/components/ui/badge";
import { EpisodeResponse } from "@/types/movies/tv/EpisodeResponse";
import idTitleHyphen from "@/utils/idTitleHyphen";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface Props {
  episodeResponse: EpisodeResponse | undefined;
}

const EpisodeCast = ({ episodeResponse }: Props) => {
  const { id, seasonNumber, episodeNumber } = useParams<{
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>();

  const directedBy = episodeResponse?.crew.filter(
    (dude) => dude.department === "Directing",
  );
  const writtenBy = episodeResponse?.crew.filter(
    (dude) => dude.department === "Writing",
  );

  // if (!episodeResponse)
  //   return (
  //     <CustomAlert
  //       variant="default"
  //       title={"Episode"}
  //       description="Loading... Please be patient"
  //     />
  //   );

  // TODO: try DRY bro wtf

  return (
    <div>
      <h2 className="flex items-center justify-between gap-8">
        Cast
        <Link
          className="text-sm font-light"
          href={`/tv/${id}/seasons/${seasonNumber}/${idTitleHyphen(
            episodeResponse?.episode_number!,
            episodeResponse?.name!,
          )}/cast`}
        >
          Full Cast & Crew
        </Link>
      </h2>
      <div className="flex flex-col gap-16 2xl:flex-row">
        <div className="2xl:w-56">
          <h3 className="flex flex-row flex-wrap items-center gap-4">
            Crew{" "}
            <Badge variant="secondary">{episodeResponse?.crew.length}</Badge>
          </h3>
          <div className="flex flex-col flex-wrap gap-2">
            <p>
              Directed by:{" "}
              {directedBy?.map((director, index) => (
                <React.Fragment key={director.id + "" + index}>
                  <Link
                    href={`/person/${idTitleHyphen(director.id, director.name)}`}
                  >
                    {director.name}
                  </Link>
                  {(index > 0 || index < directedBy.length - 1) && ", "}
                </React.Fragment>
              ))}
            </p>
            <p>
              Written by:{" "}
              {writtenBy?.map((writer, index) => (
                <React.Fragment key={writer.id + "" + index}>
                  <Link
                    href={`/person/${idTitleHyphen(writer.id, writer.name)}`}
                  >
                    {writer.name}
                  </Link>
                  {(index > 0 || index < writtenBy.length - 1) && ", "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
        <div className="grow">
          <h3 className="flex flex-row flex-wrap items-center gap-4">
            Guest stars
            <Badge variant="secondary">
              {episodeResponse?.guest_stars.length}
            </Badge>
          </h3>
          <div className="grid auto-cols-auto gap-4 md:grid-cols-2 xl:grid-cols-3">
            {episodeResponse?.guest_stars.map((star) => (
              <div key={star.id} className="flex flex-row gap-4">
                <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                  <TMDBImages
                    type="profile"
                    alt={star.name}
                    src={star.profile_path}
                    sizes="80px"
                    className="h-32 w-20 rounded-lg"
                  />
                </Link>
                <div className="flex flex-col items-start justify-center gap-1">
                  <h4>
                    <Link href={`/person/${idTitleHyphen(star.id, star.name)}`}>
                      {star.name}
                    </Link>
                  </h4>
                  <div>{star.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCast;
