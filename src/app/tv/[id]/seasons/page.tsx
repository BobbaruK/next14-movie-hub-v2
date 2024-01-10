import BackTo from "@/components/BackTo";
import Seasons from "@/components/Seasons";
import { RQ_TVSHOW_KEY, RQ_TVSHOW_ENDPOINT } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function TVShowSeasons({ params: { id } }: Props) {
  return (
    <>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        endpoint={RQ_TVSHOW_ENDPOINT(id)}
        backTo={{ label: "Main", link: `/tv/${id}` }}
      />
      <Seasons queryKey={RQ_TVSHOW_KEY(id)} endpoint={RQ_TVSHOW_ENDPOINT(id)} />
    </>
  );
}
