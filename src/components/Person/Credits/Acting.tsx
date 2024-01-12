import ReleaseDateUI from "@/utils/releaseDateUI";
import Link from "next/link";
import React from "react";

interface Props {
  castArr: (CombinedCreditsMovieCast[] | CombinedCreditsTVCast[])[][];
}

const Acting = ({ castArr }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-primary shadow-md shadow-primary">
      {castArr
        .sort((a, b) => {
          return b[0][0].year - a[0][0].year;
        })
        .map((groups, index) => (
          <React.Fragment key={`group-${index}`}>
            <div className="flex flex-col gap-4 p-3">
              {groups.map((groupCredit, ind) => (
                <div key={`groupCredit-${ind}`} className="flex flex-row gap-4">
                  <div>
                    {ReleaseDateUI(
                      "title" in groupCredit[0]
                        ? groupCredit[0].release_date
                        : groupCredit[0].first_air_date,
                    ).year
                      ? ReleaseDateUI(
                          "title" in groupCredit[0]
                            ? groupCredit[0].release_date
                            : groupCredit[0].first_air_date,
                        ).year
                      : "-"}
                  </div>
                  &bull;
                  <div className="flex flex-col">
                    <div className="font-bold">
                      <Link
                        href={`/${groupCredit[0].media_type}/${groupCredit[0].id}`}
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
            <hr className="border-primary" />
          </React.Fragment>
        ))}
    </div>
  );
};

export default Acting;
