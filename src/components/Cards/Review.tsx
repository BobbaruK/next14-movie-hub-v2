import { Card, CardContent } from "@/components/ui/card";
import { Review } from "@/types/movies/Reviews";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useState } from "react";
import Rating from "../Rating";
import TMDBImages from "../TMDBImages";
import { Button } from "../ui/button";

const ReviewContent = ({ content }: { content: string }) => {
  "use client";

  const [showContent, setShowContent] = useState(false);

  const theContent = showContent ? content : content.substring(0, 200) + "...";

  return (
    <>
      {theContent}
      {content.length > 199 && (
        <>
          {" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowContent(!showContent);
            }}
          >
            {showContent ? "Show less" : "Show more"}
          </Button>
        </>
      )}
    </>
  );
};

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => {
  const created = ReleaseDateUI(review.created_at);

  return (
    <>
      <Card>
        <CardContent className="flex flex-col justify-between gap-4 p-4">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <TMDBImages
              type={{ type: "profile", size: "w45" }}
              alt={review.author}
              src={review.author_details.avatar_path}
              className="h-[45px] w-[45px] rounded-full object-cover"
            />
            <div>
              <h3 className="m-0 text-center sm:text-start">
                <span className="hidden sm:inline">A review by</span>{" "}
                {review.author}
              </h3>
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                {review.author_details.rating && (
                  <Rating vote={review.author_details.rating} />
                )}
                <div className="text-center sm:text-start">
                  Written by {review.author} on {created.releaseDate}
                </div>
              </div>
            </div>
          </div>
          <div>
            <ReviewContent content={review.content} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ReviewCard;
