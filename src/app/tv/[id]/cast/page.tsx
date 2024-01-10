import BackTo from "@/components/BackTo";
import { RQ_TVSHOW_ENDPOINT, RQ_TVSHOW_KEY } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function TVShowCast({ params: { id } }: Props) {
  return (
    <BackTo
      queryKey={RQ_TVSHOW_KEY(id)}
      endpoint={RQ_TVSHOW_ENDPOINT(id)}
      backTo={{ label: "Main", link: `/movie/${id}` }}
    />
  );
}
