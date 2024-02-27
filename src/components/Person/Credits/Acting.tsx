import { Card } from "@/components/ui/card";
import usePersonTitlesCast from "@/hooks/usePersonTitlesCast";
import { MediaType } from "@/types/MediaType";
import {
  CombinedCreditsMovieCast,
  CombinedCreditsTVCast,
} from "@/types/people/CombinedCredits";
import idTitleHyphen from "@/utils/idTitleHyphen";
import Link from "next/link";
import React from "react";

interface Props {
  castArr: CombinedCreditsMovieCast[] | CombinedCreditsTVCast[];
  searchParams: {
    credit_media_type: MediaType | null;
  };
}

const Acting = ({ castArr, searchParams: { credit_media_type } }: Props) => {
  const creditsCombined = usePersonTitlesCast(castArr);

  return (
    <Card className="flex flex-col gap-0 overflow-hidden">
      {creditsCombined
        .sort((a, b) => {
          return b[0][0].year - a[0][0].year;
        })
        .map((groups, index) => {
          return (
            <React.Fragment key={`group-${index}`}>
              <div>
                <div className="peer flex flex-col gap-4 px-3 py-4 empty:hidden">
                  {groups.map((groupCredit, ind) => {
                    if (
                      groupCredit[0].media_type === credit_media_type ||
                      credit_media_type === null
                    ) {
                      return (
                        <React.Fragment key={`groupCredit-${ind}`}>
                          <div className="text-center sm:grid sm:grid-cols-person-credit sm:gap-4 sm:text-start">
                            <div className="text-center">
                              {groupCredit[0].year ? groupCredit[0].year : "-"}
                            </div>
                            <div className="hidden sm:block">&bull;</div>
                            <div className="flex flex-col">
                              <div className="font-bold">
                                <Link
                                  href={`/${groupCredit[0].media_type}/${idTitleHyphen(
                                    groupCredit[0].id,
                                    "title" in groupCredit[0]
                                      ? groupCredit[0].title
                                      : groupCredit[0].name,
                                  )}`}
                                >
                                  {"title" in groupCredit[0]
                                    ? groupCredit[0].title
                                    : groupCredit[0].name}
                                </Link>
                              </div>
                              {groupCredit.map((title, index) => {
                                return (
                                  <div
                                    key={title.id + index}
                                    className="indent-5"
                                  >
                                    {title.media_type === "tv" &&
                                      `(${
                                        !("title" in title) &&
                                        title.episode_count
                                      } episode${
                                        !("title" in title) &&
                                        (title.episode_count > 1 ? "s" : "")
                                      }) `}
                                    {title.character && "as " + title.character}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    }
                  })}
                </div>
                <hr className="peer-empty:hidden" />
              </div>
            </React.Fragment>
          );
        })}
    </Card>
  );
};

export default Acting;
