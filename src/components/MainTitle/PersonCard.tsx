import { ProfileSizes } from "@/types/imageSizes";
import { TheCast } from "@/types/movies/CastAndCrew";
import imageLink from "@/utils/imageLink";
import Link from "next/link";
import { title } from "process";
import ImageTMDB from "../ImageTMDB";

interface Props {
  cast: TheCast;
}

const MainTitlePersonCard = ({ cast }: Props) => {
  return (
    <div className="card overflow-hidden bg-base-100 shadow-md shadow-primary">
      <figure>
        <Link href={`/person/${cast.id}`} className="w-full">
          <ImageTMDB
            type="poster"
            alt={cast.name}
            src={imageLink<ProfileSizes>(
              "https://image.tmdb.org/t/p/",
              "w185",
              cast.profile_path,
            )}
            width={1000}
            height={1500}
          />
        </Link>
      </figure>
      <div className="card-body relative flex justify-between gap-1 p-4 pt-7">
        <p>
          <Link href={`/person/${cast.id}`} className="w-full">
            {cast.name}
          </Link>
        </p>
        <p>
          <small>
            <Link href={`/person/${cast.id}`} className="w-full">
              {cast.character}
            </Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default MainTitlePersonCard;
