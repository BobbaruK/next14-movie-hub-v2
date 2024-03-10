import { MainTitleResponse } from "@/types/MainTitleResponse";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  page: number;
  response: MainTitleResponse<unknown>;
}

const MoviePagination = ({ page, response }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has("page") || page !== 1) params.set("page", "1");
      params.set(name, value);

      return params.toString();
    },
    [searchParams, page],
  );

  return (
    <>
      {/* {response.total_pages} */}
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                disabled={page <= 1 || isPending}
                onClick={() =>
                  startTransition(() =>
                    router.push("?" + createQueryString("page", `${page - 1}`)),
                  )
                }
              />
            </PaginationItem>
          )}
          {response.page > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {response.page - 1 > 0 && (
            <PaginationItem>
              <PaginationLink
                value={response.page - 1}
                disabled={isPending}
                onClick={(e) => {
                  const target = e.target as HTMLButtonElement;
                  startTransition(() =>
                    router.push(
                      "?" + createQueryString("page", `${target.value}`),
                    ),
                  );
                }}
              >
                {response.page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink value={response.page} disabled={isPending} isActive>
              {response.page}
            </PaginationLink>
          </PaginationItem>
          {response.page + 1 < response.total_pages + 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  value={response.page + 1}
                  disabled={isPending}
                  onClick={(e) => {
                    const target = e.target as HTMLButtonElement;
                    startTransition(() =>
                      router.push(
                        "?" + createQueryString("page", `${target.value}`),
                      ),
                    );
                  }}
                >
                  {response.page + 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          {response.page + 1 < response.total_pages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {page < response.total_pages && (
            <PaginationItem>
              <PaginationNext
                disabled={page >= response.total_pages || isPending}
                onClick={() => {
                  startTransition(() =>
                    router.push(
                      "?" + createQueryString("page", `${Number(page) + 1}`),
                    ),
                  );
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default MoviePagination;
