"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { RQ_LANGUAGES_ENDPOINT, RQ_LANGUAGES_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Language } from "@/types/movies/Language";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const ByLanguage = () => {
  const [isPending, startTransition] = useTransition();

  const apiClient = new MyAPIClient<Language[]>(RQ_LANGUAGES_ENDPOINT);

  const { data, error, isLoading } = useQuery<Language[]>({
    queryKey: [RQ_LANGUAGES_KEY],
    queryFn: () => apiClient.getAll(),
    placeholderData: keepPreviousData,
  });

  const params = useSearchParams();
  const genreParams = params.get("with_genres");
  const sortByParams = params.get("sort_by");

  const paramsString = (lang: string): string =>
    `?page=1${
      genreParams ? "&with_genres=" + genreParams : ""
    }&with_original_language=${lang}${
      sortByParams ? "&sort_by=" + sortByParams : ""
    }`;

  const router = useRouter();

  if (error) throw new Error(`${RQ_LANGUAGES_KEY} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading languages...</div>;

  const languages = [...(data || [])];

  languages.sort((a, b) => {
    if (a.english_name < b.english_name) {
      return -1;
    }
    if (a.english_name > b.english_name) {
      return 1;
    }
    return 0;
  });

  return (
    <div>
      <h3 className="flex items-center gap-4">
        <label htmlFor="byLanguage">By Language</label>
        {isPending && <LoadingSpinner size="md" />}
      </h3>
      <select
        id="byLanguage"
        className="select select-bordered w-full"
        onChange={(e) => {
          startTransition(() => router.push(paramsString(e.target.value)));
        }}
        value={params.get("with_original_language") || ""}
      >
        <option value="">Select language</option>
        {languages.map((sort) => (
          <option key={sort.iso_639_1} value={sort.iso_639_1}>
            {sort.english_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ByLanguage;
