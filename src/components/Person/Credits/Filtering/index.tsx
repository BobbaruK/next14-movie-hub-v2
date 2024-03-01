"use client";

import { buttonVariants } from "@/components/ui/button";
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

  return (
    <div className="flex items-center justify-center gap-4">
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
    </div>
  );
};

export default FilteringCredits;
