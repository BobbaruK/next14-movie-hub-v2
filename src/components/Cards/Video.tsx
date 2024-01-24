import { MediaType } from "@/types/MediaType";
import { TheVideo, VideoTypeLink } from "@/types/VideoResponse";
import ReleaseDateUI from "@/utils/releaseDateUI";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import TMDBImages from "../TMDBImages";

interface Props {
  video: TheVideo;
  mainTitleID: string;
  videoTypeLink: VideoTypeLink;
  titleType: MediaType;
}

const VideoCard = ({ video, mainTitleID, videoTypeLink, titleType }: Props) => {
  return (
    <div className="card flex max-h-56 overflow-hidden bg-base-100 shadow-md shadow-primary sm:flex-row">
      <div className="relative cursor-pointer sm:basis-1/3">
        <Link
          href={`/${titleType}/${mainTitleID}/videos/${videoTypeLink}/${video.key}`}
        >
          <TMDBImages
            type={{ type: "other" }}
            src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
            alt={video.name}
            width={480}
            height={360}
            className="h-full w-full object-cover"
          />
          <div className="playBtnWrapper absolute inset-x-[50%] inset-y-[50%] z-10 grid h-14 w-14 translate-x-[-50%] translate-y-[-50%] place-items-center rounded-full bg-primary-content text-primary opacity-80 hover:opacity-100">
            <FaPlay />
          </div>
        </Link>
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
