import BackTo from "@/components/BackTo";
import VideosFiltering from "@/components/Sidebar/MainTitle/VideosFiltering";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import VideosGrid from "@/components/layouts/VideosGrid";
import { RQ_MOVIE_KEY, RQ_MOVIE_VIDEOS_KEY } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

const MovieVideosBloopers = ({ params: { id } }: Props) => {
  return (
    <>
      <BackTo
        queryKey={RQ_MOVIE_KEY(id)}
        backTo={{ label: "Main", link: `/movie/${id}` }}
      />
      <MainTitleSidebarLeft
        content={
          <VideosGrid
            queryKey={RQ_MOVIE_VIDEOS_KEY(id)}
            videoType="bloopers"
            videoTypeLink="bloopers"
            titleType="movie"
          />
        }
        sidebar={
          <VideosFiltering
            queryKey={RQ_MOVIE_VIDEOS_KEY(id)}
            titleType="movie"
          />
        }
      />
    </>
  );
};

export default MovieVideosBloopers;
