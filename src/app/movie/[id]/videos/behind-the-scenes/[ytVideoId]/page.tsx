import BackTo from "@/components/BackTo";
import SingleVideo from "@/components/layouts/SingleVideo";
import { RQ_MOVIE_KEY } from "@/constants";

interface Props {
  params: { id: string; ytVideoId: string };
}

const MovieBehindTheScenesYTVideoId = ({
  params: { id, ytVideoId },
}: Props) => {
  return (
    <>
      <BackTo
        queryKey={RQ_MOVIE_KEY(id)}
        backTo={{
          label: "Behind the Scenes",
          link: `/movie/${id}/videos/behind-the-scenes`,
        }}
      />
      <SingleVideo />
    </>
  );
};

export default MovieBehindTheScenesYTVideoId;
