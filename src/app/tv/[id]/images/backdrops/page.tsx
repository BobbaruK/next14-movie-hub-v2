import ImagesGrid from "@/components/layouts/ImagesGrid";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_TVSHOWS_IMAGES_ENDPOINT, RQ_TVSHOWS_IMAGES_KEY } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function TVShowsImagesBackdrops({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <ImagesGrid
          queryKey={RQ_TVSHOWS_IMAGES_KEY(id)}
          endpoint={RQ_TVSHOWS_IMAGES_ENDPOINT(id)}
          imagesType="backdrops"
          imageDetails={{
            classes: "h-40",
            sizes: "238px",
            type: "backdrop",
          }}
        />
      }
      sidebar={<p>Main Movie Filtering Sidebar</p>}
    />
  );
}
