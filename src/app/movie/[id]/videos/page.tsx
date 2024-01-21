import BackTo from "@/components/BackTo";
import VideosFiltering from "@/components/Sidebar/MainTitle/VideosFiltering";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import VideosGrid from "@/components/layouts/VideosGrid";
import {
  RQ_MOVIE_ENDPOINT,
  RQ_MOVIE_KEY,
  RQ_MOVIE_VIDEOS_ENDPOINT,
  RQ_MOVIE_VIDEOS_KEY,
} from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

const MovieVideos = ({ params: { id } }: Props) => {
  return (
    <>
      <BackTo
        queryKey={RQ_MOVIE_KEY(id)}
        endpoint={RQ_MOVIE_ENDPOINT(id)}
        backTo={{ label: "Main", link: `/movie/${id}` }}
      />
      <MainTitleSidebarLeft
        content={
          <VideosGrid
            queryKey={RQ_MOVIE_VIDEOS_KEY(id)}
            endpoint={RQ_MOVIE_VIDEOS_ENDPOINT(id)}
          />
        }
        sidebar={
          <VideosFiltering
            queryKey={RQ_MOVIE_VIDEOS_KEY(id)}
            endpoint={RQ_MOVIE_VIDEOS_ENDPOINT(id)}
          />
        }
      />
    </>
  );
};

export default MovieVideos;
