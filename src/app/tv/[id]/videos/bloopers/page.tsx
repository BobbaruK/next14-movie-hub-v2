import BackTo from "@/components/BackTo";
import VideosFiltering from "@/components/Sidebar/MainTitle/VideosFiltering";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import VideosGrid from "@/components/layouts/VideosGrid";
import {
  RQ_TVSHOW_ENDPOINT,
  RQ_TVSHOW_KEY,
  RQ_TVSHOW_VIDEOS_ENDPOINT,
  RQ_TVSHOW_VIDEOS_KEY,
} from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

const TVShowVideosBloopers = ({ params: { id } }: Props) => {
  return (
    <>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        endpoint={RQ_TVSHOW_ENDPOINT(id)}
        backTo={{ label: "Main", link: `/movie/${id}` }}
      />
      <MainTitleSidebarLeft
        content={
          <VideosGrid
            queryKey={RQ_TVSHOW_VIDEOS_KEY(id)}
            endpoint={RQ_TVSHOW_VIDEOS_ENDPOINT(id)}
            videoType="blooper"
          />
        }
        sidebar={
          <VideosFiltering
            queryKey={RQ_TVSHOW_VIDEOS_KEY(id)}
            endpoint={RQ_TVSHOW_VIDEOS_ENDPOINT(id)}
            titleType="tv"
          />
        }
      />
    </>
  );
};

export default TVShowVideosBloopers;
