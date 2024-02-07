import ImagesFiltering from "@/components/Sidebar/MainTitle/ImagesFiltering";
import ImagesGrid from "@/components/layouts/ImagesGrid";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_TVSHOWS_IMAGES_KEY } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function TVShowsImagesLogos({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <ImagesGrid
          queryKey={RQ_TVSHOWS_IMAGES_KEY(id)}
          imagesType="logos"
          imageDetails={{
            classes: "h-20 [&>img]:object-contain",
            sizes: "238px",
            type: "logo",
          }}
          titleType="tv"
        />
      }
      sidebar={
        <ImagesFiltering
          title="Logos"
          queryKey={RQ_TVSHOWS_IMAGES_KEY(id)}
          imagesType="logos"
          titleType="tv"
        />
      }
    />
  );
}
