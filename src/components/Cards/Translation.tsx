import {
  TranslationMovieBase,
  TranslationPeopleBase,
  TranslationTVShowBase,
} from "@/types/movies/TranslationsResponse";
import Link from "next/link";

interface Props {
  translation:
    | TranslationMovieBase
    | TranslationTVShowBase
    | TranslationPeopleBase;
}

const TranslationCard = ({ translation }: Props) => {
  const title =
    "title" in translation.data
      ? translation.data.title
      : "name" in translation.data
        ? translation.data.name
        : "";
  return (
    <div
      id={`${translation.iso_639_1}-${translation.iso_3166_1}`}
      className="card overflow-hidden bg-base-100 shadow-md shadow-primary"
    >
      <div className="bg-primary px-4 py-2 font-bold text-primary-content">
        {translation.english_name}{" "}
        <small>
          ({translation.iso_639_1}-{translation.iso_3166_1})
        </small>
      </div>
      <div className="card-body relative flex justify-between gap-0 p-0">
        <div className="flex border-b-[1px] border-primary ">
          <div className="basis-2/4 border-r-[1px] border-primary px-4 py-2 font-bold md:basis-1/5">
            {"title" in translation.data ? "Title" : "Name"}
          </div>
          <div className="basis-2/4 px-4 py-2 md:basis-4/5">{title || "-"}</div>
        </div>
        {!("biography" in translation.data) && (
          <>
            <div className="flex border-b-[1px] border-primary">
              <div className="basis-2/4 border-r-[1px] border-primary px-4 py-2 font-bold md:basis-1/5">
                Tagline
              </div>
              <div className="basis-2/4 px-4 py-2 md:basis-4/5">
                {translation.data.tagline || "-"}
              </div>
            </div>
            <div className="flex border-b-[1px] border-primary">
              <div className="basis-2/4 border-r-[1px] border-primary px-4 py-2 font-bold md:basis-1/5">
                Overview
              </div>
              <div className="basis-2/4 px-4 py-2 md:basis-4/5">
                {translation.data.overview || "-"}
              </div>
            </div>
          </>
        )}
        {"biography" in translation.data && (
          <>
            <div className="flex border-b-[1px] border-primary">
              <div className="basis-2/4 border-r-[1px] border-primary px-4 py-2 font-bold md:basis-1/5">
                Biography
              </div>
              <div className="basis-2/4 px-4 py-2 md:basis-4/5">
                {translation.data.biography ? translation.data.biography : "-"}
              </div>
            </div>
          </>
        )}
        {"title" in translation.data && (
          <>
            <div className="flex border-b-[1px] border-primary">
              <div className="basis-2/4 border-r-[1px] border-primary px-4 py-2 font-bold md:basis-1/5">
                Runtime
              </div>
              <div className="basis-2/4 px-4 py-2 md:basis-4/5">
                {translation.data.runtime
                  ? translation.data.runtime + " minutes"
                  : "-"}
              </div>
            </div>
            <div className="flex border-b-[1px] border-primary">
              <div className="basis-2/4 border-r-[1px] border-primary px-4 py-2 font-bold md:basis-1/5">
                Homepage
              </div>
              <div className="basis-2/4 px-4 py-2 md:basis-4/5">
                {translation.data.homepage ? (
                  <Link href={translation.data.homepage} target="_blank">
                    {translation.data.homepage}
                  </Link>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TranslationCard;
