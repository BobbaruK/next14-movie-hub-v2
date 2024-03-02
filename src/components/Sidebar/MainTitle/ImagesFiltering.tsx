"use client";

import CustomAlert from "@/components/CustomAlert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RQ_LANGUAGES_KEY } from "@/constants";
import { GridImagesType } from "@/types/GridImagesType";
import { ImagesResponse } from "@/types/ImagesResponse";
import { MediaType } from "@/types/MediaType";
import { Language } from "@/types/movies/Language";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";

interface Props {
  title: string;
  queryKey: string;
  imagesType: GridImagesType;
  titleType: MediaType;
}

const ImagesFiltering = ({ title, queryKey, imagesType, titleType }: Props) => {
  const { id } = useParams<{ id: string }>();
  
  const pathname = usePathname()

  const searchParams = useSearchParams();
  const imagesLanguage = searchParams.get("lang");

  const {
    data: imagesData,
    error: imagesError,
    isLoading: imagesIsLoading,
  } = useQuery<ImagesResponse>({
    queryKey: [queryKey],
  });

  const {
    data: languagesData,
    error: languagesError,
    isLoading: languagesIsLoading,
  } = useQuery<Language[]>({
    queryKey: [RQ_LANGUAGES_KEY],
  });

  if (imagesError) throw new Error(`${queryKey} - ${imagesError.message}`);
  if (languagesError)
    throw new Error(`${queryKey} - ${languagesError.message}`);

  if (imagesIsLoading || languagesIsLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Images sidebar"}
        description="Loading... Please be patient"
      />
    );

  const countries: string[] = [];

  if (imagesData) {
    switch (imagesType) {
      case "backdrops":
        for (let i = 0; i < imagesData.backdrops.length; i++) {
          const langToPush = languagesData?.find(
            (lang) => lang.iso_639_1 === imagesData.backdrops[i].iso_639_1,
          )?.english_name;

          if (langToPush === undefined) continue;

          if (!countries.includes(langToPush)) countries.push(langToPush);
        }

        break;

      case "logos":
        for (let i = 0; i < imagesData.logos.length; i++) {
          const langToPush = languagesData?.find(
            (lang) => lang.iso_639_1 === imagesData.logos[i].iso_639_1,
          )?.english_name;

          if (langToPush === undefined) continue;

          if (!countries.includes(langToPush)) countries.push(langToPush);
        }

        break;

      case "posters":
        for (let i = 0; i < imagesData.posters.length; i++) {
          const langToPush = languagesData?.find(
            (lang) => lang.iso_639_1 === imagesData.posters[i].iso_639_1,
          )?.english_name;

          if (langToPush === undefined) continue;

          if (!countries.includes(langToPush)) countries.push(langToPush);
        }

        break;

      case "profiles":
        break;

      case "stills":
        for (let i = 0; i < imagesData.stills.length; i++) {
          const langToPush = languagesData?.find(
            (lang) => lang.iso_639_1 === imagesData.stills[i].iso_639_1,
          )?.english_name;

          if (langToPush === undefined) continue;

          if (!countries.includes(langToPush)) countries.push(langToPush);
        }

        break;
    }
  }

  const hasNull =
    imagesData &&
    imagesData[imagesType].filter((lng) => lng.iso_639_1 === null).length > 0
      ? true
      : false;

  return (
    <Card className="overflow-hidden">
      <h2 className="m-0 flex items-center justify-between bg-primary px-2 py-4 text-primary-foreground">
        {title}
      </h2>
      <CardContent className="p-0">
        <ul className="flex flex-col gap-1 py-2">
          {imagesData &&
            imagesData[imagesType].filter((lng) => lng.iso_639_1 === null)
              .length > 0 && (
              <li
                className={`p-2 hover:bg-secondary hover:text-secondary-foreground ${imagesLanguage === null ? "text-accent-content bg-primary-foreground text-primary" : "hover:bg-secondary hover:text-secondary-foreground"}`}
              >
                <Link
                  href={pathname}
                  className={[
                    "flex",
                    "items-center",
                    "justify-between",
                    "w-full",
                  ].join(" ")}
                >
                  No Language
                  <Badge variant="default">
                    {
                      imagesData[imagesType].filter(
                        (lng) => lng.iso_639_1 === null,
                      ).length
                    }
                  </Badge>
                </Link>
              </li>
            )}
          {imagesData &&
            imagesData[imagesType].filter((lng) => lng.iso_639_1 === "en")
              .length > 0 && (
              <li
                className={`p-2 hover:bg-secondary hover:text-secondary-foreground ${imagesLanguage === "en" || (!hasNull && imagesLanguage === null) ? "text-accent-content bg-primary-foreground text-primary" : "hover:bg-secondary hover:text-secondary-foreground"}`}
              >
                <Link
                  href={`${pathname}?lang=en`}
                  className={[
                    "flex",
                    "items-center",
                    "justify-between",
                    "w-full",
                  ].join(" ")}
                >
                  English
                  <Badge variant="default">
                    {
                      imagesData[imagesType].filter(
                        (lng) => lng.iso_639_1 === "en",
                      ).length
                    }
                  </Badge>
                </Link>
              </li>
            )}
          {countries
            .sort((a, b) => {
              if (a < b) {
                return -1;
              }
              if (a > b) {
                return 1;
              }
              return 0;
            })
            .map((lang) => {
              if (lang === "English") return;

              const langIso = languagesData?.find(
                (lng) => lng.english_name === lang,
              )?.iso_639_1;

              return (
                <li
                  key={lang.replaceAll(" ", "")}
                  className={`p-2 hover:bg-secondary hover:text-secondary-foreground ${langIso === imagesLanguage ? "text-accent-content bg-primary-foreground text-primary" : "hover:bg-secondary hover:text-secondary-foreground"}`}
                >
                  <Link
                    href={`/${titleType}/${id}/images/${imagesType}?lang=${langIso}`}
                    className={[
                      "flex",
                      "items-center",
                      "justify-between",
                      "w-full",
                    ].join(" ")}
                  >
                    {lang}
                    <Badge variant="default">
                      {imagesData &&
                        imagesData[imagesType].filter(
                          (lng) => lng.iso_639_1 === langIso,
                        ).length}
                    </Badge>
                  </Link>
                </li>
              );
            })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ImagesFiltering;
