import { Card } from "@/components/ui/card";
import usePersonTitlesCast from "@/hooks/usePersonTitlesCast";
import {
  CombinedCreditsMovieCast,
  CombinedCreditsTVCast,
} from "@/types/people/CombinedCredits";
import idTitleHyphen from "@/utils/idTitleHyphen";
import Link from "next/link";
import React from "react";

interface Props {
  castArr: CombinedCreditsMovieCast[] | CombinedCreditsTVCast[];
}

const Acting = ({ castArr }: Props) => {
  const creditsCombined = usePersonTitlesCast(castArr);

  return (
    <Card className="flex flex-col gap-6 overflow-hidden pt-4">
      {creditsCombined
        .sort((a, b) => {
          return b[0][0].year - a[0][0].year;
        })
        .map((groups, index) => (
          <React.Fragment key={`group-${index}`}>
            <div className="flex flex-col gap-4 px-3">
              {groups.map((groupCredit, ind) => (
                <div
                  key={`groupCredit-${ind}`}
                  className="text-center sm:grid sm:grid-cols-person-credit sm:gap-4 sm:text-start"
                >
                  <div className="text-center">
                    {groupCredit[0].year ? groupCredit[0].year : "-"}
                  </div>
                  <div className="hidden sm:block">&bull;</div>
                  <div className="flex flex-col">
                    <div className="font-bold">
                      {/* <Link
                        href={`/${groupCredit[0].media_type}/${groupCredit[0].id}`}
                      > */}
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
                    {groupCredit.map((title, index) => (
                      <div key={title.id + index} className="indent-5">
                        {title.media_type === "tv" &&
                          `(${
                            !("title" in title) && title.episode_count
                          } episode${
                            !("title" in title) &&
                            (title.episode_count > 1 ? "s" : "")
                          }) `}
                        {title.character && "as " + title.character}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <hr className="" />
          </React.Fragment>
        ))}
    </Card>
  );
};

export default Acting;
