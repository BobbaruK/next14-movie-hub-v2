import BackTo from "@/components/BackTo";
import SingleVideo from "@/components/layouts/SingleVideo";
import { RQ_MOVIE_ENDPOINT, RQ_MOVIE_KEY } from "@/constants";

interface Props {
  params: { id: string; ytVideoId: string };
}

const MovieClipsYTVideoId = ({ params: { id, ytVideoId } }: Props) => {
  return (
    <>
      <BackTo
        queryKey={RQ_MOVIE_KEY(id)}
        endpoint={RQ_MOVIE_ENDPOINT(id)}
        backTo={{ label: "Clips", link: `/movie/${id}/videos/clips` }}
      />
      <SingleVideo />
    </>
  );
};

export default MovieClipsYTVideoId;
