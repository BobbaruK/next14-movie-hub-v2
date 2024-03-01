import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  RQ_COMBINED_CREDITS_KEY,
  creditDepartmentSearchQuery,
  creditMediaTypeSearchQuery,
} from "@/constants";
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

interface DepObj {
  [key: string]: {
    label: string;
    count: number;
  };
}

const FilteringDepartments = () => {
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [departmentState, setDepartmentState] = useState<MediaType | null>(
    null,
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(creditMediaTypeSearchQuery);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const creditDepartment = searchParams.get(
      creditDepartmentSearchQuery,
    ) as MediaType | null;

    setDepartmentState((state) => (state = creditDepartment));
    return () => {};
  }, [searchParams]);

  const { data: credits } = useQuery<CombinedCredits>({
    queryKey: [RQ_COMBINED_CREDITS_KEY(id)],
  });

  const getDepartments = () => {
    const depObj: DepObj = {};

    if (credits) {
      for (let i = 0; i < credits.crew.length; i++) {
        const department = credits.crew[i].department as keyof typeof depObj;

        if (department === "Creator") continue; // TODO: add this when create loading

        const count = credits.crew.filter(
          (crew) => crew.department === credits.crew[i].department,
        ).length;

        if (department in depObj) continue;

        depObj[department] = {
          label: department as string,
          count,
        };
      }
    }

    const output = Object.values(depObj);

    return output;
  };

  const departments = getDepartments();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Department</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={departmentState || undefined}
          onValueChange={(e) => {
            const value = e as MediaType;
            setDepartmentState((state) => (state = value));

            router.push(
              pathname +
                "?" +
                createQueryString(creditDepartmentSearchQuery, value),
              {
                scroll: false,
              },
            );
          }}
        >
          {departments.map((department) => (
            <DropdownMenuRadioItem
              key={department.label}
              value={department.label}
              className="flex justify-between gap-4"
            >
              {department.label} <Badge>{department.count}</Badge>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilteringDepartments;
