import BackTo from "@/components/BackTo";
import Seasons from "@/components/layouts/MainTitle/Seasons";
import { RQ_TVSHOW_KEY } from "@/constants";

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
        backTo={{ label: "Main", link: `/tv/${id}` }}
      />
      <Seasons queryKey={RQ_TVSHOW_KEY(id)} />
    </>
  );
}
