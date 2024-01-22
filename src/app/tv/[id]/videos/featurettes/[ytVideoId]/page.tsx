import BackTo from "@/components/BackTo";
import SingleVideo from "@/components/layouts/SingleVideo";
import { RQ_TVSHOW_ENDPOINT, RQ_TVSHOW_KEY } from "@/constants";

interface Props {
  params: { id: string; ytVideoId: string };
}

const TVShowFeaturettesYTVideoId = ({ params: { id, ytVideoId } }: Props) => {
  return (
    <>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        endpoint={RQ_TVSHOW_ENDPOINT(id)}
        backTo={{ label: "Videos", link: `/tv/${id}/videos/featurettes` }}
      />
      <SingleVideo />
    </>
  );
};

export default TVShowFeaturettesYTVideoId;
