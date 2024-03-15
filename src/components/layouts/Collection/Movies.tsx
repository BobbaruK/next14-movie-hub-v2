"use client";

import CustomAlert from "@/components/CustomAlert";
import TMDBImages from "@/components/TMDBImages";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { RQ_COLLECTION_KEY, searchMovieCardImage } from "@/constants";
import { Collection } from "@/types/Collection";
import idTitleHyphen from "@/utils/idTitleHyphen";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

const CollectionMovies = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery<Collection>({
    queryKey: [RQ_COLLECTION_KEY(id)],
  });

  if (error) throw new Error(`${RQ_COLLECTION_KEY(id)} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Cast"}
        description="Loading... Please be patient"
      />
    );

  if (!data) return null;

  return (
    <>
      <h2>{data.parts.length} movies</h2>
      {data.parts.map((movie) => (
        <Card key={movie.id} className="flex-row overflow-hidden md:flex">
          <Link href={`/movie/${idTitleHyphen(movie.id, movie.title)}`}>
            <TMDBImages
              type="poster"
              alt={movie.title}
              src={movie.poster_path!}
              className={`w-full md:w-32 md:min-w-36 ${searchMovieCardImage}`}
              sizes={`
							(max-width: 320px) 285px,
							(max-width: 639px) 588px,
							(max-width: 767px) 716px,
							144px
						`}
            />
          </Link>
          <div className="flex flex-col justify-between gap-4">
            <CardHeader>
              <CardTitle className="m-0">
                <Link href={`/movie/${idTitleHyphen(movie.id, movie.title)}`}>
                  {movie.title}
                </Link>
              </CardTitle>
              <CardDescription>
                {ReleaseDateUI(movie.release_date).releaseDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="md:line-clamp-2">{movie.overview}</p>
            </CardContent>
            {/* <CardFooter>
						<p>Card Footer</p>
					</CardFooter> */}
          </div>
        </Card>
      ))}
    </>
  );
};

export default CollectionMovies;
