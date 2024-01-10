"use client";

import { RQ_COUNTRIES_ENDPOINT, RQ_COUNTRIES_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Country } from "@/types/Country";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export const IsoLang = ({ iso }: { iso: string }) => {
  const apiClientCountries = new MyAPIClient<Country[]>(RQ_COUNTRIES_ENDPOINT);
  const { data } = useQuery<Country[]>({
    queryKey: [RQ_COUNTRIES_KEY],
    queryFn: () => apiClientCountries.getAll(),
    placeholderData: keepPreviousData,
  });

  return `${data?.find((country) => country.iso_3166_1 === iso)?.english_name}`;
};
