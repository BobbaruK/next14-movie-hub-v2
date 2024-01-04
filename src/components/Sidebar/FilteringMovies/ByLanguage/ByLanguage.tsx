"use client";

import { RQ_LANGUAGES_KEY } from "@/constants";
import { Language } from "@/types/movies/Language";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

const ByLanguage = () => {
  // const apiClient = new MyAPIClient<Language[]>(RQ_LANGUAGES_ENDPOINT);

  const { data, error, isLoading } = useQuery<Language[]>({
    queryKey: [RQ_LANGUAGES_KEY],
    // queryFn: () => apiClient.getAll(),
    placeholderData: keepPreviousData,
  });

  const params = useSearchParams();
  const paramsString = (lang: string): string =>
    `?page=1${
      params.get("sort_by") ? "&sort_by=" + params.get("sort_by") : ""
    }&with_original_language=${lang}`;

  const router = useRouter();

  if (error) return <div className="alert alert-error">{error.message}</div>;

  if (isLoading)
    return <div className="alert alert-info">Loading movies...</div>;

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
      <h3>
        <label htmlFor="byLanguage">ByLanguage</label>
      </h3>
      <select
        id="byLanguage"
        className="select select-bordered w-full"
        onChange={(e) => {
          router.push(paramsString(e.target.value));
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
