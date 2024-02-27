"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MediaType } from "@/types/MediaType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const FilteringMediaType = () => {
  const pathname = usePathname();
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
          <DropdownMenuRadioItem value="movie">Movie</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="tv">TV Shows</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilteringMediaType;
