"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import MyAPIClient from "@/services/myApiClient";
import { TranslationsBase } from "@/types/movies/TranslationsResponse";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  title: string;
  queryKey: string;
  endpoint: string;
}

const TranslationsFiltering = ({ title, queryKey, endpoint }: Props) => {
  const apiClientMainTitle = new MyAPIClient<TranslationsBase>(endpoint);
  const { data, error, isLoading } = useQuery<TranslationsBase>({
    queryKey: [queryKey],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading sidebar...</div>;

  return (
    <>
      <Card className="overflow-hidden">
        <h2 className="text-primary-content m-0 flex items-center justify-between bg-primary px-2 py-4">
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
                  className="p-2 hover:bg-slate-600"
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
                    <div
                      className={[
                        "badge",
                        "badge-secondary",
                        "text-secondary-content",
                        "gap-2",
                        "p-3",
                      ].join(" ")}
                    >
                      {translation.iso_639_1}-{translation.iso_3166_1}
                    </div>
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
