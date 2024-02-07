import BackTo from "@/components/BackTo";
import SingleVideo from "@/components/layouts/SingleVideo";
import { RQ_TVSHOW_KEY } from "@/constants";

interface Props {
  params: { id: string; ytVideoId: string };
}

const TVShowTrailersYTVideoId = ({ params: { id, ytVideoId } }: Props) => {
  return (
    <>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        backTo={{ label: "Trailers", link: `/tv/${id}/videos/trailers` }}
      />
      <SingleVideo />
    </>
  );
};

export default TVShowTrailersYTVideoId;
