"use client";

import { useParams } from "next/navigation";

const SingleVideo = () => {
  const { id, ytVideoId } = useParams<{ id: string; ytVideoId: string }>();

  return (
    <div className="appContaier">

      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${ytVideoId}`}
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // allowfullscreen
        className="aspect-video h-auto w-full rounded-md"
      ></iframe>
    </div>
  );
};

export default SingleVideo;
