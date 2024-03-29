"use client";

import CustomAlert from "@/components/CustomAlert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RQ_COUNTRIES_KEY } from "@/constants";
import { Country } from "@/types/Country";
import { MovieAlternativeTitles } from "@/types/movies/movie/MovieAlternativeTitles";
import { TVShowAlternativeTitles } from "@/types/movies/tv/TVShowAlternativeTitles";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  title: string;
  queryKey: string;
}

const AlternativeTitlesFiltering = ({ title, queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<
    MovieAlternativeTitles | TVShowAlternativeTitles
  >({
    queryKey: [queryKey],
  });

  const {
    data: countries,
    error: errorCountries,
    isLoading: isLoadingCountries,
  } = useQuery<Country[]>({
    queryKey: [RQ_COUNTRIES_KEY],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);
  if (errorCountries)
    throw new Error(`${queryKey} - ${errorCountries.message}`);

  if (isLoading || isLoadingCountries)
    return (
      <CustomAlert
        variant="default"
        title={"Alternative titles sidebar"}
        description="Loading... Please be patient"
      />
    );

  const titles =
    "titles" in data! ? data.titles : "results" in data! ? data.results : [];

  const titlesCountries: string[] = [];

  titles.forEach((title) => {
    if (titlesCountries.includes(title.iso_3166_1)) return;
    titlesCountries.push(title.iso_3166_1);
  });

  return (
    <>
      <Card className="overflow-hidden">
        <h2 className="m-0 flex items-center justify-between bg-primary px-2 py-4 text-primary-foreground">
          {title}
          <Badge variant="secondary">{titles.length}</Badge>
        </h2>
        <CardContent className="p-0">
          <ul className="flex flex-col gap-1 py-2">
            {titlesCountries
              ?.sort((a, b) => {
                if (a < b) {
                  return -1;
                }
                if (a > b) {
                  return 1;
                }
                return 0;
              })
              .map((country, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-secondary hover:text-secondary-foreground"
                >
                  <Link
                    href={`#${country}`}
                    className={[
                      "flex",
                      "items-center",
                      "justify-between",
                      "w-full",
                    ].join(" ")}
                  >
                    {countries?.find((cntry) => cntry.iso_3166_1 === country)
                      ?.english_name || country}

                    <Badge variant="default">
                      {
                        titles.filter((title) => title.iso_3166_1 === country)
                          .length
                      }
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

export default AlternativeTitlesFiltering;
