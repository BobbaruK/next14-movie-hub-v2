import { ReleaseDateResult } from "@/types/movies/movie/ReleaseDates";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { IsoLang } from "../IsoLang";

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
    <div
      id={`${releaseDate.iso_3166_1}`}
      className="card overflow-hidden bg-base-100 shadow-md shadow-primary"
    >
      <div className="bg-primary px-4 py-2 font-bold text-primary-content">
        <IsoLang iso={releaseDate.iso_3166_1} />
      </div>
      <div className="card-body relative flex justify-between gap-0 p-0">
        <div className="flex border-b-[1px] border-primary ">
          <div className="basis-1 px-4 py-2 font-bold md:basis-3/12">Date</div>
          <div className="basis-1 px-4 py-2 font-bold md:basis-2/12">
            Certification
          </div>
          <div className="basis-1 px-4 py-2 font-bold md:basis-3/12">Type</div>
          <div className="basis-1 px-4 py-2 font-bold md:basis-2/12">
            Language
          </div>
          <div className="basis-1 px-4 py-2 font-bold md:basis-2/12">Note</div>
        </div>
        {releaseDate.release_dates.map((date, index) => (
          <div className="flex" key={date.iso_639_1 + index}>
            <div className="basis-1 px-4 py-2 md:basis-3/12">
              {ReleaseDateUI(date.release_date).releaseDate}
            </div>
            <div className="basis-1 px-4 py-2 md:basis-2/12">
              {date.certification ? date.certification : "-"}
            </div>
            <div className="basis-1 px-4 py-2 md:basis-3/12">
              {releaseDateType(date.type)}
            </div>
            <div className="basis-1 px-4 py-2 md:basis-2/12">
              {date.iso_639_1 ? date.iso_639_1 : "-"}
            </div>
            <div className="basis-1 px-4 py-2 md:basis-2/12">
              {date.note ? date.note : "-"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReleaseDateCard;
