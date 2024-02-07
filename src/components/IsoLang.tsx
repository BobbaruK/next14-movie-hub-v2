"use client";

import { RQ_COUNTRIES_KEY } from "@/constants";
import { Country } from "@/types/Country";
import { useQuery } from "@tanstack/react-query";

export const IsoLang = ({ iso }: { iso: string }) => {
  const { data } = useQuery<Country[]>({
    queryKey: [RQ_COUNTRIES_KEY],
  });

  return `${data?.find((country) => country.iso_3166_1 === iso)?.english_name}`;
};
