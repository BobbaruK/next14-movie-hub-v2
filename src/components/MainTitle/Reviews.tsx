"use client";

import MyAPIClient from "@/services/myApiClient";
import { ReviewsResponse } from "@/types/movies/Reviews";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ReviewCard from "../Cards/Review";
import { useParams } from "next/navigation";

interface Props {
  queryKey: string;
  endpoint: string;
  type: "movie" | "tv";
}

const MainTitleReviews = ({ queryKey, endpoint, type }: Props) => {
  const { id } = useParams<{ id: string }>();

  const apiClient = new MyAPIClient<ReviewsResponse>(endpoint);
  const { data, error, isLoading } = useQuery<ReviewsResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading movie reviews...</div>;

  if (data?.results.length === 0) return;

  return (
    <div>
      <div>
        <h2 className="flex items-center gap-4">
          Reviews
          <div className="badge badge-primary">{data?.results.length}</div>
        </h2>
      </div>
      <div>
        <ReviewCard review={data?.results[0]!} />
        {data?.results.length && data?.results.length > 1 && (
          <div className="py-4">
            <Link href={`/${type}/${id}/reviews`}>View all reviews</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainTitleReviews;
