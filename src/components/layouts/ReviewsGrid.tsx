"use client";

import { MainTitleResponse } from "@/types/MainTitleResponse";
import { Review } from "@/types/movies/Reviews";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import ReviewCard from "../Cards/Review";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import MoviePagination from "./MoviePagination";

interface Props {
  queryKey: string;
}

const ReviewsGrid = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<MainTitleResponse<Review>>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="appContaier">
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>Loading reviews...</AlertDescription>
        </Alert>
      </div>
    );

  if (!data?.results.length)
    return (
      <div className="appContaier">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>No reviews</AlertDescription>
        </Alert>
      </div>
    );

  return (
    <div className="appContaier flex flex-col gap-8">
      <MoviePagination
        movie={data}
        page={data.page}
        with_genres={""}
        sort_by={""}
        with_original_language={""}
      />
      <div className="flex flex-col gap-8">
        {data?.results.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <MoviePagination
        movie={data}
        page={data.page}
        with_genres={""}
        sort_by={""}
        with_original_language={""}
      />
    </div>
  );
};

export default ReviewsGrid;
