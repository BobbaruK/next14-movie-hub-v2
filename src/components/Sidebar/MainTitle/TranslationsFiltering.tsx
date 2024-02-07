"use client";

import CustomAlert from "@/components/CustomAlert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TranslationsBase } from "@/types/movies/TranslationsResponse";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  title: string;
  queryKey: string;
}

const TranslationsFiltering = ({ title, queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<TranslationsBase>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Translations sidebar"}
        description="Loading... Please be patient"
      />
    );

  return (
    <>
      <Card className="overflow-hidden">
        <h2 className="m-0 flex items-center justify-between bg-primary px-2 py-4 text-primary-foreground">
          {title}
          <Badge variant="secondary">{data?.translations.length}</Badge>
        </h2>
        <CardContent className="p-0">
          <ul className="flex flex-col gap-1 py-2">
            {data?.translations
              .sort((a, b) => {
                if (a.english_name < b.english_name) {
                  return -1;
                }
                if (a.english_name > b.english_name) {
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
                    href={`#${translation.iso_639_1}-${translation.iso_3166_1}`}
                    className={[
                      "flex",
                      "items-center",
                      "justify-between",
                      "w-full",
                    ].join(" ")}
                  >
                    {translation.english_name}
                    <Badge variant="default">
                      {translation.iso_639_1}-{translation.iso_3166_1}
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

export default TranslationsFiltering;
