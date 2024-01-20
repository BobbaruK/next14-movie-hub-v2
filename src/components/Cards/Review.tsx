import { ProfileSizes } from "@/types/imageSizes";
import { Review } from "@/types/movies/Reviews";
import imageLink from "@/utils/imageLink";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useState } from "react";
import ImageTMDB from "../ImageTMDB";
import Rating from "../Rating";

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
          <button
            className="btn btn-outline btn-xs"
            onClick={() => {
              setShowContent(!showContent);
            }}
          >
            {showContent ? "Show less" : "Show more"}
          </button>
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
    <div className="card overflow-hidden bg-base-100 shadow-md shadow-primary">
      <div className="card-body relative flex justify-between gap-4 p-4">
        <div className="flex items-center gap-4">
          <div className="overflow-hidden rounded-full [&>img]:h-[45px] [&>img]:w-[45px] [&>img]:object-cover">
            <ImageTMDB
              alt={review.author}
              src={imageLink<ProfileSizes>(
                "https://www.themoviedb.org/t/p/",
                "w45",
                review.author_details.avatar_path,
              )}
              width={45}
              height={45}
            />
          </div>
          <div>
            <h3 className="m-0">A review by {review.author}</h3>
            <div className="flex items-center gap-4">
              {review.author_details.rating && (
                <Rating vote={review.author_details.rating} />
              )}
              <div>
                Written by {review.author} on {created.releaseDate}
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReviewContent content={review.content} />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
