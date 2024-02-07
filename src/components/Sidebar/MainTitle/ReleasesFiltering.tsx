"use client";

import CustomAlert from "@/components/CustomAlert";
import { IsoLang } from "@/components/IsoLang";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ReleaseDatesResponse } from "@/types/movies/movie/ReleaseDates";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  title: string;
  queryKey: string;
}

const ReleasesFiltering = ({ title, queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<ReleaseDatesResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Release dates sidebar"}
        description="Loading... Please be patient"
      />
    );

  return (
    <>
      <Card className="overflow-hidden">
        <h2 className="m-0 flex items-center justify-between bg-primary px-2 py-4 text-primary-foreground">
          {title}
          <Badge variant="secondary">{data?.results.length}</Badge>
        </h2>
        <CardContent className="p-0">
          <ul className="flex flex-col gap-1 py-2">
            {data?.results
              .sort((a, b) => {
                if (a.iso_3166_1 < b.iso_3166_1) {
                  return -1;
                }
                if (a.iso_3166_1 > b.iso_3166_1) {
                  return 1;
                }
                return 0;
              })
              .map((translation, index) => (
                <li
                  key={translation.iso_3166_1 + index}
                  className="p-2 hover:bg-secondary hover:text-secondary-foreground"
                >
                  <Link
                    href={`#${translation.iso_3166_1}`}
                    className={[
                      "flex",
                      "items-center",
                      "justify-between",
                      "w-full",
                    ].join(" ")}
                  >
                    <IsoLang iso={translation.iso_3166_1} />

                    <Badge variant="default">
                      {translation.release_dates.length}
                    </Badge>
                  </Link>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default ReleasesFiltering;
