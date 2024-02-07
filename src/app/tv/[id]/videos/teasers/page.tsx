import BackTo from "@/components/BackTo";
import VideosFiltering from "@/components/Sidebar/MainTitle/VideosFiltering";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import VideosGrid from "@/components/layouts/VideosGrid";
import { RQ_TVSHOW_KEY, RQ_TVSHOW_VIDEOS_KEY } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

const TVShowVideosTeasers = ({ params: { id } }: Props) => {
  return (
    <>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        backTo={{ label: "Main", link: `/tv/${id}` }}
      />
      <MainTitleSidebarLeft
        content={
          <VideosGrid
            queryKey={RQ_TVSHOW_VIDEOS_KEY(id)}
            videoType="teaser"
            videoTypeLink="teasers"
            titleType="tv"
          />
        }
        sidebar={
          <VideosFiltering queryKey={RQ_TVSHOW_VIDEOS_KEY(id)} titleType="tv" />
        }
      />
    </>
  );
};

export default TVShowVideosTeasers;
