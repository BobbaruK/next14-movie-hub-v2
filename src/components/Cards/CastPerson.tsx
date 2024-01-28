import { TheCast } from "@/types/movies/CastAndCrew";
import idTitleHyphen from "@/utils/idTitleHyphen";
import TMDBImages from "../TMDBImages";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import Link from "next/link";

const CastPersonCard = ({ cast }: { cast: TheCast }) => {
  return (
    <>
      <Card className="h-full overflow-hidden">
        <Link
          href={`/person/${idTitleHyphen(cast.id, cast.name)}`}
          className="w-full"
        >
          <TMDBImages
            type={{ type: "profile", size: "w185" }}
            alt={cast.name}
            src={cast.profile_path}
            width={185}
            height={278}
          />
        </Link>
        <CardHeader>
          <CardTitle>
            <Link
              href={`/person/${idTitleHyphen(cast.id, cast.name)}`}
              className="w-full"
            >
              {cast.name}
            </Link>
          </CardTitle>
          <CardDescription>{cast.character}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};

export default CastPersonCard;
