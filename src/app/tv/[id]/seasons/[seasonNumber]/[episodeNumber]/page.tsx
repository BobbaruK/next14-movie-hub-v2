import BackTo from "@/components/BackTo";
import Episode from "@/components/MainTitle/tv/Episode";
import { RQ_TVSHOW_EPISODE_KEY, RQ_TVSHOW_KEY } from "@/constants";

interface Props {
  params: {
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  };
}

export default function TVShowEpisode({
  params: { id, seasonNumber, episodeNumber },
}: Props) {
  return (
    <>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        backTo={{
          label: `Season ${seasonNumber}`,
          link: `/tv/${id}/seasons/${seasonNumber}`,
        }}
      />
      <Episode
        queryKey={RQ_TVSHOW_EPISODE_KEY(id, seasonNumber, episodeNumber)}
      />
    </>
  );
}
