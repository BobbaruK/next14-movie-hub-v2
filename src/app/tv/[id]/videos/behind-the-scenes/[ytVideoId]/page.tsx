import BackTo from "@/components/BackTo";
import SingleVideo from "@/components/layouts/SingleVideo";
import { RQ_TVSHOW_KEY } from "@/constants";

interface Props {
  params: { id: string; ytVideoId: string };
}

const TVShowBehindTheScenesYTVideoId = ({
  params: { id, ytVideoId },
}: Props) => {
  return (
    <>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        backTo={{
          label: "Behind the Scenes",
          link: `/tv/${id}/videos/behind-the-scenes`,
        }}
      />
      <SingleVideo />
    </>
  );
};

export default TVShowBehindTheScenesYTVideoId;
