import { VideosResponse } from "@/types/VideoResponse";

const useGetVideos = (videos: VideosResponse) => {
  const trailers = videos?.results.filter((video) => video.type === "Trailer");
  const teasers = videos?.results.filter((video) => video.type === "Teaser");
  const clips = videos?.results.filter((video) => video.type === "Clip");
  const bts = videos?.results.filter(
    (video) => video.type === "Behind the Scenes",
  );
  const bloopers = videos?.results.filter((video) => video.type === "Bloopers");
  const featurettes = videos?.results.filter(
    (video) => video.type === "Featurette",
  );
  const openingCredits = videos?.results.filter(
    (video) => video.type === "Opening Credits",
  );

  return {
    trailers,
    teasers,
    clips,
    bts,
    bloopers,
    featurettes,
    openingCredits,
  };
};

export default useGetVideos;
