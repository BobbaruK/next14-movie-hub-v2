import { ReleaseDateResult } from "@/types/movies/movie/ReleaseDates";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { IsoLang } from "../IsoLang";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  releaseDate: ReleaseDateResult;
}

const ReleaseDateCard = ({ releaseDate }: Props) => {
  const releaseDateType = (type: number) => {
    switch (type) {
      case 1:
        return "Premiere";

      case 2:
        return "Theatrical (limited)";

      case 3:
        return "Theatrical";

      case 4:
        return "Digital";

      case 5:
        return "Physical";

      case 6:
        return "TV";

      default:
        return "-";
    }
  };

  return (
    <>
      <Card id={`${releaseDate.iso_3166_1}`} className="overflow-hidden">
        <div className="text-primary-foreground bg-primary px-4 py-2 font-bold">
          <IsoLang iso={releaseDate.iso_3166_1} />
        </div>
        <CardContent className="p-0 md:hidden">
          {releaseDate.release_dates.map((date, index) => (
            <div
              key={date.iso_639_1 + index}
              className={`${index !== releaseDate.release_dates.length - 1 && "border-b-[1px] border-primary"}`}
            >
              <div className="flex flex-col px-4 py-2 text-center">
                <div className="font-bold">Date:</div>
                <div>{ReleaseDateUI(date.release_date).releaseDate}</div>
              </div>
              <div className="flex flex-col px-4 py-2 text-center">
                <div className="font-bold">Certification:</div>
                <div>{date.certification ? date.certification : "-"}</div>
              </div>
              <div className="flex flex-col px-4 py-2 text-center">
                <div className="font-bold">Type:</div>
                <div>{releaseDateType(date.type)}</div>
              </div>
              <div className="flex flex-col px-4 py-2 text-center">
                <div className="font-bold">Language:</div>
                <div>{date.iso_639_1 ? date.iso_639_1 : "-"}</div>
              </div>
              <div className="flex flex-col px-4 py-2 text-center">
                <div className="font-bold">Note:</div>
                <div>{date.note ? date.note : "-"}</div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardContent className="hidden p-0 md:block">
          <div className="flex border-b-[1px] border-primary">
            <div className="basis-1 px-4 py-2 font-bold md:basis-3/12">
              Date
            </div>
            <div className="basis-1 px-4 py-2 font-bold md:basis-2/12">
              Certification
            </div>
            <div className="basis-1 px-4 py-2 font-bold md:basis-3/12">
              Type
            </div>
            <div className="basis-1 px-4 py-2 font-bold md:basis-2/12">
              Language
            </div>
            <div className="basis-1 px-4 py-2 font-bold md:basis-2/12">
              Note
            </div>
          </div>
          {releaseDate.release_dates.map((date, index) => (
            <div className="flex" key={date.iso_639_1 + index}>
              <div className="basis-3/12 px-4 py-2">
                {ReleaseDateUI(date.release_date).releaseDate}
              </div>
              <div className="basis-2/12 px-4 py-2">
                {date.certification ? date.certification : "-"}
              </div>
              <div className="basis-3/12 px-4 py-2">
                {releaseDateType(date.type)}
              </div>
              <div className="basis-2/12 px-4 py-2">
                {date.iso_639_1 ? date.iso_639_1 : "-"}
              </div>
              <div className="basis-2/12 px-4 py-2">
                {date.note ? date.note : "-"}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default ReleaseDateCard;
