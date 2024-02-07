import ImagesGrid from "@/components/layouts/ImagesGrid";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_TVSHOWS_IMAGES_KEY, RQ_TVSHOWS_IMAGES_ENDPOINT } from "@/constants";
import Link from "next/link";

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
          endpoint={RQ_TVSHOWS_IMAGES_ENDPOINT(id)}
          imagesType="logos"
          imageDetails={{
            classes: "h-20 [&>img]:object-contain",
            sizes: "238px",
            type: "backdrop",
          }}
        />
      }
      sidebar={<p>Main Movie Filtering Sidebar</p>}
    />
  );
}
