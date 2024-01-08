import { Country } from "@/types/Country";
import { AlternativeTitle } from "@/types/movies/AlternativeTitle";

interface Props {
  titles: AlternativeTitle[];
  countries: Country[];
}

const AltTitleCard = ({ titles, countries }: Props) => {
  const countryName = countries.find(
    (country) => country.iso_3166_1 === titles[0].iso_3166_1,
  );
  return (
    <div
      id={titles[0].iso_3166_1}
      className="card overflow-hidden bg-base-100 shadow-md shadow-primary"
    >
      <div className="bg-primary px-4 py-2 text-primary-content font-bold">
        {countryName?.english_name}
      </div>
      <div className="card-body relative flex justify-between gap-2 p-0">
        <div className="flex px-4 py-2 border-b-[1px] border-primary">
          <div className="basis-2/4 font-bold">Title</div>
          <div className="basis-2/4 font-bold">Type</div>
        </div>
        {titles.map((title, ind) => (
          <div className="flex px-4 py-2" key={title.iso_3166_1 + ind}>
            <div className="basis-2/4">{title.title}</div>
            <div className="basis-2/4">{title.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AltTitleCard;
