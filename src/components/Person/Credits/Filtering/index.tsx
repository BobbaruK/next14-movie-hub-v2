"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  creditDepartmentSearchQuery,
  creditMediaTypeSearchQuery,
} from "@/constants";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const FilteringMediaType = dynamic(() => import("./MediaType"));
const FilteringDepartments = dynamic(() => import("./Departments"));

const FilteringCredits = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const deleteQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(creditMediaTypeSearchQuery);
    params.delete(creditDepartmentSearchQuery);

    return params.toString();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center gap-4">
      {searchParams.size > 0 && (
        <Link
          href={pathname + "?" + deleteQueryString()}
          scroll={false}
          className={buttonVariants({ variant: "link" })}
        >
          Clear
        </Link>
      )}
      <FilteringMediaType />
      <FilteringDepartments />
    </div>
  );
};

export default FilteringCredits;
