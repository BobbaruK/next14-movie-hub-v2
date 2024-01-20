import { TheVideo } from "@/types/VideoResponse";
import React from "react";
import ImageTMDB from "../ImageTMDB";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { FaPlay } from "react-icons/fa";

interface Props {
  video: TheVideo;
}

const VideoCard = ({ video }: Props) => {
  return (
    <div className="card flex overflow-hidden bg-base-100 shadow-md shadow-primary sm:flex-row">
      <div className="relative cursor-pointer sm:basis-1/3">
        <ImageTMDB
          src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
          alt={video.name}
          width={480}
          height={360}
          className="w-full"
        />
        <div className="playBtnWrapper absolute inset-x-[50%] inset-y-[50%] z-10 grid h-14 w-14 translate-x-[-50%] translate-y-[-50%] place-items-center rounded-full bg-primary-content text-primary opacity-80 hover:opacity-100">
          <FaPlay />
        </div>
      </div>
      <div className="p-3 sm:basis-2/3">
        <h2>{video.name}</h2>
        <p>
          {video.type} &bull; {ReleaseDateUI(video.published_at).releaseDate}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
