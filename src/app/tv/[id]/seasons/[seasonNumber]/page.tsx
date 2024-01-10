import BackTo from "@/components/BackTo";
import Season from "@/components/Season";
import {
  RQ_TVSHOW_ENDPOINT,
  RQ_TVSHOW_KEY,
  RQ_TVSHOW_SEASON_ENDPOINT,
  RQ_TVSHOW_SEASON_KEY,
} from "@/constants";

interface Props {
  params: {
    id: string;
    seasonNumber: string;
  };
}

export default function TVShowSeason({ params: { id, seasonNumber } }: Props) {
  return (
    <>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        endpoint={RQ_TVSHOW_ENDPOINT(id)}
        backTo={{ label: "Seasons", link: `/tv/${id}/seasons` }}
      />
      <Season
        queryKey={RQ_TVSHOW_SEASON_KEY(id, seasonNumber)}
        endpoint={RQ_TVSHOW_SEASON_ENDPOINT(id, seasonNumber)}
      />
    </>
  );
}
