import BackTo from "@/components/BackTo";
import { RQ_MOVIE_KEY, RQ_MOVIE_ENDPOINT } from "@/constants";
import { useParams } from "next/navigation";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  params: { id: string; ytVideoId: string };
}

const MovieBehindTheScenesYTVideoId = ({
  params: { id, ytVideoId },
  ...restProps
}: Props) => {
  return (
    <>
      <BackTo
        queryKey={RQ_MOVIE_KEY(id)}
        endpoint={RQ_MOVIE_ENDPOINT(id)}
        backTo={{ label: "Videos", link: `/movie/${id}/videos/behind-the-scenes` }}
      />
      <div>ytVideoId: {ytVideoId}</div>
    </>
  );
};

export default MovieBehindTheScenesYTVideoId;
