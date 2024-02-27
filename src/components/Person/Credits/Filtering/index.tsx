"use client";

import { buttonVariants } from "@/components/ui/button";
import { MediaType } from "@/types/MediaType";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const FilteringMediaType = dynamic(() => import("./MediaType"));

const FilteringCredits = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);

      return params.toString();
    },
    [searchParams],
  );

  const creditMediaType = searchParams.get(
    "credit_media_type",
  ) as MediaType | null;

  return (
    <>
      {searchParams.size > 0 && (
        <Link
          href={pathname + "?" + deleteQueryString("credit_media_type")}
          scroll={false}
          className={buttonVariants({ variant: "link" })}
        >
          Clear
        </Link>
      )}
      <FilteringMediaType />
    </>
  );
};

export default FilteringCredits;
