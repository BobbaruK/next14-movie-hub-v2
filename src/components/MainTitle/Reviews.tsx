"use client";

import { MediaType } from "@/types/MediaType";
import { ReviewsResponse } from "@/types/movies/Reviews";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReviewCard from "../Cards/Review";
import CustomAlert from "../CustomAlert";

interface Props {
  queryKey: string;
  type: MediaType;
}

const MainTitleReviews = ({ queryKey, type }: Props) => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery<ReviewsResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading) {
    return (
      <CustomAlert
        variant="default"
        title={"Reviews"}
        description="Loading... Please be patient"
      />
    );
  }

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
