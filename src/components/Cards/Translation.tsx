import { CollectionTranslationBase } from "@/types/Collection";
import {
  TranslationMovieBase,
  TranslationPeopleBase,
  TranslationTVShowBase,
} from "@/types/movies/TranslationsResponse";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

interface Props {
  translation:
    | TranslationMovieBase
    | TranslationTVShowBase
    | TranslationPeopleBase
    | CollectionTranslationBase;
}

const TranslationCard = ({ translation }: Props) => {
  const title =
    "title" in translation.data
      ? translation.data.title
      : "name" in translation.data
        ? translation.data.name
        : "";
  return (
    <Card
      className="overflow-hidden"
      id={`${translation.iso_639_1}-${translation.iso_3166_1}`}
    >
      <div className="bg-primary px-4 py-2 font-bold text-primary-foreground">
        {translation.english_name}{" "}
        <small>
          ({translation.iso_639_1}-{translation.iso_3166_1})
        </small>
      </div>
      <CardContent className="p-0 md:hidden">
        <div className="flex flex-col px-4 py-2 text-center">
          <div className="font-bold">
            {"title" in translation.data ? "Title:" : "Name:"}
          </div>
          <div>{title || "-"}</div>
        </div>

        {!("biography" in translation.data) && (
          <>
            <div className="flex flex-col px-4 py-2 text-center">
              <div className="font-bold">Tagline:</div>
              <div>{translation.data.tagline || "-"}</div>
            </div>
            <div className="flex flex-col px-4 py-2 text-center">
              <div className="font-bold">Overview:</div>
              <div>{translation.data.overview || "-"}</div>
            </div>
          </>
        )}

        {"biography" in translation.data && (
          <div className="flex flex-col px-4 py-2 text-center">
            <div className="font-bold">Biography:</div>
            <div>
              {translation.data.biography ? translation.data.biography : "-"}
            </div>
          </div>
        )}
        {"title" in translation.data && (
          <>
            <div className="flex flex-col px-4 py-2 text-center">
              <div className="font-bold">Runtime:</div>
              <div>
                {translation.data.runtime
                  ? translation.data.runtime + " minutes"
                  : "-"}
              </div>
            </div>
            <div className="flex flex-col px-4 py-2 text-center">
              <div className="font-bold">Homepage:</div>
              <div>
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
      </CardContent>
      <CardContent className="hidden p-0 md:block">
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
            <div
              className={`flex ${"title" in translation.data && "border-b-[1px] border-primary"}`}
            >
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
            <div className="flex">
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
            <div className="flex">
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
      </CardContent>
    </Card>
  );
};

export default TranslationCard;
