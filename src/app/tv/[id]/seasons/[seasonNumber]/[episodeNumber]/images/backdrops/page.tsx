import BackTo from "@/components/BackTo";
import ImagesFiltering from "@/components/Sidebar/MainTitle/ImagesFiltering";
import ImagesGrid from "@/components/layouts/ImagesGrid";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_TVSHOW_EPISODE_IMAGES_KEY, RQ_TVSHOW_KEY } from "@/constants";

interface Props {
  params: {
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  };
}

export default function EpisodeImagesBackdrops({
  params: { id, episodeNumber, seasonNumber },
}: Props) {
  return (
    <>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        backTo={{
          label: `Season ${seasonNumber} Episode ${parseInt(episodeNumber)}`,
          link: `/tv/${id}/seasons/${seasonNumber}/${episodeNumber}`,
        }}
      />
      <MainTitleSidebarLeft
        content={
          <ImagesGrid
            queryKey={RQ_TVSHOW_EPISODE_IMAGES_KEY(
              id,
              seasonNumber,
              episodeNumber,
            )}
            imagesType="stills"
            imageDetails={{
              classes:
                "h-backdropsImageHeight sm:h-backdropsImageHeight-sm md:h-backdropsImageHeight-md lg:h-backdropsImageHeight-lg xl:h-backdropsImageHeight-xl",
              sizes: `200px`,
              type: "backdrop",
            }}
            titleType="tv"
          />
        }
        sidebar={
          <ImagesFiltering
            title="Backdrops"
            queryKey={RQ_TVSHOW_EPISODE_IMAGES_KEY(
              id,
              seasonNumber,
              episodeNumber,
            )}
            imagesType="stills"
            titleType="tv"
          />
        }
      />
    </>
  );
}
