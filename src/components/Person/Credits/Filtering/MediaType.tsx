"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RQ_COMBINED_CREDITS_KEY } from "@/constants";
import { MediaType } from "@/types/MediaType";
import { CombinedCredits } from "@/types/people/CombinedCredits";
import { useQuery } from "@tanstack/react-query";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const FilteringMediaType = () => {
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mediaTypeState, setMediaTypeState] = useState<MediaType | null>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const creditMediaType = searchParams.get(
      "credit_media_type",
    ) as MediaType | null;

    setMediaTypeState((state) => (state = creditMediaType));
    return () => {};
  }, [searchParams]);

  const { data: credits } = useQuery<CombinedCredits>({
    queryKey: [RQ_COMBINED_CREDITS_KEY(id)],
  });

  const titlesCounter = () => {
    let moviesCounter = 0,
      tvShowsCounter = 0;

    if (credits?.cast) {
      for (let i = 0; i < credits.cast.length; i++) {
        if (credits.cast[i].media_type === "movie") moviesCounter++;
      }
      for (let i = 0; i < credits.cast.length; i++) {
        if (credits.cast[i].media_type === "tv") tvShowsCounter++;
      }
    }

    if (credits?.crew) {
      for (let i = 0; i < credits.crew.length; i++) {
        if (credits.crew[i].media_type === "movie") moviesCounter++;
      }

      for (let i = 0; i < credits.crew.length; i++) {
        if (credits.crew[i].media_type === "tv") tvShowsCounter++;
      }
    }

    return {
      moviesCounter,
      tvShowsCounter,
    };
  };

  const counters = titlesCounter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">All</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={mediaTypeState || undefined}
          onValueChange={(e) => {
            const value = e as MediaType;
            setMediaTypeState((state) => (state = value));

            router.push(
              pathname + "?" + createQueryString("credit_media_type", value),
              {
                scroll: false,
              },
            );
          }}
        >
          <DropdownMenuRadioItem
            value="movie"
            className="flex justify-between gap-4"
          >
            Movie <Badge>{counters.moviesCounter}</Badge>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="tv"
            className="flex justify-between gap-4"
          >
            TV Shows <Badge>{counters.tvShowsCounter}</Badge>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilteringMediaType;
